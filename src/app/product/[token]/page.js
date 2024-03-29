'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { Tooltip } from 'react-tooltip';
import { useChain, useMoralis } from "react-moralis";
import { useGlobalContext } from '../../context/store';
import MainSection from '../../../components/sections/main-section';
import AlertPanel from '../../../components/AlertPanel';
import TransactionPanel from '../../../components/TransactionPanel';
import OverviewPanel from '../../../components/OverviewPanel';
import PortfolioPanel from '../../../components/PortfolioPanel';
import Modal from '../../../components/Modal';
import Chart from '../../../components/Chart';
import AnimatingNumber from '../../../components/AnimatingNumber'

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
    const [newPrice, setNewPrice] = useState(0);
    const [tirValue, setTirValue] = useState(0);

    //For transactions
    const [error, setError] = useState();
    const [txs, setTxs] = useState([]);
    const intervalRef = useRef(null);

    const [showTooltip, setShowTooltip] = useState(false);

    const [content, setContent] = useState('chart');

    const { switchNetwork, chainId, chain, account } = useChain();
    const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, Moralis, deactivateWeb3 } =
        useMoralis();

    useEffect(() => {
        console.log('Moralis.Units', Moralis.Units)
        /*
        if (window.ethereum) {
            window.ethereum.on('chainChanged', async () => {
                if (window.ethereum.isMetaMask) {
                    const chainId = await window.ethereum.request({
                        method: 'eth_chainId',
                    });

                    window.location.reload();

                    console.log('chainId', chainId);

                    if (chainId === '0x66eee') { //SEPOLIA 0xaa36a7 //ARBITRUM 0x66eee
                        setShowIncorrectNetworkModal(false);
                    }
                }
            });
        }
        */

        /*

        checkIfWalletConnected();
        
        checkIfCorrectNetwork();
        

        const walletDataString = localStorage.getItem('wallet');

        if (walletDataString) {
            const walletData = JSON.parse(walletDataString);
        }
        */

        fetchTokenPrice('GD30D');
        fetchTIR('GD30D');

        const priceUpdateInterval = setInterval(() => {
            fetchTokenPrice('GD30D');
            fetchTIR('GD30D');
          }, 60000); // 5 minutos en milisegundos
      
          return () => {
            clearInterval(priceUpdateInterval); // Limpiar el intervalo al desmontar el componente
          };
    }, []);

    useEffect(() => {
        /*
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
        */
    }, [newPrice]);

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

    const fetchTIR = async (name) => {
        const {
            data: { value },
        } = await axios.get(`${backendUrl}/api/tir/name/${name}`);

        setTirValue(value.round(2));
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

    //const usdcAddress = '0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f'; //SEPOLIA
    const usdcAddress = '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d'; //

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
        <div class="mx-auto flex w-full grow px-4 text-black">
            {
                /*
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-dark-top-left-2"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-dark-top-right-3"></div>
                */
            }
            <div className="absolute top-0 left-0 w-full h-full bg-[#010312] bg-opacity-70"></div>
            <div
                style={{
                    fontFamily: 'Barlow, sans-serif',
                    opacity: 1,
                    transform: 'none',
                }}
                class="w-full items-center justify-center relative px-8"
            >
                <div
                    class="z-0 w-full pt-[40px]"
                    id="vault-dashboard"
                    style={{ display: 'block' }}
                >
                    <div class="pt-0 pb-8">
                        <div class="max-w-[1856px]">
                            <div className="flex">
                                <div className="w-[20%]">
                                    <div className="flex mb-4">
                                        <div className="w-1/6">
                                            <img className="w-[54px] h-[54px]" src="/logos/ARG.png" />
                                        </div>
                                        <div className="w-5/6 pl-2 leading-tight">
                                            <p className="text-[32px] text-bold text-[#FAFBFF]">GD30D</p>
                                            <p className="text-[#FFFFFF]">Last updated: less than a minute ago</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <a href="https://sepolia.arbiscan.io/address/0x9dade022223a4b8f6a60da791aec5a0a768e8b5c" target="_blank" rel="noopener noreferrer">
                                            <button className="bg-[#FF20F6] bg-opacity-[15%] rounded-[12px] w-[201px] h-[45px] text-[#FAFBFF] font-bold flex justify-center items-center">
                                                <div className="flex items-center">
                                                    <img src="/icons/view-on-explorer.svg" className="mr-2" alt="Explorer Icon" />
                                                    <span>View on explorer</span>
                                                </div>
                                            </button>
                                        </a>
                                    </div>
                                    <div className="flex">
                                        <div className="h-[120px] w-full ml-[3px] flex flex-col space-y-1 rounded-lg bg-[#FAFBFF] bg-opacity-5 p-4 md:px-4 mt-10 mb-4">
                                            <div>
                                                <p className="text-[16px] text-[#FFFFFF]">Maturity</p>
                                            </div>
                                            <div>
                                                <p className="text-[48px] text-[#FFFFFF] font-bold">09/07/2030</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="h-[120px] w-full ml-[3px] flex flex-col space-y-1 rounded-lg bg-[#FAFBFF] bg-opacity-5 p-4 md:px-4 mb-4">
                                            <div>
                                                <p className="text-[16px] text-[#FFFFFF]">Estimated Price</p>
                                            </div>
                                            <div>
                                                <p className="text-[48px] text-[#FFFFFF] font-bold">${price}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="h-[120px] w-full ml-[3px] flex flex-col space-y-1 rounded-lg bg-[#FAFBFF] bg-opacity-5 p-4 md:px-4 mb-4">
                                            <div>
                                                <p className="text-[16px] text-[#FFFFFF]">Estimated YTM</p>
                                            </div>
                                            <div>
                                                <p className="text-[48px] text-[#FFFFFF] font-bold">1.76%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="h-[120px] w-full ml-[3px] flex flex-col space-y-1 rounded-lg bg-[#FAFBFF] bg-opacity-5 p-4 md:px-4 mb-4">
                                            <div>
                                                <p className="text-[16px] text-[#FFFFFF]">TIR</p>
                                            </div>
                                            <div>
                                                <p className="text-[48px] text-[#FFFFFF] font-bold">{`${tirValue}%`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[80%] mt-3">
                                    <AlertPanel>
                                        <p class="leading-[160%] text-[#FAFBFF] text-[16px]">
                                            🚀 Exciting News: A new token launch is
                                            imminent! Stay tuned as Boulder Tech
                                            prepares to unveil its latest token. Get
                                            ready for the launch by checking the details
                                            at the
                                            <a
                                                class="font-semibold underline ml-1 text-[#FAFBFF]"
                                                href="https://bouldertech.fi"
                                                target="_blank"
                                            >
                                                launch page
                                            </a>
                                            .
                                        </p>
                                    </AlertPanel>
                                    <div class="w-full lg:min-h-[570px] flex flex-wrap justify-between items-start pt-10">
                                        <div class="w-[64%] pl-4">
                                            <div class="overflow-hidden border rounded-2xl shadow-2xl bg-[#FAFBFF] bg-opacity-5 text-white p-[20px]">
                                                <div className="flex mb-4">
                                                    <div className="w-[35%]">
                                                        <div className="grid grid-cols-12">
                                                            <div className="col-span-3"></div>
                                                            <div className="col-span-9">
                                                                <p>Token Price</p>
                                                            </div>
                                                            <div className="col-span-3"></div>
                                                            <div className="col-span-3">
                                                                <AnimatingNumber prefix='$' value={price}/>
                                                            </div>
                                                            <div className="col-span-6">
                                                                <div className="flex w-[87px] h-[29px] ml-2 mt-1">
                                                                    <div className="w-full h-full bg-[#34D399] bg-opacity-10 border rounded-md flex items-center justify-center">
                                                                        <img src="/icons/arrow-up.svg" className="w-6 h-6 mr-1" style={{ filter: 'invert(1)', width: '1em', height: '0.7em' }} />
                                                                        <span className="text-[16px] text-[#34D399]">2.24%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="w-[38%] mb-[1px] pl-[1px] mt-0  text-center">
                                                        
                                                        {content === 'chart' ? <> <button
                                                                type="button"
                                                                class="text-[#FAFBFF] w-[44px] h-[40px] rounded text-[13.45px] font-medium bg-[#245BFF] disabled:cursor-not-allowed leading-[20px] mr-[8px]"
                                                            >
                                                                1W
                                                            </button>
                                                            <button
                                                                type="button"
                                                                class="text-[#245BFF] w-[42px] h-[40px] rounded text-[13.45px] font-medium bg-[#245BFF] bg-opacity-[20%] disabled:cursor-not-allowed leading-[20px] mr-[8px]"
                                                            >
                                                                1M
                                                            </button>
                                                            <button
                                                                type="button"
                                                                class="text-[#245BFF] w-[42px] h-[40px] rounded text-[13.45px] font-medium bg-[#245BFF] bg-opacity-[20%] disabled:cursor-not-allowed leading-[20px] mr-[8px]"
                                                            >
                                                                6M
                                                            </button>
                                                            <button
                                                                type="button"
                                                                class="text-[#245BFF] w-[49px] h-[40px] rounded text-[13.45px] font-medium bg-[#245BFF] bg-opacity-[20%] disabled:cursor-not-allowed leading-[20px] mr-[8px]"
                                                            >
                                                                YTD
                                                            </button>
                                                            <button
                                                                type="button"
                                                                class="text-[#245BFF] w-[40px] h-[40px] rounded text-[13.45px] font-medium bg-[#245BFF] bg-opacity-[20%] disabled:cursor-not-allowed leading-[20px] mr-[8px]"
                                                            >
                                                                1Y
                                                            </button>
                                                            <button
                                                                type="button"
                                                                class="text-[#245BFF] w-[51px] h-[40px] rounded text-[13.45px] font-medium bg-[#245BFF] bg-opacity-[20%] disabled:cursor-not-allowed leading-[20px] mr-[8px]"
                                                            >
                                                                MAX
                                                            </button>
                                                        </> : null}
                                                    </div>
                                                    <div className="relative w-[27%] text-right">
                                                    </div>
                                                </div>
                                                <div class="h-[477px] w-full">
                                                    {content === 'chart' ? <Chart /> : <p className="text-[24px] text-[#FFFFFF] font-semibold p-4">The GD30D is a tokenized bond product available on BoulderTech's platform. It represents a digital version of the "Bono USD 2030 Ley NY (GD30)," a U.S. dollar-denominated public bond from Argentina with a fixed annual interest rate of 0.75%, maturing in 2030. The bond's original value is 100.00 dollars, and it is currently trading at a lower market price, offering potential for investment gains. By tokenizing this bond, BoulderTech makes it accessible for fractional ownership and trading on the blockchain, providing liquidity and global accessibility.</p>}
                                                </div>
                                            </div>
                                            <div className="flex justify-center mb-10 mt-3">
                                                <button onClick={() => { setContent('chart')}} className={`bg-[#245BFF] ${content === 'overview' ? 'bg-opacity-20' : ''} text-[#FAFBFF] text-[24px] font-semibold py-2 px-4 rounded mr-[2px]`}>
                                                    Graphic
                                                </button>
                                                <button onClick={() => { setContent('overview')}} className={`bg-[#245BFF] ${content === 'chart' ? 'bg-opacity-20' : ''}  text-[#FAFBFF] text-[24px] font-semibold py-2 px-4 rounded`}>
                                                    Overview
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-[3%]"></div>
                                        <div className="w-[33%]">
                                            <TransactionPanel
                                                tokenPrice={price}
                                                handleSubmit={handleSubmit}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vault;
