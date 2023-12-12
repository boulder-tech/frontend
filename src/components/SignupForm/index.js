import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Image,
    Alert,
    InputGroup,
} from 'react-bootstrap';
import {
    Envelope,
    Clock,
    Lock,
    ArrowRepeat,
    Eye,
    EyeSlash,
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CLIENT_ALREADY_EXISTS = 100;
const INVALID_EMAIL_OR_PASSWORD = 101;
const backendUrl = process.env.REACT_BACKEND_URL;

const SignupForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [verifiedEmail, setVerifiedEmail] = useState('');
    const [emailSent, setEmailSent] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        general: '',
    });

    useEffect(() => {
        // Leer el email desde el localStorage
        const storedEmail = localStorage.getItem('email');

        // Establecer el estado con el email almacenado
        if (storedEmail) {
            setEmail(storedEmail);
            setVerifiedEmail(storedEmail);
            localStorage.removeItem('email');
        }
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica de registro
        //console.log('Email:', email);
        //console.log('Password:', password);
        //console.log('Confirm Password:', confirmPassword);

        try {
            const response = await axios.post(
                `${backendUrl}/api/client/signup`,
                {
                    email,
                    name: firstName,
                    lastname: lastName,
                    password,
                    verified: verifiedEmail ? true : false,
                }
            );

            // La respuesta de Axios ya tiene el cuerpo JSON analizado
            if (response.status === 200) {
                // Manejar el caso de éxito
                console.log('Registro exitoso:', response.data);

                const { code } = response.data;

                if (code === CLIENT_ALREADY_EXISTS) setShowLogin(true);
            } else {
                // Manejar errores
                console.error('Error en el registro:', response.data);
            }
        } catch (error) {
            // Manejar errores de red o cualquier otro error
            console.error('Error en la solicitud:', error);

            if (!error.response.data.success) {
                console.log('REGISTRESE');
                setEmailSent(true);
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const validationErrors = {
            email: email ? '' : 'Email is required',
            password: password ? '' : 'Password is required',
        };
        
        const { code, success } = await login(email, password);

        if (success) {
            console.log('Login exitoso');
            navigate('/');
        } else {
            if (password && code === INVALID_EMAIL_OR_PASSWORD)
                validationErrors.general = 'Invalid email or password';

            setErrors(validationErrors);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container>
            <Row className="justify-content-md-center py-5">
                {verifiedEmail && (
                    <Col xs={12} md={6}>
                        <div className="mb-4">
                            <h2>Sign up</h2>
                            <p>
                                Ready to get started? Fill in the details below
                                to create your new account. If you're already a
                                member, you can{' '}
                                <a href="/signin" className="text-primary">
                                    sign in here
                                </a>
                                .
                            </p>
                        </div>
                        <Form>
                            <Form.Group
                                controlId="formBasicEmail"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    readOnly // Make the email input read-only
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="formBasicFirstName"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Names"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="formBasicLastName"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Lastname"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="formBasicPassword"
                                className="mb-3"
                            >
                                <InputGroup>
                                    <Form.Control
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <EyeSlash /> : <Eye />}
                                    </Button>
                                </InputGroup>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={handleRegister}
                                className="mt-3"
                            >
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                )}
                {!emailSent && !verifiedEmail && (
                    <Col xs={12} md={6}>
                        <div className="mb-4">
                            <h2>
                                {showLogin ? 'Sign in' : 'Sign up or Sign in'}
                            </h2>
                            <p>
                                {showLogin
                                    ? 'Enter your email and password to sign in to your account.'
                                    : `Enter your email to sign in to your account. If you don't have an account yet, one will be created for you.`}
                            </p>
                        </div>
                        <Form>
                            <Form.Group
                                controlId="formBasicEmail"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            {showLogin && (
                                <Form.Group
                                    controlId="formBasicPassword"
                                    className="mb-3"
                                >
                                    <InputGroup>
                                        <Form.Control
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            isInvalid={!!errors.password}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <EyeSlash />
                                            ) : (
                                                <Eye />
                                            )}
                                        </Button>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            )}
                            <div className="d-inline-flex flex-column">
                                {errors.general && (
                                    <Form.Text className="text-danger">
                                        {errors.general}
                                    </Form.Text>
                                )}

                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={
                                        showLogin ? handleLogin : handleRegister
                                    }
                                    className="mt-3"
                                >
                                    {showLogin ? 'Login' : 'Continue'}
                                </Button>
                            </div>
                        </Form>
                    </Col>
                )}
                {emailSent && (
                    <Col className="bg-light p-4 rounded">
                        <h4 className="mb-4">Check Your Email</h4>
                        <p>
                            We sent an email to <strong>{email}</strong> with
                            instructions on how to sign in to your account.
                        </p>

                        <Row className="mt-4">
                            <Col md={6} className="d-flex align-items-center">
                                <Envelope size={24} className="mr-2" />
                                <p className="m-1">
                                    The magic link is in your email.
                                </p>
                            </Col>
                            <Col md={6} className="d-flex align-items-center">
                                <Clock size={24} className="mr-2" />
                                <p className="m-1">
                                    The link expires in 1 hour.
                                </p>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col md={6} className="d-flex align-items-center">
                                <Lock size={24} className="mr-2" />
                                <p className="m-1">
                                    Don't share this link. It's only meant for
                                    you.
                                </p>
                            </Col>
                            <Col md={6} className="d-flex align-items-center">
                                <ArrowRepeat size={24} className="mr-2" />
                                <p className="m-1">
                                    Didn't receive this link?{' '}
                                    <a href="#" className="text-primary">
                                        Try again.
                                    </a>
                                </p>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col>
                                <Alert variant="info">
                                    Forgot your email or need help? Get
                                    assistance via{' '}
                                    <a href="mailto:support@bouldertech.fi">
                                        support@bouldertech.fi
                                    </a>
                                </Alert>
                            </Col>
                        </Row>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default SignupForm;
