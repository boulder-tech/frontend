'use client';
import React from 'react';

import './styles.css';

const Transactions = ({ children }) => {
    return (
        
            <div class="h-96 border-separate overflow-clip rounded-xl border rounded-2xl shadow-2xl flex flex-col p-5">
                <table class="w-full table-fixed">
                    <thead class="sticky top-0 text-[20px] text-[#FFFFFF]">
                        <tr>
                            <th
                                scope="col"
                                class="pb-5 text-left font-semibold w-[14%]"
                            >
                                Hash
                            </th>
                            <th
                                scope="col"
                                class="pb-5 text-left font-semibold w-[14%]"
                            >
                                Transfer Hash
                            </th>
                            <th
                                scope="col"
                                class="pb-5 text-left font-semibold items-center w-[12%]"
                            >
                                <div class="flex items-center">
                                    Amount
                                </div>
                            </th>
                            <th
                                scope="col"
                                class="pb-5 text-left font-semibold w-[12%]"
                            >
                                Total Minted
                            </th>
                            <th
                                scope="col"
                                class="pb-5 text-left font-semibold items-center w-[12%]"
                            >
                                <div class="flex items-center">
                                    Token
                                </div>
                            </th>
                            <th
                                scope="col"
                                class="pb-5 text-left font-semibold items-center w-[12%]"
                            >
                                <div class="flex items-center">
                                    Date
                                </div>
                            </th>
                            <th
                                scope="col"
                                class="pb-5 text-left font-semibold items-center w-[12%]"
                            >
                                <div class="flex items-center">
                                    Status
                                </div>
                            </th>
                        </tr>
                    </thead>
                </table>
                <div class="flex-1 overflow-y-auto">
                    <table class="w-full table-fixed">
                        <tbody className="">
                            {children}
                        </tbody>
                    </table>
                </div>
            </div>
        
    );
};

export default Transactions;
