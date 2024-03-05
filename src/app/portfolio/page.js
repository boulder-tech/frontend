'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { useGlobalContext } from '../context/store';
import Transactions from '../../components/Transactions';
import Transaction from '../../components/Transaction';

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

Number.prototype.round = function (decimals) {
    if (isNaN(this)) return NaN;
    const factor = Math.pow(10, decimals);
    return Math.round(this * factor) / factor;
};

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const Portfolio = ({}) => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const { wallet, setWallet } = useGlobalContext();
    const [totalBalance, setTotalBalance] = useState(0);
    const [balances, setBalances] = useState({});
    const [price, setPrice] = useState(0);
    const [tokenInfo, setTokenInfo] = useState({})

    /*
    useEffect(() => {
        fetchToken();
    },[])
    */
    
    const fetchToken = async () => {
        console.log('FETCH TOKEN')
        const {
            data  : {token}
        } = await axios.get(`${backendUrl}/api/deployed-token/GD30D`);

        console.log('token', token);

        setTokenInfo(token)
    };

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const fetchData = async () => {
        await fetchTransactions(wallet.address);
        await fetchBalance();
        await fetchTokenPrice('GD30D');
    }

    useEffect(() => {
        if (wallet.address) {
            fetchToken();
        } 
    }, [wallet]);

    useEffect(() => {
        if(Object.keys(tokenInfo).length) {
            fetchData();
        }

        setTransactions([
            {
                hash: '0xb5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838',
                hash_mint: '0x956829212332bf9a22ef7e35f0c60d91e237770bfa2b33b1ad55ee0ab3d7f4e3',
                amount_stable: 100,
                type_stable: 'USDC',
                token: 'GD30D',
                token_minted: 2.2,
                status: 'tokens_minted',
                createdAt: '2024-02-10T10:12:09'
            },
            {
                hash: '0xb5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838',
                hash_mint: null,
                amount_stable: 500,
                type_stable: 'USDC',
                token: 'GD30D',
                token_minted: 0,
                status: 'pending_mint',
                createdAt: '2024-02-08T12:15:00'
            },
            {
                hash: '0xb5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838',
                hash_mint: null,
                amount_stable: 1500,
                type_stable: 'USDC',
                token: 'GD30D',
                token_minted: 0,
                status: 'pending_mint',
                createdAt: '2024-02-01T10:25:00'
            },
            {
                hash: '0xb5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838',
                hash_mint: '0x956829212332bf9a22ef7e35f0c60d91e237770bfa2b33b1ad55ee0ab3d7f4e3',
                amount_stable: 100,
                type_stable: 'USDC',
                token: 'GD30D',
                token_minted: 2.2,
                status: 'tokens_minted',
                createdAt: '2024-02-10T10:12:09'
            },
            {
                hash: '0xb5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838',
                hash_mint: null,
                amount_stable: 500,
                type_stable: 'USDC',
                token: 'GD30D',
                token_minted: 0,
                status: 'pending_mint',
                createdAt: '2024-02-08T12:15:00'
            },
            {
                hash: '0xb5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8cd032f768fc5219838',
                hash_mint: null,
                amount_stable: 1500,
                type_stable: 'USDC',
                token: 'GD30D',
                token_minted: 0,
                status: 'pending_mint',
                createdAt: '2024-02-01T10:25:00'
            }
        ]);
    },[tokenInfo])

    useEffect(() => {
        console.log('PRICE UPDATED', price)
        console.log('BALANCE', balances['GD30D']);
        setTotalBalance(((balances['GD30D'] ? balances['GD30D'].total : 0) * price).round(2))
    },[price])

    const fetchTransactions = async (address) => {
        try {
            const {
                data: { transactions },
            } = await axios.get(`${backendUrl}/api/transaction/address/${address}`);

            if(transactions)
                setTransactions(transactions);
        }
        catch(e) {
            console.log('Error', e)
        }
    };

    const fetchTokenPrice = async (name) => {
        const {
            data: { price, price_24h, last_24h },
        } = await axios.get(`${backendUrl}/api/asset/name/${name}`);

        setPrice(price.round(2));
    };

    const GD30D_address = '0x877dA68B841430d51C8143d18ad85778681096Ad';

    const GD30D_Abi = [
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function decimals() view returns (uint8)',
        'function balanceOf(address) view returns (uint)',
        'function totalSupply() view returns (uint256)',
        'function transfer(address to, uint amount)',
    ];

    const fetchBalance = async () => {
        try {
            console.log('token info', tokenInfo)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const GD30D_contract = new ethers.Contract(
                tokenInfo.token_address,
                GD30D_Abi,
                provider
            );

            const GD30D_balance = await GD30D_contract.balanceOf(
                signer.getAddress()
            );

            console.log('ADDRESS', signer.getAddress())

            console.log('GD30D_balance', GD30D_balance)

            const decimals = await GD30D_contract.decimals();

            console.log('decimals', decimals)

            const balance = GD30D_balance / 10**decimals;

            console.log('BALANCE', balance)
            
            setBalances({'GD30D': { total: balance }})

           
            //setBalance(balance);

            //return balance;
        } catch (e) {
            console.log('ERROR', e)
            return 0;
        }
    };

    return (
        
            <div class="mx-auto mb-0 flex w-full flex-col text-black">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-dark-top-right-2"></div>
                <div style={{ opacity: 1, transform: 'none' }}>
                    <div
                        class="z-0 w-full pt-[40px] pb-8 border-t border-[#CFD9E2]"
                        id="portfolio"
                    >
                        <div class="pt-0 pb-8">
                            <div class="sticky top-0 mx-auto max-w-[1644px] px-4 xl:px-0">
                                <div className="flex flex-col">
                                <div className="h-[25%]">
                                    <h1 class="mb-[32px] text-2xl font-bold text-[#FAFBFF] mix-blend-difference">
                                        YOUR PORTFOLIO
                                    </h1>
                                    <div class="grid w-full h-[163px] grid-cols-3 grid-flow-col gap-9 pb-8 px-[38px]">
                                        <div className="grid w-full h-full border rounded-2xl shadow-2xl text-white relative bg-[#FAFBFF] bg-opacity-5">
                                            <div className="absolute top-0 left-0 w-full h-full p-4 leading-tight">
                                                <div className="h-full">
                                                    <div className="p-0">
                                                        Total balance
                                                    </div>
                                                    <div className="text-[48px] text-bold text-[#FAFBFF]">
                                                        ${totalBalance}
                                                    </div>
                                                    <div className="text-[20px] text-bold text-[#FAFBFF]">
                                                        0
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid w-full h-full border rounded-2xl shadow-2xl text-white relative bg-[#FAFBFF] bg-opacity-5">
                                            <div className="absolute top-0 left-0 w-full h-full p-4 leading-tight">
                                                <div className="h-full">
                                                    <div className="p-0">
                                                        Availabe GD30D balance
                                                    </div>
                                                    <div className="text-[48px] text-bold text-[#FAFBFF]">
                                                        {balances['GD30D'] ? balances['GD30D'].total : 0}
                                                    </div>
                                                    <div className="text-bold text-[#FAFBFF]">
                                                        {`$${(balances['GD30D'] ? balances['GD30D'].total * price : 0).round(2)}`}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid w-full h-full border rounded-2xl shadow-2xl text-white relative bg-[#FAFBFF] bg-opacity-5">
                                            <div className="absolute top-0 left-0 w-full h-full p-4 leading-tight">
                                                <div className="h-full">
                                                    <div className="p-0">
                                                        Available TBILL Balance
                                                    </div>
                                                    <div className="text-[48px] text-bold text-[#FAFBFF]">
                                                        -
                                                    </div>
                                                    <div className="text-bold text-[#FAFBFF]">
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[75%] px-[38px]">
                                    <h1 class="mb-[32px] text-2xl font-bold text-white">
                                        ACTIVITY
                                    </h1>
                                    {transactions.length ? (
                                        <Transactions>
                                            {transactions.map((transaction) => (
                                                <Transaction
                                                    transaction={transaction}
                                                />
                                            ))}
                                        </Transactions>
                                    ) : (
                                        <div class="mb-[150px] mt-[53px] flex flex-col items-center justify-center">
                                            <img
                                                src="/illustrations/noTransaction.svg"
                                                alt="noTransaction"
                                            />
                                            <div class="mt-6 flex-col text-center">
                                                <p class="text-2xl font-bold leading-[34px]">
                                                    No transactions found!
                                                </p>
                                                <a
                                                    href="/"
                                                    class="mt-2 text-xl font-normal leading-[30px] underline"
                                                >
                                                    Mint your first RWA token
                                                    now
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
    );
};

export default Portfolio;
