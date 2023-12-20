import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

const Home = () => {
    return (
        <div>
            <Container
                fluid
                style={{
                    background: '#122a5f',
                    color: 'white',
                    padding: '50px 15px',
                }}
            >
                <Container>
                    <h1>Introducing BT-2</h1>
                    <p>
                        BT-2 is a tokenized note secured by short-term US
                        Treasuries and bank demand deposits, bringing
                        institutional-grade low-risk yield to the global
                        on-chain economy.
                    </p>
                    <div>
                        <Button variant="primary" className="mx-1">
                            Explore BT-2
                        </Button>
                        <Button variant="outline-primary" className="mx-1">
                            Read More
                        </Button>
                    </div>
                </Container>
            </Container>
            <Container>
                <Row className="mt-3">
                    {/* Columna 1 */}
                    <Col md={6}>
                        <div>
                            <h2>
                                Exceptional Partners. Superior Assets.
                                World-Class Client Service.
                            </h2>
                            <p>
                                Whether it's the assets we choose, the
                                strategies we create, or the people we work
                                with, we focus on quality before quantity, risk
                                before returns, and putting clients first.
                            </p>
                        </div>
                    </Col>

                    {/* Columna 2 */}
                    <Col md={6}>
                        <div>
                            <h2>High-Quality Assets and Managers</h2>
                            <p>
                                Our funds invest exclusively into multi-billion
                                dollar, highly liquid, exchange-traded funds
                                managed by the world’s preeminent bond managers.
                            </p>
                            <ul>
                                <li>BlackRock</li>
                                <li>Pimco</li>
                            </ul>

                            <h2>Regulated Service Providers</h2>
                            <p>
                                Our funds hold all assets at third-party
                                qualified custodians, receive daily accounting
                                from NAV Consulting, and will receive annual
                                audits.
                            </p>
                            <ul>
                                <li>Clearstreet</li>
                                <li>NAV Consulting</li>
                                <li>Ankura</li>
                                <li>StoneX</li>
                            </ul>

                            <h2>Third-Party Audited Security</h2>
                            <p>
                                We implement best practice security measures,
                                and all key smart contracts are audited and
                                certified.
                            </p>
                            <ul>
                                <li>Trail of Bits</li>
                                <li>Quantstamp</li>
                                <li>Immunefi</li>
                            </ul>

                            <h2>Experienced Leadership</h2>
                            <p>
                                Our executive team has diverse experience across
                                leading institutions like Goldman, Bridgewater,
                                Millenium, and MakerDAO.
                            </p>
                            <ul>
                                <li>Goldman Sachs</li>
                                <li>Bridgewater</li>
                                <li>Millenium</li>
                                <li>Maker</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
