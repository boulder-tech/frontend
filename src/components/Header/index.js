'use client';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useGlobalContext } from '../../app/context/store';
import Link from 'next/link';
import Imagotype from './imagotype';
import AddressButton from '../buttons/address-button';
import Modal from '../Modal';
import TermsOfUseModal from '../TermsOfUseModal';
import ConnectWalletModal from '../ConnectWalletModal';
import GhostButton from '../buttons/ghost-button';
import web3 from 'web3';
import clsx from 'clsx';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
//import { useAuth } from '../../context/AuthContext';

//import './Header.css';

import { useChain, useMoralis } from "react-moralis";

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;
const backendWS = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_WS_URL;

function ConnectWallet() { 
    const { isConnected } = useAccount() 
    if (isConnected) return <Account /> 
    return <WalletOptions /> 
  } 


const Header = () => {
    //const { user, logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [showUserSettings, setShowUserSettings] = useState(false);
    const [openTermsOfUseModal, setOpenTermsOfUseModal] = useState(false);
    const [openConnectWalletModal, setOpenConnectWalletModal] = useState(false);
    const [showIncorrectNetworkModal, setShowIncorrectNetworkModal] =
        useState(false);

    const { wallet, setWallet, setClient } = useGlobalContext();

    const { switchNetwork, chainId, chain } = useChain();
    const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, account, Moralis, deactivateWeb3, isAuthenticated } =
        useMoralis();

    useEffect(() => {
        const walletDataString = localStorage.getItem('wallet');

        if (walletDataString) {
            const walletData = JSON.parse(walletDataString);

            if (walletData && walletData.address) {
                setWallet(walletData);
                setIsWalletConnected(true);
            }
        }

        //test();

        Moralis.onAccountChanged((newAccount) => {
            console.log(`Account changed to ${newAccount}`)
            if (newAccount == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null Account found")
            }
        })
    }, []);

    useEffect(() => { 
        console.log('isAuthenticated', isAuthenticated)
    },[isAuthenticated])

    useEffect(() => {
        if (wallet.address) {
            
        }
    }, [wallet]);

    useEffect(() => {
        if(account) {
            const address = web3.utils.toChecksumAddress(
                account
            );

            console.log('CONNECT WALLET', address)

            axios.post(
                `${backendUrl}/api/client/connect-wallet`,
                {
                    public_address: address,
                }
            );
    
            setWallet({address});
    
            const walletJSON = JSON.stringify({address});
            localStorage.setItem('wallet', walletJSON);
        }
    },[account])

    useEffect(() => {
        if(account && chainId !== '0x66eee') 
            setShowIncorrectNetworkModal(true);
        else 
            setShowIncorrectNetworkModal(false);
        console.log('chainId', chainId)
    }, [chainId])

    const test = async () => {
        if (isWeb3Enabled)
            await enableWeb3();
    }

    //
    const handleConnect = async () => {
        try {
        await Moralis.Web3.authenticate();
        alert('Connected successfully!');
        } catch (error) {
        console.error('Error connecting:', error);
        alert('Failed to connect. Please try again.');
        }
    };
    //

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleUserMenuToggle = () => {
        setShowUserMenu(!showUserMenu);
    };

    const handleLogout = () => {
        // Lógica para cerrar sesión
        // ...

        // Cerrar el menú después de cerrar sesión
        setShowUserMenu(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const connectWallet = async () => {
        try {
            let walletName = 'unknown';

            if (window.ethereum) {
                // Detectar la billetera según las propiedades de window.ethereum
                if (window.ethereum.isMetaMask) {
                    walletName = 'Metamask';
                } else if (window.ethereum.isBinanceSmartChain) {
                    walletName = 'Binance Smart Chain Wallet';
                } // Agrega más condiciones según sea necesario

                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });

                // Obtener la dirección pública de la primera cuenta
                const public_address = accounts[0];

                const response = await axios.post(
                    `${backendUrl}/api/client/connect-wallet`,
                    {
                        public_address,
                    }
                );

                console.log(response);

                setIsWalletConnected(true);
                setIsModalOpen(false);

                // Crear el objeto que quieres almacenar en localStorage
                const walletObject = {
                    wallet: walletName,
                    address: public_address,
                };

                setWallet(walletObject);

                // Convertir el objeto a una cadena JSON
                const walletJSON = JSON.stringify(walletObject);

                // Almacenar la cadena JSON en localStorage
                localStorage.setItem('wallet', walletJSON);

                // Realizar las operaciones necesarias después de conectar la billetera
                // ...
            } else {
                console.warn('La billetera no está disponible');
            }
        } catch (error) {
            console.error('Error al conectar la billetera:', error);
            // Manejar el error según sea necesario
        }
    };

    const disconnectWallet = async () => {
        try {
            if (window.ethereum) {
                // Hacer una llamada a la función de desconexión de MetaMask
                await window.ethereum.request({
                    method: 'eth_accounts',
                    params: [
                        {
                            eth_accounts: {},
                        },
                    ],
                });

                // Actualizar el estado para reflejar que la billetera está desconectada
                setIsWalletConnected(false);
                setShowUserSettings(false);
                setWallet({});

                // Eliminar la información de la billetera del localStorage
                localStorage.removeItem('wallet');

                // Realizar otras operaciones necesarias después de desconectar la billetera
                // ...
            } else {
                console.warn('La billetera no está disponible');
            }
        } catch (error) {
            console.error('Error al desconectar la billetera:', error);
            // Manejar el error según sea necesario
        }
    };

    const switchToEthereumNetwork = async () => {            
        await Moralis.addNetwork('0x66eee', "Arbitrum Sepolia", "ETH", "ETH", "https://sepolia-rollup.arbitrum.io/rpc", "https://sepolia.arbiscan.io/");
        
        switchNetwork("0x66eee");
        /*
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x66eee' }],
            });
    
            const chainId = await window.ethereum.request({
                method: 'eth_chainId',
            });
    
            if (chainId === '0x66eee') {
                setShowIncorrectNetworkModal(true);
            }
        } catch(e) {
            console.log('ERROR', e)
        }
        */
    };

    return (
        <div clasName="h-full-flex h-full min-h-screen w-full overflow-hidden bg-cover bg-right-bottom max-w-screen-4xl mx-auto">
            <header className="w-full items-center justify-between py-3 px-4 sm:px-6 md:px-8 sticky top-0 z-50">
                <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center justify-center divide-border-grey-200 divide-x-[1px] ">
                        <Link href={'/'}>
                            <Imagotype  />
                        </Link>
                    </div>
                    <div className="flex justify-items-start w-full">
                        <div className="ml-4">
                            <button
                                className="flex w-fit h-12 items-center justify-center px-10 py-3 gap-2.5 border rounded-lg text-[#FAFBFF] bg-[#FAFBFF]/[0.04] text-sm"
                                onClick={() => {
                                    window.location.href = '/';
                                }}
                            >
                                Products
                            </button>
                        </div>
                        <div className="ml-4">
                            <button
                                className="flex w-fit h-12 items-center justify-center px-10 py-3 gap-2.5 border rounded-lg text-[#FAFBFF] bg-[#FAFBFF]/[0.04] text-sm"
                                onClick={() => {
                                    window.location.href = '/portfolio';
                                }}
                            >
                                Your Portfolio
                            </button>
                        </div>
                    </div>
                    {wallet?.address ? (
                        <div className="relative">
                            <AddressButton
                                onClick={() => setShowUserSettings(true)}
                            >
                                <img src="https://app.bouldertech.fi/icons/metamask.svg" className="cursor-pointer h-4 w-4 min-w-4 cursor-pointer h-4 w-4 min-w-4 mr-2"/>
                                {wallet?.address}
                            </AddressButton>
                            <div
                                class="absolute right-0 z-10 mt-[0px] w-48 origin-top-right rounded-[4px] bg-white shadow-sm focus:outline-none transform opacity-100 scale-100"
                                aria-labelledby="headlessui-menu-button-:r66:"
                                id="headlessui-menu-items-:r67:"
                                role="menu"
                                tabindex="0"
                                data-headlessui-state="open"
                                style={{
                                    boxShadow:
                                        'rgba(0, 0, 0, 0.14) 0px 1px 4px',
                                    display: `${
                                        showUserSettings ? 'inline' : 'none'
                                    }`,
                                }}
                            >
                                <button
                                    class="px-4 py-3 text-sm text-gray-700 w-full flex border border-b"
                                    id="headlessui-menu-item-:r68:"
                                    role="menuitem"
                                    tabindex="-1"
                                    data-headlessui-state=""
                                    onClick={() => {
                                        deactivateWeb3();
                                        setWallet({});
                                        setClient(null);
                                        localStorage.removeItem("wallet")
                                        setShowUserSettings(false);
                                    }}
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div class="hidden lg:ml-4 lg:flex lg:items-center">
                            <div class="relative ml-3" data-headlessui-state="">
                                <div>
                                    <button
                                        class="grow border border-transparent bg-[#245BFF] px-3 py-1 text-center text-sm font-medium text-slate-50 shadow-sm hover:bg-[#0052FF] md:px-5 md:py-3 w-28 h-12 rounded-full"
                                        onClick={async() => {
                                            setOpenTermsOfUseModal(true);
                                            /*
                                            const ret = await enableWeb3()
                                            if (typeof ret !== "undefined") {
                                                // depends on what button they picked
                                                if (typeof window !== "undefined") {
                                                    window.localStorage.setItem("connected", "injected")
                                                    // window.localStorage.setItem("connected", "walletconnect")
                                                }
                                            }*/
                                        }}
                                        disabled={isWeb3EnableLoading}
                                    >
                                        Connect →
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>
            <TermsOfUseModal
                isOpen={openTermsOfUseModal}
                onClose={() => setOpenTermsOfUseModal(false)}
                closeModal={() => setOpenTermsOfUseModal(false)}
                acceptTerms={() => setOpenConnectWalletModal(true)}
            />
            <ConnectWalletModal
                isOpen={openConnectWalletModal}
                onClose={() => setOpenConnectWalletModal(false)}
                closeModal={() => setOpenConnectWalletModal(false)}
                testFunction={() => {
                    setIsKycApproved(true);
                }}
                testFunction2={() => {
                    setShowKycNotification(true);
                }}
            />
            <Modal isOpen={showIncorrectNetworkModal}>
                <div class="flex flex-col items-center justify-center py-10 px-6">
                    <img src="/icons/wrongNetwork.svg" />
                    <span class="mt-4 text-2xl font-bold leading-[34px]">
                        Wrong network!
                    </span>
                    <p class="mt-2 w-full text-center text-xl font-normal leading-[30px]">
                        Please switch back to <span class="mx-1">Ethereum</span>
                        to continue{' '}
                    </p>
                    <button
                        type="button"
                        class="mt-4 inline-flex items-center rounded-md !bg-black px-4 py-2 text-base font-semibold text-white shadow-sm focus:outline-none focus:ring-0"
                        onClick={() => switchToEthereumNetwork()}
                    >
                        Switch to Ethereum
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Header;
