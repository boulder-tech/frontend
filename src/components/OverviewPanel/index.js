import React, { useState } from 'react';

const OverviewPanel = ({}) => {
    return (
        <div id="overview">
            <div class="flex flex-col md:space-x-0 lg:flex-row lg:space-x-10 mobile:space-x-0 pt-10 pb-0 md:pb-[118px]">
                <div class="flex-1">
                    <div>
                        <p class="max-w-full text-lg font-normal leading-7">
                            The GD30D Vault is the world’s first smart-contract
                            vault for U.S. Treasury Bills. Earn the U.S.
                            risk-free rate on your stablecoins by minting GD30D
                            tokens, with 24/7 liquidity. The token issuer holds
                            a portfolio of short-dated Treasury Bills via
                            OpenEden Cayman Ltd, a bankruptcy remote and
                            wholly-owned special purpose vehicle. <br />
                            <br />
                            The Vault is developed by OpenEden Labs, which is a
                            financial technology company and not a regulated
                            entity, depository, bank, or credit union.
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
                                    <p class="yearn--elementWithActions text-lg font-medium leading-[22px] text-black">
                                        0xdd5...f2e8a
                                    </p>
                                    <button class="cursor-pointer">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M2.67085 2.67085C2.78025 2.56146 2.92862 2.5 3.08333 2.5H9.08333C9.23804 2.5 9.38642 2.56146 9.49581 2.67085C9.60521 2.78025 9.66667 2.92862 9.66667 3.08333V3.75C9.66667 4.16421 10.0025 4.5 10.4167 4.5C10.8309 4.5 11.1667 4.16421 11.1667 3.75V3.08333C11.1667 2.5308 10.9472 2.00089 10.5565 1.61019C10.1658 1.21949 9.63587 1 9.08333 1H3.08333C2.5308 1 2.0009 1.21949 1.61019 1.61019C1.21949 2.0009 1 2.5308 1 3.08333V9.08333C1 9.63587 1.21949 10.1658 1.61019 10.5565C2.00089 10.9472 2.5308 11.1667 3.08333 11.1667H3.75C4.16421 11.1667 4.5 10.8309 4.5 10.4167C4.5 10.0025 4.16421 9.66667 3.75 9.66667H3.08333C2.92862 9.66667 2.78025 9.60521 2.67085 9.49581C2.56146 9.38642 2.5 9.23804 2.5 9.08333V3.08333C2.5 2.92862 2.56146 2.78025 2.67085 2.67085ZM7.1665 7.74999C7.1665 7.42782 7.42767 7.16666 7.74984 7.16666H13.7498C14.072 7.16666 14.3332 7.42782 14.3332 7.74999V13.75C14.3332 14.0722 14.072 14.3333 13.7498 14.3333H7.74984C7.42767 14.3333 7.1665 14.0722 7.1665 13.75V7.74999ZM7.74984 5.66666C6.59924 5.66666 5.6665 6.5994 5.6665 7.74999V13.75C5.6665 14.9006 6.59924 15.8333 7.74984 15.8333H13.7498C14.9004 15.8333 15.8332 14.9006 15.8332 13.75V7.74999C15.8332 6.5994 14.9004 5.66666 13.7498 5.66666H7.74984Z"
                                                fill="black"
                                            ></path>
                                        </svg>
                                    </button>
                                    <button class="cursor-pointer">
                                        <a
                                            href="https://etherscan.io/address/0xdd50C053C096CB04A3e3362E2b622529EC5f2e8a"
                                            target="_blank"
                                            class="cursor-pointer"
                                            rel="noreferrer"
                                        >
                                            <span class="sr-only">
                                                Link to explorer
                                            </span>
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="cursor-pointer w-4 h-4"
                                            >
                                                <path
                                                    d="M7 4C5.34328 4 4 5.34328 4 7V17C4 18.6567 5.34328 20 7 20H17C18.6567 20 20 18.6567 20 17V16C20 15.4477 20.4477 15 21 15C21.5523 15 22 15.4477 22 16V17C22 19.7613 19.7613 22 17 22H7C4.23872 22 2 19.7613 2 17V7C2 4.23872 4.23872 2 7 2H8C8.55228 2 9 2.44772 9 3C9 3.55228 8.55228 4 8 4H7Z"
                                                    fill="currentcolor"
                                                ></path>
                                                <path
                                                    d="M14.3 2C13.6925 2 13.2 2.49249 13.2 3.1C13.2 3.70751 13.6925 4.2 14.3 4.2H18.2444L9.12223 13.3222C8.69265 13.7518 8.69265 14.4482 9.12223 14.8778C9.55181 15.3074 10.2483 15.3074 10.6779 14.8778L19.8 5.75565V9.7C19.8 10.3075 20.2925 10.8 20.9 10.8C21.5075 10.8 22 10.3075 22 9.7V3.1C22 2.92275 21.9581 2.75529 21.8836 2.607C21.8954 2.63051 21.9064 2.6545 21.9166 2.67894C21.8633 2.55017 21.7845 2.42947 21.6802 2.32456L21.6791 2.32343L21.6778 2.32213L21.6765 2.32083C21.4775 2.12256 21.2031 2 20.9 2H14.3Z"
                                                    fill="currentcolor"
                                                ></path>
                                                <path
                                                    d="M21.3211 2.08347C21.4545 2.13878 21.5747 2.21959 21.6755 2.31981C21.5706 2.21552 21.4499 2.13674 21.3211 2.08347Z"
                                                    fill="currentcolor"
                                                ></path>
                                            </svg>
                                        </a>
                                    </button>
                                    <button class="h-8 w-8 justify-center items-center hidden sm:flex">
                                        <a class="cursor-pointer">
                                            <span class="sr-only">
                                                Add to MetaMask
                                            </span>
                                            <svg
                                                width="18"
                                                height="18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                class="cursor-pointer h-4 w-4"
                                            >
                                                <path
                                                    d="M19.292 2.216a.83.83 0 1 0-1.661 0v2.492h-2.493a.83.83 0 0 0 0 1.661h2.493v2.493a.83.83 0 1 0 1.661 0V6.369h2.492a.83.83 0 1 0 0-1.661h-2.492V2.216Z"
                                                    fill="currentcolor"
                                                ></path>
                                                <path
                                                    d="M8.632 5.699h4.293c.02.68.161 1.33.404 1.926H8.308a.9.9 0 0 1-.577-.21L4.615 4.812v4.739c0 .15-.033.297-.097.43l-2.42 5.05 8.979 6.814 8.978-6.814-1.899-3.963a5.536 5.536 0 0 0 1.95-.24l1.95 4.071a.99.99 0 0 1-.282 1.21L11.62 23.816a.892.892 0 0 1-1.086 0L.38 16.11a.99.99 0 0 1-.282-1.21l2.671-5.575V2.809c0-.37.204-.707.524-.868.32-.16.699-.115.976.116L8.632 5.7Z"
                                                    fill="currentcolor"
                                                ></path>
                                                <path
                                                    d="M9.23 13.405c0-.532-.413-.963-.922-.963-.51 0-.923.43-.923.963v.01c0 .531.413.963.923.963s.923-.432.923-.964v-.01ZM13.846 12.441c.51 0 .923.432.923.964v.01c0 .531-.413.963-.923.963s-.923-.432-.923-.964v-.01c0-.531.413-.963.923-.963ZM9.23 16.294c-.494 0-.898.407-.921.917a1.015 1.015 0 0 0 .153.58.937.937 0 0 0 .37.335l1.823.951a.889.889 0 0 0 .845 0l1.836-.958a.98.98 0 0 0 .372-1.37.94.94 0 0 0-.274-.294.893.893 0 0 0-.511-.16H9.23Z"
                                                    fill="currentcolor"
                                                ></path>
                                            </svg>
                                        </a>
                                    </button>
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
