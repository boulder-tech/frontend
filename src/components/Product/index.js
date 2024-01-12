const Product = ({ name, token, stable_coin, progress, icon }) => {
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
                <span className="text-sm">
                    Albert aquí va la descripción del token
                </span>
                <div className="grid grid-cols-2 sm:max-lg:grid-cols-1 gap-2 gap-y-4 mb-6 mt-10">
                    {/* Resto del contenido */}
                </div>
                <div className="h-full-flex justify-end">
                    <div className="text-right">
                        <div className="flex justify-between text-sms">
                            <span>TVL</span>
                            <span>Max Cap</span>
                        </div>
                        <p>¿Albert y Guille que ponemos aquí abajo?</p>
                        <div className="bg-[#D9D9D9] w-full rounded overflow-x-hidden mt-2 h-2">
                            <div
                                className="bar h-full"
                                style={{
                                    width: `${progress}%`,
                                    background: 'green',
                                }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-sms font-semibold">
                            <span>{`310,030,860.10 ${token}`}</span>
                            <span>{`20M ${token}`} </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 mt-4">
                        <a href={`/vault/${token}`} className="w-full">
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
        </div>
    );
};

export default Product;
