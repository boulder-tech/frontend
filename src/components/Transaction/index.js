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
    transaction: { hash, hash_mint, amount_stable, type_stable, token, token_minted, status, createdAt },
}) => {
    return (
        <tr class="border-b-[0.5px] border-[#AEAEAE] py-3.5 text-[20px] text-[#FFFFFF]">
            <td class="relative py-7 text-lg text-left font-normal w-[16%]">
                <a
                    href={`https://sepolia.etherscan.io/tx/${hash}`}
                    target="_blank"
                    class="text-[#FFFFFF] underline underline-offset-4"
                >
                    {hash ? shortenTextWithEllipsis(hash, 20): '-'}
                </a>
            </td>
            <td class="relative py-5 text-lg text-left font-normal w-[16%]">
                {hash_mint ? <a
                    href={`https://sepolia.etherscan.io/tx/${hash_mint}`}
                    target="_blank"
                    class="text-[#FFFFFF] underline underline-offset-4"
                >
                    {hash_mint ? shortenTextWithEllipsis(hash_mint, 20): '-'}
                </a> : <span>-</span>}
                
            </td>
            <td class="py-5 w-[15%] text-left">{`${amount_stable} ${type_stable}`}</td>
            <td class="py-5 w-[15%] text-left">
                {token_minted ? token_minted :'-'}
            </td>
            <td class="py-5 w-[12%] text-left">
                {token}
            </td>
            <td class="text-[#FFFFFF] text-opacity-60 w-[14%] text-left">
                {moment(createdAt).local().format('MM/DD/YYYY hh:mm')}
            </td>
            <td class={`py-5 w-[12%] text-left ${status === 'pending_mint' ? 'text-[#FFD645]' : status === 'tokens_minted' ? 'text-[#24B400]' : '' }`}>
                {status === 'pending_mint' ? 'PENDING' : status === 'tokens_minted' ? 'COMPLETED': '-'}
            </td>
        </tr>
    );
};

export default Transaction;
