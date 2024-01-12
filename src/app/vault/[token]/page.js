'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { useGlobalContext } from '../../context/store';
import MainSection from '../../../components/sections/main-section';
import AlertPanel from '../../../components/AlertPanel';
import TransactionPanel from '../../../components/TransactionPanel';
import OverviewPanel from '../../../components/OverviewPanel';
import PortfolioPanel from '../../../components/PortfolioPanel';
import Modal from '../../../components/Modal';

import './styles.css';

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

Number.prototype.round = function (decimals) {
    if (isNaN(this)) return NaN;
    const factor = Math.pow(10, decimals);
    return Math.round(this * factor) / factor;
};

const Vault = ({ params }) => {
    const [isNavbarOpen, setNavbarOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isKYCModalOpen, setIsKYCModalOpen] = useState(false);
    const [hasKYC, setHasKYC] = useState(false);
    const [showKYCForm, setShowKYCForm] = useState(false);
    const [kycData, setKycData] = useState({});
    const [showPendingReviewModal, setShowPendingReviewModal] = useState(false);
    const [showKYCRejectedModal, setShowKYCRejectedModal] = useState(false);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showIncorrectNetworkModal, setShowIncorrectNetworkModal] =
        useState(false);
    const [showAssets, setShowAssets] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const [cost, setCost] = useState(0.04118);
    const [quantity, setQuantity] = useState(1);

    const { wallet, setWallet } = useGlobalContext();
    const [price, setPrice] = useState(0);

    //For transactions
    const [error, setError] = useState();
    const [txs, setTxs] = useState([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', async () => {
                if (window.ethereum.isMetaMask) {
                    const chainId = await window.ethereum.request({
                        method: 'eth_chainId',
                    });

                    window.location.reload();

                    console.log('chainId', chainId);

                    if (chainId === '0xaa36a7') {
                        setShowIncorrectNetworkModal(false);
                    }
                }
            });
        }

        checkIfWalletConnected();
        checkIfCorrectNetwork();

        const walletDataString = localStorage.getItem('wallet');

        if (walletDataString) {
            const walletData = JSON.parse(walletDataString);
        }

        fetchTokenPrice('GD30D');
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const name = 'GD30D';
                const {
                    data: { price, price_24h, last_24h },
                } = await axios.get(`${backendUrl}/api/asset/name/${name}`);

                const newPrice = price.round(2);

                if (newPrice < price) {
                    animatePriceDecrease(newPrice);
                } else if (newPrice > price) {
                    animatePriceIncrease(newPrice);
                }

                setPrice(newPrice);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Llama a fetchData inmediatamente para obtener el precio inicial
        //fetchData();

        // Establece un intervalo solo si no hay uno ya en marcha
        if (!intervalRef.current) {
            console.log('interval created');
            intervalRef.current = setInterval(fetchData, 3000);
        } else {
            console.log('no interval');
        }

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalRef.current);
    }, [price]);

    const animatePriceIncrease = (newPrice) => {
        const duration = 500; // Duración de la animación en milisegundos
        const steps = 50; // Número de pasos para la animación
        const stepValue = 0.01;

        let currentPrice = price;

        const animateStep = () => {
            currentPrice += stepValue;
            setPrice(currentPrice);

            if (currentPrice < newPrice) {
                setTimeout(animateStep, duration / steps);
            }
        };

        animateStep();
    };

    const animatePriceDecrease = (newPrice) => {
        const duration = 500; // Duración de la animación en milisegundos
        const steps = 50; // Número de pasos para la animación
        const stepValue = 0.01;

        let currentPrice = price;

        const animateStep = () => {
            currentPrice -= stepValue;
            setPrice(currentPrice);

            if (currentPrice > newPrice) {
                setTimeout(animateStep, duration / steps);
            }
        };

        animateStep();
    };

    const checkIfWalletConnected = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            await signer.getAddress();
        } catch (e) {
            setWallet({});
            localStorage.removeItem('wallet');
        }
    };

    const checkIfCorrectNetwork = async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            const chainId = await window.ethereum.request({
                method: 'eth_chainId',
            });

            if (chainId !== '0xaa36a7') {
                setShowIncorrectNetworkModal(true);
            }
        }
    };

    const switchToEthereumNetwork = async () => {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }],
        });

        const chainId = await window.ethereum.request({
            method: 'eth_chainId',
        });

        if (chainId === '0xaa36a7') {
            setShowIncorrectNetworkModal(true);
        }
    };

    const fetchTokenPrice = async (name) => {
        const {
            data: { price, price_24h, last_24h },
        } = await axios.get(`${backendUrl}/api/asset/name/${name}`);

        setPrice(price.round(2));
    };

    const toggleNavbar = () => {
        setNavbarOpen(!isNavbarOpen);
    };

    const BuyToken = async () => {
        if (wallet?.address) {
            const { data } = await axios.get(
                `${backendUrl}/api/client/public-address/${wallet.address}`
            );

            const { client } = data;

            if (client) {
                setHasKYC(true);
                console.log(client.status);
                if (client.status === 'pending_review') {
                    setShowPendingReviewModal(true);
                } else if (client.status === 'rejected') {
                    setShowKYCRejectedModal(true);
                } else if (client.status === 'approved') {
                    setShowBuyModal(true);
                } else {
                    setIsKYCModalOpen(true);
                }
            } else {
                setHasKYC(false);
                setIsKYCModalOpen(true);
            }

            //consultar al backend si el usuario tiene KYC

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

    const startPaymentOriginal = async ({ setError, setTxs, ether, addr }) => {
        try {
            if (!window.ethereum)
                throw new Error('No crypto wallet found. Please install it.');

            await window.ethereum.send('eth_requestAccounts');
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            ethers.utils.getAddress(addr);
            const tx = await signer.sendTransaction({
                to: addr,
                value: ethers.utils.parseEther(ether),
            });

            console.log({ ether, addr });
            console.log('tx', tx);

            // Realiza una solicitud POST al backend con la información de la transacción usando Axios
            const response = await axios.post(`${backendUrl}/api/transaction`, {
                data: {
                    amount: quantity,
                    asset: 'GD30D',
                    address: wallet.address,
                    hash: tx.hash,
                    status: 'pending',
                },
            });

            console.log(response);

            setTxs([tx]);

            setShowBuyModal(false);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const usdcAddress = '0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f';

    const usdcAbi = [
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function decimals() view returns (uint8)',
        'function balanceOf(address) view returns (uint)',
        'function totalSupply() view returns (uint256)',
        'function transfer(address to, uint amount)',
    ];

    async function sendUsdcToAccount({ addr }) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        console.log('Account address s:', await signer.getAddress());

        const balance = await signer.getBalance();
        const convertToEth = 1e18;
        console.log(
            "account's balance in ether:",
            balance.toString() / convertToEth
        );

        const usdcContract = new ethers.Contract(
            usdcAddress,
            usdcAbi,
            provider
        );

        const name = await usdcContract.name();
        const symbol = await usdcContract.symbol();
        const decimals = await usdcContract.decimals();
        const totalSupply = await usdcContract.totalSupply();
        const myBalance = await usdcContract.balanceOf(signer.getAddress());

        console.log(`name = ${name}`);
        console.log(`symbol = ${symbol}`);
        console.log(`decimals = ${decimals}`);
        console.log(`totalSupply = ${totalSupply / 1e6}`);
        console.log(`myBalance = ${myBalance / 1e6}`);

        /*
        let gasPrice = await provider.getGasPrice();
        gasPrice = Math.round(gasPrice / 300);
        console.log('gasPrice: ' + gasPrice);
        const gasLimit = Math.round(gasPrice / 10); // Задайте бажаний ліміт газу
        */

        // Виконуємо передачу з встановленням параметрів газу
        await usdcContract.connect(signer).transfer(addr, 50 * 1000000, {
            //gasPrice,
            //gasLimit,
        });
    }

    const startPayment = async ({ setError, setTxs, ether, addr }) => {
        try {
            if (!window.ethereum)
                throw new Error('No crypto wallet found. Please install it.');

            /*
            await window.ethereum.send('eth_requestAccounts');
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            ethers.utils.getAddress(addr);
            const tx = await signer.sendTransaction({
                to: addr,
                value: ethers.utils.parseEther(ether),
            });

            console.log({ ether, addr });
            console.log('tx', tx);

            // Realiza una solicitud POST al backend con la información de la transacción usando Axios
            const response = await axios.post(`${backendUrl}/api/transaction`, {
                data: {
                    amount: quantity,
                    asset: 'GD30D',
                    address: wallet.address,
                    hash: tx.hash,
                    status: 'pending',
                },
            });

            console.log(response);

            setTxs([tx]);

            setShowBuyModal(false);
            */
            await sendUsdcToAccount({ addr });
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        alert('But token');
        e.preventDefault();
        //const data = new FormData(e.target);
        setError();
        await startPayment({
            setError,
            setTxs,
            ether: cost.toString(),
            addr: '0x6aD7faC9D241A535532B46fA313Eb80f561a3027', //data.get('addr'),
        });
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
                        Diversify your portfolio
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
            </nav>

            <div
                style={{
                    fontFamily: 'Barlow, sans-serif',
                    opacity: 1,
                    transform: 'none',
                }}
                class="w-full items-center justify-center relative px-8 bg-white"
            >
                <div
                    class="z-0 w-full pt-[40px] pb-6 md:pb-8 border-t border-[#CFD9E2]"
                    id="vault-dashboard"
                    style={{ display: 'block' }}
                >
                    <div class="overflow-hidden pt-0 pb-8">
                        <div class="mx-auto max-w-[1200px] px-4 xl:px-0">
                            <div class="flex flex-row items-center space-x-3">
                                <div class="h-[54px] w-[54px] rounded-lg border-2 border-black p-[10px]">
                                    <img src="/logos/ARG.png" />
                                </div>
                                <div class="flex flex-col justify-center">
                                    <div class="text-2xl font-semibold mobile:text-2xl">
                                        GD30D VAULT
                                    </div>
                                    <div class="text-[14px] text-[#626262 font-normal]">
                                        {' '}
                                        Last updated: less than a minute ago{' '}
                                    </div>
                                </div>
                            </div>
                            <AlertPanel>
                                <p class="text-sm leading-[160%]">
                                    🚀 Exciting News: A new token launch is
                                    imminent! Stay tuned as GD30D prepares to
                                    unveil its latest token. Get ready for the
                                    launch by checking the details at the
                                    <a
                                        class="font-semibold underline ml-1"
                                        href="https://bouldertech.fi"
                                        target="_blank"
                                    >
                                        launch page
                                    </a>
                                    .
                                </p>
                            </AlertPanel>
                            <div>
                                <div class="mt-[40px] hidden w-full gap-x-[23px] gap-y-[24px] sm:grid sm:grid-cols-2 lg:grid-cols-4 mobile:grid-cols-2">
                                    <div class="flex flex-col vault_grid-item___r8p8">
                                        <div class="mt-auto flex-col justify-start">
                                            <div class="flex items-center text-sm font-normal leading-[22px]">
                                                <div class="flex items-center">
                                                    <span>
                                                        Total Value Locked
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="text-[32px] font-semibold tracking-[-0.002em]">
                                                <div
                                                    style={{
                                                        height: '48px',
                                                        lineHeight: '48px',
                                                        overflow: 'hidden',
                                                        position: 'relative',
                                                        width: '172px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: 'transparent',
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                        }}
                                                    >
                                                        $24,773,532
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '18.144px',
                                                            opacity: '1',
                                                            transform: 'none',
                                                        }}
                                                    >
                                                        $
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '17.632px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(18.144px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-53.8462%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '18.72px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(35.776px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-38.4615%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '8.48px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(54.496px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-76.9231%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '15.616px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(62.976px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-15.3846%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '15.616px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(78.592px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-15.3846%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '16.992px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(94.208px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-46.1538%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '8.48px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(111.2px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-76.9231%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '16.96px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(119.68px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-30.7692%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '16.992px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(136.64px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-46.1538%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '17.632px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(153.632px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-53.8462%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col vault_grid-item___r8p8">
                                        <div class="mt-auto flex-col justify-start">
                                            <div class="flex items-center text-sm font-normal leading-[22px]">
                                                <div class="flex items-center">
                                                    <span>
                                                        Price Per GD30D Token
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="text-[32px] font-semibold tracking-[-0.002em]">
                                                <div
                                                    style={{
                                                        height: '48px',
                                                        lineHeight: '48px',
                                                        overflow: 'hidden',
                                                        position: 'relative',
                                                        width: '130px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: 'transparent',
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                        }}
                                                    >
                                                        {`$${price}`}
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '18.144px',
                                                            opacity: '1',
                                                            transform: 'none',
                                                        }}
                                                    >
                                                        {`$${price}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col vault_grid-item___r8p8">
                                        <div class="mt-auto flex-col justify-start">
                                            <div class="flex items-center text-sm font-normal leading-[22px]">
                                                <div class="flex items-center">
                                                    <span>Estimated YTM</span>
                                                    <span
                                                        class="cursor-pointer"
                                                        data-tooltip-id="oe-tooltip-Estimated YTM"
                                                    >
                                                        <img
                                                            src="/icons/info.svg"
                                                            width="20"
                                                            height="20"
                                                        />
                                                    </span>
                                                    <div
                                                        id="oe-tooltip-Estimated YTM"
                                                        role="tooltip"
                                                        class="react-tooltip core-styles-module_tooltip__3vRRp styles-module_tooltip__mnnfp styles-module_dark__xNqje !bg-[#374151] mobile:!max-w-[250px] max-w-[450px] !text-base !z-10 react-tooltip__place-bottom core-styles-module_closing__sGnxF react-tooltip__closing"
                                                        style={{
                                                            left: '6.789px',
                                                            top: '421.594px',
                                                        }}
                                                    >
                                                        <div class="text-base text-[#E5E7EB]">
                                                            <span>
                                                                Estimated Yield
                                                                To Maturity
                                                            </span>
                                                        </div>
                                                        <div
                                                            class="react-tooltip-arrow core-styles-module_arrow__cvMwQ styles-module_arrow__K0L3T"
                                                            style={{
                                                                left: '106.5px',
                                                                top: '-4px',
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="text-[32px] font-semibold tracking-[-0.002em]">
                                                <div
                                                    style={{
                                                        height: '48px',
                                                        lineHeight: '48px',
                                                        overflow: 'hidden',
                                                        position: 'relative',
                                                        width: '81px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: 'transparent',
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                        }}
                                                    >
                                                        5.31%
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '16.96px',
                                                            opacity: '1',
                                                            transform: 'none',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-30.7692%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '8.73599px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(16.96px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-84.6154%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '16.992px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(25.696px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-46.1538%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '11.296px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(42.688px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-61.5385%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '26.656px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(53.984px) translateZ(0px)',
                                                        }}
                                                    >
                                                        %
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col vault_grid-item___r8p8">
                                        <div class="mt-auto flex-col justify-start">
                                            <div class="flex items-center text-sm font-normal leading-[22px]">
                                                <div class="flex items-center">
                                                    <span>Liquidity</span>
                                                    <span
                                                        class="cursor-pointer"
                                                        data-tooltip-id="oe-tooltip-Liquidity"
                                                    >
                                                        <img
                                                            src="/icons/info.svg"
                                                            width="20"
                                                            height="20"
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="text-[32px] font-semibold tracking-[-0.002em]">
                                                <div
                                                    style={{
                                                        height: '48px',
                                                        lineHeight: '48px',
                                                        overflow: 'hidden',
                                                        position: 'relative',
                                                        width: '123px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: 'transparent',
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                        }}
                                                    >
                                                        $138,669
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '18.144px',
                                                            opacity: '1',
                                                            transform: 'none',
                                                        }}
                                                    >
                                                        $
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '11.296px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(18.144px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-61.5385%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '16.992px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(29.44px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-46.1538%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>

                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '17.056px',
                                                            opacity: 1,
                                                            transform:
                                                                'translateX(46.432px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity: 1,
                                                                    transform:
                                                                        'translateY(-7.69231%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '8.48px',
                                                            opacity: 1,
                                                            transform:
                                                                'translateX(63.488px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-76.9231%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '16.928px',
                                                            opacity: 1,
                                                            transform:
                                                                'translateX(71.968px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity: 1,
                                                                    transform:
                                                                        'translateY(-23.0769%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '16.928px',
                                                            opacity: 1,
                                                            transform:
                                                                'translateX(88.896px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity: 1,
                                                                    transform:
                                                                        'translateY(-23.0769%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '16.864px',
                                                            opacity: 1,
                                                            transform:
                                                                'translateX(105.824px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity: 1,
                                                                    transform:
                                                                        'translateY(0%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-8 block sm:hidden">
                                    <div
                                        class="pb-4"
                                        style={{
                                            borderBottom: '0.5px solid #CFD9E2',
                                        }}
                                    >
                                        <div class="flex items-center text-sm font-normal leading-[22px]">
                                            <div class="flex items-center">
                                                <span>Total Value Locked</span>
                                            </div>
                                        </div>
                                        <div class="text-[28px] font-semibold tracking-[-0.002em]">
                                            <div
                                                style={{
                                                    height: '48px',
                                                    lineHeight: '48px',
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    width: '150px',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: 'transparent',
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                    }}
                                                >
                                                    $24,773,532
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        pointerEvents: 'none',
                                                        width: '15.876px',
                                                        opacity: 1,
                                                        transform: 'none',
                                                    }}
                                                >
                                                    $
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        pointerEvents: 'none',
                                                        width: '15.428px',
                                                        opacity: 1,
                                                        transform:
                                                            'translateX(15.876px) translateZ(0px)',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '14em',
                                                            position:
                                                                'relative',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                left: '0px',
                                                                opacity: 1,
                                                                transform:
                                                                    'translateY(-53.8462%) translateZ(0px)',
                                                            }}
                                                        >
                                                            <div>9</div>
                                                            <div>8</div>
                                                            <div>7</div>
                                                            <div>6</div>
                                                            <div>5</div>
                                                            <div>4</div>
                                                            <div>3</div>
                                                            <div>2</div>
                                                            <div>1</div>
                                                            <div>0</div>
                                                            <div>,</div>
                                                            <div>.</div>
                                                            <div>-</div>
                                                        </div>
                                                    </div>
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        pointerEvents: 'none',
                                                        width: '16.38px',
                                                        opacity: 1,
                                                        transform:
                                                            'translateX(31.304px) translateZ(0px)',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '14em',
                                                            position:
                                                                'relative',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                left: '0px',
                                                                opacity: '1',
                                                                transform:
                                                                    'translateY(-38.4615%) translateZ(0px)',
                                                            }}
                                                        >
                                                            <div>9</div>
                                                            <div>8</div>
                                                            <div>7</div>
                                                            <div>6</div>
                                                            <div>5</div>
                                                            <div>4</div>
                                                            <div>3</div>
                                                            <div>2</div>
                                                            <div>1</div>
                                                            <div>0</div>
                                                            <div>,</div>
                                                            <div>.</div>
                                                            <div>-</div>
                                                        </div>
                                                    </div>
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        pointerEvents: 'none',
                                                        width: '7.42px',
                                                        opacity: 1,
                                                        transform:
                                                            'translateX(47.684px) translateZ(0px)',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '14em',
                                                            position:
                                                                'relative',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                left: '0px',
                                                                opacity: 1,
                                                                transform:
                                                                    'translateY(-76.9231%) translateZ(0px)',
                                                            }}
                                                        >
                                                            <div>9</div>
                                                            <div>8</div>
                                                            <div>7</div>
                                                            <div>6</div>
                                                            <div>5</div>
                                                            <div>4</div>
                                                            <div>3</div>
                                                            <div>2</div>
                                                            <div>1</div>
                                                            <div>0</div>
                                                            <div>,</div>
                                                            <div>.</div>
                                                            <div>-</div>
                                                        </div>
                                                    </div>
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        pointerEvents: 'none',
                                                        width: '13.664px',
                                                        opacity: '1',
                                                        transform:
                                                            'translateX(55.104px) translateZ(0px)',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '14em',
                                                            position:
                                                                'relative',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                left: '0px',
                                                                opacity: '1',
                                                                transform:
                                                                    'translateY(-15.3846%) translateZ(0px)',
                                                            }}
                                                        >
                                                            <div>9</div>
                                                            <div>8</div>
                                                            <div>7</div>
                                                            <div>6</div>
                                                            <div>5</div>
                                                            <div>4</div>
                                                            <div>3</div>
                                                            <div>2</div>
                                                            <div>1</div>
                                                            <div>0</div>
                                                            <div>,</div>
                                                            <div>.</div>
                                                            <div>-</div>
                                                        </div>
                                                    </div>
                                                </span>

                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        pointerEvents: 'none',
                                                        width: '13.664px',
                                                        opacity: '1',
                                                        transform:
                                                            'translateX(68.768px) translateZ(0px)',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '14em',
                                                            position:
                                                                'relative',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                left: '0px',
                                                                opacity: '1',
                                                                transform:
                                                                    'translateY(-15.3846%) translateZ(0px)',
                                                            }}
                                                        >
                                                            <div>9</div>
                                                            <div>8</div>
                                                            <div>7</div>
                                                            <div>6</div>
                                                            <div>5</div>
                                                            <div>4</div>
                                                            <div>3</div>
                                                            <div>2</div>
                                                            <div>1</div>
                                                            <div>0</div>
                                                            <div>,</div>
                                                            <div>.</div>
                                                            <div>-</div>
                                                        </div>
                                                    </div>
                                                </span>

                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        pointerEvents: 'none',
                                                        width: '14.868px',
                                                        opacity: '1',
                                                        transform:
                                                            'translateX(82.4319px) translateZ(0px)',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '14em',
                                                            position:
                                                                'relative',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                left: '0px',
                                                                opacity: '1',
                                                                transform:
                                                                    'translateY(-46.1538%) translateZ(0px)',
                                                            }}
                                                        >
                                                            <div>9</div>
                                                            <div>8</div>
                                                            <div>7</div>
                                                            <div>6</div>
                                                            <div>5</div>
                                                            <div>4</div>
                                                            <div>3</div>
                                                            <div>2</div>
                                                            <div>1</div>
                                                            <div>0</div>
                                                            <div>,</div>
                                                            <div>.</div>
                                                            <div>-</div>
                                                        </div>
                                                    </div>
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        pointerEvents: 'none',
                                                        width: '7.42px',
                                                        opacity: '1',
                                                        transform:
                                                            'translateX(97.2999px) translateZ(0px)',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '14em',
                                                            position:
                                                                'relative',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                left: '0px',
                                                                opacity: '1',
                                                                transform:
                                                                    'translateY(-76.9231%) translateZ(0px)',
                                                            }}
                                                        >
                                                            <div>9</div>
                                                            <div>8</div>
                                                            <div>7</div>
                                                            <div>6</div>
                                                            <div>5</div>
                                                            <div>4</div>
                                                            <div>3</div>
                                                            <div>2</div>
                                                            <div>1</div>
                                                            <div>0</div>
                                                            <div>,</div>
                                                            <div>.</div>
                                                            <div>-</div>
                                                        </div>
                                                    </div>
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        pointerEvents: 'none',
                                                        width: '14.84px',
                                                        opacity: '1',
                                                        transform:
                                                            'translateX(104.72px) translateZ(0px)',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '14em',
                                                            position:
                                                                'relative',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                left: '0px',
                                                                opacity: '1',
                                                                transform:
                                                                    'translateY(-30.7692%) translateZ(0px)',
                                                            }}
                                                        >
                                                            <div>9</div>
                                                            <div>8</div>
                                                            <div>7</div>
                                                            <div>6</div>
                                                            <div>5</div>
                                                            <div>4</div>
                                                            <div>3</div>
                                                            <div>2</div>
                                                            <div>1</div>
                                                            <div>0</div>
                                                            <div>,</div>
                                                            <div>.</div>
                                                            <div>-</div>
                                                        </div>
                                                    </div>
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        pointerEvents: 'none',
                                                        width: '14.868px',
                                                        opacity: '1',
                                                        transform:
                                                            'translateX(119.56px) translateZ(0px)',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '14em',
                                                            position:
                                                                'relative',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                left: '0px',
                                                                opacity: '1',
                                                                transform:
                                                                    'translateY(-46.1538%) translateZ(0px)',
                                                            }}
                                                        >
                                                            <div>9</div>
                                                            <div>8</div>
                                                            <div>7</div>
                                                            <div>6</div>
                                                            <div>5</div>
                                                            <div>4</div>
                                                            <div>3</div>
                                                            <div>2</div>
                                                            <div>1</div>
                                                            <div>0</div>
                                                            <div>,</div>
                                                            <div>.</div>
                                                            <div>-</div>
                                                        </div>
                                                    </div>
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0px',
                                                        left: '0px',
                                                        pointerEvents: 'none',
                                                        width: '15.428px',
                                                        opacity: '1',
                                                        transform:
                                                            'translateX(134.428px) translateZ(0px)',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '14em',
                                                            position:
                                                                'relative',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                left: '0px',
                                                                opacity: '1',
                                                                transform:
                                                                    'translateY(-53.8462%) translateZ(0px)',
                                                            }}
                                                        >
                                                            <div>9</div>
                                                            <div>8</div>
                                                            <div>7</div>
                                                            <div>6</div>
                                                            <div>5</div>
                                                            <div>4</div>
                                                            <div>3</div>
                                                            <div>2</div>
                                                            <div>1</div>
                                                            <div>0</div>
                                                            <div>,</div>
                                                            <div>.</div>
                                                            <div>-</div>
                                                        </div>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="grid grid-cols-2 gap-x-6 py-4"
                                        style={{
                                            borderBottom: '0.5px solid #CFD9E2',
                                        }}
                                    >
                                        <div>
                                            <div class="flex items-center text-sm font-normal leading-[22px]">
                                                <div class="flex items-center">
                                                    <span>
                                                        Price Per GD30D Token
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="text-[28px] font-semibold tracking-[-0.002em]">
                                                <div
                                                    style={{
                                                        height: '48px',
                                                        lineHeight: '48px',
                                                        overflow: 'hidden',
                                                        position: 'relative',
                                                        width: '114px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: 'transparent',
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                        }}
                                                    >
                                                        {`$${price}`}
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '15.876px',
                                                            opacity: '1',
                                                            transform: 'none',
                                                        }}
                                                    >
                                                        $
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '9.88399px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(15.876px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-61.5385%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '7.644px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(25.76px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-84.6154%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '15.904px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(33.404px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-69.2308%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '14.868px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(49.308px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-46.1538%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '14.84px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(64.176px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-30.7692%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '9.88399px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(79.016px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-61.5385%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '14.868px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(88.8999px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-46.1538%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '9.88399px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(103.768px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-61.5385%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex items-center text-sm font-normal leading-[22px]">
                                                <span
                                                    class="cursor-pointer decoration-black decoration-dotted underline underline-offset-[6px]"
                                                    data-tooltip-id="oe-tooltip-estimated ytm"
                                                >
                                                    Estimated YTM
                                                </span>
                                            </div>
                                            <div class="text-[28px] font-semibold tracking-[-0.002em]">
                                                <div
                                                    style={{
                                                        height: '48px',
                                                        lineHeight: '48px',
                                                        overflow: 'hidden',
                                                        position: 'relative',
                                                        width: '71px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: 'transparent',
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                        }}
                                                    >
                                                        5.31%
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '14.84px',
                                                            opacity: '1',
                                                            transform: 'none',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-30.7692%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '7.644px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(14.84px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-84.6154%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '14.868px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(22.484px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-46.1538%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '9.88399px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(37.352px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-61.5385%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '23.324px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(47.236px) translateZ(0px)',
                                                        }}
                                                    >
                                                        %
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-2 gap-x-6 pt-4">
                                        <div>
                                            <div class="flex items-center text-sm font-normal leading-[22px]">
                                                <span
                                                    class="cursor-pointer decoration-black decoration-dotted underline underline-offset-[6px]"
                                                    data-tooltip-id="oe-tooltip-liquidity"
                                                >
                                                    Liquidity
                                                </span>
                                            </div>
                                            <div class="text-[28px] font-semibold tracking-[-0.002em]">
                                                <div
                                                    style={{
                                                        height: '48px',
                                                        lineHeight: '48px',
                                                        overflow: 'hidden',
                                                        position: 'relative',
                                                        width: '108px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: 'transparent',
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                        }}
                                                    >
                                                        $138,669
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '15.876px',
                                                            opacity: '1',
                                                            transform: 'none',
                                                        }}
                                                    >
                                                        $
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '9.88399px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(15.876px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-61.5385%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '14.868px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(25.76px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-46.1538%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '14.924px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(40.628px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-7.69231%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '7.42px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(55.552px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-76.9231%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '14.812px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(62.972px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-23.0769%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '14.812px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(77.784px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(-23.0769%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            top: '0px',
                                                            left: '0px',
                                                            pointerEvents:
                                                                'none',
                                                            width: '14.756px',
                                                            opacity: '1',
                                                            transform:
                                                                'translateX(92.596px) translateZ(0px)',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                height: '14em',
                                                                position:
                                                                    'relative',
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position:
                                                                        'absolute',
                                                                    left: '0px',
                                                                    opacity:
                                                                        '1',
                                                                    transform:
                                                                        'translateY(0%) translateZ(0px)',
                                                                }}
                                                            >
                                                                <div>9</div>
                                                                <div>8</div>
                                                                <div>7</div>
                                                                <div>6</div>
                                                                <div>5</div>
                                                                <div>4</div>
                                                                <div>3</div>
                                                                <div>2</div>
                                                                <div>1</div>
                                                                <div>0</div>
                                                                <div>,</div>
                                                                <div>.</div>
                                                                <div>-</div>
                                                            </div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full lg:min-h-[570px] flex flex-wrap justify-between items-start gap-10 lg:gap-4 xl:gap-10 overflow-hidden pt-10 mobile:w-full pt-8 md:pt-10">
                                <div class="w-full lg:w-[calc(100%-500px)] xl:w-[calc(100%-540px)]">
                                    <div class="overflow-hidden bg-white sm:rounded-lg">
                                        <div class="mb-0 md:mb-8">
                                            <div class="flex flex-col md:flex-row items-start justify-between md:items-center">
                                                <div class="flex flex-col">
                                                    <div class="flex items-center">
                                                        <div class="flex items-center justify-start gap-1">
                                                            <p class="text-sm font-medium text-[#626262] leading-[20px]">
                                                                Token Price
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-center gap-x-1 h-[34px]">
                                                        <div>
                                                            <div class="text-[24px] font-medium leading-[34px]">
                                                                {`$${price}`}
                                                            </div>
                                                        </div>
                                                        <div class="flex items-center gap-x-[2px] text-sm p-1 rounded-[4px] bg-[#E7FAED]">
                                                            <img
                                                                src="/icons/up-arrow.svg"
                                                                width="11"
                                                                height="12"
                                                            />
                                                            <p class="font-normal text-base text-[#0CCA4A]">
                                                                2.58%
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="py-[14px] md:py-0 flex justify-end flex-wrap items-center gap-1 border-borderGray text-sm w-full md:w-auto">
                                                    <div class="w-full md:w-[232px]"></div>
                                                </div>
                                            </div>
                                            <div class="flex justify-end h-[18px] hidden md:flex">
                                                <a
                                                    href="https://etherscan.io/address/0xCe9a6626Eb99eaeA829D7fA613d5D0A2eaE45F40"
                                                    target="_blank"
                                                    class="underline text-[12px] leading-[18px] text-[#626262] font-medium"
                                                >
                                                    View contract
                                                </a>
                                            </div>
                                        </div>
                                        <div class="h-full w-full">
                                            <div class="relative">
                                                <div class="z-10 md:z-0 flex justify-end h-[18px] md:hidden absolute top-[20px] right-0">
                                                    <a
                                                        href="https://etherscan.io/address/0xCe9a6626Eb99eaeA829D7fA613d5D0A2eaE45F40"
                                                        target="_blank"
                                                        class="underline text-[12px] leading-[18px] text-[#626262] font-medium"
                                                    >
                                                        View contract
                                                    </a>
                                                </div>
                                                <canvas
                                                    className="relative md:h-[350px] h-[340px]"
                                                    width="939"
                                                    style={{
                                                        boxSizing: 'border-box',
                                                        display: 'block',
                                                        height: '350px',
                                                        width: '939px',
                                                    }}
                                                    height="350"
                                                ></canvas>
                                            </div>
                                        </div>
                                        <div class="mb-[1px] pl-[1px] mt-0 md:mt-10 flex justify-between md:flex md:justify-start">
                                            <button
                                                type="button"
                                                class="text-black h-8 w-[54px] md:w-[38px] xl:w-[42px] rounded text-base font-medium uppercase !bg-white disabled:cursor-not-allowed"
                                            >
                                                1W{' '}
                                            </button>
                                            <button
                                                type="button"
                                                class="text-black h-8 w-[54px] md:w-[38px] xl:w-[42px] rounded text-base font-medium uppercase !bg-white disabled:cursor-not-allowed"
                                            >
                                                1M
                                            </button>
                                            <button
                                                type="button"
                                                class="h-8 w-[54px] md:w-[38px] xl:w-[42px] rounded text-base font-medium uppercase !bg-[#F9FAFB] text-black border border-[#CFD9E2]"
                                            >
                                                6M
                                            </button>
                                            <button
                                                type="button"
                                                class="text-black h-8 w-[54px] md:w-[38px] xl:w-[42px] rounded text-base font-medium uppercase !bg-white disabled:cursor-not-allowed"
                                            >
                                                YTD
                                            </button>
                                            <button
                                                type="button"
                                                class="text-black h-8 w-[54px] md:w-[38px] xl:w-[42px] rounded text-base font-medium uppercase !bg-white disabled:cursor-not-allowed"
                                            >
                                                1Y
                                            </button>
                                            <button
                                                type="button"
                                                class="text-black h-8 w-[54px] md:w-[38px] xl:w-[42px] rounded text-base font-medium uppercase !bg-white disabled:cursor-not-allowed"
                                            >
                                                MAX
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <TransactionPanel
                                    tokenPrice={price}
                                    handleSubmit={handleSubmit}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            class="mx-auto max-w-[1200px] px-4 xl:px-0"
                            id="tab-content"
                        >
                            <div class="border-b border-b-[#CFD9E2] rounded-t">
                                <nav
                                    class="-mb-px flex space-x-6 md:space-x-8 xl:space-x-10 px-0"
                                    aria-label="Tabs"
                                >
                                    <button
                                        class={`${
                                            activeTab === 'overview' &&
                                            'border-mainBlue text-mainBlue'
                                        } font-semibold whitespace-nowrap border-b-2 py-4 px-1 text-lg md:text-[22px] cursor-pointer`}
                                        aria-current="page"
                                        onClick={() => setActiveTab('overview')}
                                    >
                                        Overview
                                    </button>
                                    <button
                                        class={`${
                                            activeTab === 'portfolio' &&
                                            'border-mainBlue text-mainBlue'
                                        } font-semibold whitespace-nowrap border-b-2 py-4 px-1 text-lg md:text-[22px] cursor-pointer`}
                                        onClick={() =>
                                            setActiveTab('portfolio')
                                        }
                                    >
                                        Portfolio
                                    </button>
                                </nav>
                            </div>
                            {activeTab === 'overview' && <OverviewPanel />}
                            {activeTab === 'portfolio' && <PortfolioPanel />}
                        </div>
                    </div>
                </div>
            </div>
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
        </main>
    );
};

export default Vault;
