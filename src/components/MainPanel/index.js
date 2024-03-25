import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { ethers } from 'ethers';
import { useGlobalContext } from '../../app/context/store';

Number.prototype.round = function (decimals) {
    if (isNaN(this)) return NaN;
    const factor = Math.pow(10, decimals);
    return Math.round(this * factor) / factor;
};

const GD30D_Abi = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function balanceOf(address) view returns (uint)',
    'function totalSupply() view returns (uint256)',
    'function transfer(address to, uint amount)',
];

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

const MainPanel = () => {
    const { wallet, setWallet } = useGlobalContext();
    const [totalBalance, setTotalBalance] = useState(0);
    const [balances, setBalances] = useState({});
    const [price, setPrice] = useState(0);
    const [tokenInfo, setTokenInfo] = useState({});

    useEffect(() => {
        if (wallet.address) {
            fetchToken();
        } 
    }, [wallet]);

    useEffect(() => {
        if(Object.keys(tokenInfo).length) {
            fetchData();
        }
    },[tokenInfo])

    useEffect(() => {
        console.log('PRICE UPDATED', price)
        console.log('BALANCE', balances['GD30D']);
        setTotalBalance(((balances['GD30D'] ? balances['GD30D'].total : 0) * price).round(2))
    },[price])

    const fetchToken = async () => {
        console.log('FETCH TOKEN')
        const {
            data  : {token}
        } = await axios.get(`${backendUrl}/api/deployed-token/GD30D`);

        console.log('token', token);

        setTokenInfo(token)
    };

    const fetchTokenPrice = async (name) => {
        const {
            data: { price, price_24h, last_24h },
        } = await axios.get(`${backendUrl}/api/asset/name/${name}`);

        setPrice(price.round(2));
    };

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

    const fetchData = async () => {
        await fetchBalance();
        await fetchTokenPrice('GD30D');
    }


    return <div className="w-full h-full flex flex-col gap-8 pb-8"> 
        <div className="w-[406px] h-[139px] border rounded-2xl shadow-2xl text-white relative bg-[#FAFBFF] bg-opacity-5">
            <div className="absolute top-0 left-0 w-full h-full p-4">
                <div className="h-full">
                    <div className="p-0">
                        Total balance
                    </div>
                    <div className="text-[48px] text-bold text-[#FAFBFF]">
                        ${totalBalance}
                    </div>
                </div>
            </div>
        </div>
        <div className="grid w-[406px] h-[139px] border rounded-2xl shadow-2xl text-white relative bg-[#FAFBFF] bg-opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-fractal p-4">
                <div className="h-full">
                    <div className="p-0">
                        Available GD30D balance
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
        <div className="grid w-[406px] h-[139px] border rounded-2xl shadow-2xl text-white relative bg-[#FAFBFF] bg-opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-fractal p-4">
                <div className="h-full">
                    <div className="p-0">
                        Available GD30D balance
                    </div>
                    <div className="text-[48px] text-bold text-[#FAFBFF]">
                        -
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default MainPanel;