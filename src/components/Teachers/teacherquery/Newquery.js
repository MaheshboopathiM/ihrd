import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import jwt_decode from "jwt-decode";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { BASEURL } from '../../../BaseUrl/Baseurl';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useParams } from 'react-router-dom';

function Newquery() {

    const { usertype } = useParams();

    const token = localStorage.getItem("token");

    const { first_name, last_name, user_id } = jwt_decode(token, { complete: true });

    const [Pnrnumber, setpnrnumber] = useState('');
    const [Query, setQuery] = useState('');
    const [Pnrnumbererror, setpnrnumbererror] = useState('');
    const [Queryerror, setQueryerror] = useState('');
    const [sucessmessage, setsucessmessage] = useState('');
    const [showsucess, setShowsucess] = useState(false);
    const [responseerror, setresponseerror] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
        setpnrnumber(numericValue);
    };

    const validation = async () => {
        let isValid = true;
        if (!Pnrnumber) {
            setpnrnumbererror("PNR NUMBER Not be Empty");
            setQueryerror("");
            isValid = false;
        } else if (!Query) {
            setQueryerror("Query Not be Empty")
            setpnrnumbererror("");
            isValid = false;
        } else {
            setQueryerror("");
            setpnrnumbererror("");
        }
        return isValid;
    };

    const handlesubmit = async (e) => {
        e.preventDefault()
        if (await validation()) {
            if (usertype === 'medium') {
                axios.post(`${BASEURL}/Teacher/Query/internal`, {
                    prnnumber: Pnrnumber,
                    description: Query,
                    teacher_id: user_id,
                    teacher_name: first_name + " " + last_name
                }).then(async (res) => {
                    if (res.status == 200) {
                        setpnrnumber('');
                        setQuery('');
                        setShowsucess(true);
                        setsucessmessage(res.data.data)
                    }
                    if (res.status == 201) {
                        setShow(true)
                        setresponseerror(res.data.data.message)
                    }
                })
            } else {
                axios.post(`${BASEURL}/Student/Query/internal`, {
                    prnnumber: Pnrnumber,
                    description: Query,
                    student_id: user_id,
                    Student_name: first_name + " " + last_name
                }).then(async (res) => {
                    if (res.status == 200) {
                        setQuery('');
                        setShowsucess(true);
                        setsucessmessage(res.data.data)
                    }
                    if (res.status == 201) {
                        setShow(true)
                        setresponseerror(res.data.data.message)
                    }
                })

            }
        }
    }

    useEffect(() => {
        if (usertype === 'low') {
            let Pnrnumber = localStorage.getItem("Pnrnumber");
            setpnrnumber(Pnrnumber);
        }
    }, [])
    return (
        <>

            {/* teachers add Sucess message*/}
            <ToastContainer position="top-center" className="p-3" style={{ zIndex: 99999999999999, position: 'fixed' }} >
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
                            </strong>{" "}
                            {sucessmessage.message}
                        </strong>
                    </Toast.Body>
                </Toast>
            </ToastContainer>


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

            <Container style={{ width: '80%' }}>
                <Card className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                    <Card.Header>New Query DETAILS</Card.Header>
                    <form
                        style={{ display: "flex", justifyContent: "center", alignItems: 'center', width: "70%" }}
                        onSubmit={handlesubmit}
                    >
                        <Card.Body className='border mb-4' >
                            <div class="form-floating mb-3 d-inline d-flex col-12 justify-content-center align-items-center">
                                {usertype === 'low' ?
                                    <>
                                        <input
                                            type="search"
                                            class="form-control"
                                            id="floatingInput"
                                            placeholder="Enter Student PNR NUMBER...."
                                            value={Pnrnumber}
                                            onChange={(e) => handleInputChange(e)}
                                            readOnly // Add this attribute to make the input non-editable
                                        />
                                        <label for="floatingInput">Your PNR NUMBER</label>
                                    </>
                                    :
                                    <>
                                        <input
                                            type="search"
                                            class="form-control"
                                            id="floatingInput"
                                            placeholder="Enter Student PNR NUMBER...."
                                            value={Pnrnumber}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                        <label for="floatingInput">Enter Student PNR NUMBER</label>
                                    </>
                                }
                            </div>
                            {Pnrnumbererror &&
                                <div class="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
                                    {Pnrnumbererror}
                                </div>
                            }
                            <div class="form-floating">
                                <textarea
                                    style={{ minHeight: '140px' }}
                                    class="form-control"
                                    placeholder="Enter Your Query Here"
                                    value={Query}
                                    id="floatingTextarea"
                                    onChange={(e) => setQuery(e.target.value)}></textarea>
                                <label for="floatingTextarea">Enter Your Query Here</label>
                            </div>
                            {Queryerror &&
                                <div class="alert alert-danger" role="alert" style={{ padding: '5px', fontWeight: '500' }}>
                                    {Queryerror}
                                </div>
                            }
                            <div className='d-flex justify-content-end'>
                                <button type="submit" class="btn btn-primary mt-3 align-self-end">Send</button>
                            </div>
                        </Card.Body>
                    </form>
                </Card>
            </Container >
        </>
    )
}

export default Newquery