import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Deparments from '../Students/addProfile/deparments';
import AddProfileTEacher from '../Teachers/addProfile/addProfileTEacher';


function Selectteacherorstudent() {

    const [Teacher, setTeacher] = useState(false);
    const [Students, setStudents] = useState(false);

    const navigationProfile = () =>{
        setTeacher(false);
        setStudents(false);
    }

    return (
        <>
            {Teacher || Students ||
                <Container style={{ width: '60%' }}>
                    <Card className="text-center">
                        <Card.Header>PROFILES</Card.Header>
                        <Card.Body>
                            <Card.Title>SELECT PROFILE</Card.Title>
                            <Card.Text>
                                Please select which your you want to add
                            </Card.Text>
                            <Button variant="primary" onClick={() => setTeacher(!Teacher)}>TEACHERS</Button>
                            <Button variant='primary' onClick={() => setStudents(!Students)} style={{ marginLeft: '20px' }}>STUDENTS</Button>
                        </Card.Body>
                        {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                    </Card>
                </Container>
            }

            {Teacher &&
                <>
                <AddProfileTEacher msg={navigationProfile}/>
                </>
            }
            {Students &&
                <>
                        <Deparments  msg={navigationProfile} />
                </>
            }
        </>
    )
}

export default Selectteacherorstudent;