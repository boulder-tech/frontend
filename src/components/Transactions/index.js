'use client';
import React, {useState} from 'react';
import Modal from '../../components/Modal';
//import { ReactComponent as ArrowShrink } from '../../icons/arrow-shrink.svg';
import { ReactComponent as ArrowShrink } from '../../../public/icons/arrow-shrink.svg'

import './styles.css';

const Transactions = ({ children }) => {
    const [showTransactions, setShowTransactions] = useState(false);

    return (
        
            <div class="h-96 border-separate overflow-clip rounded-xl border rounded-2xl shadow-2xl flex flex-col p-5 z-[0]">
                <div className="relative">
                    <img
                        class="absolute top-0 right-0 h-[38px] w-[38px] z-20 cursor-pointer"
                        src="/icons/arrow-expand.svg"
                        onClick={() => {
                            setShowTransactions(true);
                        }}
                    />
                </div>
                <table class="w-[99%] table-fixed">
                    <thead class="sticky top-0 text-[20px] text-[#FFFFFF] border-b border-white">
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
                    <table class="w-[99%] table-fixed">
                        <tbody className="">
                            {children}
                        </tbody>
                    </table>
                </div>

                <Modal isOpen={showTransactions} background="bg-[#1F1F1F] bg-opacity-80" maxWidth="w-[90%]" closeIcon="/icons/arrow-shrink.svg" onClose={() => { setShowTransactions(false)}}>
                    <div className="h-[775px] w-[1561px] border-separate overflow-clip rounded-xl border rounded-2xl shadow-2xl flex flex-col p-5">
                        <table class="w-[99%] table-fixed">
                            <thead class="sticky top-0 text-[20px] text-[#FFFFFF] border-b border-gray-300 border-b border-white">
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
                            <table class="w-[99%] table-fixed">
                                <tbody className="">
                                    {children}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal>
            </div>
        
    );
};

export default Transactions;
