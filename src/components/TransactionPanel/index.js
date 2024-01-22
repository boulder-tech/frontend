import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import io from 'socket.io-client';
import TermsOfUseModal from '../TermsOfUseModal';
import TransactionConfirmationModal from '../TransactionConfirmationModal';
import ConnectWalletModal from '../ConnectWalletModal';
import Notification from '../Notification';
import { useGlobalContext } from '../../app/context/store';

import './styles.css';

const usdcAddress = '0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f';

const usdcAbi = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function balanceOf(address) view returns (uint)',
    'function totalSupply() view returns (uint256)',
    'function transfer(address to, uint amount)',
];

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

function formatNumber(input) {
    // Elimina las comas del número
    const numberWithoutCommas = input.replace(/,/g, '');

    // Formatea la parte entera con comas
    const formattedNumber = numberWithoutCommas.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
    );

    return formattedNumber;
}

const unformatNumber = (input) => {
    return input.replace(/,/g, '');
};

Number.prototype.round = function (decimals) {
    if (isNaN(this)) return NaN;
    const factor = Math.pow(10, decimals);
    return Math.round(this * factor) / factor;
};

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const TransactionPanel = ({ tokenPrice }) => {
    const { wallet, setWallet, client, setClient, socket, setSocket } =
        useGlobalContext();
    const [openConnectWalletModal, setOpenConnectWalletModal] = useState(false);
    const [openTermsOfUseModal, setOpenTermsOfUseModal] = useState(false);
    const [
        openTransactionConfirmationModal,
        setOpenTransactionConfirmationModal,
    ] = useState(false);
    const [balance, setBalance] = useState(0);
    const [amountToInvest, setAmountToInvest] = useState(0);
    const [totalTokens, setTotalTokens] = useState(0);
    const [isKycApproved, setIsKycApproved] = useState(false);
    const [isDepositing, setIsDepositing] = useState(false);
    const [showKycNotification, setShowKycNotification] = useState(false);
    const [renderTransactionPanel, setRenderTransactionPanel] = useState(false);
    const [kycOneTimeLink, setKycOneTimeLink] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        console.log('wallet -> ', wallet);
        if (wallet.address) {
            loadClientData();
        } else {
            loadOffline();
        }
    }, [wallet]);

    useEffect(() => {
        if (client) {
            if (!isSubscribed) {
                const socket = io.connect(`${backendUrl}`);

                setSocket(socket);

                socket.emit('subscribe', {
                    address: wallet.address,
                });

                setIsSubscribed(true);
            }
        }
    }, [client]);

    useEffect(() => {
        if (socket) {
            socket.on('kyc-approved', async (data) => {
                console.log('KYC APPROVED', data);

                await fetchClient();

                setShowKycNotification(true);
            });

            socket.on('kyc-started', async (data) => {
                console.log('KYC STARTED', data);

                await fetchClient();
            });

            socket.on('kyc-expired', async (data) => {
                console.log('KYC EXPIRED', data);

                await fetchClient();
            });
        }
    }, [isSubscribed]);

    const loadClientData = async () => {
        console.log('LOADING CLIENT DATA');
        await Promise.all([fetchBalance(), checkKYCstatus(), fetchClient()]);

        setRenderTransactionPanel(true);
    };

    const loadOffline = async () => {
        await delay(1000);
        setRenderTransactionPanel(true);
    };

    const checkKYCstatus = async () => {
        const {
            data: {
                client: { status },
            },
        } = await axios.get(
            `${backendUrl}/api/client/public-address/${wallet.address}`
        );

        if (status === 'approved') setIsKycApproved(true);
    };

    const fetchClient = async () => {
        const {
            data: { client },
        } = await axios.get(
            `${backendUrl}/api/client/public-address/${wallet.address}`
        );

        setClient(client);
    };

    const generateKycOneTimeLink = async () => {
        const {
            data: { kyc },
        } = await axios.post(`${backendUrl}/api/client/kyc/one-time-link`, {
            public_address: wallet.address,
        });

        setKycOneTimeLink(kyc['one-time-link-short']);

        console.log(kyc['one-time-link-short']);
    };

    const kycProcess = async () => {
        try {
            const {
                data: {
                    client: { status },
                },
            } = await axios.get(
                `${backendUrl}/api/client/public-address/${wallet.address}`
            );

            if (status === 'created') {
                await axios.put(`${backendUrl}/api/client/updateData`, {
                    address: wallet.address,
                    status: 'pending_review',
                });

                const temporizador = setTimeout(async () => {
                    // Realizar la acción que deseas después de 10 segundos
                    await axios.put(`${backendUrl}/api/client/updateData`, {
                        address: wallet.address,
                        status: 'approved',
                    });

                    setIsKycApproved(true);

                    clearTimeout(temporizador);
                }, 10000); // 10000 milisegundos = 10 segundos
            }
        } catch (e) {
            console.log(e);
        }
    };

    const fetchBalance = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const usdcContract = new ethers.Contract(
                usdcAddress,
                usdcAbi,
                provider
            );

            const usdcBalance = await usdcContract.balanceOf(
                signer.getAddress()
            );
            const balance = usdcBalance / 1e6;

            setBalance(balance);

            return balance;
        } catch (e) {
            return 0;
        }
    };

    const setMaxBalance = async () => {
        let maxBalance = formatNumber((await fetchBalance()).toString());

        setAmountToInvest(maxBalance);

        setTotalTokens((unformatNumber(maxBalance) / tokenPrice).round(0));
    };

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
        const transaction = await usdcContract
            .connect(signer)
            .transfer(addr, unformatNumber(amountToInvest) * 1000000, {
                //gasPrice,
                //gasLimit,
            });

        console.log(transaction);

        const response = await axios.post(`${backendUrl}/api/transaction`, {
            address: wallet.address,
            hash: transaction.hash,
            amount_stable: unformatNumber(amountToInvest),
            type_stable: 'USDC',
            token: 'GD30D',
        });

        setIsDepositing(true);

        provider
            .waitForTransaction(transaction.hash)
            .then((receipt) => {
                console.log(receipt);
                setIsDepositing(false);
                setAmountToInvest(0);
                setTotalTokens(0);
                setOpenTransactionConfirmationModal(true);
            })
            .catch((error) => {
                console.log(error);
            });

        console.log(response);
    }

    const startPayment = async ({ setError, setTxs, ether, addr }) => {
        try {
            if (!window.ethereum)
                throw new Error('No crypto wallet found. Please install it.');

            await sendUsdcToAccount({ addr });
        } catch (err) {
            console.log(err);
            //setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const data = new FormData(e.target);
        //setError();
        await startPayment({
            //setError,
            //setTxs,
            //ether: cost.toString(),
            addr: '0x6aD7faC9D241A535532B46fA313Eb80f561a3027', //data.get('addr'),
        });
    };

    return (
        <>
            {renderTransactionPanel ? (
                <div class="overflow-hidden w-full lg:w-[460px] xl:w-[500px] h-auto md:min-h-[524px] border border-borderGray bg-white rounded-[4px] lg:mt-0">
                    <div class="flex justify-between px-4 py-4 md:px-6 md:py-6">
                        <nav
                            class="-mb-px flex justify-start space-x-3 md:space-x-8 text-base md:text-[22px]"
                            aria-label="Tabs"
                        >
                            <button
                                class="text-mainBlue font-semibold rounded-full capitalize"
                                aria-current="page"
                            >
                                deposit
                            </button>
                        </nav>
                    </div>
                    <div>
                        <div class="grid grid-cols-1 gap-4 px-4 md:px-6 md:grid-cols-1">
                            <div class="relative">
                                <div class="ml-[-3px] flex flex-col space-y-4 rounded-lg border border-[#E5E7EB] bg-slate-50 p-4 md:px-4 md:py-6">
                                    <div class="flex justify-between font-normal">
                                        <p class="text-[#626262] leading-[24px] text-lg">
                                            Balance
                                        </p>
                                        <div class="flex flex-end items-center gap-x-2">
                                            <button class="block md:hidden rounded-[100px] px-[10px] py-[2px] text-xs text-[#646464] border border-[#646464] hover:border-mainBlue hover:text-mainBlue">
                                                MAX
                                            </button>
                                            <p class="text-[#626262] leading-[24px] text-lg">
                                                {balance}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-x-2 mobile:w-full">
                                            <div class="flex items-center gap-x-1">
                                                <span
                                                    style={{
                                                        boxSizing: 'border-box',
                                                        display: 'inline-block',
                                                        overflow: 'hidden',
                                                        width: 'initial',
                                                        height: 'initial',
                                                        background: 'none',
                                                        opacity: 1,
                                                        border: '0px',
                                                        margin: '0px',
                                                        padding: '0px',
                                                        position: 'relative',
                                                        maxWidth: '100%',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            boxSizing:
                                                                'border-box',
                                                            display: 'block',
                                                            width: 'initial',
                                                            height: 'initial',
                                                            background: 'none',
                                                            opacity: 1,
                                                            border: '0px',
                                                            margin: '0px',
                                                            padding: '0px',
                                                            maxWidth: '100%',
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
                                                                padding: '0px',
                                                            }}
                                                        />
                                                    </span>
                                                    <img
                                                        src="/logos/usdc_token_logo_128.png"
                                                        decoding="async"
                                                        data-nimg="intrinsic"
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            inset: '0px',
                                                            boxSizing:
                                                                'border-box',
                                                            padding: '0px',
                                                            border: 'none',
                                                            margin: 'auto',
                                                            display: 'block',
                                                            width: '0px',
                                                            height: '0px',
                                                            minWidth: '100%',
                                                            maxWidth: '100%',
                                                            minHeight: '100%',
                                                            maxHeight: '100%',
                                                        }}
                                                        srcSet="/logos/usdc_token_logo_128.png"
                                                    />
                                                </span>

                                                <span class="text-2xl font-medium">
                                                    USDC
                                                </span>
                                            </div>
                                            <div>
                                                <button
                                                    class="rounded-[100px] px-[10px] py-[2px] text-xs text-[#646464] border border-[#646464] hover:border-mainBlue hover:text-mainBlue mobile:hidden"
                                                    onClick={setMaxBalance}
                                                >
                                                    MAX
                                                </button>
                                            </div>
                                        </div>
                                        <div class="w-[60%] mobile:ml-1 mobile:w-full">
                                            <label
                                                aria-invalid="false"
                                                class="yearn--input"
                                            >
                                                <form name="Search">
                                                    <div
                                                        aria-label="Search"
                                                        class="oe--input-field-wrapper undefined"
                                                    >
                                                        <span class="sr-only">
                                                            Search
                                                        </span>
                                                        <input
                                                            type="text"
                                                            class="oe--input-field whitespace-nowrap overflow-hidden overflow-ellipsis appearance-none text-right"
                                                            min="0"
                                                            placeholder="0.00"
                                                            max="0"
                                                            value={
                                                                amountToInvest
                                                            }
                                                            onChange={async (
                                                                e
                                                            ) => {
                                                                console.log(
                                                                    e.target
                                                                        .value
                                                                );
                                                                const {
                                                                    value,
                                                                } = e.target;

                                                                const unformattedValue =
                                                                    unformatNumber(
                                                                        value
                                                                    );

                                                                const amount =
                                                                    formatNumber(
                                                                        unformattedValue
                                                                    );

                                                                setAmountToInvest(
                                                                    amount
                                                                );

                                                                setTotalTokens(
                                                                    Math.floor(
                                                                        unformattedValue /
                                                                            tokenPrice
                                                                    )
                                                                );
                                                            }}
                                                            style={{
                                                                fontSize:
                                                                    '2.1rem',
                                                            }}
                                                        />
                                                    </div>
                                                </form>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="absolute bottom-[-30px] left-1/2 mobile:left-[45%]">
                                    <span
                                        style={{
                                            boxSizing: 'border-box',
                                            display: 'inline-block',
                                            overflow: 'hidden',
                                            width: 'initial',
                                            height: 'initial',
                                            background: 'none',
                                            opacity: 1,
                                            border: '0px',
                                            margin: '0px',
                                            padding: '0px',
                                            position: 'relative',
                                            maxWidth: '100%',
                                        }}
                                    >
                                        <span
                                            style={{
                                                boxSizing: 'border-box',
                                                display: 'block',
                                                width: 'initial',
                                                height: 'initial',
                                                background: 'none',
                                                opacity: 1,
                                                border: '0px',
                                                margin: '0px',
                                                padding: '0px',
                                                maxWidth: '100%',
                                            }}
                                        >
                                            <img
                                                alt=""
                                                aria-hidden="true"
                                                src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2730%27%20height=%2730%27/%3e"
                                                style={{
                                                    display: 'block',
                                                    maxWidth: '100%',
                                                    width: 'initial',
                                                    height: 'initial',
                                                    background: 'none',
                                                    opacity: 1,
                                                    border: '0px',
                                                    margin: '0px',
                                                    padding: '0px',
                                                }}
                                            />
                                        </span>
                                        <img
                                            src="/icons/arrow-down.svg"
                                            decoding="async"
                                            data-nimg="intrinsic"
                                            className="z-10"
                                            style={{
                                                position: 'absolute',
                                                inset: '0px',
                                                boxSizing: 'border-box',
                                                padding: '0px',
                                                border: 'none',
                                                margin: 'auto',
                                                display: 'block',
                                                width: '0px',
                                                height: '0px',
                                                minWidth: '100%',
                                                maxWidth: '100%',
                                                minHeight: '100%',
                                                maxHeight: '100%',
                                            }}
                                            srcSet="/icons/arrow-down.svg 1x, /icons/arrow-down.svg 2x"
                                        />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div class="ml-[-3px] flex flex-col space-y-4 rounded-lg border border-[#E5E7EB] p-4 md:px-4 md:py-6">
                                    <div class="flex justify-between font-normal h-[24px]">
                                        <p class="text-[#626262] leading-[24px] flex text-lg mobile:text-base">
                                            Rate
                                        </p>
                                        <div class="text-[#626262] leading-[24px] text-lg flex">
                                            <div class="flex items-center">
                                                <div class="w-[175px] md:w-[197px]">
                                                    <span class="inline-flex items-center justify-end rounded-full text-[#626262] leading-[24px] text-lg font-normal mobile:w-auto mobile:text-base">
                                                        <span>1 GD30D ≈</span>
                                                        <span class="pl-1">
                                                            {`${tokenPrice} USDC`}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div class="flex h-[30px] w-[24px] items-center justify-center">
                                                    <span
                                                        style={{
                                                            boxSizing:
                                                                'border-box',
                                                            display:
                                                                'inline-block',
                                                            overflow: 'hidden',
                                                            width: 'initial',
                                                            height: 'initial',
                                                            background: 'none',
                                                            opacity: 1,
                                                            border: '0px',
                                                            margin: '0px',
                                                            padding: '0px',
                                                            position:
                                                                'relative',
                                                            maxWidth: '100%',
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
                                                                padding: '0px',
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
                                                            src="/icons/swap.svg"
                                                            decoding="async"
                                                            data-nimg="intrinsic"
                                                            className="cursor-pointer"
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                inset: '0px',
                                                                boxSizing:
                                                                    'border-box',
                                                                padding: '0px',
                                                                border: 'none',
                                                                margin: 'auto',
                                                                display:
                                                                    'block',
                                                                width: '0px',
                                                                height: '0px',
                                                                minWidth:
                                                                    '100%',
                                                                maxWidth:
                                                                    '100%',
                                                                minHeight:
                                                                    '100%',
                                                                maxHeight:
                                                                    '100%',
                                                            }}
                                                            srcSet="/icons/swap.svg 1x, /icons/swap.svg 2x"
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-x-1 w-[150px] mobile:w-[150px]">
                                            <span
                                                style={{
                                                    boxSizing: 'border-box',
                                                    display: 'inline-block',
                                                    overflow: 'hidden',
                                                    width: 'initial',
                                                    height: 'initial',
                                                    background: 'none',
                                                    opacity: 1,
                                                    border: '0px',
                                                    margin: '0px',
                                                    padding: '0px',
                                                    position: 'relative',
                                                    maxWidth: '100%',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        boxSizing: 'border-box',
                                                        display: 'block',
                                                        width: 'initial',
                                                        height: 'initial',
                                                        background: 'none',
                                                        opacity: 1,
                                                        border: '0px',
                                                        margin: '0px',
                                                        padding: '0px',
                                                        maxWidth: '100%',
                                                    }}
                                                >
                                                    <img
                                                        alt=""
                                                        aria-hidden="true"
                                                        src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2724%27%20height=%2724%27/%3e"
                                                        style={{
                                                            display: 'block',
                                                            maxWidth: '100%',
                                                            width: 'initial',
                                                            height: 'initial',
                                                            background: 'none',
                                                            opacity: 1,
                                                            border: '0px',
                                                            margin: '0px',
                                                            padding: '0px',
                                                        }}
                                                    />
                                                </span>
                                                <img
                                                    src="/_next/image?url=https%3A%2F%2Frawcdn.githack.com%2FOpenEdenHQ%2Fopeneden.assets%2F3d1a5c6201585fb7dbda6e900174389ac9a15b57%2Ficons%2Ftbill%2Ftbill_token_128.png&amp;w=48&amp;q=75"
                                                    decoding="async"
                                                    data-nimg="intrinsic"
                                                    style={{
                                                        position: 'absolute',
                                                        inset: '0px',
                                                        boxSizing: 'border-box',
                                                        padding: '0px',
                                                        border: 'none',
                                                        margin: 'auto',
                                                        display: 'block',
                                                        width: '0px',
                                                        height: '0px',
                                                        minWidth: '100%',
                                                        maxWidth: '100%',
                                                        minHeight: '100%',
                                                        maxHeight: '100%',
                                                    }}
                                                    srcSet="/logos/ARG.png"
                                                />
                                            </span>

                                            <span class="text-2xl font-medium">
                                                GD30D
                                            </span>
                                        </div>
                                        <div>
                                            <div class="flex justify-end h-9">
                                                <input
                                                    class="oe--input-field !w-[80%] !appearance-none !overflow-hidden !text-ellipsis !whitespace-nowrap !text-right !text-[36px] h-[36px] leading-[36px] !font-light !text-neutral-900/60"
                                                    inputmode="decimal"
                                                    autocomplete="off"
                                                    autocorrect="off"
                                                    type="text"
                                                    pattern="^[0-9]*[.,]?[0-9]*$"
                                                    placeholder="0"
                                                    minlength="1"
                                                    maxlength="79"
                                                    spellcheck="false"
                                                    readonly=""
                                                    value={totalTokens}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center">
                                <p class="mt-1 text-sm text-red-900">
                                    {`You will receive approximately ${totalTokens} GD30D. Read more`}
                                </p>
                                <a
                                    class="mt-1 ml-1 text-sm text-red-900 underline"
                                    href=""
                                >
                                    here
                                </a>
                                <p class="mt-1 text-sm text-red-900">.</p>
                            </div>
                        </div>

                        <div class="px-4 md:px-6">
                            <div class="mt-4 mb-7 w-full">
                                <button
                                    className={`w-full py-4 text-[22px] leading-[20px] font-semibold shadow-xl ${
                                        wallet.address ? 'bg-black' : 'bg-black' // Puedes ajustar los colores de fondo según tus necesidades
                                    } ${
                                        isDepositing
                                            ? 'bg-gray-500 cursor-not-allowed'
                                            : 'text-white'
                                    }`}
                                    onClick={(e) => {
                                        if (client) {
                                            if (client.status === 'approved') {
                                                handleSubmit(e);
                                            } else if (
                                                client.status === 'created'
                                            ) {
                                            } else if (
                                                client.status ===
                                                'pending_review'
                                            ) {
                                            } else {
                                                //alert('KYC Under Review');
                                            }
                                        } else {
                                            setOpenTermsOfUseModal(true);
                                        }
                                    }}
                                    disabled={isDepositing}
                                >
                                    {isDepositing ? (
                                        <span className="ml-2 inline-flex">
                                            <svg
                                                className="animate-spin h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <path
                                                    d="M15.9997 0L12.7997 3.19999H15.9997L15.9997 6.39998L19.1997 3.19999V0H15.9997Z"
                                                    fill="#FAFBFF"
                                                ></path>
                                                <path
                                                    d="M-0.000244141 16H13.737C15.1858 16 16.5753 15.4244 17.5997 14.4C18.6242 13.3755 19.1997 11.986 19.1997 10.5372L19.1997 6.39998H15.9997H9.59975L6.39976 9.59997H15.9997V10.0589C15.9997 10.7895 15.7095 11.4902 15.1929 12.0068C14.6844 12.5153 13.9972 12.8048 13.2782 12.8135L3.06305 12.9367L-0.000244141 16Z"
                                                    fill="#FAFBFF"
                                                ></path>
                                            </svg>
                                        </span>
                                    ) : client ? (
                                        client.status === 'created' ? (
                                            <a
                                                href={client.kyc_url}
                                                target="_blank"
                                                style={{
                                                    display: 'block',
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                                onClick={() => {
                                                    socket.emit('start-kyc', {
                                                        address: wallet.address,
                                                    });
                                                }}
                                            >
                                                SIGN UP
                                            </a>
                                        ) : client.status === 'approved' ? (
                                            'BID' //ASK
                                        ) : client.status ===
                                          'pending_onboarding' ? (
                                            <a
                                                href={client.kyc_url}
                                                target="_blank"
                                                style={{
                                                    display: 'block',
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            >
                                                PENDING ONBOARDING
                                            </a>
                                        ) : (
                                            'PENDING REVIEW'
                                        )
                                    ) : (
                                        'CONNECT WALLET'
                                    )}
                                </button>
                            </div>
                        </div>
                        <div class="flex justify-between px-6 pb-7 font-normal">
                            <p class="text-[#626262] text-base leading-[20px]">
                                Estimated Fees
                            </p>
                            <p class="text-[#626262] text-base leading-[20px]">
                                0 USDC
                            </p>
                        </div>
                    </div>
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
                    <TransactionConfirmationModal
                        isOpen={openTransactionConfirmationModal}
                        onClose={() =>
                            setOpenTransactionConfirmationModal(false)
                        }
                        closeModal={() =>
                            setOpenTransactionConfirmationModal(false)
                        }
                    />
                    {showKycNotification && <Notification />}
                </div>
            ) : null}
        </>
    );
};

export default TransactionPanel;
