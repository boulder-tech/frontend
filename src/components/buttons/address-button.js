import clsx from 'clsx';

const AddressButton = ({ children, onClick, classes, iconBtn }) => {
    return (
        <button
            onClick={onClick}
            className={clsx(
                'transition-all font-medium duration-200 hover:bg-gray-200 hover:border-gray-300 bg-gray-100 border border-gray-200 rounded-full px-4 text-sm h-10 text-foreground-heading flex items-center justify-center',
                iconBtn && 'w-10',
                classes
            )}
        >
            {children}
        </button>
    );
};
export default AddressButton;
