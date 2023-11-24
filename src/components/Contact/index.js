import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center">Contact us</h2>
      <p className="text-center">
        Interested in one of our products or have a question? Send us a message and we'll get back to you shortly.
      </p>

      <Row className="justify-content-center">
        <Col md={6}>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name *</Form.Label>
              <Form.Control type="text" placeholder="Enter your first name" required />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control type="text" placeholder="Enter your last name" required />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email *</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group controlId="formOrganization">
              <Form.Label>Organization</Form.Label>
              <Form.Control type="text" placeholder="Enter your organization" />
            </Form.Group>

            <Form.Group controlId="formReason">
              <Form.Label>Reason *</Form.Label>
              <Form.Control as="select" required>
                <option value="">Select a reason</option>
                <option value="product">Product Inquiry</option>
                <option value="question">General Question</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message *</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Enter your message" required />
            </Form.Group>

            <div className="text-right">
              <Button variant="primary" type="submit" className="mt-3">
                Send Message
              </Button>
            </div>
          </Form>
        </Col>
      </Row>

      <Row className="mt-3 justify-content-center">
        <Col md={6}>
          <p>
            You can also send us a message by emailing us at{' '}
            <a href="mailto:support@bouldertech.fi">support@bouldertech.fi</a>.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
