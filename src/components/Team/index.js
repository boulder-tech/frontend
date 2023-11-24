import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Team = () => {
  return (
    <Container>
      <h2 className="mt-5 text-center">Our Team</h2>
      <p className="text-center">Meet the talented individuals behind our project:</p>
      <Row className="justify-content-center">
        <Col md={4} className="text-center">
          <div className="team-member">
            <img
              src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="Rodri"
              className="img-fluid rounded-circle mb-3"
              style={{ width: '150px', height: '150px' }}
            />
            <h4>Rodri</h4>
            <p className="text-muted">CEO</p>
          </div>
        </Col>
        <Col md={4} className="text-center">
          <div className="team-member">
            <img
              src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="Guille"
              className="img-fluid rounded-circle mb-3"
              style={{ width: '150px', height: '150px' }}
            />
            <h4>Guille</h4>
            <p className="text-muted">CTO</p>
          </div>
        </Col>
        <Col md={4} className="text-center">
          <div className="team-member">
            <img
              src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="Pablo"
              className="img-fluid rounded-circle mb-3"
              style={{ width: '150px', height: '150px' }}
            />
            <h4>Pablo</h4>
            <p className="text-muted">Lead Developer</p>
          </div>
        </Col>
      </Row>
      {/* Puedes agregar más miembros del equipo según sea necesario */}
    </Container>
  );
};

export default Team;
