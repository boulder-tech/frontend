import { Metadata } from 'next';
import localFont from 'next/font/local';
import clsx from 'clsx';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/sections/footer';

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
            <body
                className={clsx(
                    atypDisplay.variable,
                    atypText.variable,
                    'font-atyp-text',
                    'bg-background',
                    'text-foreground-heading'
                )}
            >
                <Header />
                <main className="flex flex-col bg-background">
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
}
