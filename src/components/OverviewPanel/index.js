import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

const OverviewPanel = ({ token }) => {
    const [tokenInfo, setTokenInfo] = useState({})

    useEffect(() => {
        fetchToken();
    },[])
    
    
    const fetchToken = async (address) => {
        try {
            const { data: { token } } = await axios.get(`${backendUrl}/api/deployed-token/GD30D`);

            if (token) 
                setTokenInfo(token);
        } catch(e) {
            console.log('FETCH TOKEN ERROR', e)
        }
    };
    
    
    const products = {
        GD30D: `The GD30D is a tokenized bond product available on BoulderTech's platform. It represents a digital version of the "Bono USD 2030 Ley NY (GD30)," a U.S. dollar-denominated public bond from Argentina with a fixed annual interest rate of 0.75%, maturing in 2030. The bond's original value is 100.00 dollars, and it is currently trading at a lower market price, offering potential for investment gains. By tokenizing this bond, BoulderTech makes it accessible for fractional ownership and trading on the blockchain, providing liquidity and global accessibility.`,
        TBILL: `The TBill, or Treasury Bill, is a short-term U.S. government debt security, often regarded as one of the safest investments. These bills are issued with maturities ranging from a few days to one year and are sold at a discount to their face value. Upon maturity, the government pays the holder the full face value, with the difference between the purchase price and the face value constituting the interest earned. TBills are highly liquid and are commonly used by investors as a temporary investment for idle funds, offering a reliable return with virtually no risk of default, due to their backing by the full faith and credit of the U.S. government. This makes them a cornerstone in conservative investment strategies and a benchmark for short-term interest rates.`,
    };

    return (
        <div id="overview">
            <div class="flex flex-col md:space-x-0 lg:flex-row lg:space-x-10 mobile:space-x-0 pt-10 pb-0 md:pb-[118px]">
                <div class="flex-1">
                    <div>
                        <p class="max-w-full text-lg font-normal leading-7">
                            {products[token]}
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
                                                src="/_next/image?url=https%3A%2F%2Frawcdn.githack.com%2FOpenEdenHQ%2Fopeneden.assets%2F3d1a5c6201585fb7dbda6e900174389ac9a15b57%2Ficons%2Ftbill%2Ftbill_token_128.png&w=48&q=75"
                                                decoding="async"
                                                data-nimg="intrinsic"
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    boxSizing: 'border-box',
                                                    padding: 0,
                                                    border: 'none',
                                                    margin: 'auto',
                                                    display: 'block',
                                                    width: 0,
                                                    height: 0,
                                                    minWidth: '100%',
                                                    maxWidth: '100%',
                                                    minHeight: '100%',
                                                    maxHeight: '100%',
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
                                    <a
                                        class="font-semibold underline ml-1"
                                        href={`https://sepolia.etherscan.io/address/${tokenInfo.token_address}}`}
                                        target="_blank"
                                    >
                                        {tokenInfo.token_address}
                                    </a>
                                </div>
                            </span>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default OverviewPanel;
