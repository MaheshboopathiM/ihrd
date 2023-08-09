import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { BsArrowLeftCircleFill } from "react-icons/bs";

import MSCComponent from '../departments/MSC';
import BSCComponent from '../departments/BSC';
import BCOMComponent from '../departments/BCOM';
import { useParams } from 'react-router-dom';

function Deparments({ msg }) {

    const { usertype } = useParams();

    const [MSC, setMSC] = useState(false);
    const [BSC, setBSC] = useState(false);
    const [BCOM, setBCOM] = useState(false);


    const navigationDeparments = () => {
        setBCOM(false);
        setBSC(false);
        setMSC(false);
    }

    return (
        <>
            {MSC || BSC || BCOM ||
                <Container style={{ width: '80%' }}>
                    <Card className="text-center">
                        <Card.Header>DEPARTMENTS</Card.Header>
                        <Card.Body>
                            <Card.Title>SELECT DEPARTMENT</Card.Title>
                            <Card.Text>
                                Please select Student deparment
                            </Card.Text>
                            <Button variant="primary" onClick={() => setMSC(!MSC)}>MSC(CS)</Button>
                            <Button variant='primary' onClick={() => setBSC(!BSC)} style={{ marginLeft: '20px' }}>BSC(CS)</Button>
                            <Button variant='primary' onClick={() => setBCOM(!BCOM)} style={{ marginLeft: '20px' }}>BCOM(CA)</Button>
                        </Card.Body>
                        {usertype === 'hard' &&
                            <Card.Footer className="text-muted">
                                <Button variant='info' onClick={msg} style={{ marginLeft: '20px' }}>
                                    <BsArrowLeftCircleFill /> PROFILE SELECT
                                </Button>
                            </Card.Footer>
                        }
                    </Card>
                </Container>

            }
            {MSC &&
                <>
                    <MSCComponent msg={navigationDeparments} />
                </>
            }
            {BSC &&
                <>
                    <BSCComponent msg={navigationDeparments} />
                </>
            }
            {BCOM &&
                <>
                    <BCOMComponent msg={navigationDeparments} />
                </>
            }
        </>
    )
}

export default Deparments