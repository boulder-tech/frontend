import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../../components/Modal';
import { useGlobalContext } from '../../app/context/store';

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

const ConnectWalletModal = ({ isOpen, onClose, closeModal }) => {
    const { wallet, setWallet } = useGlobalContext();

    const connectWallet = async ({ isOpen, onClose }) => {
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

                console.log('backendUrl', backendUrl);

                // Obtener la dirección pública de la primera cuenta
                const public_address = accounts[0];

                const response = await axios.post(
                    `${backendUrl}/api/client/connect-wallet`,
                    {
                        public_address,
                    }
                );

                console.log(response);

                closeModal();

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

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={'Connect Wallet'}>
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
                                <div onClick={connectWallet}>
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
                        </div>
                    </div>
                </li>
                ;
            </div>
        </Modal>
    );
};

export default ConnectWalletModal;
