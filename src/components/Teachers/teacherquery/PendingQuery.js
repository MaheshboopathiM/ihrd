import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { BASEURL } from '../../../BaseUrl/Baseurl';
import { useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { MDBIcon } from 'mdb-react-ui-kit';

function PendingQuery() {

    const { usertype } = useParams();

    const [QueryList, setQueryList] = useState([]);
    const [Qeryone, setQueryone] = useState('');
    const [Qeryoneedit, setQueryoneEdit] = useState('');
    const [edit, setedit] = useState(false);
    const [Pnrnumber, setpnrnumber] = useState('');
    const [Pnrnumbererror, setPnrnumbererror] = useState('')

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
        setpnrnumber(numericValue);
    };

    const handleEditchange = () => {
        setQueryoneEdit(Qeryone.description);
        if (usertype === 'medium') {
            setpnrnumber(Qeryone.prnnumber);
            setPnrnumbererror('');
        }
        setedit(true);
    }
    const handleQueryget = (e) => {
        if (usertype === 'low') {
            axios.get(`${BASEURL}/Student/Query/${e}`)
                .then((res) => {
                    setQueryList(res.data.data.result)
                })
        } else if (usertype === 'medium') {
            axios.get(`${BASEURL}/Teacher/Query/${e}`)
                .then((res) => {
                    setQueryList(res.data.data.result)
                })
        }

    }

    const handleviewQuery = (e) => {
        if (usertype === 'low') {
            axios.get(`${BASEURL}/Student/Query/induvitual/${e}`)
                .then((res) => {
                    console.log("gdujfdhks")
                    setQueryone(res.data.data)
                })
        } else if (usertype === 'medium') {
            axios.get(`${BASEURL}/Teacher/Query/induvitual/${e}`)
                .then((res) => {
                    console.log("gdujfdhks")
                    setQueryone(res.data.data)
                })
        }

    }

    const handleeditQuery = () => {
        if (usertype === 'low') {
            axios.post(`${BASEURL}/Student/Query/Edit`, {
                id: Qeryone.id,
                description: Qeryoneedit,
            })
                .then((res) => {
                    if (res.status == 200) {
                        setedit(false)
                        handleviewQuery(Qeryone.id)
                        const token = localStorage.getItem("token");
                        const decoded = jwt_decode(token, { complete: true });
                        handleQueryget(decoded.user_id);
                        alert(res.data.data.msg);
                    } else if (res.status == 201) {
                        alert(res.data.data.msg);
                    }
                })
        } else if (usertype === 'medium') {
            axios.post(`${BASEURL}/Teacher/Query/Edit`, {
                id: Qeryone.id,
                description: Qeryoneedit,
                prnnumber: Pnrnumber,
            })
                .then((res) => {
                    if (res.status == 200) {
                        setedit(false)
                        setPnrnumbererror('');
                        handleviewQuery(Qeryone.id)
                        const token = localStorage.getItem("token");
                        const decoded = jwt_decode(token, { complete: true });
                        handleQueryget(decoded.user_id);
                        alert(res.data.data.msg);
                    } else if (res.status == 201) {
                        setPnrnumbererror(res.data.data.msg);
                    }
                })
        }
    }

    const handleDelete = () => {
        if (usertype === 'low') {
            if (confirm("Are You want Delete this Query") == true) {
                axios.delete(`${BASEURL}/Student/Query/Delete/${Qeryone.id}`)
                    .then((res) => {
                        if (res.status == 200) {
                            setedit(false)
                            setQueryone('');
                            const token = localStorage.getItem("token");
                            const decoded = jwt_decode(token, { complete: true });
                            handleQueryget(decoded.user_id);
                            alert(res.data.data.msg);
                        } else if (res.status == 201) {
                            alert(res.data.data.msg);
                        }
                    })
            } else {
                return false;
            }
        }else if (usertype === 'medium') {
            if (confirm("Are You want Delete this Query") == true) {
                axios.delete(`${BASEURL}/Teacher/Query/Delete/${Qeryone.id}`)
                    .then((res) => {
                        if (res.status == 200) {
                            setedit(false)
                            setQueryone('');
                            const token = localStorage.getItem("token");
                            const decoded = jwt_decode(token, { complete: true });
                            handleQueryget(decoded.user_id);
                            alert(res.data.data.msg);
                        } else if (res.status == 201) {
                            alert(res.data.data.msg);
                        }
                    })
            } else {
                return false;
            } 
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token, { complete: true });
        handleQueryget(decoded.user_id);
    }, [usertype])
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
                                            <div className='col-11 chatchild' style={{ position: 'relative' }} onClick={() => handleviewQuery(data.id)}>
                                                <span className='spanone'>
                                                    {data.description}
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
                                        {!edit ?
                                            <div className='d-flex col-12 justify-content-end align-items-center mb-1'>
                                                <button type="button" class="btn btn-warning btn-sm me-2" onClick={handleEditchange}>Edit <MDBIcon fas icon="edit" /></button>
                                                <button type="button" class="btn btn-danger btn-sm me-2" onClick={handleDelete}>Delete <MDBIcon fas icon="trash" /></button>
                                            </div>
                                            :
                                            <div className='d-flex col-12 justify-content-end align-items-center mb-1'>
                                                <button type="button" class="btn btn-warning btn-sm me-2" onClick={() => setedit(false)}>Cancel <MDBIcon fas icon="ban" /></button>
                                                <button type="button" class="btn btn-primary btn-sm me-2" onClick={handleeditQuery}>Save <MDBIcon fas icon="save" /></button>
                                            </div>
                                        }
                                        {edit ?
                                            <>
                                                {usertype === 'medium'
                                                    ?
                                                    <>
                                                        <div class="form-floating mb-2 d-inline d-flex col-12 justify-content-center align-items-center">
                                                            <input
                                                                style={{ width: '95%' }}
                                                                type="search"
                                                                class="form-control"
                                                                id="floatingInput"
                                                                placeholder="Enter Student PNR NUMBER...."
                                                                value={edit ? Pnrnumber : Qeryone.prnnumber}
                                                                onChange={(e) => handleInputChange(e)}
                                                            //  readOnly // Add this attribute to make the input non-editable
                                                            />
                                                            <label for="floatingInput">PNR NUMBER</label>
                                                        </div>
                                                        {Pnrnumbererror &&
                                                            <span className='pnrerror'>{Pnrnumbererror}</span>
                                                        }
                                                    </>
                                                    :
                                                    <div class="form-floating mb-2 d-inline d-flex col-12 justify-content-center align-items-center">
                                                        <input
                                                            style={{ width: '95%' }}
                                                            type="search"
                                                            class="form-control"
                                                            id="floatingInput"
                                                            placeholder="Enter Student PNR NUMBER...."
                                                            value={localStorage.getItem('Pnrnumber')}
                                                            // onChange={(e) => handleInputChange(e)}
                                                            readOnly // Add this attribute to make the input non-editable
                                                        />
                                                        <label for="floatingInput">PNR NUMBER</label>
                                                    </div>
                                                }
                                                <div class="form-floating  p-1">
                                                    <textarea
                                                        style={{ minHeight: '310px', maxHeight: '300px', overflowY: 'scroll' }}
                                                        class="form-control"
                                                        placeholder="Enter Your Query Here"
                                                        value={edit ? Qeryoneedit : Qeryone.description}
                                                        id="floatingTextarea"
                                                        onChange={(e) => setQueryoneEdit(e.target.value)}
                                                    ></textarea>
                                                    <label for="floatingTextarea">Query</label>
                                                </div>
                                            </>
                                            :
                                            <>
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
                                        }
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
        </>
    )
}

export default PendingQuery;