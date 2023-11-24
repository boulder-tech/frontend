import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const TokenSale = () => {
  return (
    <section id="token-sale" className="py-5 bg-light">
      <Container>
        <Row>
          <Col>
            <h2 className="text-center mb-4">Token Sale</h2>
            <p className="text-center">Join our token sale and be part of the future of cryptocurrency!</p>
            <div className="text-center">
              <Link to="/signup">
                    <Button variant="primary">Buy Tokens</Button>
                </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TokenSale;
