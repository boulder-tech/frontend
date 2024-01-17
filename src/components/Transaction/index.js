'use client';
import React from 'react';
import moment from 'moment';

function shortenTextWithEllipsis(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }

    const ellipsis = '...';
    const halfLength = maxLength / 2 - ellipsis.length / 2;

    const firstHalf = text.substring(0, Math.ceil(halfLength));
    const secondHalf = text.substring(text.length - Math.floor(halfLength));

    return `${firstHalf}${ellipsis}${secondHalf}`;
}

const Transaction = ({
    transaction: { hash, amount_stable, type_stable, token, status, createdAt },
}) => {
    return (
        <tr class="border-b-[0.5px] border-[#CFD9E2] py-3.5 text-[17px]">
            <td class="relative py-5 pr-3 text-lg text-left font-normal">
                <a
                    href={`https://sepolia.etherscan.io/tx/${hash}`}
                    target="_blank"
                    class="text-blue-600/100"
                >
                    {shortenTextWithEllipsis(hash, 30)}
                </a>
            </td>
            <td class="py-5 text-lg lg:table-cell text-left font-normal">{`${amount_stable} ${type_stable}`}</td>
            <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                {`-`}
            </td>
            <td class="py-5 text-gray-500 lg:table-cell text-left text-lg font-normal">
                {token}
            </td>
            <td class="py-5 text-gray-500 text-left text-lg font-normal">
                {status === 'pending_mint' ? 'PENDING' : ''}
            </td>
            <td class="relative py-5 pr-4 text-lg sm:pr-6 text-left">-</td>
            <td class="relative py-5 pr-4 text-lg sm:pr-6 text-left">
                {moment(createdAt).local().format('MM/DD/YYYY hh:mm A')}
            </td>
        </tr>
    );
};

export default Transaction;
