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
        <div className="bg-white rounded-xl no-active overflow-x-hidden h-full-flex border border-gray-400 hover:border-gray-600 text-black mr-5">
            <div className="p-6 h-full-flex">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="relative">
                        <img
                            className="rounded-full bg-white w-10 h-10 min-w-10"
                            src={icon}
                            alt="PROJX"
                        />
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <h3 className="text-2xl font-semibold text-ellipsis truncate pb-1">
                        {`${token}`}
                    </h3>
                    <div className="bg-gray-525 text-white h-5 flex items-center justify-between p-2 rounded">
                        <span className="text-xs font-semibold">V1</span>
                    </div>
                </div>
                <span className="text-sm">{products[token]}</span>
                <div className="grid grid-cols-2 sm:max-lg:grid-cols-1 gap-2 gap-y-4 mb-6 mt-10">
                    {/* Resto del contenido */}
                </div>
                <div className="h-full-flex justify-end mb-7">
                    <div className="text-right">
                        <p className="text-5xl">
                            {token === 'GD30D'
                                ? `$${price.round(2)}`
                                : `${price.round(2)}%`}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1 mt-4">
                    <a href={`/product/${token}`} className="w-full">
                        <button
                            type="button"
                            className="flex items-center rounded-lg font-semibold outline-none py-3 px-4 text-base h-10 max-h-10 w-full bg-[#0F2656] hover:bg-[#2e4f92] text-white"
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
