'use client';

import { MoralisProvider } from "react-moralis"

const Moralis = ({ children }) => {
    return <MoralisProvider initializeOnMount={false}>
        {children}
    </MoralisProvider>
}

export default Moralis;