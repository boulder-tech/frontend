import Product from '../Product';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const MainSection = () => {
    return (
        <div className="xs:px-6 mx-auto flex flex-col w-full grow px-4 pt-4 pb-10 md:px-8 text-black bg-white relative">
            <div>
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                >
                    <div>
                        <img src="/carousel/1.png" />
                    </div>
                    <div>
                        <img src="/carousel/2.png" />
                    </div>
                </Carousel>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
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
