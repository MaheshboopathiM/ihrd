import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import axios from 'axios';
import ToastContainer from 'react-bootstrap/esm/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';
import { BASEURL } from '../../../../BaseUrl/Baseurl';


function FirstYear({ msg }) {


    const [responseerror, setresponseerror] = useState('');
    const [sucessmessage, setsucessmessage] = useState('');
    const [load, setload] = useState(false);
    const [show, setShow] = useState(false);
    const [showsucess, setShowsucess] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setdata] = useState({
        first_name: '',
        last_name: '',
        prn: '',
        email_id: '',
        semester: '',
        join_date: '',
        deparment: 'BSC(CS)',
        year: '1',
    });

    const [erro, seterror] = useState({
        first_name_error: '',
        last_name_error: '',
        prnerror: '',
        emailerror: '',
        semester_error: '',
        join_dateerror: '',
    })

    const onChangeEmail = (e) => {
        let email = e.target.value;
        setdata({ ...data, email_id: e.target.value })
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (regex.test(email) === false) {
            seterror({ ...erro, emailerror: "Email is not valid" });
            return false;
        } else {
            seterror({ ...erro, emailerror: '' })
        }
    }

    const isValid = () => {
        let isValid = false;
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (data.first_name === "") {
            seterror({ ...erro, first_name_error: "First Name not be Empty" })
            return isValid;
        } else if (data.last_name === "") {
            seterror({ ...erro, last_name_error: "Last Name not be Empty" })
            return isValid;
        } else if (data.prn === "") {
            seterror({ ...erro, prnerror: "PRN Number not be Empty" });
            return isValid;
        } else if (data.email_id === "") {
            seterror({ ...erro, emailerror: "Email_id not be Empty" })
            return isValid;
        } else if (regex.test(data.email_id) === false) {
            seterror({ ...erro, emailerror: "Email is not valid" });
            return isValid;
        } else if (data.semester === "") {
            seterror({ ...erro, semester_error: "Semester Not be Empty" })
            return isValid;
        } else if (data.join_date === "") {
            seterror({ ...erro, join_dateerror: "Joine Date Not be Empty" })
            return isValid;
        } else {
            seterror('')
            return !isValid;
        }
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        if (isValid()) {
            setShow(false);
            setShowsucess(false);
            setload(true);
            axios.post(
                `${BASEURL}/admin/new/student/add`, data).then((res) => {
                    setload(false);
                    if (res.status == 200) {
                        window.scrollTo(0,0);
                        setShowsucess(true);
                        setsucessmessage(res.data.data.message)
                        setdata({
                            first_name: '',
                            last_name: '',
                            prn: '',
                            email_id: '',
                            semester: '',
                            join_date: '',
                            deparment: 'BSC(CS)',
                            year: '1',
                        });
                    }
                    if (res.status == 201) {
                        window.scrollTo(0,0);
                        handleShow();
                        setresponseerror(res.data.data.message)
                    }
                })
                .catch((err) => {
                    throw err;
                })
        }
    }


    return (
        <>

            {/* email already error showing */}
            <ToastContainer position="top-center" className="p-3" style={{ zIndex: 1 }}>
                <Toast show={show} onClose={handleClose}>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto" style={{ color: 'red' }}>Email Exist!</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body><strong style={{ color: 'red' }} className="me-auto">{responseerror}</strong></Toast.Body>
                </Toast>
            </ToastContainer>

            {/* Student add Sucess message*/}
            <ToastContainer position="top-center" className="p-3" style={{ zIndex: 1 }}>
                <Toast show={showsucess} onClose={() => setShowsucess(false)}>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto" style={{ color: 'green' }}>Account Create</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>
                        <strong style={{ color: 'green', fontSize: '16px' }} className="me-auto">
                            <strong style={{ textDecoration: 'underline', textTransform: 'capitalize', marginRight: '5px' }}>
                                {sucessmessage.name}
                            </strong>
                            {sucessmessage.mes}
                        </strong>
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <Container style={{ width: '80%' }}>
                <Card className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                    <Card.Header>ADD BSC(CS) FIRST YEAR STUDENT</Card.Header>
                    <form style={{ display: "flex", justifyContent: "center", alignItems: 'center', width: "70%" }}
                        onSubmit={handlesubmit}
                    >
                        <Card.Body >
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Enter Student First Name"
                                    aria-label="First Name"
                                    aria-describedby="basic-addon1"
                                    value={data.first_name}
                                    onChange={(e) => setdata({ ...data, first_name: e.target.value })}
                                />
                            </InputGroup>

                            {erro.first_name_error &&
                                <div class="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
                                    {erro.first_name_error}
                                </div>
                            }

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Enter Student Last Name"
                                    aria-label="Last Name"
                                    aria-describedby="basic-addon1"
                                    value={data.last_name}
                                    onChange={(e) => setdata({ ...data, last_name: e.target.value })}
                                />
                            </InputGroup>

                            {erro.last_name_error &&
                                <div class="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
                                    {erro.last_name_error}
                                </div>
                            }

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                                <Form.Control
                                    placeholder="Enter Student PRN Number"
                                    aria-label="PRN Number"
                                    aria-describedby="basic-addon1"
                                    value={data.prn}
                                    onChange={(e) => setdata({ ...data, prn: e.target.value })}
                                />
                            </InputGroup>

                            {erro.prnerror &&
                                <div class="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
                                    {erro.prnerror}
                                </div>
                            }

                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter Student Email ID"
                                    aria-label="Email"
                                    aria-describedby="basic-addon2"
                                    value={data.email_id}
                                    onChange={onChangeEmail}
                                />
                                <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                            </InputGroup>

                            {erro.emailerror &&
                                <div class="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
                                    {erro.emailerror}
                                </div>
                            }

                            <Form.Select aria-label="Default select example" style={{ marginBottom: '10px' }}
                                onChange={(e) => setdata({ ...data, semester: e.target.value })}
                            >
                                <option value="">Select Semester</option>
                                <option value="1">First Semester</option>
                                <option value="2">Second Semester</option>
                            </Form.Select>

                            {erro.semester_error &&
                                <div class="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
                                    {erro.semester_error}
                                </div>
                            }

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Joined Date</InputGroup.Text>
                                <Form.Control
                                    placeholder="Enter Student Joined Date "
                                    aria-label=""
                                    aria-describedby="basic-addon1"
                                    type='date'
                                    value={data.join_date}
                                    onChange={(e) => setdata({ ...data, join_date: e.target.value })}
                                />
                            </InputGroup>

                            {erro.join_dateerror &&
                                <div class="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
                                    {erro.join_dateerror}
                                </div>
                            }

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Deparment</InputGroup.Text>
                                <Form.Control
                                    placeholder=""
                                    aria-label=""
                                    aria-describedby="basic-addon1"
                                    value={"BSC(CS)"}
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">YEAR</InputGroup.Text>
                                <Form.Control
                                    placeholder=""
                                    aria-label=""
                                    aria-describedby="basic-addon1"
                                    value={"First Year"}
                                />
                            </InputGroup>

                            <Button style={{ width: "40%" }} variant="primary" type='submit' onClick={() => seterror('')}>{load ? <Spinner animation="border" role="status" /> : "Submit"}</Button>

                        </Card.Body>
                    </form>

                    <Card.Footer className="text-muted">
                        <Button variant='info' onClick={msg} style={{ marginLeft: '20px' }}>
                            <BsArrowLeftCircleFill /> YEAR SELECT
                        </Button>
                    </Card.Footer>
                </Card>
            </Container >
        </>
    )
}

export default FirstYear