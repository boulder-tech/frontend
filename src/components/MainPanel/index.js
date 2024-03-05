import React from 'react'

const MainPanel = () => {
    return <div className="grid w-full h-full grid-rows-3 grid-flow-col gap-9 pb-8"> 
        <div className="grid w-full h-full border rounded-2xl shadow-2xl text-white relative bg-[#FAFBFF] bg-opacity-5">
            <div className="absolute top-0 left-0 w-full h-full p-4">
                <div className="h-full">
                    <div className="p-0">
                        Total balance
                    </div>
                    <div className="text-[48px] text-bold text-[#FAFBFF]">
                        0
                    </div>
                    <div className="text-bold text-[#FAFBFF]">
                        0
                    </div>
                </div>
            </div>
        </div>
        <div className="grid w-full h-full border rounded-2xl shadow-2xl text-white relative bg-[#FAFBFF] bg-opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-fractal p-4">
                <div className="h-full">
                    <div className="p-0">
                        Available GD30D balance
                    </div>
                    <div className="text-[48px] text-bold text-[#FAFBFF]">
                        0
                    </div>
                    <div className="text-bold text-[#FAFBFF]">
                        $0
                    </div>
                </div>
            </div>
        </div>
        <div className="grid w-full h-full border rounded-2xl shadow-2xl text-white relative bg-[#FAFBFF] bg-opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-fractal p-4">
                <div className="h-full">
                    <div className="p-0">
                        Available GD30D balance
                    </div>
                    <div className="text-[48px] text-bold text-[#FAFBFF]">
                        -
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default MainPanel;