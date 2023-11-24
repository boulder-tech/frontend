import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Features = () => {
  return (
    <section id="token-sale" className="py-5 bg-light">
      <Container>
        <Row>
          <Col>
            <h2 className="text-center mb-4">BT-2</h2>
            <p className="text-center"></p>
            <div className="text-center">
                <Link to="/signup">
                    <Button variant="primary">Buy BT-2</Button>
                </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Features;
