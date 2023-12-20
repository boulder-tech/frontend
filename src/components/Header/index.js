import React, { useState } from 'react';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import './Header.css';

const Header = () => {
    const { user, logout } = useAuth();

    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleUserMenuToggle = () => {
        setShowUserMenu(!showUserMenu);
    };

    const handleLogout = () => {
        // Lógica para cerrar sesión
        // ...

        // Cerrar el menú después de cerrar sesión
        setShowUserMenu(false);
    };

    return (
        <>
            <header className="w-full fixed h-[65px] top-0 z-50 py-3 bg-[rgba(1, 3, 18, 0.01)] border-b border-grey-200 backdrop-blur-lg">
                <div className="flex items-center justify-between 2xl:px-[300px] lg:px-[150px] md:px-[75px] px-[20px]">
                    <div className="flex gap-4 items-center justify-center divide-border-grey-200 divide-x-[1px]"></div>
                </div>
            </header>
        </>
    );
};

export default Header;
