import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
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
        <Navbar bg="dark" variant="dark">
            <Nav>
                <Navbar.Brand as={NavLink} to="/" exact>
                    Boulder Tech
                </Navbar.Brand>
                <Nav.Link as={NavLink} to="/bt-2">
                    BT-2
                </Nav.Link>
                <Nav.Link as={NavLink} to="/token-sale">
                    Token Sale
                </Nav.Link>
                <Nav.Link as={NavLink} to="/team">
                    Team
                </Nav.Link>
                <Nav.Link as={NavLink} to="/contact">
                    Contact
                </Nav.Link>

                {user && (
                    <NavDropdown
                        title={
                            <div
                                onClick={handleUserMenuToggle}
                                className="d-flex align-items-center"
                            >
                                <PersonCircle size={24} className="mr-4" />
                                <span className="mr-4">{user.email}</span>
                            </div>
                        }
                        show={showUserMenu}
                        onSelect={() => setShowUserMenu(false)}
                    >
                        <NavDropdown.Item>Verified</NavDropdown.Item>
                        <NavDropdown.Item>Regular User</NavDropdown.Item>
                        <NavDropdown.Item>Link Twitter</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                        <NavDropdown.Item>Security</NavDropdown.Item>
                        <NavDropdown.Item>Identification</NavDropdown.Item>
                        <NavDropdown.Item>Referral</NavDropdown.Item>
                        <NavDropdown.Item>New</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>New User Zone</NavDropdown.Item>
                        <NavDropdown.Item>Rewards Hub</NavDropdown.Item>
                        <NavDropdown.Item>API Management</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                            Log Out
                            <BoxArrowRight className="ml-2" />
                        </NavDropdown.Item>
                    </NavDropdown>
                )}
            </Nav>
        </Navbar>
    );
};

export default Header;
