'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useGlobalContext } from '../../app/context/store';
import Link from 'next/link';
import Imagotype from './imagotype';
import AddressButton from '../buttons/address-button';
import GhostButton from '../buttons/ghost-button';
import Web3 from 'web3';
import clsx from 'clsx';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
//import { useAuth } from '../../context/AuthContext';

//import './Header.css';

const Header = () => {
    //const { user, logout } = useAuth();

    const [showUserMenu, setShowUserMenu] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [showUserSettings, setShowUserSettings] = useState(false);

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
                const publicAddress = accounts[0];

                setIsWalletConnected(true);
                setIsModalOpen(false);

                // Crear el objeto que quieres almacenar en localStorage
                const walletObject = {
                    wallet: walletName,
                    address: publicAddress,
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
            <header className="w-full items-center justify-between py-3 px-4 sm:px-6 md:px-8 sticky top-0 z-50 bg-black">
                <div className="flex items-center justify-between 2xl:px-[300px] lg:px-[150px] md:px-[75px] px-[20px]">
                    <div className="flex gap-4 items-center justify-center divide-border-grey-200 divide-x-[1px]">
                        <Link href={'/'}>
                            <Imagotype />
                        </Link>
                    </div>
                    {wallet?.address ? (
                        <Link href={'/#connect'} className="hidden sm:block">
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
                                data-v-0c9b32dc=""
                                class="fixed inset-0 z-50 h-full w-full duration-300 ease-in text-black"
                                style={
                                    showUserSettings ? {} : { display: 'none' }
                                }
                            >
                                <div
                                    data-v-0c9b32dc=""
                                    class="flex justify-end sm:m-2 h-full overflow-x-hidden"
                                >
                                    <section data-v-0c9b32dc="">
                                        <div
                                            data-v-0c9b32dc=""
                                            class="sm:w-96 p-2 bg-white h-full rounded-lg slideOut-container overflow-x-auto scrollbar-gutter-stable"
                                        >
                                            <div
                                                data-v-0c9b32dc=""
                                                class="w-6 h-6 bg-gray-300 flex items-center justify-center rounded-lg cursor-pointer"
                                                onClick={() =>
                                                    setShowUserSettings(false)
                                                }
                                            >
                                                <svg
                                                    data-v-0c9b32dc=""
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="cursor-pointer h-3 w-3 min-w-3 -rotate-90"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M1.64645 4.64645C1.84171 4.45118 2.15829 4.45118 2.35355 4.64645L8 10.2929L13.6464 4.64645C13.8417 4.45118 14.1583 4.45118 14.3536 4.64645C14.5488 4.84171 14.5488 5.15829 14.3536 5.35355L8.35355 11.3536C8.15829 11.5488 7.84171 11.5488 7.64645 11.3536L1.64645 5.35355C1.45118 5.15829 1.45118 4.84171 1.64645 4.64645Z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <div
                                                data-v-0c9b32dc=""
                                                class="px-4 pt-2"
                                            >
                                                <div
                                                    data-v-0c9b32dc=""
                                                    class="flex items-center justify-between"
                                                >
                                                    <div
                                                        data-v-0c9b32dc=""
                                                        class="flex items-center gap-2"
                                                    >
                                                        <svg
                                                            baseProfile="basic"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 33.9 31.3"
                                                            class="cursor-pointer h-6 w-6 min-w-6 cursor-pointer h-6 w-6 min-w-6"
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
                                                        <span class="text-base tracking-wider">
                                                            inj1cs...kxcjha
                                                        </span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            class="cursor-pointer h-4 w-4 min-w-4 text-gray-600 hover:text-green-600"
                                                        >
                                                            <path d="M20,2H10C8.896,2,8,2.896,8,4v2h1h7c1.104,0,2,0.896,2,2v7v1h2c1.104,0,2-0.896,2-2V4C22,2.896,21.104,2,20,2z"></path>
                                                            <path d="M4,22h10c1.103,0,2-0.897,2-2V10c0-1.103-0.897-2-2-2H4c-1.103,0-2,0.897-2,2v10C2,21.103,2.897,22,4,22z M6,12h6v2H6V12z M6,16h6v2H6V16z"></path>
                                                        </svg>
                                                    </div>
                                                    <span
                                                        data-v-0c9b32dc=""
                                                        class="cursor-pointer text-green-600 hover:text-opacity-80 text-sm font-semibold"
                                                        onClick={
                                                            disconnectWallet
                                                        }
                                                    >
                                                        Disconnect
                                                    </span>
                                                </div>
                                                <div
                                                    data-v-0c9b32dc=""
                                                    class="mt-6"
                                                >
                                                    <p>Total Value</p>
                                                    <h2 class="text-3xl mt-1 mb-4">
                                                        0.00 USD
                                                    </h2>
                                                    <div class="my-6">
                                                        <a
                                                            href="https://testnet.hub.injective.network"
                                                            rel="noopener noreferrer"
                                                            target="_blank"
                                                        >
                                                            <button
                                                                type="button"
                                                                class="flex items-center rounded-lg font-semibold outline-none py-3 px-4 text-base h-10 max-h-10 w-full border border-green-600 text-green-600 hover:text-white hover:bg-green-600"
                                                            >
                                                                <div class="flex items-center gap-2 justify-center w-full">
                                                                    <span class="text-base">
                                                                        View
                                                                        balances
                                                                        on Hub
                                                                    </span>
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill="currentColor"
                                                                        class="cursor-pointer h-4 w-4 min-w-4 cursor-pointer h-4 w-4 min-w-4"
                                                                    >
                                                                        <path d="M13 3L16.293 6.293 9.293 13.293 10.707 14.707 17.707 7.707 21 11 21 3z"></path>
                                                                        <path d="M19,19H5V5h7l-2-2H5C3.897,3,3,3.897,3,5v14c0,1.103,0.897,2,2,2h14c1.103,0,2-0.897,2-2v-5l-2-2V19z"></path>
                                                                    </svg>
                                                                </div>
                                                            </button>
                                                        </a>
                                                    </div>
                                                    <div class="flex items-center text-sm gap-4">
                                                        <div>
                                                            <div class="cursor-pointer">
                                                                <span class="text-green-600">
                                                                    Assets
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div class="cursor-pointer">
                                                                <span class="">
                                                                    Vault Tokens
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="space-y-5 mt-5">
                                                        <button
                                                            type="button"
                                                            class="flex items-center rounded-lg font-semibold outline-none py-3 px-4 text-base h-10 max-h-10 w-full bg-green-600 hover:bg-green-800 text-white"
                                                        >
                                                            <div class="flex items-center gap-2 justify-center w-full">
                                                                <span class="text-base">
                                                                    Get Testnet
                                                                    INJ!
                                                                </span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div
                                                        class="space-y-5 mt-5"
                                                        style={{
                                                            display: 'none',
                                                        }}
                                                    >
                                                        <div class="w-full flex items-center justify-center grow mt-10">
                                                            <p class="text-gray-700 font-semibold text-sm">
                                                                No Vault token
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <Link href={'/#connect'} className="hidden sm:block">
                            <GhostButton onClick={openModal}>
                                Connect
                            </GhostButton>
                        </Link>
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
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    );
};

export default Header;
