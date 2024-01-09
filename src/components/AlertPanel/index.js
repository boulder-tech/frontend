import React, { useState } from 'react';

const AlertPanel = ({ isOpen, onClose, closeModal }) => {
    return (
        <div class="py-2 px-2 md:px-0 w-full bg-[#FFEED5] flex justify-center items-center mt-10 gap-x-1 md:gap-x-0">
            <img src="icons/yellow-info.svg" width="24" height="24" />
            <p class="text-base leading-[160%]">
                GD30D has migrated to a
                <a
                    class="font-medium underline"
                    href="https://etherscan.io/address/0xdd50C053C096CB04A3e3362E2b622529EC5f2e8a"
                    target="_blank"
                >
                    new contract address
                </a>
                from
                <a
                    class="font-medium underline"
                    href="https://etherscan.io/address/0xad6250f0BD49F7a1eB11063af2cE9F25B9597b0F"
                    target="_blank"
                >
                    the old contract address
                </a>
                Read more
                <a
                    class="font-medium underline"
                    href="https://medium.com/@openeden/openeden-announces-tbill-vault-migration-from-beta-to-full-launch-a7d4ff92d6d6"
                    target="_blank"
                >
                    here
                </a>
                .
            </p>
        </div>
    );
};

export default AlertPanel;
