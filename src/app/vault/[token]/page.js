'use client';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/store';
import MainSection from '../../../components/sections/main-section';

const Vault = ({ params }) => {
    const [isNavbarOpen, setNavbarOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isKYCModalOpen, setIsKYCModalOpen] = useState(false);
    const [hasKYC, setHasKYC] = useState(false);
    const [showKYCForm, setShowKYCForm] = useState(false);
    const [kycData, setKycData] = useState({});

    const { wallet, setWallet } = useGlobalContext();

    useEffect(() => {
        const walletDataString = localStorage.getItem('wallet');

        if (walletDataString) {
            const walletData = JSON.parse(walletDataString);
        }
    }, []);

    const toggleNavbar = () => {
        setNavbarOpen(!isNavbarOpen);
    };

    const BuyToken = () => {
        if (wallet?.address) {
            //consultar al backend si el usuario tiene KYC
            setHasKYC(false);

            setIsKYCModalOpen(true);

            //proceder a KYC si no lo hizo
            //caso contrario dejarle comprar
        } else {
            setIsModalOpen(true);
        }
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

    const { token } = params;

    return (
        <main class="xs:px-6 mx-auto flex w-full grow px-4 pt-4 pb-10 md:px-8 text-black bg-white">
            <nav
                class={`hidden flex-none grow flex-col items-start gap-4 rounded-xl bg-white p-4 transition-all duration-300 ease-in sm:mr-6 sm:flex xl:py-8 sticky top-[72px] border border-gray-400 overflow-y-auto w-[4.5rem] max-w-[4.5rem] ${
                    isNavbarOpen ? 'xl:w-72 xl:max-w-[18rem]' : ''
                }   mt-10`}
            >
                <div class="hidden w-full cursor-pointer items-center justify-between overflow-hidden whitespace-nowrap xl:flex">
                    <p
                        class="pl-2 text-xs font-semibold max-xl:hidden"
                        style={isNavbarOpen ? {} : { display: 'none' }}
                    >
                        Grow your assets
                    </p>
                    <svg
                        onClick={toggleNavbar}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        x
                        lns="http://www.w3.org/2000/svg"
                        class={`cursor-pointer h-4 w-4 min-w-4 ${
                            isNavbarOpen
                                ? 'cursor-pointer h-4 w-4 min-w-4'
                                : 'transform rotate-[-180deg] transition duration-500 opacity-50 mx-auto'
                        }`}
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.5 15C12.2239 15 12 14.7761 12 14.5L12 1.5C12 1.22386 12.2239 1 12.5 1C12.7761 1 13 1.22386 13 1.5V14.5C13 14.7761 12.7761 15 12.5 15Z"
                            fill="currentColor"
                        ></path>
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10 8C10 8.27614 9.77614 8.5 9.5 8.5H3.70711L5.85355 10.6464C6.04882 10.8417 6.04882 11.1583 5.85355 11.3536C5.65829 11.5488 5.34171 11.5488 5.14645 11.3536L2.14645 8.35355C1.95118 8.15829 1.95118 7.84171 2.14645 7.64645L5.14645 4.64645C5.34171 4.45118 5.65829 4.45118 5.85355 4.64645C6.04882 4.84171 6.04882 5.15829 5.85355 5.35355L3.70711 7.5H9.5C9.77614 7.5 10 7.72386 10 8Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </div>
                <a
                    href="/"
                    class="router-link-active router-link-exact-active w-full"
                    aria-current="page"
                >
                    <div
                        class={`flex justify-between w-full cursor-pointer p-2 px-4 sm:px-2 hover:rounded hover:bg-green-600 hover:bg-opacity-10 relative sidebar${
                            isNavbarOpen ? ' xl:px-3' : '-plain'
                        }`}
                    >
                        <div class="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="cursor-pointer min-w-5 w-5 h-5"
                            >
                                <path
                                    d="M1.5 3.75C1.5 2.50736 2.50736 1.5 3.75 1.5H21.75C22.9926 1.5 24 2.50736 24 3.75V21.75C24 22.9926 22.9926 24 21.75 24H3.75C2.50736 24 1.5 22.9926 1.5 21.75V21H0.75C0.335786 21 0 20.6642 0 20.25C0 19.8358 0.335786 19.5 0.75 19.5H1.5V13.5H0.75C0.335786 13.5 0 13.1642 0 12.75C0 12.3358 0.335786 12 0.75 12H1.5V6H0.75C0.335786 6 0 5.66421 0 5.25C0 4.83579 0.335786 4.5 0.75 4.5H1.5V3.75ZM3.75 3C3.33579 3 3 3.33579 3 3.75V21.75C3 22.1642 3.33579 22.5 3.75 22.5H21.75C22.1642 22.5 22.5 22.1642 22.5 21.75V3.75C22.5 3.33579 22.1642 3 21.75 3H3.75Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M7.55317 12L9.84451 12C9.91536 11.7247 10.0243 11.4648 10.1654 11.226L8.54521 9.60588C8.03054 10.2931 7.68039 11.1106 7.55317 12ZM9.60587 8.54521L11.226 10.1654C11.4648 10.0243 11.7247 9.91536 12 9.84451L12 7.55317C11.1106 7.68039 10.2931 8.03055 9.60587 8.54521ZM13.5 7.55317L13.5 9.84451C13.7753 9.91536 14.0352 10.0243 14.274 10.1654L15.8941 8.54521C15.2069 8.03054 14.3894 7.68039 13.5 7.55317ZM16.9548 9.60587L15.3346 11.226C15.4757 11.4648 15.5846 11.7247 15.6555 12L17.9468 12C17.8196 11.1106 17.4695 10.2931 16.9548 9.60587ZM17.9468 13.5L15.6555 13.5C15.5846 13.7753 15.4757 14.0352 15.3346 14.274L16.9548 15.8941C17.4695 15.2069 17.8196 14.3894 17.9468 13.5ZM15.8941 16.9548L14.274 15.3346C14.0352 15.4757 13.7753 15.5846 13.5 15.6555L13.5 17.9468C14.3894 17.8196 15.2069 17.4695 15.8941 16.9548ZM12 17.9468L12 15.6555C11.7247 15.5846 11.4648 15.4757 11.226 15.3346L9.60587 16.9548C10.2931 17.4695 11.1106 17.8196 12 17.9468ZM8.54521 15.8941L10.1654 14.274C10.0243 14.0352 9.91536 13.7753 9.84451 13.5H7.55317C7.68039 14.3894 8.03054 15.2069 8.54521 15.8941ZM6 12.75C6 9.02208 9.02208 6 12.75 6C16.4779 6 19.5 9.02208 19.5 12.75C19.5 16.4779 16.4779 19.5 12.75 19.5C9.02208 19.5 6 16.4779 6 12.75ZM12.75 11.25C11.9216 11.25 11.25 11.9216 11.25 12.75C11.25 13.5784 11.9216 14.25 12.75 14.25C13.5784 14.25 14.25 13.5784 14.25 12.75C14.25 11.9216 13.5784 11.25 12.75 11.25Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <p class="text-base font-semibold">Vaults</p>
                            
                        </div>
                    </div>
                </a>
                <a href="/swap" class="w-full">
                    <div
                        class={`flex justify-between w-full cursor-pointer p-2 px-4 sm:px-2 hover:rounded hover:bg-green-600 hover:bg-opacity-10 relative sidebar${
                            isNavbarOpen ? ' xl:px-3' : '-plain'
                        }`}
                    >
                        <div class="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="cursor-pointer min-w-5 w-5 h-5"
                            >
                                <path
                                    d="M17.3006 10.5H23.1994C23.5173 10.5 23.691 10.8708 23.4874 11.1151L20.5381 14.6543C20.3882 14.8342 20.1118 14.8342 19.9619 14.6543L17.0126 11.1151C16.809 10.8708 16.9827 10.5 17.3006 10.5Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M0.800644 13.5H6.69936C7.0173 13.5 7.19099 13.1292 6.98745 12.8849L4.03809 9.3457C3.88816 9.16579 3.61184 9.16579 3.46192 9.3457L0.51256 12.8849C0.309021 13.1292 0.482705 13.5 0.800644 13.5Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12 4.5C9.67127 4.5 7.59085 5.56045 6.21403 7.22758C5.95027 7.54696 5.47754 7.59205 5.15816 7.32829C4.83879 7.06452 4.7937 6.59179 5.05746 6.27242C6.70702 4.27504 9.20493 3 12 3C16.4126 3 20.082 6.17476 20.8516 10.3645C20.8599 10.4096 20.8678 10.4547 20.8754 10.5H19.3501C18.6556 7.07667 15.6279 4.5 12 4.5ZM4.64988 13.5C5.3444 16.9233 8.37206 19.5 12 19.5C14.3287 19.5 16.4092 18.4396 17.786 16.7724C18.0497 16.453 18.5225 16.408 18.8418 16.6717C19.1612 16.9355 19.2063 17.4082 18.9425 17.7276C17.293 19.725 14.7951 21 12 21C7.58745 21 3.91797 17.8252 3.14838 13.6355C3.1401 13.5904 3.13216 13.5453 3.12456 13.5H4.64988Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <p class="text-base font-semibold">Swap</p>
                        </div>
                    </div>
                </a>
                <a href="/launchpad" class="w-full">
                    <div
                        class={`flex justify-between w-full cursor-pointer p-2 px-4 sm:px-2 hover:rounded hover:bg-green-600 hover:bg-opacity-10 relative sidebar${
                            isNavbarOpen ? ' xl:px-3' : '-plain'
                        }`}
                    >
                        <div class="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="cursor-pointer min-w-5 w-5 h-5"
                            >
                                <path
                                    d="M21.75 4.5C22.1642 4.5 22.5 4.83579 22.5 5.25V18.75C22.5 19.1642 22.1642 19.5 21.75 19.5H2.25C1.83579 19.5 1.5 19.1642 1.5 18.75V5.25C1.5 4.83579 1.83579 4.5 2.25 4.5H21.75ZM2.25 3C1.00736 3 0 4.00736 0 5.25V18.75C0 19.9926 1.00736 21 2.25 21H21.75C22.9926 21 24 19.9926 24 18.75V5.25C24 4.00736 22.9926 3 21.75 3H2.25Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M10.5 8.25C10.5 7.83579 10.8358 7.5 11.25 7.5H18.75C19.1642 7.5 19.5 7.83579 19.5 8.25C19.5 8.66421 19.1642 9 18.75 9H11.25C10.8358 9 10.5 8.66421 10.5 8.25Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M8.25533 6.96967C8.54823 7.26256 8.54823 7.73744 8.25533 8.03033L6.00533 10.2803C5.71244 10.5732 5.23757 10.5732 4.94467 10.2803L4.19467 9.53033C3.90178 9.23744 3.90178 8.76256 4.19467 8.46967C4.48757 8.17678 4.96244 8.17678 5.25533 8.46967L5.475 8.68934L7.19467 6.96967C7.48757 6.67678 7.96244 6.67678 8.25533 6.96967Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M10.5 14.25C10.5 13.8358 10.8358 13.5 11.25 13.5H18.75C19.1642 13.5 19.5 13.8358 19.5 14.25C19.5 14.6642 19.1642 15 18.75 15H11.25C10.8358 15 10.5 14.6642 10.5 14.25Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M8.25533 12.9697C8.54823 13.2626 8.54823 13.7374 8.25533 14.0303L6.00533 16.2803C5.71244 16.5732 5.23757 16.5732 4.94467 16.2803L4.19467 15.5303C3.90178 15.2374 3.90178 14.7626 4.19467 14.4697C4.48757 14.1768 4.96244 14.1768 5.25533 14.4697L5.475 14.6893L7.19467 12.9697C7.48757 12.6768 7.96244 12.6768 8.25533 12.9697Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <p class="text-base font-semibold">Launchpad</p>
                        </div>
                        {isNavbarOpen ? (
                            <div class="flex items-center text-xs font-semibold bg-green-600 py-1 px-2 rounded text-white">
                                <span>New</span>
                            </div>
                        ) : (
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="cursor-pointer h-2 w-2 min-w-2 text-green-600 absolute right-0.5 top-0.5"
                            >
                                <rect
                                    width="32"
                                    height="32"
                                    rx="16"
                                    fill="currentColor"
                                ></rect>
                                <path
                                    d="M17.767 9.86364V21.5H15.6591V11.9148H15.5909L12.8693 13.6534V11.7216L15.7614 9.86364H17.767Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        )}
                    </div>
                </a>
                <a href="/rewards" class="w-full">
                    <div
                        class={`flex justify-between w-full cursor-pointer p-2 px-4 sm:px-2 hover:rounded hover:bg-green-600 hover:bg-opacity-10 relative sidebar${
                            isNavbarOpen ? ' xl:px-3' : '-plain'
                        }`}
                    >
                        <div class="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="cursor-pointer min-w-5 w-5 h-5"
                            >
                                <path
                                    d="M16.8771 0.101709C17.1786 0.277085 17.3194 0.637193 17.2169 0.970588L14.5155 9.75002H19.5C19.7992 9.75002 20.0698 9.92788 20.1885 10.2025C20.3072 10.4772 20.2512 10.7962 20.0462 11.014L8.04617 23.764C7.8071 24.0181 7.42447 24.0737 7.12294 23.8983C6.82141 23.723 6.6806 23.3629 6.78318 23.0295L9.48455 14.25H4.50002C4.2008 14.25 3.93021 14.0722 3.81153 13.7975C3.69286 13.5228 3.74879 13.2039 3.95387 12.986L15.9539 0.236C16.1929 -0.018011 16.5756 -0.073668 16.8771 0.101709ZM6.23584 12.75H10.5C10.738 12.75 10.9619 12.863 11.1033 13.0544C11.2447 13.2459 11.2868 13.4931 11.2169 13.7206L9.16611 20.3855L17.7642 11.25H13.5C13.262 11.25 13.0381 11.1371 12.8967 10.9456C12.7553 10.7541 12.7132 10.5069 12.7832 10.2795L14.8339 3.61456L6.23584 12.75Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <p class="text-base font-semibold">Rewards</p>
                        </div>
                    </div>
                </a>
                <a href="/portfolio" class="w-full">
                    <div
                        class={`flex justify-between w-full cursor-pointer p-2 px-4 sm:px-2 hover:rounded hover:bg-green-600 hover:bg-opacity-10 relative sidebar${
                            isNavbarOpen ? ' xl:px-3' : '-plain'
                        }`}
                    >
                        <div class="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="cursor-pointer min-w-5 w-5 h-5"
                            >
                                <path
                                    d="M18.2043 0.48821C19.6244 0.13319 21 1.20725 21 2.67103V4.49987H21.75C22.9926 4.49987 24 5.50723 24 6.74987V20.2499C24 21.4925 22.9926 22.4999 21.75 22.4999H2.25C1.00736 22.4999 0 21.4925 0 20.2499V6.74987C0 5.54117 0.95308 4.55507 2.14872 4.50211L18.2043 0.48821ZM8.34233 4.49987H19.5V2.67103C19.5 2.1831 19.0415 1.82508 18.5681 1.94342L8.34233 4.49987ZM2.25 5.99987C1.83579 5.99987 1.5 6.33565 1.5 6.74987V20.2499C1.5 20.6641 1.83579 20.9999 2.25 20.9999H21.75C22.1642 20.9999 22.5 20.6641 22.5 20.2499V6.74987C22.5 6.33565 22.1642 5.99987 21.75 5.99987H2.25Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <p class="text-base font-semibold">Portfolio</p>
                        </div>
                    </div>
                </a>
                <a href="/missions" class="w-full">
                    <div
                        class={`flex justify-between w-full cursor-pointer p-2 px-4 sm:px-2 hover:rounded hover:bg-green-600 hover:bg-opacity-10 relative sidebar${
                            isNavbarOpen ? ' xl:px-3' : '-plain'
                        }`}
                    >
                        <div class="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="cursor-pointer min-w-5 w-5 h-5"
                            >
                                <path
                                    d="M10.5 2.12109V5.99977H3C2.17157 5.99977 1.5 6.67135 1.5 7.49977V13.4998C1.5 14.3282 2.17157 14.9998 3 14.9998H10.5V23.9998H13.5V14.9998H18.7974C19.2426 14.9998 19.6648 14.802 19.9498 14.46L22.8499 10.9799C23.0817 10.7018 23.0817 10.2978 22.8499 10.0196L19.9498 6.5395C19.6648 6.19751 19.2426 5.99977 18.7974 5.99977H13.5V2.12109C13.5 1.72327 13.342 1.34174 13.0607 1.06043C12.4749 0.474647 11.5251 0.474647 10.9393 1.06043C10.658 1.34174 10.5 1.72327 10.5 2.12109ZM18.7974 7.49977L21.2974 10.4998L18.7974 13.4998H3L3 7.49977H18.7974Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <p class="text-base font-semibold">Missions</p>
                        </div>
                    </div>
                </a>
            </nav>

            <div class="h-full-flex max-w-full 2xl:mx-auto 2xl:max-w-7xl overflow-hidden">
                <div data-v-69ed45e4="">
                    <a
                        data-v-69ed45e4=""
                        href="/"
                        class="mb-4 flex items-center gap-2"
                    >
                        <svg
                            data-v-69ed45e4=""
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            class="cursor-pointer h-4 w-4 min-w-4 cursor-pointer h-4 w-4 min-w-4"
                        >
                            <path
                                d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <span data-v-69ed45e4="">Back</span>
                    </a>
                    <div data-v-69ed45e4="" class="flex items-center gap-2">
                        <div data-v-69ed45e4="" class="relative max-md:hidden">
                            <img
                                class="rounded-full bg-white w-10 h-10 min-w-10"
                                src="http://clasico.rava.com/contenidos/logoperfil/ARG.png"
                                name="PROJX"
                            />
                            <img
                                class="rounded-full bg-white w-4 h-4 min-w-4 absolute right-0 bottom-0"
                                src="/vendor/@injectivelabs/token-metadata/injective-black-fill.png"
                                name="Injective"
                            />
                        </div>
                        <div data-v-69ed45e4="" class="relative md:hidden">
                            <img
                                class="rounded-full bg-white w-6 h-6 min-w-6"
                                src="/vendor/@injectivelabs/token-metadata/projx.png"
                                name="PROJX"
                            />
                            <img
                                class="rounded-full bg-white w-4 h-4 min-w-4 absolute -right-0.5 -bottom-0.5"
                                src="/vendor/@injectivelabs/token-metadata/injective-black-fill.png"
                                name="Injective"
                            />
                        </div>
                        <h1
                            data-v-69ed45e4=""
                            class="text-2xl md:text-3xl font-bold max-w-sm truncate"
                        >
                            {token}
                        </h1>
                    </div>
                    <section data-v-69ed45e4="" class="h-full-flex">
                        <div
                            data-v-69ed45e4=""
                            class="my-6 flex flex-wrap items-center justify-between gap-2"
                        >
                            <div
                                data-v-69ed45e4=""
                                class="flex items-center flex-wrap xs:gap-4"
                            >
                                <a
                                    data-v-69ed45e4=""
                                    href={`/vault/${token}`}
                                    class="router-link-active p-3 font-semibold hover:text-green-600"
                                >
                                    <span data-v-69ed45e4="" class="capitalize">
                                        Overview
                                    </span>
                                </a>
                                <a
                                    data-v-69ed45e4=""
                                    href={`/vault/${token}/info`}
                                    class="p-3 font-semibold hover:text-green-600"
                                >
                                    <span data-v-69ed45e4="" class="capitalize">
                                        Info
                                    </span>
                                </a>
                                <a
                                    data-v-69ed45e4=""
                                    href={`/vault/${token}/liquidity`}
                                    class="p-3 font-semibold hover:text-green-600"
                                >
                                    <span data-v-69ed45e4="" class="capitalize">
                                        Liquidity
                                    </span>
                                </a>
                                <a
                                    data-v-69ed45e4=""
                                    href={`/vault/${token}/activities`}
                                    class="router-link-active router-link-exact-active p-3 font-semibold hover:text-green-600"
                                    aria-current="page"
                                >
                                    <span data-v-69ed45e4="" class="capitalize">
                                        Activities
                                    </span>
                                </a>
                                <a
                                    data-v-69ed45e4=""
                                    aria-current="page"
                                    href="/vault/inj1xvlnfmq5672rmvn6576rvj389ezu9nxc9dpk8l/activities"
                                    class="router-link-active router-link-exact-active p-3 font-semibold hover:text-green-600"
                                >
                                    <span
                                        data-v-69ed45e4=""
                                        class="capitalize"
                                    ></span>
                                </a>
                            </div>
                            <div
                                data-v-69ed45e4=""
                                class="sm:flex items-center gap-2 hidden"
                            >
                                <button
                                    data-v-69ed45e4=""
                                    type="button"
                                    onClick={() => BuyToken()}
                                    class="flex items-center rounded-lg font-semibold outline-none py-3 px-4 text-base h-10 max-h-10 bg-green-600 hover:bg-green-800 text-white"
                                >
                                    <div
                                        data-v-69ed45e4=""
                                        class="flex items-center gap-2"
                                    >
                                        <span data-v-69ed45e4="">
                                            {wallet?.address ? 'Buy' : '+Add'}
                                        </span>
                                        <svg
                                            data-v-69ed45e4=""
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            class="cursor-pointer h-4 w-4 min-w-4 rotate-180"
                                        >
                                            <path
                                                d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div data-v-69ed45e4="">
                            <div
                                isowner="false"
                                isopensidebar="true"
                                appstatus="idle"
                                class=""
                            >
                                <div class="grid gap-6 xl:grid-cols-4">
                                    <div class="xl:col-span-3 bg-white rounded-lg border border-gray-400 p-4 md:p-6">
                                        <div class="h-full">
                                            <div class="flex flex-wrap items-start justify-end gap-2">
                                                <div class="flex-grow">
                                                    <p class="text-sm text-gray-600 mb-4">
                                                        <span>
                                                            Vault Token ({token}
                                                            ) Share Price{' '}
                                                        </span>
                                                    </p>
                                                    <div class="flex items-center space-x-2 whitespace-nowrap">
                                                        <div class="text-2xl font-semibold">
                                                            41.18 USD{' '}
                                                        </div>
                                                        <div class="font-semibold text-base">
                                                            <span class="text-red-600">
                                                                -1.47%{' '}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex flex-wrap items-center gap-2 rounded-xl bg-gray-100 p-2">
                                                    <div>
                                                        <div class="cursor-pointer">
                                                            <button
                                                                type="button"
                                                                class="flex items-center rounded-lg font-semibold outline-none py-2 px-4 text-sm h-8 max-h-8 bg-white text-black"
                                                            >
                                                                <span>
                                                                    Price
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="cursor-pointer">
                                                            <button
                                                                type="button"
                                                                class="flex items-center rounded-lg font-semibold outline-none py-2 px-4 text-sm h-8 max-h-8 hover:bg-white hover:text-black hover:bg-opacity-80 max-h-[30px] text-gray-600"
                                                            >
                                                                <span>TVL</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="2md:flex hidden flex-wrap items-center gap-2 rounded-xl bg-gray-100 p-2">
                                                    <div>
                                                        <div class="cursor-pointer">
                                                            <button
                                                                type="button"
                                                                class="flex items-center rounded-lg font-semibold outline-none py-2 px-4 text-sm h-8 max-h-8 bg-white text-black"
                                                            >
                                                                <span>1D</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="cursor-pointer">
                                                            <button
                                                                type="button"
                                                                class="flex items-center rounded-lg font-semibold outline-none py-2 px-4 text-sm h-8 max-h-8 hover:bg-white hover:text-black hover:bg-opacity-80 max-h-[30px] text-gray-700"
                                                            >
                                                                <span>7D</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="cursor-pointer">
                                                            <button
                                                                type="button"
                                                                class="flex items-center rounded-lg font-semibold outline-none py-2 px-4 text-sm h-8 max-h-8 hover:bg-white hover:text-black hover:bg-opacity-80 max-h-[30px] text-gray-700"
                                                            >
                                                                <span>1M</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="cursor-pointer">
                                                            <button
                                                                type="button"
                                                                class="flex items-center rounded-lg font-semibold outline-none py-2 px-4 text-sm h-8 max-h-8 hover:bg-white hover:text-black hover:bg-opacity-80 max-h-[30px] text-gray-700"
                                                            >
                                                                <span>3M</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="cursor-pointer">
                                                            <button
                                                                type="button"
                                                                class="flex items-center rounded-lg font-semibold outline-none py-2 px-4 text-sm h-8 max-h-8 hover:bg-white hover:text-black hover:bg-opacity-80 max-h-[30px] text-gray-700"
                                                            >
                                                                <span>6M</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="cursor-pointer">
                                                            <button
                                                                type="button"
                                                                class="flex items-center rounded-lg font-semibold outline-none py-2 px-4 text-sm h-8 max-h-8 hover:bg-white hover:text-black hover:bg-opacity-80 max-h-[30px] text-gray-700"
                                                            >
                                                                <span>1Y</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="cursor-pointer">
                                                            <button
                                                                type="button"
                                                                class="flex items-center rounded-lg font-semibold outline-none py-2 px-4 text-sm h-8 max-h-8 hover:bg-white hover:text-black hover:bg-opacity-80 max-h-[30px] text-gray-700"
                                                            >
                                                                <span>ALL</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="v-popper v-popper--theme-dropdown w-full 2md:hidden cursor-pointer w-full 2md:hidden">
                                                    <div class="flex items-center justify-between px-4 h-10 box-border rounded text-sm gap-2 cursor-pointer border border-gray-750 border-opacity-10 hover:border-gray-600 focus-within:border-gray-600">
                                                        <div>
                                                            <span class="text-sm">
                                                                1D
                                                            </span>
                                                        </div>
                                                        <div class="flex items-center gap-2">
                                                            <svg
                                                                width="8"
                                                                height="6"
                                                                viewBox="0 0 8 6"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="cursor-pointer h-3 w-3 min-w-3 ease-in-out duration-300 text-gray-700"
                                                            >
                                                                <path
                                                                    d="M8 1.55468L7.06 0.666687L4 3.55108L0.94 0.666687L0 1.55468L4 5.33335L8 1.55468Z"
                                                                    fill="currentColor"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                id="chart"
                                                class="relative red"
                                            >
                                                <div
                                                    id="apexchartsf2dxw71gj"
                                                    class="apexcharts-canvas apexchartsf2dxw71gj apexcharts-theme-light"
                                                    style={{
                                                        width: '719px',
                                                        height: '260px',
                                                    }}
                                                >
                                                    chart
                                                    <div class="apexcharts-tooltip apexcharts-theme-light">
                                                        <div
                                                            class="apexcharts-tooltip-title"
                                                            style={{
                                                                fontFamily:
                                                                    'Urbanist',
                                                                fontSize:
                                                                    '12px',
                                                            }}
                                                        ></div>
                                                        <div
                                                            class="apexcharts-tooltip-series-group"
                                                            style={{ order: 1 }}
                                                        >
                                                            <span
                                                                class="apexcharts-tooltip-marker"
                                                                style={{
                                                                    backgroundColor:
                                                                        'rgb(255, 102, 102)',
                                                                }}
                                                            ></span>
                                                            <div
                                                                class="apexcharts-tooltip-text"
                                                                style={{
                                                                    fontFamily:
                                                                        'Urbanist',
                                                                    fontSize:
                                                                        '12px',
                                                                }}
                                                            >
                                                                <div class="apexcharts-tooltip-y-group">
                                                                    <span class="apexcharts-tooltip-text-y-label"></span>
                                                                    <span class="apexcharts-tooltip-text-y-value"></span>
                                                                </div>
                                                                <div class="apexcharts-tooltip-goals-group">
                                                                    <span class="apexcharts-tooltip-text-goals-label"></span>
                                                                    <span class="apexcharts-tooltip-text-goals-value"></span>
                                                                </div>
                                                                <div class="apexcharts-tooltip-z-group">
                                                                    <span class="apexcharts-tooltip-text-z-label"></span>
                                                                    <span class="apexcharts-tooltip-text-z-value"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                                                        <div class="apexcharts-yaxistooltip-text"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hide-scrollbar flex flex-col gap-4 overflow-x-auto md:flex-row xl:flex-col xl:gap-6">
                                        <div class="flex-none md:w-56 xl:w-full snap-start bg-white rounded-lg border border-gray-400 p-4 md:p-6">
                                            <h3 class="mb-3 text-xs xl:text-sm">
                                                Total Value Locked (TVL)
                                            </h3>
                                            <p class="text-xl font-semibold xl:text-2xl">
                                                32,486,473.46 USD{' '}
                                            </p>
                                        </div>
                                        <div class="flex-none md:w-56 xl:w-full snap-center bg-white rounded-lg border border-gray-400 p-4 md:p-6">
                                            <h3 class="mb-3 text-xs xl:text-sm">
                                                Spot Assets
                                            </h3>
                                            <div class="space-y-1.5">
                                                <div>
                                                    <div class="flex w-full items-center justify-between gap-2">
                                                        <div class="flex items-center gap-1">
                                                            <img
                                                                class="rounded-full bg-white w-6 h-6 min-w-6 z-10"
                                                                src="/vendor/@injectivelabs/token-metadata/projx.png"
                                                                name="PROJX"
                                                            />
                                                            <span class="font-semibold uppercase text-lg xl:text-xl">
                                                                {token}
                                                            </span>
                                                        </div>
                                                        <span class="text-base">
                                                            <div class="flex">
                                                                <div class="v-popper v-popper--theme-tooltip">
                                                                    <div>
                                                                        <p class="border-dashed border-b border-black cursor-pointer">
                                                                            <p class="space-x-1">
                                                                                <span>
                                                                                    2,774,254.0958
                                                                                </span>
                                                                            </p>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex-none md:w-56 xl:w-full snap-end bg-white rounded-lg border border-gray-400 p-4 md:p-6">
                                            <div class="v-popper v-popper--theme-tooltip inline-block">
                                                <div>
                                                    <div class="flex items-center gap-1 cursor-pointer mb-2">
                                                        <span class="inline-block text-xs xl:text-sm">
                                                            APY
                                                        </span>
                                                        <svg
                                                            width="12"
                                                            height="13"
                                                            viewBox="0 0 12 13"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="cursor-pointer h-4 w-4 min-w-4 cursor-pointer h-4 w-4 min-w-4"
                                                        >
                                                            <path
                                                                d="M6 11.75C3.10051 11.75 0.75 9.3995 0.75 6.5C0.75 3.60051 3.10051 1.25 6 1.25C8.8995 1.25 11.25 3.60051 11.25 6.5C11.25 9.3995 8.8995 11.75 6 11.75ZM6 12.5C9.31371 12.5 12 9.81371 12 6.5C12 3.18629 9.31371 0.5 6 0.5C2.68629 0.5 0 3.18629 0 6.5C0 9.81371 2.68629 12.5 6 12.5Z"
                                                                fill="currentColor"
                                                            ></path>
                                                            <path
                                                                d="M6.69803 5.44092L4.97977 5.65625L4.91824 5.94189L5.25662 6.00342C5.47635 6.05615 5.52029 6.13525 5.47195 6.35498L4.91824 8.95654C4.77322 9.62891 4.99734 9.94531 5.52469 9.94531C5.93338 9.94531 6.40799 9.75635 6.62332 9.49707L6.68924 9.18506C6.53982 9.31689 6.3201 9.36963 6.17508 9.36963C5.96854 9.36963 5.89383 9.22461 5.94656 8.96973L6.69803 5.44092Z"
                                                                fill="currentColor"
                                                            ></path>
                                                            <path
                                                                d="M6.75 3.875C6.75 4.28921 6.41421 4.625 6 4.625C5.58579 4.625 5.25 4.28921 5.25 3.875C5.25 3.46079 5.58579 3.125 6 3.125C6.41421 3.125 6.75 3.46079 6.75 3.875Z"
                                                                fill="currentColor"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex items-center gap-1.5 text-yellow-500">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="cursor-pointer h-6 w-6 min-w-6 cursor-pointer h-6 w-6 min-w-6"
                                                >
                                                    <path
                                                        d="M11.2514 0.0678058C11.4524 0.184724 11.5463 0.424795 11.4779 0.647058L9.67699 6.50002H13C13.1995 6.50002 13.3799 6.61858 13.459 6.8017C13.5381 6.98482 13.5008 7.19744 13.3641 7.3427L5.36411 15.8427C5.20473 16.012 4.94964 16.0491 4.74863 15.9322C4.54761 15.8153 4.45373 15.5752 4.52212 15.353L6.32303 9.50002H3.00001C2.80053 9.50002 2.62014 9.38145 2.54102 9.19833C2.4619 9.01522 2.4992 8.80259 2.63591 8.65733L10.6359 0.157333C10.7953 -0.0120074 11.0504 -0.049112 11.2514 0.0678058Z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                                <p class="text-lg font-semibold">
                                                    4,055,620,596.12%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-wrapper bg-white my-6 border border-gray-400">
                                    <table class="table table-auto max-md:hidden">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Last 24 hrs</th>
                                                <th>1 Week</th>
                                                <th>1 Month</th>
                                                <th>3 Months</th>
                                                <th>6 Months</th>
                                                <th>1 Year</th>
                                                <th>3 Years</th>
                                                <th>All-time</th>
                                            </tr>
                                        </thead>
                                        <tbody class="">
                                            <tr>
                                                <td class="font-semibold">
                                                    Total return as of 22 Dec,
                                                    2023
                                                </td>
                                                <td>
                                                    <div>
                                                        <span class="text-red-600">
                                                            -89.47%{' '}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <span class="text-red-600">
                                                            -99.88%{' '}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <span class="text-green-500">
                                                            + 311.40%{' '}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <span>—</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <span>—</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <span>—</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <span>—</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <span class="text-green-500">
                                                            + 311.40%{' '}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="md:hidden p-4 md:p-6">
                                        <p class="text-sm font-semibold">
                                            Total return as of 22 Dec, 2023
                                        </p>
                                        <div class="border-b border-gray-750 border-opacity-10 -mx-4 pt-4 mb-4"></div>
                                        <div class="space-y-4">
                                            <div class="flex justify-between items-center">
                                                <span class="uppercase text-xs font-semibold tracking-wider text-gray-600">
                                                    Last 24 hrs
                                                </span>
                                                <span class="text-sm">
                                                    <div>
                                                        <span class="text-red-600">
                                                            -89.47%{' '}
                                                        </span>
                                                    </div>
                                                </span>
                                            </div>
                                            <div class="flex justify-between items-center">
                                                <span class="uppercase text-xs font-semibold tracking-wider text-gray-600">
                                                    1 Week
                                                </span>
                                                <span class="text-sm">
                                                    <div>
                                                        <span class="text-red-600">
                                                            -99.88%{' '}
                                                        </span>
                                                    </div>
                                                </span>
                                            </div>
                                            <div class="flex justify-between items-center">
                                                <span class="uppercase text-xs font-semibold tracking-wider text-gray-600">
                                                    1 Month
                                                </span>
                                                <span class="text-sm">
                                                    <div>
                                                        <span class="text-green-500">
                                                            + 311.40%{' '}
                                                        </span>
                                                    </div>
                                                </span>
                                            </div>
                                            <div class="flex justify-between items-center">
                                                <span class="uppercase text-xs font-semibold tracking-wider text-gray-600">
                                                    3 Months
                                                </span>
                                                <span class="text-sm">
                                                    <div>
                                                        <span>—</span>
                                                    </div>
                                                </span>
                                            </div>
                                            <div class="flex justify-between items-center">
                                                <span class="uppercase text-xs font-semibold tracking-wider text-gray-600">
                                                    6 Months
                                                </span>
                                                <span class="text-sm">
                                                    <div>
                                                        <span>—</span>
                                                    </div>
                                                </span>
                                            </div>
                                            <div class="flex justify-between items-center">
                                                <span class="uppercase text-xs font-semibold tracking-wider text-gray-600">
                                                    1 Year
                                                </span>
                                                <span class="text-sm">
                                                    <div>
                                                        <span>—</span>
                                                    </div>
                                                </span>
                                            </div>
                                            <div class="flex justify-between items-center">
                                                <span class="uppercase text-xs font-semibold tracking-wider text-gray-600">
                                                    3 Years
                                                </span>
                                                <span class="text-sm">
                                                    <div>
                                                        <span>—</span>
                                                    </div>
                                                </span>
                                            </div>
                                            <div class="flex justify-between items-center">
                                                <span class="uppercase text-xs font-semibold tracking-wider text-gray-600">
                                                    All-time
                                                </span>
                                                <span class="text-sm">
                                                    <div>
                                                        <span class="text-green-500">
                                                            + 311.40%{' '}
                                                        </span>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="table-wrapper bg-white rounded-lg border border-gray-400">
                                        <div class="px-4 py-4 md:px-6 md:pt-6 text-xl md:text-2xl whitespace-break-spaces">
                                            <h3 class="font-semibold">
                                                My Holdings
                                            </h3>
                                        </div>
                                        <div class="h-full-flex md:mt-6">
                                            <div class="">
                                                <div class="border-t">
                                                    <div class="p-6 max-xs:max-w-xs whitespace-break-spaces sm:flex flex-col items-center justify-center">
                                                        <span class="text-gray-600">
                                                            You have no holdings
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
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
                                                onClick={() =>
                                                    setIsModalOpen(false)
                                                }
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
                                                onClick={() =>
                                                    setIsModalOpen(false)
                                                }
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
                                                                onClick={
                                                                    connectWallet
                                                                }
                                                            >
                                                                <p className="truncate text-base font-medium text-black sm:text-xl">
                                                                    Metamask
                                                                </p>
                                                                <p className="hidden items-center text-sm text-gray-600 sm:flex mt-1">
                                                                    Connect
                                                                    using
                                                                    browser
                                                                    wallet
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

                    {isKYCModalOpen ? (
                        <div>
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
                                                onClick={() =>
                                                    setIsKYCModalOpen(false)
                                                }
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
                                                {showKYCForm
                                                    ? 'KYC'
                                                    : 'Disclaimer'}
                                            </p>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() =>
                                                    setIsModalOpen(false)
                                                }
                                            >
                                                <span className="text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                            {showKYCForm ? (
                                                <div className="">
                                                    <form>
                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="firstName"
                                                                className="block text-sm font-medium text-gray-600"
                                                            >
                                                                First Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="firstName"
                                                                name="firstName"
                                                                value={
                                                                    kycData.firstName
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    setKycData(
                                                                        (
                                                                            prevData
                                                                        ) => ({
                                                                            ...prevData,
                                                                            firstName:
                                                                                event
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    );
                                                                }}
                                                                className="mt-1 p-2 border rounded-md w-full bg-white"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="lastName"
                                                                className="block text-sm font-medium text-gray-600"
                                                            >
                                                                Last Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="lastName"
                                                                name="lastName"
                                                                value={
                                                                    kycData.lastName
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    setKycData(
                                                                        (
                                                                            prevData
                                                                        ) => ({
                                                                            ...prevData,
                                                                            lastName:
                                                                                event
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    );
                                                                }}
                                                                className="mt-1 p-2 border rounded-md w-full bg-white"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="email"
                                                                className="block text-sm font-medium text-gray-600"
                                                            >
                                                                Email
                                                            </label>
                                                            <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                value={
                                                                    kycData.email
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    setKycData(
                                                                        (
                                                                            prevData
                                                                        ) => ({
                                                                            ...prevData,
                                                                            email: event
                                                                                .target
                                                                                .value,
                                                                        })
                                                                    );
                                                                }}
                                                                className="mt-1 p-2 border rounded-md w-full bg-white"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="postalAddress"
                                                                className="block text-sm font-medium text-gray-600"
                                                            >
                                                                Postal Address
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="postalAddress"
                                                                name="postalAddress"
                                                                value={
                                                                    kycData.postalAddress
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    setKycData(
                                                                        (
                                                                            prevData
                                                                        ) => ({
                                                                            ...prevData,
                                                                            postalAddress:
                                                                                event
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    );
                                                                }}
                                                                className="mt-1 p-2 border rounded-md w-full bg-white"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="passport"
                                                                className="block text-sm font-medium text-gray-600"
                                                            >
                                                                Passport
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="passport"
                                                                name="passport"
                                                                value={
                                                                    kycData.passport
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    setKycData(
                                                                        (
                                                                            prevData
                                                                        ) => ({
                                                                            ...prevData,
                                                                            passport:
                                                                                event
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    );
                                                                }}
                                                                className="mt-1 p-2 border rounded-md w-full bg-white"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="walletAddress"
                                                                className="block text-sm font-medium text-gray-600"
                                                            >
                                                                Wallet Address
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="walletAddress"
                                                                name="walletAddress"
                                                                value={
                                                                    wallet.address
                                                                }
                                                                className="mt-1 p-2 border rounded-md w-full bg-white"
                                                                required
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="amountToInvest"
                                                                className="block text-sm font-medium text-gray-600"
                                                            >
                                                                Amount intended
                                                                to invest
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="amountToInvest"
                                                                name="amountToInvest"
                                                                value={
                                                                    kycData.amountToInvest
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    setKycData(
                                                                        (
                                                                            prevData
                                                                        ) => ({
                                                                            ...prevData,
                                                                            amountToInvest:
                                                                                event
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    );
                                                                }}
                                                                className="mt-1 p-2 border rounded-md w-full bg-white"
                                                                required
                                                            />
                                                        </div>

                                                        {/* Otros campos del formulario (lastName, email, dateOfBirth, address, identificationType, identificationNumber) */}

                                                        <div className="mt-4">
                                                            <button
                                                                type="submit"
                                                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                                                                onClick={() =>
                                                                    setIsKYCModalOpen(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            ) : (
                                                <>
                                                    {' '}
                                                    <p>
                                                        Lorem ipsum dolor sit
                                                        amet, consectetur
                                                        adipiscing elit. Sed do
                                                        eiusmod tempor
                                                        incididunt ut labore et
                                                        dolore magna aliqua. Ut
                                                        enim ad minim veniam,
                                                        quis nostrud
                                                        exercitation ullamco
                                                        laboris nisi ut aliquip
                                                        ex ea commodo consequat.
                                                        Duis aute irure dolor in
                                                        reprehenderit in
                                                        voluptate velit esse
                                                        cillum dolore eu fugiat
                                                        nulla pariatur.
                                                        Excepteur sint occaecat
                                                        cupidatat non proident,
                                                        sunt in culpa qui
                                                        officia deserunt mollit
                                                        anim id est laborum.
                                                    </p>
                                                    <button
                                                        data-v-69ed45e4=""
                                                        type="button"
                                                        onClick={() =>
                                                            setShowKYCForm(true)
                                                        }
                                                        class="flex items-center rounded-lg font-semibold outline-none py-3 px-4 text-base h-10 max-h-10 bg-green-600 hover:bg-green-800 text-white"
                                                    >
                                                        <div
                                                            data-v-69ed45e4=""
                                                            class="flex items-center gap-2"
                                                        >
                                                            <span data-v-69ed45e4="">
                                                                Next
                                                            </span>
                                                            <svg
                                                                data-v-69ed45e4=""
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                class="cursor-pointer h-4 w-4 min-w-4 rotate-180"
                                                            >
                                                                <path
                                                                    d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"
                                                                    fill="currentColor"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </div>
                    ) : null}
                </div>
            </div>
        </main>
    );
};

export default Vault;
