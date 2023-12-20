import React, { useState, useEffect } from 'react';
import {
    Container,
    Table,
    Modal,
    Header,
    Segment,
    Input,
    Dropdown,
    Button,
    Image,
    Grid,
} from 'semantic-ui-react';
import { ethers } from 'ethers';
import Web3 from 'web3';

import 'semantic-ui-css/semantic.min.css';

const options = [
    { key: 'USDT', text: 'USDT', value: 'USDT' },
    { key: 'USDC', text: 'USDC', value: 'USDC' },
    { key: 'DAI', text: 'DAI', value: 'DAI' },
    { key: 'Sepolia', text: 'Sepolia', value: 'Sepolia' },
];

const RegistrationForm = () => {
    const defaultEmail = 'example@example.com';
    const [openBuyModal, setOpenBuyModal] = useState(false);
    const [isWalletConnected, setWalletConnected] = useState(false);

    useEffect(() => {
        const checkIfWalletConnected = async () => {
            if (window.ethereum) {
                window.ethereum
                    .request({ method: 'eth_accounts' })
                    .then((result) => {
                        if (result.length) setWalletConnected(true);
                    });
            } else {
                setWalletConnected(false);
            }
        };

        checkIfWalletConnected();
    }, []);

    const connectWallet = async () => {
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((result) => {
                setWalletConnected(true);
            });
    };

    const executeOrder = async (amount, asset) => {
        // Verifica si hay una billetera conectada
        if (window.ethereum) {
            await window.ethereum.send('eth_requestAccounts');
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();

            /*
            ethers.utils.getAddress(
                '0xF13b282C1a8f3965A384D71D78683dF208162753'
            );

            const tx = await signer.sendTransaction({
                to: '0xF13b282C1a8f3965A384D71D78683dF208162753',
                value: ethers.utils.parseEther(amount),
            });
            */
        } else {
            console.error('No se encontró una billetera conectada');
        }
    };

    return (
        <Container className="mt-5 mb-5">
            <Segment>
                <p>Portfolio Balance</p>
                <h2>$0</h2>
            </Segment>
            <Grid>
                <Grid.Column>
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Asset</th>
                                <th className="text-right">APY</th>
                                <th className="text-right">Price 24h</th>
                                <th className="text-right">Balance</th>
                                <th className="text-right">Value 24h</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td
                                    className="p-2"
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                >{`BT-2`}</td>
                                <td className="text-right p-2">
                                    <p
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        5.20%
                                    </p>
                                </td>
                                <td className="text-right p-2">
                                    <div
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        $41.40
                                    </div>
                                    <div
                                        style={{
                                            color: '#14ae5c',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        +$1.089
                                    </div>
                                </td>
                                <td className="text-right p-2">{0}</td>
                                <td className="text-right p-2">
                                    <p
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                    >{`$0`}</p>
                                </td>
                                <td className="text-right p-2">
                                    <div className="d-flex justify-content-end">
                                        <Button basic className="mr-2">
                                            Redeem
                                        </Button>
                                        <Button
                                            secondary
                                            onClick={() =>
                                                setOpenBuyModal(true)
                                            }
                                        >
                                            Buy
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            {/* Repite la estructura para otros activos */}
                        </tbody>
                    </Table>
                </Grid.Column>
            </Grid>
            <Modal
                onClose={() => setOpenBuyModal(false)}
                open={openBuyModal}
                centered
                size="mini"
            >
                <Modal.Content>
                    <Grid style={{ marginBottom: '1rem' }}>
                        <h3>Buy BT-2</h3>
                    </Grid>
                    <Grid columns={1}>
                        <Grid.Column>
                            <Grid>
                                <p>I want to spend</p>
                            </Grid>
                            <Grid columns={1}>
                                <Grid.Column>
                                    <Input
                                        label={
                                            <Dropdown
                                                defaultValue="USDT"
                                                options={options}
                                            />
                                        }
                                        labelPosition="right"
                                        type="number"
                                        placeholder="0.0"
                                        fluid
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Button
                                        color="instagram"
                                        onClick={
                                            isWalletConnected
                                                ? async () => {
                                                      await executeOrder(
                                                          0.01,
                                                          'SepoliaETH'
                                                      );
                                                  }
                                                : connectWallet
                                        }
                                        fluid
                                    >
                                        {isWalletConnected
                                            ? 'Buy'
                                            : 'Connect Wallet'}
                                    </Button>
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </Grid>
                </Modal.Content>
            </Modal>
        </Container>
    );
};

export default RegistrationForm;
