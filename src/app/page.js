'use client';
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { AutoPlay } from "@egjs/flicking-plugins";
import Flicking, { MoveEvent, WillChangeEvent } from "@egjs/react-flicking";
//https://github.com/naver/egjs-flicking
import MainPanel from '../components/MainPanel';
import MainSection from '../components/sections/main-section';

import '@egjs/flicking/dist/flicking.css'
import '@egjs/flicking-plugins/dist/flicking-plugins.css'

const Home = () => {
    const [isNavbarOpen, setNavbarOpen] = useState(true);
    const plugins = [new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false })];

    const toggleNavbar = () => {
        setNavbarOpen(!isNavbarOpen);
    };

    return (
        <div className="xs:px-6 mx-auto h-full grow px-4 pt-4 md:px-[30px] text-black grid gap-4 grid-cols-12 grid-rows-[75%,25%]">
            {
                //<div className="absolute top-0 left-0 w-full h-full bg-gradient-dark-top-right"></div>
            }
            <div className="absolute top-0 left-0 w-full h-full bg-[#010312] bg-opacity-70"></div>
            <div className="col-span-3">
                <MainPanel />
            </div>
            <div className="col-span-9">
                <MainSection />
            </div>
            <div className="col-span-12">
                <Flicking
                    duration={2000}
                    cameraClass=""
                    renderOnSameKey={false}
                    align="center"
                    defaultIndex={0}
                    onMove={(e) => {}}
                    onWillChange={(e) => {}}
                    horizontal={true}
                    circular= {true}
                    moveType='snap'
                    threshold={50}
                    plugins={plugins}
                >
                    <div className="rounded-3xl overflow-hidden shadow-md">
                        <img src="/carousel/1.png" alt="carousel image" className="w-full" />
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-md">
                        <img src="/carousel/2.png" alt="carousel image" className="w-full" />
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-md">
                        <img src="/carousel/1.png" alt="carousel image" className="w-full" />
                    </div>
                </Flicking>
                
            </div>
        </div>
    );
};

export default Home;
