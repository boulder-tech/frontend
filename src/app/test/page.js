'use client';

import React from 'react';
import AlertPanel from '../../components/AlertPanel';

const Test = () => {
    return <div className="mx-16 flex flex-col h-[calc(98vh-4rem)]">
        <div className="h-[13.5%] flex w-full">           
            <div className="w-[19%] h-full pt-6 sticky">
                <p className="text-[32px] text-[#FAFBFF] font-bold">PRODUCTS</p>
            </div>
            <div className="w-[81%] h-full pt-9 sticky">
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
            </div>
        </div>
        <div className="h-[86.5%] w-full">
            <div className="grid grid-cols-3 gap-6">
                <div className="h-[309px] border rounded-xl shadow-2xl bg-[#FAFBFF] bg-opacity-5">
                    <div className="flex flex-col w-full h-full">
                        <div className="h-1/3 flex w-full">
                            <div className="w-[16%] pl-[3%] pt-4 sticky">
                                <img className="w-[60px] h-[60px]" src="/logos/ARG.png"/>
                            </div>
                            <div className="w-[84%] pt-4 sticky">
                                <p className="text-[#FAFBFF] text-[24px] font-medium leading-6">GD30D</p>
                                <p className="text-[#FAFBFF] text-[16px] font-normal">Argentinian government bond USD 2030 Law NY (GD30).</p>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] pl-[6%]">
                                <p className="text-[40px] font-medium text-[#FAFBFF]">$48.9</p>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Estimated YTM</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">5.31%</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] flex">
                                <div className="w-[70%] h-full pl-[13%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl" href="/product/GD30D">
                                            <button className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl"> SEE MORE</button>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-[30%] h-full pt-[1.2%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#FF20F6] w-[66px] h-[45px] rounded-xl bg-opacity-15 border inline-flex items-center justify-center" href="https://sepolia.etherscan.io/address/0x2c137DdB30757e70e4cC491B0d47082996144E37%7D" target="_blank" rel="noopener noreferrer">
                                            <img src="/icons/view-on-explorer.svg" alt="Explorer Icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Total Value Locked</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">$24,773,532</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[309px] border rounded-xl shadow-2xl bg-[#FAFBFF] bg-opacity-5">
                    <div className="flex flex-col w-full h-full">
                        <div className="h-1/3 flex w-full">
                            <div className="w-[16%] pl-[3%] pt-4 sticky">
                                <img className="w-[60px] h-[60px]" src="/logos/USA_new.png"/>
                            </div>
                            <div className="w-[84%] pt-4 sticky">
                                <p className="text-[#FAFBFF] text-[24px] font-medium leading-6">T-BILL</p>
                                <p className="text-[#FAFBFF] text-[16px] font-normal">U.S. government debt backed by the Treasury Department.</p>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] pl-[6%]">
                                <p className="text-[40px] font-medium text-[#FAFBFF]">5.37%</p>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Estimated YTM</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">5.31%</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] flex">
                                <div className="w-[70%] h-full pl-[13%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl" href="/product/GD30D">
                                            <button className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl"> SEE MORE</button>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-[30%] h-full pt-[1.2%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#FF20F6] w-[66px] h-[45px] rounded-xl bg-opacity-15 border inline-flex items-center justify-center" href="https://sepolia.etherscan.io/address/0x2c137DdB30757e70e4cC491B0d47082996144E37%7D" target="_blank" rel="noopener noreferrer">
                                            <img src="/icons/view-on-explorer.svg" alt="Explorer Icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Total Value Locked</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">$24,773,532</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-[309px] border rounded-xl shadow-2xl bg-[#FAFBFF] bg-opacity-5">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-white pt-[10%]">
                        <img className="w-[80px] h-[80px] mb-[25%]" src="/icons/clock.svg"/>
                        <p className="text-[21px]"> Coming Soon</p>
                    </div>
                    <div className="flex flex-col w-full h-full blur ">
                        <div className="h-1/3 flex w-full">
                            <div className="w-[16%] pl-[3%] pt-4 sticky">
                                <img src="/logos/ARG.png"/>
                            </div>
                            <div className="w-[84%] pt-4 sticky">
                                <p className="text-[#FAFBFF] text-[24px] font-medium leading-6">GD30D</p>
                                <p className="text-[#FAFBFF] text-[16px] font-normal">Argentinian government bond USD 2030 Law NY (GD30).</p>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] pl-[6%]">
                                <p className="text-[40px] font-medium text-[#FAFBFF]">$43.5</p>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Estimated YTM</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">5.31%</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] flex">
                                <div className="w-[70%] h-full pl-[13%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl" href="/product/GD30D">
                                            <button className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl"> SEE MORE</button>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-[30%] h-full pt-[1.2%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#FF20F6] w-[66px] h-[45px] rounded-xl bg-opacity-15 border inline-flex items-center justify-center" href="https://sepolia.etherscan.io/address/0x2c137DdB30757e70e4cC491B0d47082996144E37%7D" target="_blank" rel="noopener noreferrer">
                                            <img src="/icons/view-on-explorer.svg" alt="Explorer Icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Total Value Locked</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">$24,773,532</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-[309px] border rounded-xl shadow-2xl bg-[#FAFBFF] bg-opacity-5">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-white pt-[10%]">
                        <img className="w-[80px] h-[80px] mb-[25%]" src="/icons/clock.svg"/>
                        <p className="text-[21px]"> Coming Soon</p>
                    </div>
                    <div className="flex flex-col w-full h-full blur ">
                        <div className="h-1/3 flex w-full">
                            <div className="w-[16%] pl-[3%] pt-4 sticky">
                                <img src="/logos/ARG.png"/>
                            </div>
                            <div className="w-[84%] pt-4 sticky">
                                <p className="text-[#FAFBFF] text-[24px] font-medium leading-6">GD30D</p>
                                <p className="text-[#FAFBFF] text-[16px] font-normal">Argentinian government bond USD 2030 Law NY (GD30).</p>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] pl-[6%]">
                                <p className="text-[40px] font-medium text-[#FAFBFF]">$43.5</p>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Estimated YTM</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">5.31%</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] flex">
                                <div className="w-[70%] h-full pl-[13%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl" href="/product/GD30D">
                                            <button className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl"> SEE MORE</button>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-[30%] h-full pt-[1.2%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#FF20F6] w-[66px] h-[45px] rounded-xl bg-opacity-15 border inline-flex items-center justify-center" href="https://sepolia.etherscan.io/address/0x2c137DdB30757e70e4cC491B0d47082996144E37%7D" target="_blank" rel="noopener noreferrer">
                                            <img src="/icons/view-on-explorer.svg" alt="Explorer Icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Total Value Locked</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">$24,773,532</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-[309px] border rounded-xl shadow-2xl bg-[#FAFBFF] bg-opacity-5">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-white pt-[10%]">
                        <img className="w-[80px] h-[80px] mb-[25%]" src="/icons/clock.svg"/>
                        <p className="text-[21px]"> Coming Soon</p>
                    </div>
                    <div className="flex flex-col w-full h-full blur ">
                        <div className="h-1/3 flex w-full">
                            <div className="w-[16%] pl-[3%] pt-4 sticky">
                                <img src="/logos/ARG.png"/>
                            </div>
                            <div className="w-[84%] pt-4 sticky">
                                <p className="text-[#FAFBFF] text-[24px] font-medium leading-6">GD30D</p>
                                <p className="text-[#FAFBFF] text-[16px] font-normal">Argentinian government bond USD 2030 Law NY (GD30).</p>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] pl-[6%]">
                                <p className="text-[40px] font-medium text-[#FAFBFF]">$43.5</p>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Estimated YTM</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">5.31%</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] flex">
                                <div className="w-[70%] h-full pl-[13%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl" href="/product/GD30D">
                                            <button className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl"> SEE MORE</button>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-[30%] h-full pt-[1.2%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#FF20F6] w-[66px] h-[45px] rounded-xl bg-opacity-15 border inline-flex items-center justify-center" href="https://sepolia.etherscan.io/address/0x2c137DdB30757e70e4cC491B0d47082996144E37%7D" target="_blank" rel="noopener noreferrer">
                                            <img src="/icons/view-on-explorer.svg" alt="Explorer Icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Total Value Locked</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">$24,773,532</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-[309px] border rounded-xl shadow-2xl bg-[#FAFBFF] bg-opacity-5">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-white pt-[10%]">
                        <img className="w-[80px] h-[80px] mb-[25%]" src="/icons/clock.svg"/>
                        <p className="text-[21px]"> Coming Soon</p>
                    </div>
                    <div className="flex flex-col w-full h-full blur ">
                        <div className="h-1/3 flex w-full">
                            <div className="w-[16%] pl-[3%] pt-4 sticky">
                                <img src="/logos/ARG.png"/>
                            </div>
                            <div className="w-[84%] pt-4 sticky">
                                <p className="text-[#FAFBFF] text-[24px] font-medium leading-6">GD30D</p>
                                <p className="text-[#FAFBFF] text-[16px] font-normal">Argentinian government bond USD 2030 Law NY (GD30).</p>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] pl-[6%]">
                                <p className="text-[40px] font-medium text-[#FAFBFF]">$43.5</p>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Estimated YTM</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">5.31%</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] flex">
                                <div className="w-[70%] h-full pl-[13%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl" href="/product/GD30D">
                                            <button className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl"> SEE MORE</button>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-[30%] h-full pt-[1.2%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#FF20F6] w-[66px] h-[45px] rounded-xl bg-opacity-15 border inline-flex items-center justify-center" href="https://sepolia.etherscan.io/address/0x2c137DdB30757e70e4cC491B0d47082996144E37%7D" target="_blank" rel="noopener noreferrer">
                                            <img src="/icons/view-on-explorer.svg" alt="Explorer Icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Total Value Locked</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">$24,773,532</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-[309px] border rounded-xl shadow-2xl bg-[#FAFBFF] bg-opacity-5">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-white pt-[10%]">
                        <img className="w-[80px] h-[80px] mb-[25%]" src="/icons/clock.svg"/>
                        <p className="text-[21px]"> Coming Soon</p>
                    </div>
                    <div className="flex flex-col w-full h-full blur ">
                        <div className="h-1/3 flex w-full">
                            <div className="w-[16%] pl-[3%] pt-4 sticky">
                                <img src="/logos/ARG.png"/>
                            </div>
                            <div className="w-[84%] pt-4 sticky">
                                <p className="text-[#FAFBFF] text-[24px] font-medium leading-6">GD30D</p>
                                <p className="text-[#FAFBFF] text-[16px] font-normal">Argentinian government bond USD 2030 Law NY (GD30).</p>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] pl-[6%]">
                                <p className="text-[40px] font-medium text-[#FAFBFF]">$43.5</p>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Estimated YTM</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">5.31%</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] flex">
                                <div className="w-[70%] h-full pl-[13%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl" href="/product/GD30D">
                                            <button className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl"> SEE MORE</button>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-[30%] h-full pt-[1.2%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#FF20F6] w-[66px] h-[45px] rounded-xl bg-opacity-15 border inline-flex items-center justify-center" href="https://sepolia.etherscan.io/address/0x2c137DdB30757e70e4cC491B0d47082996144E37%7D" target="_blank" rel="noopener noreferrer">
                                            <img src="/icons/view-on-explorer.svg" alt="Explorer Icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Total Value Locked</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">$24,773,532</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-[309px] border rounded-xl shadow-2xl bg-[#FAFBFF] bg-opacity-5">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-white pt-[10%]">
                        <img className="w-[80px] h-[80px] mb-[25%]" src="/icons/clock.svg"/>
                        <p className="text-[21px]"> Coming Soon</p>
                    </div>
                    <div className="flex flex-col w-full h-full blur ">
                        <div className="h-1/3 flex w-full">
                            <div className="w-[16%] pl-[3%] pt-4 sticky">
                                <img src="/logos/ARG.png"/>
                            </div>
                            <div className="w-[84%] pt-4 sticky">
                                <p className="text-[#FAFBFF] text-[24px] font-medium leading-6">GD30D</p>
                                <p className="text-[#FAFBFF] text-[16px] font-normal">Argentinian government bond USD 2030 Law NY (GD30).</p>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] pl-[6%]">
                                <p className="text-[40px] font-medium text-[#FAFBFF]">$43.5</p>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Estimated YTM</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">5.31%</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] flex">
                                <div className="w-[70%] h-full pl-[13%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl" href="/product/GD30D">
                                            <button className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl"> SEE MORE</button>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-[30%] h-full pt-[1.2%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#FF20F6] w-[66px] h-[45px] rounded-xl bg-opacity-15 border inline-flex items-center justify-center" href="https://sepolia.etherscan.io/address/0x2c137DdB30757e70e4cC491B0d47082996144E37%7D" target="_blank" rel="noopener noreferrer">
                                            <img src="/icons/view-on-explorer.svg" alt="Explorer Icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Total Value Locked</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">$24,773,532</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-[309px] border rounded-xl shadow-2xl bg-[#FAFBFF] bg-opacity-5">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-white pt-[10%]">
                        <img className="w-[80px] h-[80px] mb-[25%]" src="/icons/clock.svg"/>
                        <p className="text-[21px]"> Coming Soon</p>
                    </div>
                    <div className="flex flex-col w-full h-full blur ">
                        <div className="h-1/3 flex w-full">
                            <div className="w-[16%] pl-[3%] pt-4 sticky">
                                <img src="/logos/ARG.png"/>
                            </div>
                            <div className="w-[84%] pt-4 sticky">
                                <p className="text-[#FAFBFF] text-[24px] font-medium leading-6">GD30D</p>
                                <p className="text-[#FAFBFF] text-[16px] font-normal">Argentinian government bond USD 2030 Law NY (GD30).</p>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] pl-[6%]">
                                <p className="text-[40px] font-medium text-[#FAFBFF]">$43.5</p>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Estimated YTM</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">5.31%</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-1/3 flex w-full sticky">
                            <div className="w-[50%] flex">
                                <div className="w-[70%] h-full pl-[13%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl" href="/product/GD30D">
                                            <button className="bg-[#245BFF] w-[151px] h-[53px] text-[#FAFBFF] text-[18px] font-bold rounded-xl"> SEE MORE</button>
                                        </a>
                                    </div>
                                </div>
                                <div className="w-[30%] h-full pt-[1.2%]">
                                    <div className="inline-block w-full h-full">
                                        <a className="bg-[#FF20F6] w-[66px] h-[45px] rounded-xl bg-opacity-15 border inline-flex items-center justify-center" href="https://sepolia.etherscan.io/address/0x2c137DdB30757e70e4cC491B0d47082996144E37%7D" target="_blank" rel="noopener noreferrer">
                                            <img src="/icons/view-on-explorer.svg" alt="Explorer Icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[50%]">
                                <div className="w-[227px] h-[78px] bg-[#FAFBFF] bg-opacity-5 border rounded-xl py-3 px-4">
                                    <p className="text-[#FFFFFF] text-[13px]">Total Value Locked</p>
                                    <p className="text-[28px] text-[#FAFBFF] font-bold leading-6">$24,773,532</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Test;