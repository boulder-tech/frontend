import React, { useState } from 'react';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
        <Menu inverted className="menu" stackable>
            <Menu.Item as={NavLink} to="/" exact>
                Boulder Tech
            </Menu.Item>
            <Menu.Item as={NavLink} to="/bt-2">
                BT-2
            </Menu.Item>
            <Menu.Item as={NavLink} to="/token-sale">
                Token Sale
            </Menu.Item>
            <Menu.Item as={NavLink} to="/team">
                Team
            </Menu.Item>
            <Menu.Item as={NavLink} to="/contact">
                Contact
            </Menu.Item>

            {user && (
                <Dropdown
                    item
                    trigger={
                        <span>
                            <PersonCircle size={24} className="mr-2" />
                            {user.email}
                        </span>
                    }
                    icon={null}
                >
                    <Dropdown.Menu>
                        <Dropdown.Item>Verified</Dropdown.Item>
                        <Dropdown.Item>Regular User</Dropdown.Item>
                        <Dropdown.Item>Link Twitter</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/portfolio">
                            Portfolio
                        </Dropdown.Item>
                        <Dropdown.Item>Identification</Dropdown.Item>
                        <Dropdown.Item>Referral</Dropdown.Item>
                        <Dropdown.Item>New</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>New User Zone</Dropdown.Item>
                        <Dropdown.Item>Rewards Hub</Dropdown.Item>
                        <Dropdown.Item>API Management</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>
                            Log Out
                            <BoxArrowRight className="ml-2" />
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </Menu>
    );
};

export default Header;
