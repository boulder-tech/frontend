'use client';

import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
} from 'react';

const GlobalContext = createContext({
    user: {
        wallet: {},
    },
});

export const GlobalContextProvider = ({ children }) => {
    const [wallet, setWallet] = useState({});

    return (
        <GlobalContext.Provider value={{ wallet, setWallet }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
