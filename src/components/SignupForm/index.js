import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de registro
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <Container>
      <Row className="justify-content-md-center py-5">
        <Col xs={12} md={6}>
          <div className="mb-4">
            <h2>Sign up or Sign in</h2>
            <p>Enter your email to sign in to your account. If you don't have an account yet, one will be created for you.</p>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleRegister} className="mt-3">
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
