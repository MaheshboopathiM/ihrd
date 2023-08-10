import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Deparments from '../Students/addProfile/deparments';
import AddProfileTEacher from '../Teachers/addProfile/addProfileTEacher';
import { useParams } from 'react-router-dom';


function Selectteacherorstudent() {

    const { usertype } = useParams();

    const [Teacher, setTeacher] = useState(false);
    const [Students, setStudents] = useState(false);

    const navigationProfile = () =>{
        setTeacher(false);
        setStudents(false);
    }

    useEffect(()=>{
        if(usertype === 'medium'){
            setStudents(true);
        }
    },[usertype])
    return (
        <>
            {Teacher || Students ||
                <Container style={{ width: '60%' }}>
                    <Card className="text-center">
                        <Card.Header>PROFILES</Card.Header>
                        <Card.Body>
                            <Card.Title>SELECT PROFILE</Card.Title>
                            <Card.Text>
                                Select Teacher Or Student
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
                <AddProfileTEacher msg={navigationProfile} detail={false}/>
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