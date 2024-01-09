import React from 'react';

const Modal = ({ isOpen, onClose, title, maxWitdh, children }) => {
    return (
        <>
            {isOpen ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div
                                className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ${maxWitdh}`}
                            >
                                {/*header*/}
                                <div className="ml-auto mr-3 mt-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        className="cursor-pointer h-5 w-5 min-w-5 text-gray-600 hover:text-green-600"
                                        onClick={onClose}
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="flex items-start justify-between pt-1 pb-1 pl-5 pr-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h2
                                        class="text-xl font-semibold leading-6 text-gray-900"
                                        id="headlessui-dialog-title-:r2m:"
                                        data-headlessui-state="open"
                                    >
                                        {title}
                                    </h2>

                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={onClose}
                                    >
                                        <span className="text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                {children}
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};

export default Modal;
