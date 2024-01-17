'use client';
import React, { useState } from 'react';
import MainSection from '../../../../components/sections/main-section';

const Liquidity = ({ params }) => {
    const [isNavbarOpen, setNavbarOpen] = useState(true);

    const toggleNavbar = () => {
        setNavbarOpen(!isNavbarOpen);
    };
    const { token } = params;

    console.log('token', token);

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
                <a href="/swap" class="w-full">
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
                                    d="M17.3006 10.5H23.1994C23.5173 10.5 23.691 10.8708 23.4874 11.1151L20.5381 14.6543C20.3882 14.8342 20.1118 14.8342 19.9619 14.6543L17.0126 11.1151C16.809 10.8708 16.9827 10.5 17.3006 10.5Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M0.800644 13.5H6.69936C7.0173 13.5 7.19099 13.1292 6.98745 12.8849L4.03809 9.3457C3.88816 9.16579 3.61184 9.16579 3.46192 9.3457L0.51256 12.8849C0.309021 13.1292 0.482705 13.5 0.800644 13.5Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12 4.5C9.67127 4.5 7.59085 5.56045 6.21403 7.22758C5.95027 7.54696 5.47754 7.59205 5.15816 7.32829C4.83879 7.06452 4.7937 6.59179 5.05746 6.27242C6.70702 4.27504 9.20493 3 12 3C16.4126 3 20.082 6.17476 20.8516 10.3645C20.8599 10.4096 20.8678 10.4547 20.8754 10.5H19.3501C18.6556 7.07667 15.6279 4.5 12 4.5ZM4.64988 13.5C5.3444 16.9233 8.37206 19.5 12 19.5C14.3287 19.5 16.4092 18.4396 17.786 16.7724C18.0497 16.453 18.5225 16.408 18.8418 16.6717C19.1612 16.9355 19.2063 17.4082 18.9425 17.7276C17.293 19.725 14.7951 21 12 21C7.58745 21 3.91797 17.8252 3.14838 13.6355C3.1401 13.5904 3.13216 13.5453 3.12456 13.5H4.64988Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <p class="text-base font-semibold">Swap</p>
                        </div>
                    </div>
                </a>
                <a href="/launchpad" class="w-full">
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
                                    d="M21.75 4.5C22.1642 4.5 22.5 4.83579 22.5 5.25V18.75C22.5 19.1642 22.1642 19.5 21.75 19.5H2.25C1.83579 19.5 1.5 19.1642 1.5 18.75V5.25C1.5 4.83579 1.83579 4.5 2.25 4.5H21.75ZM2.25 3C1.00736 3 0 4.00736 0 5.25V18.75C0 19.9926 1.00736 21 2.25 21H21.75C22.9926 21 24 19.9926 24 18.75V5.25C24 4.00736 22.9926 3 21.75 3H2.25Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M10.5 8.25C10.5 7.83579 10.8358 7.5 11.25 7.5H18.75C19.1642 7.5 19.5 7.83579 19.5 8.25C19.5 8.66421 19.1642 9 18.75 9H11.25C10.8358 9 10.5 8.66421 10.5 8.25Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M8.25533 6.96967C8.54823 7.26256 8.54823 7.73744 8.25533 8.03033L6.00533 10.2803C5.71244 10.5732 5.23757 10.5732 4.94467 10.2803L4.19467 9.53033C3.90178 9.23744 3.90178 8.76256 4.19467 8.46967C4.48757 8.17678 4.96244 8.17678 5.25533 8.46967L5.475 8.68934L7.19467 6.96967C7.48757 6.67678 7.96244 6.67678 8.25533 6.96967Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M10.5 14.25C10.5 13.8358 10.8358 13.5 11.25 13.5H18.75C19.1642 13.5 19.5 13.8358 19.5 14.25C19.5 14.6642 19.1642 15 18.75 15H11.25C10.8358 15 10.5 14.6642 10.5 14.25Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M8.25533 12.9697C8.54823 13.2626 8.54823 13.7374 8.25533 14.0303L6.00533 16.2803C5.71244 16.5732 5.23757 16.5732 4.94467 16.2803L4.19467 15.5303C3.90178 15.2374 3.90178 14.7626 4.19467 14.4697C4.48757 14.1768 4.96244 14.1768 5.25533 14.4697L5.475 14.6893L7.19467 12.9697C7.48757 12.6768 7.96244 12.6768 8.25533 12.9697Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <p class="text-base font-semibold">Launchpad</p>
                        </div>
                        {isNavbarOpen ? (
                            <div class="flex items-center text-xs font-semibold bg-green-600 py-1 px-2 rounded text-white">
                                <span>New</span>
                            </div>
                        ) : (
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="cursor-pointer h-2 w-2 min-w-2 text-green-600 absolute right-0.5 top-0.5"
                            >
                                <rect
                                    width="32"
                                    height="32"
                                    rx="16"
                                    fill="currentColor"
                                ></rect>
                                <path
                                    d="M17.767 9.86364V21.5H15.6591V11.9148H15.5909L12.8693 13.6534V11.7216L15.7614 9.86364H17.767Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        )}
                    </div>
                </a>
                <a href="/rewards" class="w-full">
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
                                    d="M16.8771 0.101709C17.1786 0.277085 17.3194 0.637193 17.2169 0.970588L14.5155 9.75002H19.5C19.7992 9.75002 20.0698 9.92788 20.1885 10.2025C20.3072 10.4772 20.2512 10.7962 20.0462 11.014L8.04617 23.764C7.8071 24.0181 7.42447 24.0737 7.12294 23.8983C6.82141 23.723 6.6806 23.3629 6.78318 23.0295L9.48455 14.25H4.50002C4.2008 14.25 3.93021 14.0722 3.81153 13.7975C3.69286 13.5228 3.74879 13.2039 3.95387 12.986L15.9539 0.236C16.1929 -0.018011 16.5756 -0.073668 16.8771 0.101709ZM6.23584 12.75H10.5C10.738 12.75 10.9619 12.863 11.1033 13.0544C11.2447 13.2459 11.2868 13.4931 11.2169 13.7206L9.16611 20.3855L17.7642 11.25H13.5C13.262 11.25 13.0381 11.1371 12.8967 10.9456C12.7553 10.7541 12.7132 10.5069 12.7832 10.2795L14.8339 3.61456L6.23584 12.75Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <p class="text-base font-semibold">Rewards</p>
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

            <div class="h-full-flex max-w-full 2xl:mx-auto 2xl:max-w-7xl overflow-hidden">
                <div data-v-69ed45e4="">
                    <a
                        data-v-69ed45e4=""
                        href="/"
                        class="mb-4 flex items-center gap-2"
                    >
                        <svg
                            data-v-69ed45e4=""
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            class="cursor-pointer h-4 w-4 min-w-4 cursor-pointer h-4 w-4 min-w-4"
                        >
                            <path
                                d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <span data-v-69ed45e4="">Back</span>
                    </a>
                    <div data-v-69ed45e4="" class="flex items-center gap-2">
                        <div data-v-69ed45e4="" class="relative max-md:hidden">
                            <img
                                class="rounded-full bg-white w-10 h-10 min-w-10"
                                src="http://clasico.rava.com/contenidos/logoperfil/ARG.png"
                                name="PROJX"
                            />
                            <img
                                class="rounded-full bg-white w-4 h-4 min-w-4 absolute right-0 bottom-0"
                                src="/vendor/@injectivelabs/token-metadata/injective-black-fill.png"
                                name="Injective"
                            />
                        </div>
                        <div data-v-69ed45e4="" class="relative md:hidden">
                            <img
                                class="rounded-full bg-white w-6 h-6 min-w-6"
                                src="/vendor/@injectivelabs/token-metadata/projx.png"
                                name="PROJX"
                            />
                            <img
                                class="rounded-full bg-white w-4 h-4 min-w-4 absolute -right-0.5 -bottom-0.5"
                                src="/vendor/@injectivelabs/token-metadata/injective-black-fill.png"
                                name="Injective"
                            />
                        </div>
                        <h1
                            data-v-69ed45e4=""
                            class="text-2xl md:text-3xl font-bold max-w-sm truncate"
                        >
                            {token}
                        </h1>
                    </div>
                    <section data-v-69ed45e4="" class="h-full-flex">
                        <div
                            data-v-69ed45e4=""
                            class="my-6 flex flex-wrap items-center justify-between gap-2"
                        >
                            <div
                                data-v-69ed45e4=""
                                class="flex items-center flex-wrap xs:gap-4"
                            >
                                <a
                                    data-v-69ed45e4=""
                                    href={`/vault/${token}`}
                                    class="router-link-active p-3 font-semibold hover:text-green-600"
                                >
                                    <span data-v-69ed45e4="" class="capitalize">
                                        Overview
                                    </span>
                                </a>
                                <a
                                    data-v-69ed45e4=""
                                    href={`/vault/${token}/info`}
                                    class="p-3 font-semibold hover:text-green-600"
                                >
                                    <span data-v-69ed45e4="" class="capitalize">
                                        Info
                                    </span>
                                </a>
                                <a
                                    data-v-69ed45e4=""
                                    href={`/vault/${token}/liquidity`}
                                    class="p-3 font-semibold hover:text-green-600"
                                >
                                    <span data-v-69ed45e4="" class="capitalize">
                                        Liquidity
                                    </span>
                                </a>
                                <a
                                    data-v-69ed45e4=""
                                    href={`/vault/${token}/activities`}
                                    class="router-link-active router-link-exact-active p-3 font-semibold hover:text-green-600"
                                    aria-current="page"
                                >
                                    <span data-v-69ed45e4="" class="capitalize">
                                        Activities
                                    </span>
                                </a>
                                <a
                                    data-v-69ed45e4=""
                                    aria-current="page"
                                    href="/vault/inj1xvlnfmq5672rmvn6576rvj389ezu9nxc9dpk8l/activities"
                                    class="router-link-active router-link-exact-active p-3 font-semibold hover:text-green-600"
                                >
                                    <span
                                        data-v-69ed45e4=""
                                        class="capitalize"
                                    ></span>
                                </a>
                            </div>
                            <div
                                data-v-69ed45e4=""
                                class="sm:flex items-center gap-2 hidden"
                            >
                                <button
                                    data-v-69ed45e4=""
                                    type="button"
                                    class="flex items-center rounded-lg font-semibold outline-none py-3 px-4 text-base h-10 max-h-10 bg-green-600 hover:bg-green-800 text-white"
                                >
                                    <div
                                        data-v-69ed45e4=""
                                        class="flex items-center gap-2"
                                    >
                                        <span data-v-69ed45e4="">+Add</span>
                                        <svg
                                            data-v-69ed45e4=""
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            class="cursor-pointer h-4 w-4 min-w-4 rotate-180"
                                        >
                                            <path
                                                d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div data-v-69ed45e4="">
                            <div
                                class="table-wrapper bg-white rounded-lg border border-gray-400"
                                isowner="false"
                                isopensidebar="true"
                                appstatus="idle"
                            >
                                <div class="px-4 py-4 md:px-6 md:pt-6 text-xl md:text-2xl whitespace-break-spaces">
                                    <div class="flex justify-between items-center">
                                        <div class="inline-flex px-2 border border-gray-700 border-opacity-10 py-1 rounded gap-1 text-gray-700">
                                            <a
                                                aria-current="page"
                                                href="/vault/inj1xvlnfmq5672rmvn6576rvj389ezu9nxc9dpk8l/activities"
                                                class="router-link-active toggle-link text-sm font-semibold px-2 py-1"
                                            >
                                                <span>Liquidity</span>
                                            </a>
                                            <a
                                                href="/vault/inj1xvlnfmq5672rmvn6576rvj389ezu9nxc9dpk8l/activities/trades"
                                                class="text-sm font-semibold px-2 py-1"
                                            >
                                                <span>Trades</span>
                                            </a>
                                        </div>
                                        <div id="vault-activity-action-bar"></div>
                                    </div>
                                </div>
                                <div class="h-full-flex md:mt-4">
                                    <div>
                                        <section>
                                            <div class="overflow-x-auto overflow-y-hidden">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Time</th>
                                                            <th>Type</th>
                                                            <th>Assets</th>
                                                            <th>LP Amount</th>
                                                            <th>Value</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="">
                                                        <tr>
                                                            <td class="align-top">
                                                                21 Dec 10:55:29
                                                            </td>

                                                            <td class="align-top">
                                                                <span>
                                                                    Removed
                                                                    liquidity
                                                                </span>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex flex-col gap-1">
                                                                    <div>
                                                                        <div class="flex w-full items-center justify-between gap-2">
                                                                            <div class="flex items-center gap-1">
                                                                                <img
                                                                                    class="rounded-full bg-white w-4 h-4 min-w-4 z-10"
                                                                                    src="/vendor/@injectivelabs/token-metadata/projx.png"
                                                                                    name="PROJX"
                                                                                />
                                                                                <span class="font-semibold uppercase text-sm">
                                                                                    {
                                                                                        token
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <span class="text-sm">
                                                                                <div class="flex">
                                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                                        <div>
                                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                                <p class="space-x-1">
                                                                                                    <span>
                                                                                                        11.4262
                                                                                                    </span>
                                                                                                </p>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex">
                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                        <div>
                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                <p class="space-x-1">
                                                                                    <span>
                                                                                        -61.1879
                                                                                    </span>
                                                                                </p>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                1,270.76 USD
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="text-right">
                                                                    <a
                                                                        href="https://testnet.explorer.injective.network/transaction/0x9e432fb565091002490933423360650c765745661fed6708254c65915e4e42e1"
                                                                        rel="noopener noreferrer"
                                                                        target="_blank"
                                                                        class="font-semibold text-green-600 hover:opacity-70"
                                                                    >
                                                                        Details
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="align-top">
                                                                21 Dec 09:49:12
                                                            </td>

                                                            <td class="align-top">
                                                                <span>
                                                                    Removed
                                                                    liquidity
                                                                </span>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex flex-col gap-1">
                                                                    <div>
                                                                        <div class="flex w-full items-center justify-between gap-2">
                                                                            <div class="flex items-center gap-1">
                                                                                <img
                                                                                    class="rounded-full bg-white w-4 h-4 min-w-4 z-10"
                                                                                    src="/vendor/@injectivelabs/token-metadata/projx.png"
                                                                                    name="PROJX"
                                                                                />
                                                                                <span class="font-semibold uppercase text-sm">
                                                                                    {
                                                                                        token
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <span class="text-sm">
                                                                                <div class="flex">
                                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                                        <div>
                                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                                <p class="space-x-1">
                                                                                                    <span>
                                                                                                        186.8034
                                                                                                    </span>
                                                                                                </p>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex">
                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                        <div>
                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                <p class="space-x-1">
                                                                                    <span>
                                                                                        -1,000.3411
                                                                                    </span>
                                                                                </p>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                20,774.24 USD
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="text-right">
                                                                    <a
                                                                        href="https://testnet.explorer.injective.network/transaction/0x9dc766cd21ee81a8da905cd58fee761d8d562ceff93daf43f03879db5d8f1918"
                                                                        rel="noopener noreferrer"
                                                                        target="_blank"
                                                                        class="font-semibold text-green-600 hover:opacity-70"
                                                                    >
                                                                        Details
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="align-top">
                                                                21 Dec 09:47:44
                                                            </td>

                                                            <td class="align-top">
                                                                <span>
                                                                    Removed
                                                                    liquidity
                                                                </span>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex flex-col gap-1">
                                                                    <div>
                                                                        <div class="flex w-full items-center justify-between gap-2">
                                                                            <div class="flex items-center gap-1">
                                                                                <img
                                                                                    class="rounded-full bg-white w-4 h-4 min-w-4 z-10"
                                                                                    src="/vendor/@injectivelabs/token-metadata/projx.png"
                                                                                    name="PROJX"
                                                                                />
                                                                                <span class="font-semibold uppercase text-sm">
                                                                                    {
                                                                                        token
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <span class="text-sm">
                                                                                <div class="flex">
                                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                                        <div>
                                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                                <p class="space-x-1">
                                                                                                    <span>
                                                                                                        196.8236
                                                                                                    </span>
                                                                                                </p>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex">
                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                        <div>
                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                <p class="space-x-1">
                                                                                    <span>
                                                                                        -1,054.0000
                                                                                    </span>
                                                                                </p>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                21,888.59 USD
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="text-right">
                                                                    <a
                                                                        href="https://testnet.explorer.injective.network/transaction/0x862fdfe3c0dce2dfbe590b56dd5645af8f19170f3308dfd2daeaf9e9a93b3810"
                                                                        rel="noopener noreferrer"
                                                                        target="_blank"
                                                                        class="font-semibold text-green-600 hover:opacity-70"
                                                                    >
                                                                        Details
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="align-top">
                                                                19 Dec 22:13:24
                                                            </td>

                                                            <td class="align-top">
                                                                <span>
                                                                    Removed
                                                                    liquidity
                                                                </span>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex flex-col gap-1">
                                                                    <div>
                                                                        <div class="flex w-full items-center justify-between gap-2">
                                                                            <div class="flex items-center gap-1">
                                                                                <img
                                                                                    class="rounded-full bg-white w-4 h-4 min-w-4 z-10"
                                                                                    src="/vendor/@injectivelabs/token-metadata/projx.png"
                                                                                    name="PROJX"
                                                                                />
                                                                                <span class="font-semibold uppercase text-sm">
                                                                                    {
                                                                                        token
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <span class="text-sm">
                                                                                <div class="flex">
                                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                                        <div>
                                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                                <p class="space-x-1">
                                                                                                    <span>
                                                                                                        696.2364
                                                                                                    </span>
                                                                                                </p>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex">
                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                        <div>
                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                <p class="space-x-1">
                                                                                    <span>
                                                                                        -3,728.3794
                                                                                    </span>
                                                                                </p>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                77,061.29 USD
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="text-right">
                                                                    <a
                                                                        href="https://testnet.explorer.injective.network/transaction/0x34eef40a435eaa2a36f300237428c2e47a6249732f9561d77c1ee4148936330a"
                                                                        rel="noopener noreferrer"
                                                                        target="_blank"
                                                                        class="font-semibold text-green-600 hover:opacity-70"
                                                                    >
                                                                        Details
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="align-top">
                                                                19 Dec 22:13:21
                                                            </td>

                                                            <td class="align-top">
                                                                <span>
                                                                    Removed
                                                                    liquidity
                                                                </span>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex flex-col gap-1">
                                                                    <div>
                                                                        <div class="flex w-full items-center justify-between gap-2">
                                                                            <div class="flex items-center gap-1">
                                                                                <img
                                                                                    class="rounded-full bg-white w-4 h-4 min-w-4 z-10"
                                                                                    src="/vendor/@injectivelabs/token-metadata/projx.png"
                                                                                    name="PROJX"
                                                                                />
                                                                                <span class="font-semibold uppercase text-sm">
                                                                                    {
                                                                                        token
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <span class="text-sm">
                                                                                <div class="flex">
                                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                                        <div>
                                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                                <p class="space-x-1">
                                                                                                    <span>
                                                                                                        696.2364
                                                                                                    </span>
                                                                                                </p>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex">
                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                        <div>
                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                <p class="space-x-1">
                                                                                    <span>
                                                                                        -3,728.3794
                                                                                    </span>
                                                                                </p>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                77,061.29 USD
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="text-right">
                                                                    <a
                                                                        href="https://testnet.explorer.injective.network/transaction/0x4258e3bf635404853821192809e11770b05d0d8c555d3bf6dca747980be18154"
                                                                        rel="noopener noreferrer"
                                                                        target="_blank"
                                                                        class="font-semibold text-green-600 hover:opacity-70"
                                                                    >
                                                                        Details
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="align-top">
                                                                19 Dec 22:13:21
                                                            </td>

                                                            <td class="align-top">
                                                                <span>
                                                                    Removed
                                                                    liquidity
                                                                </span>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex flex-col gap-1">
                                                                    <div>
                                                                        <div class="flex w-full items-center justify-between gap-2">
                                                                            <div class="flex items-center gap-1">
                                                                                <img
                                                                                    class="rounded-full bg-white w-4 h-4 min-w-4 z-10"
                                                                                    src="/vendor/@injectivelabs/token-metadata/projx.png"
                                                                                    name="PROJX"
                                                                                />
                                                                                <span class="font-semibold uppercase text-sm">
                                                                                    {
                                                                                        token
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <span class="text-sm">
                                                                                <div class="flex">
                                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                                        <div>
                                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                                <p class="space-x-1">
                                                                                                    <span>
                                                                                                        696.2364
                                                                                                    </span>
                                                                                                </p>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex">
                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                        <div>
                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                <p class="space-x-1">
                                                                                    <span>
                                                                                        -3,728.3794
                                                                                    </span>
                                                                                </p>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                77,061.29 USD
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="text-right">
                                                                    <a
                                                                        href="https://testnet.explorer.injective.network/transaction/0x79660688c8b0dd504a5de2f0d932016ce939fb8f6ee3d768f316a4e9d9179019"
                                                                        rel="noopener noreferrer"
                                                                        target="_blank"
                                                                        class="font-semibold text-green-600 hover:opacity-70"
                                                                    >
                                                                        Details
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="align-top">
                                                                19 Dec 22:13:21
                                                            </td>

                                                            <td class="align-top">
                                                                <span>
                                                                    Removed
                                                                    liquidity
                                                                </span>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex flex-col gap-1">
                                                                    <div>
                                                                        <div class="flex w-full items-center justify-between gap-2">
                                                                            <div class="flex items-center gap-1">
                                                                                <img
                                                                                    class="rounded-full bg-white w-4 h-4 min-w-4 z-10"
                                                                                    src="/vendor/@injectivelabs/token-metadata/projx.png"
                                                                                    name="PROJX"
                                                                                />
                                                                                <span class="font-semibold uppercase text-sm">
                                                                                    {
                                                                                        token
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <span class="text-sm">
                                                                                <div class="flex">
                                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                                        <div>
                                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                                <p class="space-x-1">
                                                                                                    <span>
                                                                                                        696.2364
                                                                                                    </span>
                                                                                                </p>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex">
                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                        <div>
                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                <p class="space-x-1">
                                                                                    <span>
                                                                                        -3,728.3794
                                                                                    </span>
                                                                                </p>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                77,061.29 USD
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="text-right">
                                                                    <a
                                                                        href="https://testnet.explorer.injective.network/transaction/0xaa9a92677ffc94528ee76e0ba7d6362ff5f0684045402f790e590abf03fe08ca"
                                                                        rel="noopener noreferrer"
                                                                        target="_blank"
                                                                        class="font-semibold text-green-600 hover:opacity-70"
                                                                    >
                                                                        Details
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="align-top">
                                                                19 Dec 22:13:19
                                                            </td>

                                                            <td class="align-top">
                                                                <span>
                                                                    Removed
                                                                    liquidity
                                                                </span>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex flex-col gap-1">
                                                                    <div>
                                                                        <div class="flex w-full items-center justify-between gap-2">
                                                                            <div class="flex items-center gap-1">
                                                                                <img
                                                                                    class="rounded-full bg-white w-4 h-4 min-w-4 z-10"
                                                                                    src="/vendor/@injectivelabs/token-metadata/projx.png"
                                                                                    name="PROJX"
                                                                                />
                                                                                <span class="font-semibold uppercase text-sm">
                                                                                    {
                                                                                        token
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <span class="text-sm">
                                                                                <div class="flex">
                                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                                        <div>
                                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                                <p class="space-x-1">
                                                                                                    <span>
                                                                                                        696.2364
                                                                                                    </span>
                                                                                                </p>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex">
                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                        <div>
                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                <p class="space-x-1">
                                                                                    <span>
                                                                                        -3,728.3794
                                                                                    </span>
                                                                                </p>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                77,061.29 USD
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="text-right">
                                                                    <a
                                                                        href="https://testnet.explorer.injective.network/transaction/0x2a2c5f429dc5e046c114ec588c2c7c710dbe482c489405aa60eb90f00a38e246"
                                                                        rel="noopener noreferrer"
                                                                        target="_blank"
                                                                        class="font-semibold text-green-600 hover:opacity-70"
                                                                    >
                                                                        Details
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="align-top">
                                                                19 Dec 22:13:19
                                                            </td>

                                                            <td class="align-top">
                                                                <span>
                                                                    Removed
                                                                    liquidity
                                                                </span>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex flex-col gap-1">
                                                                    <div>
                                                                        <div class="flex w-full items-center justify-between gap-2">
                                                                            <div class="flex items-center gap-1">
                                                                                <img
                                                                                    class="rounded-full bg-white w-4 h-4 min-w-4 z-10"
                                                                                    src="/vendor/@injectivelabs/token-metadata/projx.png"
                                                                                    name="PROJX"
                                                                                />
                                                                                <span class="font-semibold uppercase text-sm">
                                                                                    {
                                                                                        token
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <span class="text-sm">
                                                                                <div class="flex">
                                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                                        <div>
                                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                                <p class="space-x-1">
                                                                                                    <span>
                                                                                                        696.2364
                                                                                                    </span>
                                                                                                </p>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex">
                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                        <div>
                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                <p class="space-x-1">
                                                                                    <span>
                                                                                        -3,728.3794
                                                                                    </span>
                                                                                </p>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                77,061.29 USD
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="text-right">
                                                                    <a
                                                                        href="https://testnet.explorer.injective.network/transaction/0x118cc1d53e1a2f1e97517b662b2940aff4da59085ced4a40443e6b80dea6400a"
                                                                        rel="noopener noreferrer"
                                                                        target="_blank"
                                                                        class="font-semibold text-green-600 hover:opacity-70"
                                                                    >
                                                                        Details
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="align-top">
                                                                19 Dec 22:13:17
                                                            </td>

                                                            <td class="align-top">
                                                                <span>
                                                                    Removed
                                                                    liquidity
                                                                </span>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex flex-col gap-1">
                                                                    <div>
                                                                        <div class="flex w-full items-center justify-between gap-2">
                                                                            <div class="flex items-center gap-1">
                                                                                <img
                                                                                    class="rounded-full bg-white w-4 h-4 min-w-4 z-10"
                                                                                    src="/vendor/@injectivelabs/token-metadata/projx.png"
                                                                                    name="PROJX"
                                                                                />
                                                                                <span class="font-semibold uppercase text-sm">
                                                                                    {
                                                                                        token
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <span class="text-sm">
                                                                                <div class="flex">
                                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                                        <div>
                                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                                <p class="space-x-1">
                                                                                                    <span>
                                                                                                        696.2364
                                                                                                    </span>
                                                                                                </p>
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="flex">
                                                                    <div class="v-popper v-popper--theme-tooltip">
                                                                        <div>
                                                                            <p class="border-dashed border-b border-black cursor-pointer">
                                                                                <p class="space-x-1">
                                                                                    <span>
                                                                                        -3,728.3794
                                                                                    </span>
                                                                                </p>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-top">
                                                                77,061.29 USD
                                                            </td>
                                                            <td class="align-top">
                                                                <div class="text-right">
                                                                    <a
                                                                        href="https://testnet.explorer.injective.network/transaction/0xa75a8a6b14ca62648cc3676e35911b57f6d7a6e00895939e4a97301db3863ff1"
                                                                        rel="noopener noreferrer"
                                                                        target="_blank"
                                                                        class="font-semibold text-green-600 hover:opacity-70"
                                                                    >
                                                                        Details
                                                                    </a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div
                                                class="p-4 flex flex-wrap items-center justify-between text-sm w-full p-4"
                                                disabled="false"
                                            >
                                                <span>
                                                    From 1 to 10 total 2295
                                                </span>
                                                <div class="text-2xs tracking-1.5 flex items-center justify-center text-center">
                                                    <span class="text-gray-600">
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="cursor-pointer h-3 w-3 min-w-3 cursor-pointer h-3 w-3 min-w-3"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M11.3536 1.64645C11.5488 1.84171 11.5488 2.15829 11.3536 2.35355L5.70711 8L11.3536 13.6464C11.5488 13.8417 11.5488 14.1583 11.3536 14.3536C11.1583 14.5488 10.8417 14.5488 10.6464 14.3536L4.64645 8.35355C4.45118 8.15829 4.45118 7.84171 4.64645 7.64645L10.6464 1.64645C10.8417 1.45118 11.1583 1.45118 11.3536 1.64645Z"
                                                                fill="currentColor"
                                                            ></path>
                                                        </svg>
                                                    </span>
                                                    <div class="mx-3 flex items-center gap-0.5 text-sm font-semibold">
                                                        <div class="cursor-pointer">
                                                            <span class="px-2 py-1 hover:bg-green-600 hover:bg-opacity-80 hover:text-white bg-green-600 text-white">
                                                                1
                                                            </span>
                                                        </div>
                                                        <div class="cursor-pointer">
                                                            <span class="px-2 py-1 hover:bg-green-600 hover:bg-opacity-80 hover:text-white">
                                                                2
                                                            </span>
                                                        </div>
                                                        <div class="cursor-pointer">
                                                            <span class="px-2 py-1 hover:bg-green-600 hover:bg-opacity-80 hover:text-white">
                                                                3
                                                            </span>
                                                        </div>
                                                        <div class="cursor-pointer">
                                                            <span class="px-2 py-1 hover:bg-green-600 hover:bg-opacity-80 hover:text-white">
                                                                4
                                                            </span>
                                                        </div>
                                                        <div class="cursor-pointer">
                                                            <span class="px-2 py-1 hover:bg-green-600 hover:bg-opacity-80 hover:text-white">
                                                                5
                                                            </span>
                                                        </div>
                                                        <div class="cursor-pointer">
                                                            <span class="px-2 py-1 hover:bg-green-600 hover:bg-opacity-80 hover:text-white">
                                                                ...
                                                            </span>
                                                        </div>
                                                        <div class="cursor-pointer">
                                                            <span class="px-2 py-1 hover:bg-green-600 hover:bg-opacity-80 hover:text-white">
                                                                230
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span class="cursor-pointer text-black">
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="cursor-pointer h-3 w-3 min-w-3 -rotate-180"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M11.3536 1.64645C11.5488 1.84171 11.5488 2.15829 11.3536 2.35355L5.70711 8L11.3536 13.6464C11.5488 13.8417 11.5488 14.1583 11.3536 14.3536C11.1583 14.5488 10.8417 14.5488 10.6464 14.3536L4.64645 8.35355C4.45118 8.15829 4.45118 7.84171 4.64645 7.64645L10.6464 1.64645C10.8417 1.45118 11.1583 1.45118 11.3536 1.64645Z"
                                                                fill="currentColor"
                                                            ></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div class="v-popper v-popper--theme-dropdown inline-block cursor-pointer inline-block">
                                                    <div class="flex items-center gap-2 rounded border border-gray-400 py-2 px-3">
                                                        <span class="font-semibold text-gray-700 text-base leading-4">
                                                            10
                                                        </span>
                                                        <div>
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="cursor-pointer h-4 w-4 min-w-4 rotate-180"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M1.64645 4.64645C1.84171 4.45118 2.15829 4.45118 2.35355 4.64645L8 10.2929L13.6464 4.64645C13.8417 4.45118 14.1583 4.45118 14.3536 4.64645C14.5488 4.84171 14.5488 5.15829 14.3536 5.35355L8.35355 11.3536C8.15829 11.5488 7.84171 11.5488 7.64645 11.3536L1.64645 5.35355C1.45118 5.15829 1.45118 4.84171 1.64645 4.64645Z"
                                                                    fill="currentColor"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-v-69ed45e4="" class="mt-10 sm:hidden"></div>
                        <div
                            data-v-69ed45e4=""
                            class="xs:-ml-6 fixed bottom-0 z-20 -ml-4 w-full bg-green-200 p-3 sm:hidden flex items-center gap-4"
                        >
                            <button
                                data-v-69ed45e4=""
                                type="button"
                                class="flex items-center rounded-lg font-semibold outline-none py-3 px-4 text-base h-10 max-h-10 w-full bg-green-600 hover:bg-green-800 text-white"
                            >
                                <div
                                    data-v-69ed45e4=""
                                    class="m-auto flex items-center gap-2"
                                >
                                    <span data-v-69ed45e4="">-Remove</span>
                                    <svg
                                        data-v-69ed45e4=""
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        class="cursor-pointer h-4 w-4 min-w-4 rotate-180"
                                    >
                                        <path
                                            d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default Liquidity;
