'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/store';
import Transactions from '../../components/Transactions';
import Transaction from '../../components/Transaction';

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

const Portfolio = ({}) => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const { wallet, setWallet } = useGlobalContext();

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    useEffect(() => {
        if (wallet.address) {
            console.log(wallet.address);
            fetchTransactions(wallet.address);
        }
    }, [wallet]);

    const fetchTransactions = async (address) => {
        const {
            data: { transactions },
        } = await axios.get(`${backendUrl}/api/transaction/${address}`);

        console.log('transactions', transactions);

        setTransactions(transactions);
    };

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
                            <p class="text-base font-semibold">Products</p>
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
            <div class="mx-auto mb-0 flex w-full flex-col bg-white text-black">
                <div style={{ opacity: 1, transform: 'none' }}>
                    <div
                        class="z-0 w-full pt-[40px] pb-8 border-t border-[#CFD9E2]"
                        id="portfolio"
                    >
                        <div class="overflow-hidden pt-0 pb-8">
                            <div class="mx-auto max-w-[1200px] px-4 xl:px-0">
                                <div>
                                    <h1 class="mb-[14px] text-2xl font-medium">
                                        YOUR PORTFOLIO
                                    </h1>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10 undefined">
                                        <div
                                            class="flex flex-col justify-start styles_grid-item__7lDCy"
                                            id="Total balance"
                                        >
                                            <div class="flex items-center text-sm font-normal leading-[22px]">
                                                <span
                                                    class="cursor-pointer decoration-black decoration-dotted underline underline-offset-[6px]"
                                                    data-tooltip-id="oe-tooltip-total tbill balance"
                                                >
                                                    Total balance
                                                </span>
                                            </div>
                                            <div class="text-[28px] font-semibold mb-[1px] flex gap-x-3">
                                                <div>
                                                    <div
                                                        style={{
                                                            height: '48px',
                                                            lineHeight: '48px',
                                                            overflow: 'hidden',
                                                            position:
                                                                'relative',
                                                            width: '16px',
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
                                                            0
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
                                                                opacity: 1,
                                                                transform:
                                                                    'none',
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
                                                    </div>
                                                </div>
                                            </div>
                                            <p>0</p>
                                        </div>
                                        <div
                                            class="flex flex-col justify-start styles_grid-item__7lDCy"
                                            id="Availabe TBILL balance"
                                        >
                                            <div class="flex items-center text-sm font-normal leading-[22px]">
                                                <span
                                                    class="cursor-pointer decoration-black decoration-dotted underline underline-offset-[6px]"
                                                    data-tooltip-id="oe-tooltip-availabe tbill balance"
                                                >
                                                    Availabe GD30D balance
                                                </span>
                                            </div>
                                            <div class="text-[28px] font-semibold mb-[1px] flex gap-x-3">
                                                <div>
                                                    <div
                                                        style={{
                                                            height: '48px',
                                                            lineHeight: '48px',
                                                            overflow: 'hidden',
                                                            position:
                                                                'relative',
                                                            width: '16px',
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
                                                            0
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
                                                                opacity: 1,
                                                                transform:
                                                                    'none',
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
                                                    </div>
                                                </div>
                                            </div>
                                            <p>$0</p>
                                        </div>
                                        <div
                                            class="flex flex-col justify-start styles_grid-item__7lDCy"
                                            id="Available TBILL Balance"
                                        >
                                            <div class="flex items-center text-sm font-normal leading-[22px]">
                                                <span
                                                    class="cursor-pointer decoration-black decoration-dotted underline underline-offset-[6px]"
                                                    data-tooltip-id="oe-tooltip-cumulative swap p/l"
                                                >
                                                    Available TBILL Balance
                                                </span>
                                            </div>
                                            <div class="text-[28px] font-semibold mb-[1px] flex gap-x-3">
                                                <div>
                                                    <div
                                                        style={{
                                                            height: '48px',
                                                            lineHeight: '48px',
                                                            overflow: 'hidden',
                                                            position:
                                                                'relative',
                                                            width: '12px',
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
                                                            -
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
                                                                width: '11.312px',
                                                                opacity: 1,
                                                                transform:
                                                                    'none',
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
                                                                            'translateY(-92.3077%) translateZ(0px)',
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
                                <section class="mt-10">
                                    <h1 class="mb-[14px] text-2xl font-medium">
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
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Portfolio;
