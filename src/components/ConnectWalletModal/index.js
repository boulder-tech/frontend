import React, { useState, useEffect } from 'react';
import axios from 'axios';
import web3 from 'web3';
import io from 'socket.io-client';
import { useMoralis } from "react-moralis"
import Modal from '../../components/Modal';
import { useGlobalContext } from '../../app/context/store';

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const ConnectWalletModal = ({
    isOpen,
    onClose,
    closeModal,
    testFunction,
    testFunction2,
}) => {
    const { wallet, setWallet, socket, setSocket } = useGlobalContext();
    const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, account, Moralis, deactivateWeb3 } =
        useMoralis()

    useEffect(() => {
        //console.log('ACCOUNT ------', account);
        //setWallet({address: account})
    }, [account])

    const connectWallet = async ({ isOpen, onClose }) => {
        await enableWeb3();

        closeModal();

        /*
        try {
            let walletName = 'unknown';
            let chainId = null;

            if (window.ethereum) {
                // Detectar la billetera según las propiedades de window.ethereum
                if (window.ethereum.isMetaMask) {
                    walletName = 'Metamask';
                    
                    try {
                        chainId = await window.ethereum.request({
                            method: 'eth_chainId',
                        });
    
                        if (chainId !== '0x66eee') {
                            await ethereum.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{ chainId: '0x66eee' }],
                            });
                        }
                    } catch(e) {
                        console.log('ERROR: wallet not connected', e)
                    }

                    
                } else if (window.ethereum.isBinanceSmartChain) {
                    walletName = 'Binance Smart Chain Wallet';
                } // Agrega más condiciones según sea necesario
                console.log('1')
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                console.log('2')

                console.log('backendUrl', backendUrl);

                // Obtener la dirección pública de la primera cuenta
                const public_address = web3.utils.toChecksumAddress(
                    accounts[0]
                );

                console.log('public_address', public_address);

                const { data: kyc_url } = await axios.post(
                    `${backendUrl}/api/client/connect-wallet`,
                    {
                        public_address,
                    }
                );

                const socket = io.connect(`${backendUrl}`);

                setSocket(socket);

                socket.emit('subscribe', {
                    address: public_address,
                });

                closeModal();

                // Crear el objeto que quieres almacenar en localStorage
                const walletObject = {
                    wallet: walletName,
                    address: public_address,
                    chainId,
                };

                console.log(walletObject);

                setWallet(walletObject);

                // Convertir el objeto a una cadena JSON
                const walletJSON = JSON.stringify(walletObject);

                // Almacenar la cadena JSON en localStorage
                localStorage.setItem('wallet', walletJSON);

                // Realizar las operaciones necesarias después de conectar la billetera
                // ...
                //kycProcess(public_address);

               
                
                  if (window.ethereum && window.ethereum.networkVersion === chainId) {
                    console.log("La red ya está agregada en la wallet");
                  } else {
                    console.log("La red no está agregada en la wallet");
                    await window.ethereum.request({
                        "method": "wallet_addEthereumChain",
                        "params": [
                          {
                            "blockExplorerUrls": ["https://sepolia.arbiscan.io/"],
                            "iconUrls": [],
                            "nativeCurrency": {
                              "symbol": "ETH",
                              "decimals": 18
                            },
                            "rpcUrls": [
                              "https://sepolia-rollup.arbitrum.io/rpc"
                            ],
                            "chainId": "0x66eee",
                            "chainName": "Arbitrum Sepolia"
                          }
                        ]
                      });
                  }


                


            } else {
                console.warn('La billetera no está disponible');
            }
        } catch (error) {
            console.error('Error al conectar la billetera:', error);
            // Manejar el error según sea necesario
        }
        */
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={'Connect Wallet'}>
            <div className="relative p-6 flex-auto">
                <li className="block cursor-pointer rounded-lg bg-white hover:bg-green-200" onClick={connectWallet}>
                    <div className="flex items-center p-4 sm:px-6">
                        <button className="flex min-w-0 flex-1 items-center" disabled={isWeb3EnableLoading}>
                            <div className="mr-3 shrink-0 sm:mr-4">
                                <img src="https://app.bouldertech.fi/icons/metamask.svg" height="33" width="33" />
                            </div>
                            <div className="min-w-0 flex-1 text-left sm:px-4 md:grid md:grid-cols-1 md:gap-4">
                                <div>
                                    <p className="truncate text-base font-medium text-black sm:text-xl">
                                        Metamask
                                    </p>
                                    <p className="hidden items-center text-sm text-gray-600 sm:flex mt-1">
                                        Connect using browser wallet
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
                        </button>
                    </div>
                </li>
                ;
            </div>
        </Modal>
    );
};

export default ConnectWalletModal;
