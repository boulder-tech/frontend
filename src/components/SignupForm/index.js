import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Form,
    Button,
    Container,
    Grid,
    Header,
    Image,
    Message,
    Label,
    Segment,
    Input,
} from 'semantic-ui-react';
import {
    Envelope,
    Clock,
    Lock,
    ArrowRepeat,
    Eye,
    EyeSlash,
} from 'react-bootstrap-icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CLIENT_ALREADY_EXISTS = 100;
const SIGNUP_EMAIL_SENT = 101;
const CLIENT_SUCCESSFULLY_REGISTERED = 102;
const INVALID_EMAIL_OR_PASSWORD = 103;
const backendUrl = process.env.REACT_APP_BACKEND_URL;

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
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
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
        console.log('verifiedEmail', verifiedEmail);
        console.log('emailSent', emailSent);
        console.log('showLogin', showLogin);
        console.log('registrationSuccess', registrationSuccess);
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
                else if (code === SIGNUP_EMAIL_SENT) setEmailSent(true);
                else if (code === CLIENT_SUCCESSFULLY_REGISTERED)
                    setRegistrationSuccess(true);
            } else {
                // Manejar errores
                console.error('Error en el registro:', response.data);
            }
        } catch (error) {
            // Manejar errores de red o cualquier otro error
            console.error('Error en la solicitud:', error);

            if (!error.response.data.success) {
                console.log('ERROR AL REGISTRARSE');
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
            <Grid>
                {verifiedEmail && !registrationSuccess && (
                    <Grid.Column>
                        <div>
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
                            <Form.Field>
                                <Form.Input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    readOnly // Hacer que el campo de entrada de correo electrónico sea de solo lectura
                                />
                            </Form.Field>

                            <Form.Field>
                                <Form.Input
                                    type="text"
                                    placeholder="Names"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </Form.Field>

                            <Form.Field>
                                <Form.Input
                                    type="text"
                                    placeholder="Lastname"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </Form.Field>

                            <Form.Field>
                                <Form.Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Form.Field>
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={handleRegister}
                                className="mt-3"
                            >
                                Sign Up
                            </Button>
                        </Form>
                    </Grid.Column>
                )}
                {!emailSent && !verifiedEmail && !registrationSuccess && (
                    <Grid.Column>
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
                            <Form.Field>
                                <label>Email</label>
                                <Form.Input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Field>
                            {showLogin && (
                                <Form.Field>
                                    <Form.Input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        icon={
                                            <Button
                                                icon={
                                                    showPassword
                                                        ? 'eye slash'
                                                        : 'eye'
                                                }
                                                onClick={
                                                    togglePasswordVisibility
                                                }
                                            />
                                        }
                                        iconPosition="right"
                                    />
                                    {errors.password && (
                                        <Label basic color="red" pointing>
                                            {errors.password}
                                        </Label>
                                    )}
                                </Form.Field>
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
                    </Grid.Column>
                )}
                {emailSent && (
                    <Grid.Column className="bg-light p-4 rounded">
                        <h4 className="mb-4">Check Your Email</h4>
                        <p>
                            We sent an email to <strong>{email}</strong> with
                            instructions on how to sign in to your account.
                        </p>

                        <Grid columns={2}>
                            <Grid.Column>
                                <p className="ui inline">
                                    <Envelope size={24} className="mr-2" />
                                    The magic link is in your email.
                                </p>
                            </Grid.Column>
                            <Grid.Column>
                                <p className="ui inline">
                                    <Clock size={24} className="mr-2" />
                                    The link expires in 1 hour.
                                </p>
                            </Grid.Column>
                        </Grid>

                        <Grid columns={2}>
                            <Grid.Column>
                                <p className="ui inline">
                                    <Lock size={24} className="mr-2" />
                                    Don't share this link. It's only meant for
                                    you.
                                </p>
                            </Grid.Column>
                            <Grid.Column>
                                <p className="ui inline">
                                    <ArrowRepeat size={24} className="mr-2" />
                                    Didn't receive this link?{' '}
                                    <a href="#" className="text-primary">
                                        Try again.
                                    </a>
                                </p>
                            </Grid.Column>
                        </Grid>

                        <Grid className="mt-4">
                            <Grid.Column>
                                <Message info>
                                    <Message.Header>
                                        Forgot your email or need help?
                                    </Message.Header>
                                    <p>
                                        Get assistance via{' '}
                                        <a href="mailto:support@bouldertech.fi">
                                            support@bouldertech.fi
                                        </a>
                                    </p>
                                </Message>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                )}
                {registrationSuccess && (
                    <Grid.Column className="bg-light p-4 rounded">
                        <h4 className="mb-4">Account Created Successfully</h4>
                        <p>
                            Your account has been successfully created. You can
                            now <a href="/signup">sign in</a> to your new
                            account.
                        </p>
                    </Grid.Column>
                )}
            </Grid>
        </Container>
    );
};

export default SignupForm;
