'use client';
import React, { useState } from 'react';
import MainSection from '../components/sections/main-section';

const Home = () => {
    const [isNavbarOpen, setNavbarOpen] = useState(true);

    const toggleNavbar = () => {
        setNavbarOpen(!isNavbarOpen);
    };

    return (
        <main class="xs:px-6 mx-auto flex w-full grow px-4 pt-4 pb-10 md:px-8 text-black">
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
                        Grow your assets
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
                            <p class="text-base font-semibold">Vaults</p>
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
            <MainSection />
        </main>
    );
};

export default Home;
