import { useState, useEffect } from 'react';
import axios from 'axios';

Number.prototype.round = function (decimals) {
    if (isNaN(this)) return NaN;
    const factor = Math.pow(10, decimals);
    return Math.round(this * factor) / factor;
};

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

const Product = ({ name, token, stable_coin, progress, icon }) => {
    const [price, setPrice] = useState(0);

    useEffect(() => {
        fetchTokenPrice(token);
    }, []);

    const fetchTokenPrice = async (token) => {
        try {
            const {
                data: { price, price_24h, last_24h },
            } = await axios.get(`${backendUrl}/api/asset/name/${token}`);

            setPrice(price);
        } catch (e) {
            console.log('Failed to fetch token price', e);
        }
    };

    const products = {
        GD30D: `Argentinian government bond USD 2030 Law NY (GD30).`,
        TBILL: `U.S. government debt backed by the Treasury Department.`,
    };

    return (
        <div className="flex-col w-full h-full items-start justify-start p-5 gap-5 border rounded-2xl shadow-2xl">
            <div className="grid grid-cols-6">
                <div className="col-span-1">
                    <img
                        className="rounded-full bg-white w-12 h-12 min-w-12"
                        src={icon}
                        alt="PROJX"
                    />
                </div>
                <div className="col-span-5 flex flex-col">
                    <div className="text-left text-2xl font-medium text-slate-50">
                        {token}
                    </div>
                    <div className="text-left text-base font-normal text-white">
                        {products[token]}
                    </div>
                </div>
            </div>
            <div className="p-6 h-full-flex">
                <div className="grid grid-cols-2 sm:max-lg:grid-cols-1 gap-2 gap-y-4 mb-6 mt-10">
                    {/* Resto del contenido */}
                </div>
                <div className="text-left text-4xl font-medium text-slate-50">
                    {token === 'GD30D' ? `$${price.round(2)}` : `${price.round(2)}%`}
                </div>
                <div className="flex items-center gap-1 mt-4">
                    <a href={`/product/${token}`} className="w-full">
                        <button
                            type="button"
                            className="flex items-center rounded-lg outline-none py-3 px-4 text-sm h-10 max-h-10 w-full bg-[#245BFF] hover:bg-[#2e4f92] text-white"
                        >
                            <span className="mx-auto">Details</span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Product;
