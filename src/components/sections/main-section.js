import Product from '../Product';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import './styles.css';

const MainSection = () => {
    return (
        <div className="xs:px-6 mx-auto flex flex-col w-full h-full grow px-4 pt-4 pb-10 md:px-8 text-black relative">
            <div class="font-extrabold text-3xl md:text-[64px] [text-wrap:balance] bg-clip-text text-white bg-gradient-to-r from-slate-200/60 to-50% to-slate-200">{`New way of investing, `}<span class="text-[#FF00F5] inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.normal))] md:h-[calc(theme(fontSize.6xl)*theme(lineHeight.normal))] overflow-hidden">
                <ul class="block animate-text-slide-5 text-left leading-normal whitespace-normal [&_li]:block">
                    <li class="leading-normal overflow-hidden">made easy.</li>
                    <li class="leading-normal overflow-hidden">securely.</li>
                    <li class="leading-normal overflow-hidden">faster.</li>
                    <li class="leading-normal overflow-hidden">transparently.</li>
                    <li class="leading-normal overflow-hidden">innovatively.</li>
                    <li class="leading-normal overflow-hidden" aria-hidden="true">made easy.</li>
                </ul>
            </span></div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-6 mt-6 h-full">
                <Product
                    name={'GD30D/USDT'}
                    token={'GD30D'}
                    stable_coin={'USDT'}
                    progress={70}
                    icon={`/logos/ARG.png`}
                />
                <Product
                    name={'TBILL/USDT'}
                    token={'TBILL'}
                    stable_coin={'USDT'}
                    progress={55}
                    icon={`/logos/USA.png`}
                />
            </div>
        </div>
    );
};

export default MainSection;
