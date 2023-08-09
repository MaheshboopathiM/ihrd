import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { BASEURL } from '../../../BaseUrl/Baseurl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { MDBIcon } from 'mdb-react-ui-kit';

function PendingQuery({ role }) {

    const [permission, setpermission] = useState(role)
    const [QueryList, setQueryList] = useState([]);
    const [Qeryone, setQueryone] = useState('');
    const [msg, setmsg] = useState('');
    const [messageerror, setmessageerror] = useState('')
    const [show, setShow] = useState(false);
    const [reject, setreject] = useState(false);

    const handleClose = () => {setShow(false);setmessageerror('')};
    const handleShow = () =>{ setShow(true);setreject(true)};
    const handleShowReslove = () =>{ setShow(true);setreject(false)};


    const validation = () => {
        let isValid;
        if (!msg) {
            isValid = false;
            setmessageerror("Not be empty")
        } else {
            setmessageerror('');
            isValid = true;
        }

        return isValid;
    }

    const handleQueryget = (e) => {
        if (permission === 0) {
            axios.get(`${BASEURL}/Admin/Student/Query`)
                .then((res) => {
                    setQueryList(res.data.data.result)
                })
        } else {
            // axios.get(`${BASEURL}/Teacher/Query/${e}`)
            //     .then((res) => {
            //         setQueryList(res.data.data.result)
            //     })
        }

    }

    const handleviewQuery = (e) => {
        if (permission === 0) {
            axios.get(`${BASEURL}/Student/Query/induvitual/${e}`)
                .then((res) => {
                    console.log("gdujfdhks")
                    setQueryone(res.data.data)
                })
        }// else if (permission) {
        //     axios.get(`${BASEURL}/Teacher/Query/induvitual/${e}`)
        //         .then((res) => {
        //             console.log("gdujfdhks")
        //             setQueryone(res.data.data)
        //         })
        // }

    }

    const handleSubmit = async() => {
        if( validation()){

        }
    }
    useEffect(() => {
        handleQueryget();
    }, [])
    return (
        <>
            <Container style={{ width: '100%' }}>
                <Card className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                    <Card.Header>Pending Query List</Card.Header>
                    <Card.Body className='border mb-4' style={{ display: "flex", justifyContent: "center", alignItems: 'center', minHeight: '400px', width: "70%" }} >
                        <>
                            <div className='col-6 chatparent'>
                                <h1 className='chathead div-sticky-class'>Pending Query`s</h1>
                                {QueryList.length > 0 ?

                                    QueryList.map((data) => (
                                        <>
                                            <div className='col-11 chatchildadmin' style={{ position: 'relative' }} onClick={() => handleviewQuery(data.id)}>
                                                <span className='spanone'>
                                                    {data.student_name}
                                                </span>
                                                <span className='chatarrow'>
                                                    <MDBIcon fas icon="arrow-circle-right" />
                                                </span>
                                            </div>
                                        </>
                                    ))
                                    :
                                    <>
                                        No Query`s Available
                                    </>
                                }
                            </div>


                            <div className='col-6 chatparent2 ' >
                                {Qeryone ?
                                    <>
                                        <div className='d-flex col-12 justify-content-end align-items-center mb-1'>
                                            <button type="button" class="btn btn-danger btn-sm me-2" onClick={handleShow} >Reject <MDBIcon fas icon="ban" /></button>
                                            <button type="button" class="btn btn-primary btn-sm me-2" onClick={handleShowReslove} >Reslolve <MDBIcon fas icon="check-circle" /></button>
                                        </div>
                                        <div class="form-floating mb-2 d-inline d-flex col-12 justify-content-center align-items-center">
                                            <input
                                                style={{ width: '95%' }}
                                                type="search"
                                                class="form-control"
                                                id="floatingInput"
                                                placeholder="Enter Student PNR NUMBER...."
                                                value={Qeryone.prnnumber}
                                                // onChange={(e) => handleInputChange(e)}
                                                readOnly // Add this attribute to make the input non-editable
                                            />
                                            <label for="floatingInput">PNR NUMBER</label>
                                        </div>
                                        <div class="form-floating  p-1">
                                            <textarea
                                                style={{ minHeight: '310px', maxHeight: '300px', overflowY: 'scroll' }}
                                                class="form-control"
                                                placeholder="Enter Your Query Here"
                                                value={Qeryone.description}
                                                id="floatingTextarea"
                                                readOnly
                                            ></textarea>
                                            <label for="floatingTextarea">Query</label>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div class="alert alert-dark mt-5 w-75" style={{ marginLeft: '50px' }} role="alert">
                                            <MDBIcon fas icon="arrow-left" /> Select Query you can see details of query
                                        </div>
                                    </>
                                }
                            </div>
                        </>
                    </Card.Body>
                </Card>
            </Container >


            {/* pop up code */}
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    {messageerror &&
                        <Modal.Title style={{color:'red'}}>{messageerror}</Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>{reject ? "Reason for reject the Query :" : "Reason for reslove the Query :"}</Form.Label>
                            <Form.Control as="textarea" value={msg} onClick={(e)=>setmsg(e)} rows={10} cols={12} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {reject
                        ?
                        <>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleClose}>
                                Confirm
                            </Button>
                        </>
                        :
                        <>
                            <Button variant="warning" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleSubmit}>
                                Confirm
                            </Button>
                        </>
                    }

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PendingQuery;