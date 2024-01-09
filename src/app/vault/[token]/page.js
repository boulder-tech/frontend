'use client';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/store';
import MainSection from '../../../components/sections/main-section';
import TransactionPanel from '../../../components/TransactionPanel';
import axios from 'axios';

import { ethers } from 'ethers';

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
    const [showAssets, setShowAssets] = useState(false);

    const [cost, setCost] = useState(0.04118);
    const [quantity, setQuantity] = useState(1);

    const { wallet, setWallet } = useGlobalContext();
    const [price, setPrice] = useState(0);

    //For transactions
    const [error, setError] = useState();
    const [txs, setTxs] = useState([]);

    useEffect(() => {
        checkIfWalletConnected();

        const walletDataString = localStorage.getItem('wallet');

        if (walletDataString) {
            const walletData = JSON.parse(walletDataString);
        }

        fetchTokenPrice('GD30D');
    }, []);

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
                            <div class="py-2 px-2 md:px-0 w-full bg-[#FFEED5] flex justify-center items-center mt-10 gap-x-1 md:gap-x-0">
                                <img
                                    src="icons/yellow-info.svg"
                                    width="24"
                                    height="24"
                                />
                                <p class="text-base leading-[160%]">
                                    GD30D has migrated to a
                                    <a
                                        class="font-medium underline"
                                        href="https://etherscan.io/address/0xdd50C053C096CB04A3e3362E2b622529EC5f2e8a"
                                        target="_blank"
                                    >
                                        new contract address
                                    </a>
                                    from
                                    <a
                                        class="font-medium underline"
                                        href="https://etherscan.io/address/0xad6250f0BD49F7a1eB11063af2cE9F25B9597b0F"
                                        target="_blank"
                                    >
                                        the old contract address
                                    </a>
                                    Read more
                                    <a
                                        class="font-medium underline"
                                        href="https://medium.com/@openeden/openeden-announces-tbill-vault-migration-from-beta-to-full-launch-a7d4ff92d6d6"
                                        target="_blank"
                                    >
                                        here
                                    </a>
                                    .
                                </p>
                            </div>
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
                                        class="border-mainBlue text-mainBlue font-semibold whitespace-nowrap border-b-2 py-4 px-1 text-lg md:text-[22px] cursor-pointer"
                                        aria-current="page"
                                    >
                                        Overview
                                    </button>
                                    <button class="border-transparent text-gray-500 font-medium hover:border-mainBlue hover:text-mainBlue whitespace-nowrap border-b-2 py-4 px-1 text-lg md:text-[22px] cursor-pointer">
                                        Portfolio
                                    </button>
                                    <button
                                        class="border-transparent text-gray-500 font-medium hover:border-mainBlue hover:text-mainBlue font-semibold cursor-not-allowed text-black/20 border-[#CFD9E2]/30 hover:text-black/20 hover:border-transparent whitespace-nowrap border-b-2 py-4 px-1 text-lg md:text-[22px] cursor-pointer"
                                        disabled=""
                                    >
                                        <span
                                            class="underline-offset-8 cursor-not-allowed no-underline decoration-black decoration-dotted"
                                            data-tooltip-id="oe-tooltip-disabled-tab"
                                        >
                                            Report
                                        </span>
                                        <div
                                            id="oe-tooltip-disabled-tab"
                                            role="tooltip"
                                            className="react-tooltip core-styles-module_tooltip__3vRRp styles-module_tooltip__mnnfp styles-module_dark__xNqje !bg-[#374151] mobile:!max-w-[250px] max-w-[450px] !text-base !z-10 react-tooltip__place-right core-styles-module_closing__sGnxF react-tooltip__closing"
                                            style={{
                                                left: '349.719px',
                                                top: '918px',
                                            }}
                                        >
                                            <span>
                                                Please sign up above to access
                                                reports
                                            </span>
                                            <div
                                                className="react-tooltip-arrow core-styles-module_arrow__cvMwQ styles-module_arrow__K0L3T"
                                                style={{
                                                    left: '-4px',
                                                    top: '27px',
                                                }}
                                            ></div>
                                        </div>
                                    </button>
                                </nav>
                            </div>
                            <div id="overview">
                                <div class="flex flex-col md:space-x-0 lg:flex-row lg:space-x-10 mobile:space-x-0 pt-10 pb-0 md:pb-[118px]">
                                    <div class="flex-1">
                                        <div>
                                            <p class="max-w-full text-lg font-normal leading-7">
                                                The GD30D Vault is the world’s
                                                first smart-contract vault for
                                                U.S. Treasury Bills. Earn the
                                                U.S. risk-free rate on your
                                                stablecoins by minting GD30D
                                                tokens, with 24/7 liquidity. The
                                                token issuer holds a portfolio
                                                of short-dated Treasury Bills
                                                via OpenEden Cayman Ltd, a
                                                bankruptcy remote and
                                                wholly-owned special purpose
                                                vehicle. <br />
                                                <br />
                                                The Vault is developed by
                                                OpenEden Labs, which is a
                                                financial technology company and
                                                not a regulated entity,
                                                depository, bank, or credit
                                                union.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex-1 mobile:mt-[33px]">
                                        <dl class="divide-y divide-[#CFD9E2]">
                                            <div class="flex w-full flex-row items-center justify-between py-4 sm:py-3">
                                                <dd class="text-gray-800 flex text-lg font-medium sm:mt-0">
                                                    <span class="grow">
                                                        <div class="flex items-center">
                                                            <span
                                                                style={{
                                                                    boxSizing:
                                                                        'border-box',
                                                                    display:
                                                                        'inline-block',
                                                                    overflow:
                                                                        'hidden',
                                                                    width: 'initial',
                                                                    height: 'initial',
                                                                    background:
                                                                        'none',
                                                                    opacity: 1,
                                                                    border: '0px',
                                                                    margin: '0px',
                                                                    padding:
                                                                        '0px',
                                                                    position:
                                                                        'relative',
                                                                    maxWidth:
                                                                        '100%',
                                                                }}
                                                            >
                                                                <span
                                                                    style={{
                                                                        boxSizing:
                                                                            'border-box',
                                                                        display:
                                                                            'block',
                                                                        width: 'initial',
                                                                        height: 'initial',
                                                                        background:
                                                                            'none',
                                                                        opacity: 1,
                                                                        border: '0px',
                                                                        margin: '0px',
                                                                        padding:
                                                                            '0px',
                                                                        maxWidth:
                                                                            '100%',
                                                                    }}
                                                                >
                                                                    <img
                                                                        alt=""
                                                                        aria-hidden="true"
                                                                        src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2724%27%20height=%2724%27/%3e"
                                                                        style={{
                                                                            display:
                                                                                'block',
                                                                            maxWidth:
                                                                                '100%',
                                                                            width: 'initial',
                                                                            height: 'initial',
                                                                            background:
                                                                                'none',
                                                                            opacity: 1,
                                                                            border: '0px',
                                                                            margin: '0px',
                                                                            padding:
                                                                                '0px',
                                                                        }}
                                                                    />
                                                                </span>
                                                                <img
                                                                    src="/_next/image?url=https%3A%2F%2Frawcdn.githack.com%2FOpenEdenHQ%2Fopeneden.assets%2F3d1a5c6201585fb7dbda6e900174389ac9a15b57%2Ficons%2Ftbill%2Ftbill_token_128.png&w=48&q=75"
                                                                    decoding="async"
                                                                    data-nimg="intrinsic"
                                                                    style={{
                                                                        position:
                                                                            'absolute',
                                                                        inset: 0,
                                                                        boxSizing:
                                                                            'border-box',
                                                                        padding: 0,
                                                                        border: 'none',
                                                                        margin: 'auto',
                                                                        display:
                                                                            'block',
                                                                        width: 0,
                                                                        height: 0,
                                                                        minWidth:
                                                                            '100%',
                                                                        maxWidth:
                                                                            '100%',
                                                                        minHeight:
                                                                            '100%',
                                                                        maxHeight:
                                                                            '100%',
                                                                    }}
                                                                    srcSet="/_next/image?url=https%3A%2F%2Frawcdn.githack.com%2FOpenEdenHQ%2Fopeneden.assets%2F3d1a5c6201585fb7dbda6e900174389ac9a15b57%2Ficons%2Ftbill%2Ftbill_token_128.png&w=32&q=75 1x, /_next/image?url=https%3A%2F%2Frawcdn.githack.com%2FOpenEdenHQ%2Fopeneden.assets%2F3d1a5c6201585fb7dbda6e900174389ac9a15b57%2Ficons%2Ftbill%2Ftbill_token_128.png&w=48&q=75 2x"
                                                                />
                                                            </span>

                                                            <p class="ml-1 text-lg font-medium leading-[22px]">
                                                                GD30D
                                                            </p>
                                                        </div>
                                                    </span>
                                                </dd>
                                                <span class="shrink-0">
                                                    <div class="yearn--elementWithActions-wrapper undefined">
                                                        <p class="yearn--elementWithActions text-lg font-medium leading-[22px] text-black">
                                                            0xdd5...f2e8a
                                                        </p>
                                                        <button class="cursor-pointer">
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M2.67085 2.67085C2.78025 2.56146 2.92862 2.5 3.08333 2.5H9.08333C9.23804 2.5 9.38642 2.56146 9.49581 2.67085C9.60521 2.78025 9.66667 2.92862 9.66667 3.08333V3.75C9.66667 4.16421 10.0025 4.5 10.4167 4.5C10.8309 4.5 11.1667 4.16421 11.1667 3.75V3.08333C11.1667 2.5308 10.9472 2.00089 10.5565 1.61019C10.1658 1.21949 9.63587 1 9.08333 1H3.08333C2.5308 1 2.0009 1.21949 1.61019 1.61019C1.21949 2.0009 1 2.5308 1 3.08333V9.08333C1 9.63587 1.21949 10.1658 1.61019 10.5565C2.00089 10.9472 2.5308 11.1667 3.08333 11.1667H3.75C4.16421 11.1667 4.5 10.8309 4.5 10.4167C4.5 10.0025 4.16421 9.66667 3.75 9.66667H3.08333C2.92862 9.66667 2.78025 9.60521 2.67085 9.49581C2.56146 9.38642 2.5 9.23804 2.5 9.08333V3.08333C2.5 2.92862 2.56146 2.78025 2.67085 2.67085ZM7.1665 7.74999C7.1665 7.42782 7.42767 7.16666 7.74984 7.16666H13.7498C14.072 7.16666 14.3332 7.42782 14.3332 7.74999V13.75C14.3332 14.0722 14.072 14.3333 13.7498 14.3333H7.74984C7.42767 14.3333 7.1665 14.0722 7.1665 13.75V7.74999ZM7.74984 5.66666C6.59924 5.66666 5.6665 6.5994 5.6665 7.74999V13.75C5.6665 14.9006 6.59924 15.8333 7.74984 15.8333H13.7498C14.9004 15.8333 15.8332 14.9006 15.8332 13.75V7.74999C15.8332 6.5994 14.9004 5.66666 13.7498 5.66666H7.74984Z"
                                                                    fill="black"
                                                                ></path>
                                                            </svg>
                                                        </button>
                                                        <button class="cursor-pointer">
                                                            <a
                                                                href="https://etherscan.io/address/0xdd50C053C096CB04A3e3362E2b622529EC5f2e8a"
                                                                target="_blank"
                                                                class="cursor-pointer"
                                                                rel="noreferrer"
                                                            >
                                                                <span class="sr-only">
                                                                    Link to
                                                                    explorer
                                                                </span>
                                                                <svg
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    class="cursor-pointer w-4 h-4"
                                                                >
                                                                    <path
                                                                        d="M7 4C5.34328 4 4 5.34328 4 7V17C4 18.6567 5.34328 20 7 20H17C18.6567 20 20 18.6567 20 17V16C20 15.4477 20.4477 15 21 15C21.5523 15 22 15.4477 22 16V17C22 19.7613 19.7613 22 17 22H7C4.23872 22 2 19.7613 2 17V7C2 4.23872 4.23872 2 7 2H8C8.55228 2 9 2.44772 9 3C9 3.55228 8.55228 4 8 4H7Z"
                                                                        fill="currentcolor"
                                                                    ></path>
                                                                    <path
                                                                        d="M14.3 2C13.6925 2 13.2 2.49249 13.2 3.1C13.2 3.70751 13.6925 4.2 14.3 4.2H18.2444L9.12223 13.3222C8.69265 13.7518 8.69265 14.4482 9.12223 14.8778C9.55181 15.3074 10.2483 15.3074 10.6779 14.8778L19.8 5.75565V9.7C19.8 10.3075 20.2925 10.8 20.9 10.8C21.5075 10.8 22 10.3075 22 9.7V3.1C22 2.92275 21.9581 2.75529 21.8836 2.607C21.8954 2.63051 21.9064 2.6545 21.9166 2.67894C21.8633 2.55017 21.7845 2.42947 21.6802 2.32456L21.6791 2.32343L21.6778 2.32213L21.6765 2.32083C21.4775 2.12256 21.2031 2 20.9 2H14.3Z"
                                                                        fill="currentcolor"
                                                                    ></path>
                                                                    <path
                                                                        d="M21.3211 2.08347C21.4545 2.13878 21.5747 2.21959 21.6755 2.31981C21.5706 2.21552 21.4499 2.13674 21.3211 2.08347Z"
                                                                        fill="currentcolor"
                                                                    ></path>
                                                                </svg>
                                                            </a>
                                                        </button>
                                                        <button class="h-8 w-8 justify-center items-center hidden sm:flex">
                                                            <a class="cursor-pointer">
                                                                <span class="sr-only">
                                                                    Add to
                                                                    MetaMask
                                                                </span>
                                                                <svg
                                                                    width="18"
                                                                    height="18"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    class="cursor-pointer h-4 w-4"
                                                                >
                                                                    <path
                                                                        d="M19.292 2.216a.83.83 0 1 0-1.661 0v2.492h-2.493a.83.83 0 0 0 0 1.661h2.493v2.493a.83.83 0 1 0 1.661 0V6.369h2.492a.83.83 0 1 0 0-1.661h-2.492V2.216Z"
                                                                        fill="currentcolor"
                                                                    ></path>
                                                                    <path
                                                                        d="M8.632 5.699h4.293c.02.68.161 1.33.404 1.926H8.308a.9.9 0 0 1-.577-.21L4.615 4.812v4.739c0 .15-.033.297-.097.43l-2.42 5.05 8.979 6.814 8.978-6.814-1.899-3.963a5.536 5.536 0 0 0 1.95-.24l1.95 4.071a.99.99 0 0 1-.282 1.21L11.62 23.816a.892.892 0 0 1-1.086 0L.38 16.11a.99.99 0 0 1-.282-1.21l2.671-5.575V2.809c0-.37.204-.707.524-.868.32-.16.699-.115.976.116L8.632 5.7Z"
                                                                        fill="currentcolor"
                                                                    ></path>
                                                                    <path
                                                                        d="M9.23 13.405c0-.532-.413-.963-.922-.963-.51 0-.923.43-.923.963v.01c0 .531.413.963.923.963s.923-.432.923-.964v-.01ZM13.846 12.441c.51 0 .923.432.923.964v.01c0 .531-.413.963-.923.963s-.923-.432-.923-.964v-.01c0-.531.413-.963.923-.963ZM9.23 16.294c-.494 0-.898.407-.921.917a1.015 1.015 0 0 0 .153.58.937.937 0 0 0 .37.335l1.823.951a.889.889 0 0 0 .845 0l1.836-.958a.98.98 0 0 0 .372-1.37.94.94 0 0 0-.274-.294.893.893 0 0 0-.511-.16H9.23Z"
                                                                        fill="currentcolor"
                                                                    ></path>
                                                                </svg>
                                                            </a>
                                                        </button>
                                                    </div>
                                                </span>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Vault;
