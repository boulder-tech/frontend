import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const AuthToken = () => {
    const { token } = useParams();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        // Define la URL con el token como parámetro
        const url = `${backendUrl}/api/client/verify-token/${token}`;
    
        // Realiza la solicitud PUT con Axios
        axios.put(url, {
          // Puedes incluir datos en el cuerpo si es necesario
          // data: { /* tus datos */ },
        })
          .then(response => {
            // Manejar la respuesta exitosa
            console.log('Success:', response.data);

            const { email } = response.data;

            localStorage.setItem('email', email);

            setRedirect(true);
          })
          .catch(error => {
            // Manejar errores de la solicitud
            console.error('Error:', error);
          });
      }, [token]);
    
      if (redirect) {
        return <Navigate to="/signup" />;
      }

    return (
    <div></div>
  );
};

export default AuthToken;
