import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { BsArrowLeftCircleFill } from "react-icons/bs";
import Firstyear from './mscProfileForms.js/Firstyear';
import Secondyear from './mscProfileForms.js/Secondyear';
function MSC({ msg }) {

    const [firstyear, setfirstyear] = useState(false);
    const [secondyear, setsecondyear] = useState(false);

    const navigationProfile = () =>{
        setfirstyear(false);
        setsecondyear(false);
    }
    return (
        <>
            {firstyear || secondyear ||
                <Container style={{ width: '80%' }}>
                    <Card className="text-center">
                        <Card.Header>SELECT YEAR</Card.Header>
                        <Card.Body>
                            <Card.Title>SELECT YEAR OF STUDENT IN MSC(CS)</Card.Title>
                            <Card.Text>
                                Please select Student year
                            </Card.Text>
                            <Button variant="primary" onClick={() => setfirstyear(!firstyear)}>First Year</Button>
                            <Button variant='primary' onClick={() => setsecondyear(!secondyear)} style={{ marginLeft: '20px' }}>Second Year</Button>
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
                <Firstyear msg={navigationProfile}/>
                </>
            }
            {secondyear &&
            <>
            <Secondyear  msg={navigationProfile}/>
            </>
            }
        </>
    )
}

export default MSC;