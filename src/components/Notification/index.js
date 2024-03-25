import React, { useState, useEffect } from 'react';

const Notification = ({title, message, onHide = () => {}}) => {
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (isActive) {
            const timeout = setTimeout(() => {
                setIsActive(false);
                onHide();
            }, 5000); // Ocultar la notificación después de 5 segundos

            return () => clearTimeout(timeout);
        }
    }, [isActive]);

    return (
        <div
            className={`fixed bottom-0 right-0 mb-4 mr-4 bg-white text-gray-800 p-6 rounded-lg shadow-lg transition-opacity duration-1000 ${
                isActive ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <p className="text-base font-semibold">{title}</p>
            <p className="text-sm mt-2">
                {message}
            </p>
        </div>
    );
};

export default Notification;
