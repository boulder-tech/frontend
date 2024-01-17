'use client';
import React from 'react';

const Transactions = ({ children }) => {
    return (
        <div class="flex flex-col lg:flex-row justify-between lg:border-b lg:border-b-[#CFD9E2] gap-y-10 gap-x-0">
            <div class="md:min-h-[783px] w-full">
                <table class="divide-gray-300 hidden min-w-full divide-y md:table mt-6">
                    <thead class="text-gray-800 border-b border-b-[#CFD9E2] text-base">
                        <tr>
                            <th
                                scope="col"
                                class="text-black py-3.5 text-left font-semibold w-[28%]"
                            >
                                Hash
                            </th>
                            <th
                                scope="col"
                                class="text-black py-3.5 text-left font-semibold items-center w-[12%]"
                            >
                                <div class="flex items-center">
                                    Amount{' '}
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
                                class="text-black py-3.5 text-left font-semibold w-[12%]"
                            >
                                Total Minted
                            </th>
                            <th
                                scope="col"
                                class="text-black py-3.5 text-left font-semibold items-center w-[12%]"
                            >
                                <div class="flex items-center">
                                    Token{' '}
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
                                class="text-black py-3.5 text-left font-semibold items-center w-[12%]"
                            >
                                <div class="flex items-center">
                                    Status{' '}
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
                                class="text-black py-3.5 text-left font-semibold items-center w-[12%]"
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
                            <th
                                scope="col"
                                class="text-black py-3.5 text-left font-semibold items-center w-[12%]"
                            >
                                <div class="flex items-center">
                                    Date
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
                    <tbody>{children}</tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;
