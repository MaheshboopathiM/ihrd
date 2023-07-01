import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { BsArrowLeftCircleFill } from "react-icons/bs";
import FirstYear from './bcomProfileForms/FirstYear';
import SecondYear from './bcomProfileForms/SecondYear';
import ThirdYear from './bcomProfileForms/ThirdYear';

function BCOM( { msg }) {

    const [firstyear, setfirstyear] = useState(false);
    const [secondyear, setsecondyear] = useState(false);
    const [thirdyear, setthirdyear] = useState(false);

    const navigationDeparments = () =>{
        setfirstyear(false);
        setsecondyear(false);
        setthirdyear(false);
    }


    return (
        <>
            {firstyear || secondyear || thirdyear ||
                <Container style={{ width: '80%' }}>
                    <Card className="text-center">
                        <Card.Header>SELECT YEAR</Card.Header>
                        <Card.Body>
                            <Card.Title>SELECT YEAR OF STUDENT IN BCOM(CA)</Card.Title>
                            <Card.Text>
                                Please select Student year
                            </Card.Text>
                            <Button variant="primary" onClick={() => setfirstyear(!firstyear)}>First Year</Button>
                            <Button variant='primary' onClick={() => setsecondyear(!secondyear)} style={{ marginLeft: '20px' }}>Second Year</Button>
                            <Button variant='primary' onClick={() => setthirdyear(!thirdyear)} style={{ marginLeft: '20px' }}>Third Year</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <Button variant='info' onClick={msg} style={{ marginLeft: '20px' }}>
                                <BsArrowLeftCircleFill /> DEPARTMENTS SELECT
                            </Button>
                        </Card.Footer>
                    </Card>
                </Container>
            }

            {firstyear &&
            <>
            <FirstYear  msg={navigationDeparments}/>
            </>
            }
            {secondyear &&
            <>
            <SecondYear msg={navigationDeparments}/>
            </>
            }
            {thirdyear &&
            <>
            <ThirdYear msg={navigationDeparments}/>
            </>
            }
        </>
    )
}

export default BCOM