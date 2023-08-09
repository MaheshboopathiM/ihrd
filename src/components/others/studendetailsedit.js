import React, { useEffect, useState } from 'react'
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
import { BASEURL } from '../../BaseUrl/Baseurl';


function Studendetailsedit({ detail,close, handleMsc, handleBsc, handleBcom }) {

    const [load, setload] = useState(false);
    const [show, setShow] = useState(false);
    const [showsucess, setShowsucess] = useState(false);
    const [sucessmessage, setsucessmessage] = useState('');
    const [data, setdata] = useState({
        user_id:'',
        first_name: '',
        last_name: '',
        prn: '',
        email_id: '',
        semester: '',
        join_date: '',
        deparment: '',
        year: '',
    });

    const [erro, seterror] = useState({
        first_name_error: '',
        last_name_error: '',
        prnerror: '',
        emailerror: '',
        semester_error: '',
        join_dateerror: '',
        year: ''
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
        } else if (data.year === "") {
            seterror({ ...erro, year: "Year Not be Empty" })
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
            axios.put(
                `${BASEURL}/admin/students/edit`,data).then((res) => {
                setload(false);
                if (res.status == 200) {
                    if(detail){
                        if(res.data.data.message.deparment === "BSC(CS)"){
                            handleBsc();
                        }else if(res.data.data.message.deparment === "MSC(CS)"){
                            handleMsc();
                        }else{
                            handleBcom();
                        }
                        setTimeout(close, 3000);
                    }
                    setShowsucess(true);
                    setsucessmessage(res.data.data.message)
                    setdata({
                        first_name: '',
                        last_name: '',
                        email_id: '',
                        join_date: '',
                    });
                }
            })
                .catch((err) => {
                    throw err;
                })
        }
    }

    useEffect(() => {
        console.log(detail)
        if (detail) {
            setdata({
                ...data,
                user_id: detail[0].user_id,
                first_name: detail[0].first_name,
                last_name: detail[0].last_name,
                prn: detail[0].prnnumber,
                email_id: detail[0].email_id,
                semester: detail[0].semester,
                deparment: detail[0].deparment,
                year: detail[0].year,
                join_date:new Date(`${detail[0].joined_date}`).toISOString().slice(0, 10),
            })
        }
    }, [])
    return (
        <>
        {/* Student Edit Sucess message*/}
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

            <Container style={{ width: '80%', marginTop:"10px" }}>
                <Card className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                    <Card.Header>ADD BCOM(CA) FIRST YEAR STUDENT</Card.Header>
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
                                <div className="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
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
                                <div className="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
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
                                <div className="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
                                    {erro.prnerror}
                                </div>
                            }

                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter Student Email ID"
                                    aria-label="Email"
                                    aria-describedby="basic-addon2"
                                    value={data.email_id}
                                    // onChange={onChangeEmail}
                                />
                                <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                            </InputGroup>

                            {erro.emailerror &&
                                <div className="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
                                    {erro.emailerror}
                                </div>
                            }

                            <Form.Select aria-label="Default select example" style={{ marginBottom: '10px' }}
                                value={data.year} onChange={(e) => setdata({ ...data, year: e.target.value })}
                            >
                                <option value="">Select Year</option>
                                <option value="1">First Year</option>
                                <option value="2">Second Year</option>
                                <option value="3">Third Year</option>
                            </Form.Select>

                            {erro.year &&
                                <div className="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
                                    {erro.year}
                                </div>
                            }
                            {data.year == 1 &&
                                <Form.Select aria-label="Default select example" style={{ marginBottom: '10px' }}
                                    value={data.semester} onChange={(e) => setdata({ ...data, semester: e.target.value })}
                                >
                                    <option value="">Select Semester</option>
                                    <option value="1">First Semester</option>
                                    <option value="2">Second Semester</option>
                                </Form.Select>
                            }
                            {data.year == 2 &&
                                <Form.Select aria-label="Default select example" style={{ marginBottom: '10px' }}
                                    value={data.semester} onChange={(e) => setdata({ ...data, semester: e.target.value })}
                                >
                                    <option value="">Select Semester</option>
                                    <option value="3">Third Semester</option>
                                    <option value="4">Fourth Semester</option>
                                </Form.Select>
                            }
                            {data.year == 3 &&
                                <Form.Select aria-label="Default select example" style={{ marginBottom: '10px' }}
                                    value={data.semester} onChange={(e) => setdata({ ...data, semester: e.target.value })}
                                >
                                    <option value="5">Fifth Semester</option>
                                    <option value="6">Sixth Semester</option>
                                </Form.Select>
                            }


                            {erro.semester_error &&
                                <div className="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
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
                                <div className="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
                                    {erro.join_dateerror}
                                </div>
                            }

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Deparment</InputGroup.Text>
                                <Form.Control
                                    placeholder=""
                                    aria-label=""
                                    aria-describedby="basic-addon1"
                                    value={data.deparment}
                                />
                            </InputGroup>

                            <Button style={{ width: "40%" }} variant="primary" type='submit' onClick={() => seterror("")}>{load ? <Spinner animation="border" role="status" /> : "Submit"}</Button>

                        </Card.Body>
                    </form>
                </Card>
            </Container >
        </>
    )
}

export default Studendetailsedit;