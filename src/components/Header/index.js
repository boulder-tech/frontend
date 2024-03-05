'use client';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useGlobalContext } from '../../app/context/store';
import Link from 'next/link';
import Imagotype from './imagotype';
import AddressButton from '../buttons/address-button';
import TermsOfUseModal from '../TermsOfUseModal';
import ConnectWalletModal from '../ConnectWalletModal';
import GhostButton from '../buttons/ghost-button';
import Web3 from 'web3';
import clsx from 'clsx';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
//import { useAuth } from '../../context/AuthContext';

//import './Header.css';

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;
const backendWS = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_WS_URL;

const Header = () => {
    //const { user, logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [showUserSettings, setShowUserSettings] = useState(false);
    const [openTermsOfUseModal, setOpenTermsOfUseModal] = useState(false);
    const [openConnectWalletModal, setOpenConnectWalletModal] = useState(false);

    const { wallet, setWallet } = useGlobalContext();

    useEffect(() => {
        const walletDataString = localStorage.getItem('wallet');

        if (walletDataString) {
            const walletData = JSON.parse(walletDataString);

            if (walletData && walletData.address) {
                setWallet(walletData);
                setIsWalletConnected(true);
            }
        }
    }, []);

    useEffect(() => {
        if (wallet.address) {
            
        }
    }, [wallet]);

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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 33.9 31.3"
                                    className="cursor-pointer h-4 w-4 min-w-4 cursor-pointer h-4 w-4 min-w-4 mr-2"
                                >
                                    <path
                                        fill="#E17726"
                                        stroke="#E17726"
                                        stroke-width=".25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M32.1.1 18.9 9.8l2.4-5.7 10.8-4z"
                                    ></path>
                                    <path
                                        fill="#E27625"
                                        stroke="#E27625"
                                        stroke-width=".25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m1.8.1 13 9.8-2.3-5.8L1.8.1zM27.4 22.7 23.9 28l7.5 2.1 2.1-7.3-6.1-.1zM.4 22.8l2.1 7.3L10 28l-3.5-5.3-6.1.1z"
                                    ></path>
                                    <path
                                        fill="#E27625"
                                        stroke="#E27625"
                                        stroke-width=".25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m9.6 13.6-2.1 3.1 7.4.3-.2-8-5.1 4.6zM24.3 13.6 19.1 9l-.2 8.1 7.4-.3-2-3.2zM10 28l4.5-2.2-3.9-3L10 28zM19.4 25.8l4.5 2.2-.6-5.2-3.9 3z"
                                    ></path>
                                    <path
                                        fill="#D5BFB2"
                                        stroke="#D5BFB2"
                                        stroke-width=".25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m23.9 28-4.5-2.2.4 2.9v1.2l4.1-1.9zM10 28l4.2 2v-1.2l.4-2.9L10 28z"
                                    ></path>
                                    <path
                                        fill="#233447"
                                        stroke="#233447"
                                        stroke-width=".25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m14.2 20.9-3.7-1.1 2.6-1.2 1.1 2.3zM19.6 20.9l1.1-2.3 2.6 1.2-3.7 1.1z"
                                    ></path>
                                    <path
                                        fill="#CC6228"
                                        stroke="#CC6228"
                                        stroke-width=".25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m10 28 .6-5.3-4.1.1L10 28zM23.2 22.7l.6 5.3 3.5-5.2-4.1-.1zM26.4 16.8l-7.4.3.7 3.8 1.1-2.3 2.6 1.2 3-3zM10.5 19.8l2.6-1.2 1.1 2.3.7-3.8-7.4-.3 3 3z"
                                    ></path>
                                    <path
                                        fill="#E27525"
                                        stroke="#E27525"
                                        stroke-width=".25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m7.5 16.8 3.1 6.1-.1-3-3-3.1zM23.4 19.8l-.1 3 3.1-6.1-3 3.1zM14.9 17.1l-.7 3.8.9 4.5.2-5.9-.4-2.4zM18.9 17.1l-.4 2.4.2 5.9.9-4.5-.7-3.8z"
                                    ></path>
                                    <path
                                        fill="#F5841F"
                                        stroke="#F5841F"
                                        stroke-width=".25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m19.6 20.9-.9 4.5.6.4 3.9-3 .1-3-3.7 1.1zM10.5 19.8l.1 3 3.9 3 .6-.4-.9-4.5-3.7-1.1z"
                                    ></path>
                                    <path
                                        fill="#C0AC9D"
                                        stroke="#C0AC9D"
                                        stroke-width=".25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19.7 30v-1.2l-.3-.3h-5l-.3.3V30L10 28l1.5 1.2 2.9 2h5.1l3-2 1.4-1.2-4.2 2z"
                                    ></path>
                                    <path
                                        fill="#161616"
                                        stroke="#161616"
                                        stroke-width=".25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m19.4 25.8-.6-.4h-3.7l-.6.4-.4 2.9.3-.3h5l.3.3-.3-2.9z"
                                    ></path>
                                    <path
                                        fill="#763E1A"
                                        stroke="#763E1A"
                                        stroke-width=".25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m32.6 10.5 1.1-5.4-1.7-5-12.6 9.4 4.9 4.1 6.9 2 1.5-1.8-.7-.4 1.1-1-.8-.6 1.1-.8-.8-.5zM.1 5.1l1.1 5.4-.7.5 1.1.8-.8.6 1.1 1-.7.5 1.5 1.8 6.9-2 4.9-4.1L1.8.1l-1.7 5z"
                                    ></path>
                                    <path
                                        fill="#F5841F"
                                        stroke="#F5841F"
                                        stroke-width=".25"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m31.2 15.6-6.9-2 2.1 3.1-3.1 6.1 4.1-.1h6.1l-2.3-7.1zM9.6 13.6l-6.9 2-2.3 7.1h6.1l4.1.1-3.1-6.1 2.1-3.1zM18.9 17.1l.4-7.6 2-5.4h-8.9l2 5.4.4 7.6.2 2.4v5.9h3.7v-5.9l.2-2.4z"
                                    ></path>
                                </svg>
                                {wallet.address}
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
                                    onClick={() => disconnectWallet()}
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
                                        onClick={() => {
                                            setOpenTermsOfUseModal(true);
                                        }}
                                    >
                                        Connect →
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>
            {/* Modal */}
            {isModalOpen ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="ml-auto mr-3 mt-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        className="cursor-pointer h-5 w-5 min-w-5 text-gray-600 hover:text-green-600"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="flex items-start justify-between pt-1 pb-1 pl-5 pr-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <p className="text-2xl text-black">
                                        Connect to Wallet
                                    </p>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        <span className="text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <li className="block cursor-pointer rounded-lg bg-white hover:bg-green-200">
                                        <div className="flex items-center p-4 sm:px-6">
                                            <div className="flex min-w-0 flex-1 items-center">
                                                <div className="mr-3 shrink-0 sm:mr-4">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 33.9 31.3"
                                                        className="cursor-pointer min-w-6 sm:min-w-8 h-6 w-6 sm:h-8 sm:w-8"
                                                    >
                                                        <path
                                                            fill="#E17726"
                                                            stroke="#E17726"
                                                            stroke-width=".25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M32.1.1 18.9 9.8l2.4-5.7 10.8-4z"
                                                        ></path>
                                                        <path
                                                            fill="#E27625"
                                                            stroke="#E27625"
                                                            stroke-width=".25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="m1.8.1 13 9.8-2.3-5.8L1.8.1zM27.4 22.7 23.9 28l7.5 2.1 2.1-7.3-6.1-.1zM.4 22.8l2.1 7.3L10 28l-3.5-5.3-6.1.1z"
                                                        ></path>
                                                        <path
                                                            fill="#E27625"
                                                            stroke="#E27625"
                                                            stroke-width=".25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="m9.6 13.6-2.1 3.1 7.4.3-.2-8-5.1 4.6zM24.3 13.6 19.1 9l-.2 8.1 7.4-.3-2-3.2zM10 28l4.5-2.2-3.9-3L10 28zM19.4 25.8l4.5 2.2-.6-5.2-3.9 3z"
                                                        ></path>
                                                        <path
                                                            fill="#D5BFB2"
                                                            stroke="#D5BFB2"
                                                            stroke-width=".25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="m23.9 28-4.5-2.2.4 2.9v1.2l4.1-1.9zM10 28l4.2 2v-1.2l.4-2.9L10 28z"
                                                        ></path>
                                                        <path
                                                            fill="#233447"
                                                            stroke="#233447"
                                                            stroke-width=".25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="m14.2 20.9-3.7-1.1 2.6-1.2 1.1 2.3zM19.6 20.9l1.1-2.3 2.6 1.2-3.7 1.1z"
                                                        ></path>
                                                        <path
                                                            fill="#CC6228"
                                                            stroke="#CC6228"
                                                            stroke-width=".25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="m10 28 .6-5.3-4.1.1L10 28zM23.2 22.7l.6 5.3 3.5-5.2-4.1-.1zM26.4 16.8l-7.4.3.7 3.8 1.1-2.3 2.6 1.2 3-3zM10.5 19.8l2.6-1.2 1.1 2.3.7-3.8-7.4-.3 3 3z"
                                                        ></path>
                                                        <path
                                                            fill="#E27525"
                                                            stroke="#E27525"
                                                            stroke-width=".25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="m7.5 16.8 3.1 6.1-.1-3-3-3.1zM23.4 19.8l-.1 3 3.1-6.1-3 3.1zM14.9 17.1l-.7 3.8.9 4.5.2-5.9-.4-2.4zM18.9 17.1l-.4 2.4.2 5.9.9-4.5-.7-3.8z"
                                                        ></path>
                                                        <path
                                                            fill="#F5841F"
                                                            stroke="#F5841F"
                                                            stroke-width=".25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="m19.6 20.9-.9 4.5.6.4 3.9-3 .1-3-3.7 1.1zM10.5 19.8l.1 3 3.9 3 .6-.4-.9-4.5-3.7-1.1z"
                                                        ></path>
                                                        <path
                                                            fill="#C0AC9D"
                                                            stroke="#C0AC9D"
                                                            stroke-width=".25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M19.7 30v-1.2l-.3-.3h-5l-.3.3V30L10 28l1.5 1.2 2.9 2h5.1l3-2 1.4-1.2-4.2 2z"
                                                        ></path>
                                                        <path
                                                            fill="#161616"
                                                            stroke="#161616"
                                                            stroke-width=".25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="m19.4 25.8-.6-.4h-3.7l-.6.4-.4 2.9.3-.3h5l.3.3-.3-2.9z"
                                                        ></path>
                                                        <path
                                                            fill="#763E1A"
                                                            stroke="#763E1A"
                                                            stroke-width=".25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="m32.6 10.5 1.1-5.4-1.7-5-12.6 9.4 4.9 4.1 6.9 2 1.5-1.8-.7-.4 1.1-1-.8-.6 1.1-.8-.8-.5zM.1 5.1l1.1 5.4-.7.5 1.1.8-.8.6 1.1 1-.7.5 1.5 1.8 6.9-2 4.9-4.1L1.8.1l-1.7 5z"
                                                        ></path>
                                                        <path
                                                            fill="#F5841F"
                                                            stroke="#F5841F"
                                                            stroke-width=".25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="m31.2 15.6-6.9-2 2.1 3.1-3.1 6.1 4.1-.1h6.1l-2.3-7.1zM9.6 13.6l-6.9 2-2.3 7.1h6.1l4.1.1-3.1-6.1 2.1-3.1zM18.9 17.1l.4-7.6 2-5.4h-8.9l2 5.4.4 7.6.2 2.4v5.9h3.7v-5.9l.2-2.4z"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <div className="min-w-0 flex-1 text-left sm:px-4 md:grid md:grid-cols-1 md:gap-4">
                                                    <div
                                                        onClick={connectWallet}
                                                    >
                                                        <p className="truncate text-base font-medium text-black sm:text-xl">
                                                            Metamask
                                                        </p>
                                                        <p className="hidden items-center text-sm text-gray-600 sm:flex mt-1">
                                                            Connect using
                                                            browser wallet
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="hidden text-black sm:block">
                                                    <svg
                                                        fill="currentColor"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        className="cursor-pointer h-5 w-5 -rotate-90 hover:text-green-600"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    ;
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40"></div>
                </>
            ) : null}
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
        </div>
    );
};

export default Header;
