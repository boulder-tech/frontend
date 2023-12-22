import Product from '../Product';

const MainSection = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center relative px-8 bg-white">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <Product
                    name={'GD30D/USDT'}
                    token={'GD30D'}
                    stable_coin={'USDT'}
                    progress={70}
                />
            </div>
        </div>
    );
};

export default MainSection;
