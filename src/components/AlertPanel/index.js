import React, { useState } from 'react';

const AlertPanel = ({ icon, children }) => {
    return (
        <div class="py-2 px-2 md:px-0 w-full bg-[#FFEED5] flex justify-center items-center mt-10 gap-x-1 md:gap-x-0">
            {icon && <img src={icon} width="24" height="24" />}
            {children}
        </div>
    );
};

export default AlertPanel;
