import { Metadata } from 'next';
import localFont from 'next/font/local';
import clsx from 'clsx';
import './globals.css';
import Header from '../components/Header';
//import Footer from '@/components/sections/footer';
import { GlobalContextProvider } from './context/store';
import MoralisProvider from './context/MoralisProvider'

const atypDisplay = localFont({
    variable: '--font-atyp-display',
    src: './fonts/AtypDisplay-Medium.woff',
});

const atypText = localFont({
    variable: '--font-atyp-text',
    src: [
        {
            path: './fonts/AtypText-Regular.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/AtypText-Medium.woff',
            weight: '500',
            style: 'normal',
        },
    ],
});

export const metadata = {
    title: 'Boulder Tech',
    description: 'The gateway token',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-fractal bg-center">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-dark-top-left"></div>
                <MoralisProvider>
                    <GlobalContextProvider>
                        <Header />
                        <main className="">
                            {children}
                        </main>
                    </GlobalContextProvider>
                </MoralisProvider>
            </body>
        </html>
    );
}
