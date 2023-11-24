// Footer.js

import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container>
        <Row>
          <Col>
            <h5>Products</h5>
            <ul className="list-unstyled">
              <li>BT-2</li>
            </ul>
          </Col>
          <Col>
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>About</li>
              <li>Careers</li>
              <li>Contact Us</li>
              <li>What's New</li>
            </ul>
          </Col>
          <Col>
            <h5>Explore</h5>
            <ul className="list-unstyled">
              <li>Docs</li>
              <li>Blog</li>
              <li>Trust & Security</li>
            </ul>
          </Col>
          <Col>
            <h5>Subscription</h5>
            <p>
              Stay up-to-date with Boulder Tech. We value your inbox: no spam, only important news, and insights.
            </p>
            <Row>
              <Col xs={8} className="mb-2">
                <Form.Control type="email" placeholder="Email" />
              </Col>
              <Col xs={4} className="mb-2">
                <Button variant="light" type="button" className="w-100">
                  Subscribe
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <div className="py-2 bg-dark text-light text-center">
        <p>Boulder Tech © 2023</p>
        <p>
          <a href="/">Terms of Service</a> | <a href="/">Privacy Policy</a> | <a href="/">Cookie Preferences</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
