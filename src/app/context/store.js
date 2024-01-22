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
    const [client, setClient] = useState(null);
    const [socket, setSocket] = useState(null);

    return (
        <GlobalContext.Provider
            value={{ wallet, setWallet, client, setClient, socket, setSocket }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
