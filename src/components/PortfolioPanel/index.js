import React, { useState } from 'react';

const PortfolioPanel = ({ icon, children }) => {
    return (
        <div id="portfolio">
            <div class="relative">
                <div class="flex flex-col lg:flex-row justify-between lg:border-b lg:border-b-[#CFD9E2] gap-y-10 gap-x-0">
                    <div class="flow-root md:border-b-0">
                        <div class="w-full md:w-[336px] lg:border-r lg:border-r-[#CFD9E2] border-r-none pt-6 md:pt-10 pr-6 h-auto lg:h-[431px]">
                            <h3 class="text-[22px] leading-[32px] font-medium">
                                PORTFOLIO
                            </h3>
                            <div class="pb-8 md:pb-10 border-b border-b-[#CFD9E2] text-[#626262] font-normal text-[14px]">
                                Last updated 09/01/2024
                            </div>
                            <div class="flex items-center justify-between py-4 border-b border-b-[#CFD9E2]">
                                <div class="">
                                    <span
                                        class="cursor-pointer underline underline-offset-8 decoration-black decoration-dotted"
                                        data-tooltip-id="oe-tooltip-ey"
                                    >
                                        Estimated YTM
                                    </span>
                                </div>
                                <h3 class="text-base font-medium leading-[24px]">
                                    5.31%
                                </h3>
                            </div>
                            <div class="flex items-center justify-between py-4 border-b border-b-[#CFD9E2]">
                                <div class="">
                                    <span
                                        class="cursor-pointer underline underline-offset-8 decoration-black decoration-dotted"
                                        data-tooltip-id="oe-tooltip-wam"
                                    >
                                        Weighted Average Maturity
                                    </span>
                                </div>
                                <h3 class="text-base font-medium leading-[24px]">
                                    0.12 yr
                                </h3>
                            </div>
                            <div class="flex items-center justify-between py-4 border-b border-b-[#CFD9E2]">
                                <div class="">
                                    <span
                                        class="cursor-pointer underline underline-offset-8 decoration-black decoration-dotted"
                                        data-tooltip-id="oe-tooltip-ur"
                                    >
                                        Utilization Rate
                                    </span>
                                </div>
                                <h3 class="text-base font-medium leading-[24px]">
                                    99.21%
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div class="pt-0 pl-0 lg:pt-10 gap-x-0 w-full md:w-[calc(100%-336px)] xl:w-[864px] lg:pl-10">
                        <nav
                            class="flex space-x-[14px] items-center px-0 py-0 md:py-4"
                            aria-label="Tabs"
                        >
                            <button
                                class="text-mainBlue whitespace-nowrap text-base cursor-pointer font-medium"
                                aria-current="page"
                            >
                                Allocation
                            </button>
                            <div class="w-[1px] h-4 bg-[#CFD9E2]"></div>
                            <button class="border-transparent text-gray-500 hover:text-mainBlue whitespace-nowrap text-base cursor-pointer font-medium">
                                Maturity
                            </button>
                        </nav>
                        <div class="pt-6 md:pt-10">
                            <div class="flex flex-col md:flex-row justify-between items-center gap-y-4">
                                <div></div>
                                <canvas
                                    id="pie-chart"
                                    class="relative md:h-[230px] h-[230px] w-[230px]"
                                    style={{
                                        height: '230px',
                                        width: '230px',
                                        display: 'block',
                                        boxSizing: 'border-box',
                                    }}
                                    width="230"
                                    height="230"
                                ></canvas>
                                <ul id="legend-container">
                                    <ul
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            margin: '0px',
                                            padding: '0px',
                                        }}
                                    >
                                        <li
                                            style={{
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                flexDirection: 'row',
                                                marginLeft: '10px',
                                                width: '180px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        background:
                                                            'rgb(33, 81, 245)',
                                                        borderColor:
                                                            'rgb(33, 81, 245)',
                                                        borderWidth: '2px',
                                                        display: 'inline-block',
                                                        flexShrink: '0',
                                                        height: '12px',
                                                        marginRight: '10px',
                                                        width: '12px',
                                                    }}
                                                ></span>
                                                <p
                                                    style={{
                                                        color: 'rgb(102, 102, 102)',
                                                        margin: '0px',
                                                        padding: '0px',
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    Treasury Bills
                                                </p>
                                            </div>
                                            <p
                                                style={{
                                                    color: 'rgb(102, 102, 102)',
                                                    margin: '0px',
                                                    padding: '0px',
                                                    fontWeight: '500',
                                                    textAlign: 'right',
                                                }}
                                            >
                                                99.21%
                                            </p>
                                        </li>
                                        <li
                                            style={{
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                flexDirection: 'row',
                                                marginLeft: '10px',
                                                width: '180px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        background: 'black',
                                                        borderColor: 'black',
                                                        borderWidth: '2px',
                                                        display: 'inline-block',
                                                        flexShrink: '0',
                                                        height: '12px',
                                                        marginRight: '10px',
                                                        width: '12px',
                                                    }}
                                                ></span>
                                                <p
                                                    style={{
                                                        color: 'rgb(102, 102, 102)',
                                                        margin: '0px',
                                                        padding: '0px',
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    USD Cash
                                                </p>
                                            </div>
                                            <p
                                                style={{
                                                    color: 'rgb(102, 102, 102)',
                                                    margin: '0px',
                                                    padding: '0px',
                                                    fontWeight: '500',
                                                    textAlign: 'right',
                                                }}
                                            >
                                                0.79%
                                            </p>
                                        </li>
                                        <li
                                            style={{
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                flexDirection: 'row',
                                                marginLeft: '10px',
                                                width: '180px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        background:
                                                            'rgb(246, 81, 29)',
                                                        borderColor:
                                                            'rgb(246, 81, 29)',
                                                        borderWidth: '2px',
                                                        display: 'inline-block',
                                                        flexShrink: '0',
                                                        height: '12px',
                                                        marginRight: '10px',
                                                        width: '12px',
                                                    }}
                                                ></span>
                                                <p
                                                    style={{
                                                        color: 'rgb(102, 102, 102)',
                                                        margin: '0px',
                                                        padding: '0px',
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    USDC
                                                </p>
                                            </div>
                                            <p
                                                style={{
                                                    color: 'rgb(102, 102, 102)',
                                                    margin: '0px',
                                                    padding: '0px',
                                                    fontWeight: '500',
                                                    textAlign: 'right',
                                                }}
                                            >
                                                0%
                                            </p>
                                        </li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <h6 class="mt-8 md:mt-10 mb-[14px] text-[24px] leading-[32px] font-medium">
                    HOLDINGS
                </h6>
                <div class="md:min-h-[783px]">
                    <table class="divide-gray-300 hidden min-w-full divide-y md:table mt-6">
                        <thead class="text-gray-800 border-b border-b-[#CFD9E2] text-base">
                            <tr>
                                <th
                                    scope="col"
                                    class="text-black py-3.5 text-left font-semibold w-[21%]"
                                >
                                    Issuer
                                </th>
                                <th
                                    scope="col"
                                    class="text-black py-3.5 text-left font-semibold items-center w-[16%]"
                                >
                                    <div class="flex items-center">
                                        ISIN{' '}
                                        <span
                                            class="cursor-pointer"
                                            data-tooltip-id="oe-tooltip-isin"
                                        >
                                            <img
                                                class="relative ml-1 h-5 w-5"
                                                src="/icons/info.svg"
                                            />
                                        </span>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    class="text-black py-3.5 text-left font-semibold w-[15%]"
                                >
                                    Maturity Date
                                </th>
                                <th
                                    scope="col"
                                    class="text-black py-3.5 text-left font-semibold items-center w-[13%]"
                                >
                                    <div class="flex items-center">
                                        YTM{' '}
                                        <span
                                            class="cursor-pointer"
                                            data-tooltip-id="oe-tooltip-ytm"
                                        >
                                            <img
                                                class="relative ml-1 h-5 w-5"
                                                src="/icons/info.svg"
                                            />
                                        </span>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    class="text-black py-3.5 text-left font-semibold items-center w-[20%]"
                                >
                                    <div class="flex items-center">
                                        Principal amount{' '}
                                        <span
                                            class="cursor-pointer"
                                            data-tooltip-id="oe-tooltip-principal"
                                        >
                                            <img
                                                class="relative ml-1 h-5 w-5"
                                                src="/icons/info.svg"
                                            />
                                        </span>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    class="text-black py-3.5 text-left font-semibold items-center w-[15%]"
                                >
                                    <div class="flex items-center">
                                        Market value{' '}
                                        <span
                                            class="cursor-pointer"
                                            data-tooltip-id="oe-tooltip-marketValue"
                                        >
                                            <img
                                                class="relative ml-1 h-5 w-5"
                                                src="/icons/info.svg"
                                            />
                                        </span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b-[0.5px] border-[#CFD9E2] py-3.5 text-[17px]">
                                <td class="relative py-5 pr-3 text-lg text-left font-normal">
                                    US TREASURY 0% 11.01.2024
                                </td>
                                <td class="py-5 text-lg lg:table-cell text-left font-normal">
                                    US912797GC52
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    10/01/2024
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    5.31 %
                                </td>
                                <td class="py-5 text-gray-500 text-left text-lg font-normal">
                                    $1,918,600.00
                                </td>
                                <td class="relative py-5 pr-4 text-lg sm:pr-6 text-left">
                                    $1,918,320.84
                                </td>
                            </tr>
                            <tr class="border-b-[0.5px] border-[#CFD9E2] py-3.5 text-[17px]">
                                <td class="relative py-5 pr-3 text-lg text-left font-normal">
                                    US TREASURY 0% 18.01.2024
                                </td>
                                <td class="py-5 text-lg lg:table-cell text-left font-normal">
                                    US912797GD36
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    17/01/2024
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    5.33 %
                                </td>
                                <td class="py-5 text-gray-500 text-left text-lg font-normal">
                                    $1,288,100.00
                                </td>
                                <td class="relative py-5 pr-4 text-lg sm:pr-6 text-left">
                                    $1,286,596.30
                                </td>
                            </tr>
                            <tr class="border-b-[0.5px] border-[#CFD9E2] py-3.5 text-[17px]">
                                <td class="relative py-5 pr-3 text-lg text-left font-normal">
                                    US TREASURY 0% 30.01.2024
                                </td>
                                <td class="py-5 text-lg lg:table-cell text-left font-normal">
                                    US912797JB43
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    29/01/2024
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    5.34 %
                                </td>
                                <td class="py-5 text-gray-500 text-left text-lg font-normal">
                                    $1,698,800.00
                                </td>
                                <td class="relative py-5 pr-4 text-lg sm:pr-6 text-left">
                                    $1,693,845.28
                                </td>
                            </tr>
                            <tr class="border-b-[0.5px] border-[#CFD9E2] py-3.5 text-[17px]">
                                <td class="relative py-5 pr-3 text-lg text-left font-normal">
                                    US TREASURY 0% 06.02.2024
                                </td>
                                <td class="py-5 text-lg lg:table-cell text-left font-normal">
                                    US912797JC26
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    05/02/2024
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    5.36 %
                                </td>
                                <td class="py-5 text-gray-500 text-left text-lg font-normal">
                                    $2,084,800.00
                                </td>
                                <td class="relative py-5 pr-4 text-lg sm:pr-6 text-left">
                                    $2,076,570.65
                                </td>
                            </tr>
                            <tr class="border-b-[0.5px] border-[#CFD9E2] py-3.5 text-[17px]">
                                <td class="relative py-5 pr-3 text-lg text-left font-normal">
                                    US TREASURY 0% 13.02.2024
                                </td>
                                <td class="py-5 text-lg lg:table-cell text-left font-normal">
                                    US912797JD09
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    12/02/2024
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    5.37 %
                                </td>
                                <td class="py-5 text-gray-500 text-left text-lg font-normal">
                                    $4,675,700.00
                                </td>
                                <td class="relative py-5 pr-4 text-lg sm:pr-6 text-left">
                                    $4,652,426.47
                                </td>
                            </tr>
                            <tr class="border-b-[0.5px] border-[#CFD9E2] py-3.5 text-[17px]">
                                <td class="relative py-5 pr-3 text-lg text-left font-normal">
                                    US TREASURY 0% 29.02.2024
                                </td>
                                <td class="py-5 text-lg lg:table-cell text-left font-normal">
                                    US912797GP65
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    28/02/2024
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    5.38 %
                                </td>
                                <td class="py-5 text-gray-500 text-left text-lg font-normal">
                                    $3,970,700.00
                                </td>
                                <td class="relative py-5 pr-4 text-lg sm:pr-6 text-left">
                                    $3,941,675.93
                                </td>
                            </tr>
                            <tr class="border-b-[0.5px] border-[#CFD9E2] py-3.5 text-[17px]">
                                <td class="relative py-5 pr-3 text-lg text-left font-normal">
                                    US TREASURY 0% 07.03.2024
                                </td>
                                <td class="py-5 text-lg lg:table-cell text-left font-normal">
                                    US912797GQ49
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    06/03/2024
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    5.35 %
                                </td>
                                <td class="py-5 text-gray-500 text-left text-lg font-normal">
                                    $3,501,000.00
                                </td>
                                <td class="relative py-5 pr-4 text-lg sm:pr-6 text-left">
                                    $3,471,990.40
                                </td>
                            </tr>
                            <tr class="border-b-[0.5px] border-[#CFD9E2] py-3.5 text-[17px]">
                                <td class="relative py-5 pr-3 text-lg text-left font-normal">
                                    US TREASURY 0% 14.03.2024
                                </td>
                                <td class="py-5 text-lg lg:table-cell text-left font-normal">
                                    US912797GX99
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    13/03/2024
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    5.35 %
                                </td>
                                <td class="py-5 text-gray-500 text-left text-lg font-normal">
                                    $3,028,000.00
                                </td>
                                <td class="relative py-5 pr-4 text-lg sm:pr-6 text-left">
                                    $2,999,857.10
                                </td>
                            </tr>
                            <tr class="border-b-[0.5px] border-[#CFD9E2] py-3.5 text-[17px]">
                                <td class="relative py-5 pr-3 text-lg text-left font-normal">
                                    US TREASURY 0% 21.03.2024
                                </td>
                                <td class="py-5 text-lg lg:table-cell text-left font-normal">
                                    US912797LL96
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    20/03/2024
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    5.35 %
                                </td>
                                <td class="py-5 text-gray-500 text-left text-lg font-normal">
                                    $2,640,300.00
                                </td>
                                <td class="relative py-5 pr-4 text-lg sm:pr-6 text-left">
                                    $2,613,104.09
                                </td>
                            </tr>
                            <tr class="border-b-[0.5px] border-[#CFD9E2] py-3.5 text-[17px]">
                                <td class="relative py-5 pr-3 text-lg text-left font-normal">
                                    US TREASURY 0% 04.04.2024
                                </td>
                                <td class="py-5 text-lg lg:table-cell text-left font-normal">
                                    US912797GZ48
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    03/04/2024
                                </td>
                                <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                                    5.36 %
                                </td>
                                <td class="py-5 text-gray-500 text-left text-lg font-normal">
                                    $1,489,100.00
                                </td>
                                <td class="relative py-5 pr-4 text-lg sm:pr-6 text-left">
                                    $1,470,727.37
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="block md:hidden">
                    <div class="mt-2 flex flex-col gap-y-2 border border-[#CFD9E2] px-5 py-[14px]">
                        <div class="flex justify-between">
                            <h3 class="text-sm">ISSUER</h3>
                            <p>US TREASURY 0% 11.01.2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">CUSIP</h3>
                            <p>US912797GC52</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MATURITY DATE</h3>
                            <p>10/01/2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">PRINCIPAL AMOUNT</h3>
                            1,918,600.00
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MARKET VALUE</h3>
                            <p>1,918,320.84</p>
                        </div>
                    </div>
                    <div class="mt-2 flex flex-col gap-y-2 border border-[#CFD9E2] px-5 py-[14px]">
                        <div class="flex justify-between">
                            <h3 class="text-sm">ISSUER</h3>
                            <p>US TREASURY 0% 18.01.2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">CUSIP</h3>
                            <p>US912797GD36</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MATURITY DATE</h3>
                            <p>17/01/2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">PRINCIPAL AMOUNT</h3>
                            1,288,100.00
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MARKET VALUE</h3>
                            <p>1,286,596.30</p>
                        </div>
                    </div>
                    <div class="mt-2 flex flex-col gap-y-2 border border-[#CFD9E2] px-5 py-[14px]">
                        <div class="flex justify-between">
                            <h3 class="text-sm">ISSUER</h3>
                            <p>US TREASURY 0% 30.01.2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">CUSIP</h3>
                            <p>US912797JB43</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MATURITY DATE</h3>
                            <p>29/01/2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">PRINCIPAL AMOUNT</h3>
                            1,698,800.00
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MARKET VALUE</h3>
                            <p>1,693,845.28</p>
                        </div>
                    </div>
                    <div class="mt-2 flex flex-col gap-y-2 border border-[#CFD9E2] px-5 py-[14px]">
                        <div class="flex justify-between">
                            <h3 class="text-sm">ISSUER</h3>
                            <p>US TREASURY 0% 06.02.2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">CUSIP</h3>
                            <p>US912797JC26</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MATURITY DATE</h3>
                            <p>05/02/2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">PRINCIPAL AMOUNT</h3>
                            2,084,800.00
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MARKET VALUE</h3>
                            <p>2,076,570.65</p>
                        </div>
                    </div>
                    <div class="mt-2 flex flex-col gap-y-2 border border-[#CFD9E2] px-5 py-[14px]">
                        <div class="flex justify-between">
                            <h3 class="text-sm">ISSUER</h3>
                            <p>US TREASURY 0% 13.02.2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">CUSIP</h3>
                            <p>US912797JD09</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MATURITY DATE</h3>
                            <p>12/02/2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">PRINCIPAL AMOUNT</h3>
                            4,675,700.00
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MARKET VALUE</h3>
                            <p>4,652,426.47</p>
                        </div>
                    </div>
                    <div class="mt-2 flex flex-col gap-y-2 border border-[#CFD9E2] px-5 py-[14px]">
                        <div class="flex justify-between">
                            <h3 class="text-sm">ISSUER</h3>
                            <p>US TREASURY 0% 29.02.2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">CUSIP</h3>
                            <p>US912797GP65</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MATURITY DATE</h3>
                            <p>28/02/2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">PRINCIPAL AMOUNT</h3>
                            3,970,700.00
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MARKET VALUE</h3>
                            <p>3,941,675.93</p>
                        </div>
                    </div>
                    <div class="mt-2 flex flex-col gap-y-2 border border-[#CFD9E2] px-5 py-[14px]">
                        <div class="flex justify-between">
                            <h3 class="text-sm">ISSUER</h3>
                            <p>US TREASURY 0% 07.03.2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">CUSIP</h3>
                            <p>US912797GQ49</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MATURITY DATE</h3>
                            <p>06/03/2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">PRINCIPAL AMOUNT</h3>
                            3,501,000.00
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MARKET VALUE</h3>
                            <p>3,471,990.40</p>
                        </div>
                    </div>
                    <div class="mt-2 flex flex-col gap-y-2 border border-[#CFD9E2] px-5 py-[14px]">
                        <div class="flex justify-between">
                            <h3 class="text-sm">ISSUER</h3>
                            <p>US TREASURY 0% 14.03.2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">CUSIP</h3>
                            <p>US912797GX99</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MATURITY DATE</h3>
                            <p>13/03/2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">PRINCIPAL AMOUNT</h3>
                            3,028,000.00
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MARKET VALUE</h3>
                            <p>2,999,857.10</p>
                        </div>
                    </div>
                    <div class="mt-2 flex flex-col gap-y-2 border border-[#CFD9E2] px-5 py-[14px]">
                        <div class="flex justify-between">
                            <h3 class="text-sm">ISSUER</h3>
                            <p>US TREASURY 0% 21.03.2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">CUSIP</h3>
                            <p>US912797LL96</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MATURITY DATE</h3>
                            <p>20/03/2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">PRINCIPAL AMOUNT</h3>
                            2,640,300.00
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MARKET VALUE</h3>
                            <p>2,613,104.09</p>
                        </div>
                    </div>
                    <div class="mt-2 flex flex-col gap-y-2 border border-[#CFD9E2] px-5 py-[14px]">
                        <div class="flex justify-between">
                            <h3 class="text-sm">ISSUER</h3>
                            <p>US TREASURY 0% 04.04.2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">CUSIP</h3>
                            <p>US912797GZ48</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MATURITY DATE</h3>
                            <p>03/04/2024</p>
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">PRINCIPAL AMOUNT</h3>
                            1,489,100.00
                        </div>
                        <div class="flex justify-between">
                            <h3 class="text-sm">MARKET VALUE</h3>
                            <p>1,470,727.37</p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end gap-x-3 border-0 pr-5 pl-5 pb-5 pt-5 mobile:mt-4 mobile:border-0 mobile:p-0 mb-[86px] md:mb-0">
                    <div className="flex items-center">
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
                                    src="data:image/svg+xml,%3csvg%20
          xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2724%27%20height=%2724%27/%3e"
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
                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                decoding="async"
                                data-nimg="intrinsic"
                                className="pointer-events-none"
                                style={{
                                    opacity: 0.3,
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
                            />
                            <noscript></noscript>
                        </span>
                    </div>
                    <div class="flex items-center gap-x-2 text-[17px] font-medium">
                        <p class="rounded-[6px] bg-[#F3F4F6] px-[7px] py-[2px] w-[32px] text-center">
                            01
                        </p>
                        <p>/02</p>
                    </div>
                    <div className="flex items-center">
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
                                    src="data:image/svg+xml,%3csvg%20
          xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2724%27%20height=%2724%27/%3e"
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
                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                decoding="async"
                                data-nimg="intrinsic"
                                className="cursor-pointer"
                                style={{
                                    opacity: 1,
                                    position: 'absolute',
                                    inset: 0,
                                    boxSizing: 'border-box',
                                    padding: 0,
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
                            />
                            <noscript></noscript>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioPanel;
