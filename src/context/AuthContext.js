// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post(
                'http://204.236.148.119:1337/api/client/login',
                {
                    email,
                    password,
                }
            );

            if (response.status === 200) {
                setUser(response.data.client); // Almacena el usuario después del inicio de sesión exitoso
                return response.data; // Indica que el inicio de sesión fue exitoso
            } else {
                console.error('Error en el login:', response.data);
                return false; // Indica que el inicio de sesión falló
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            return error.response.data; // Indica que el inicio de sesión falló debido a un error de red u otro error
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
