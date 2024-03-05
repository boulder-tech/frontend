import React, { useState } from 'react';

const AlertPanel = ({ icon, children }) => {
    return (
        <div class="bg-gradient-yellow-top-bottom rounded-lg shadow py-2 px-2 md:px-0 w-full flex justify-center items-center gap-x-1 md:gap-x-0">
            {icon && <img src={icon} width="24" height="24" />}
            {children}
        </div>
    );
};

export default AlertPanel;
