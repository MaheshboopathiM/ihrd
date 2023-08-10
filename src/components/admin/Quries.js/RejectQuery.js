import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { BASEURL } from '../../../BaseUrl/Baseurl';
import { useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { MDBIcon } from 'mdb-react-ui-kit';

function RejectQuery({role}) {

    const { usertype } = useParams();

    const [permission, setpermission] = useState(role)
    const [QueryList, setQueryList] = useState([]);
    const [Qeryone, setQueryone] = useState('');
    const [show, setshow] = useState(false);

    const handleQueryget = (e) => {
        if (permission == 0) {
            axios.get(`${BASEURL}/Admin/Student/Query/Reject`)
                .then((res) => {
                    setQueryList(res.data.data.result)
                })
        } else if (permission == 1) {
            axios.get(`${BASEURL}/Admin/Teacher/Query/Reject`)
            .then((res) => {
                setQueryList(res.data.data.result)
            })
        }
    }

    const handleviewQuery = (e) => {
        if (permission == 0) {
            axios.get(`${BASEURL}/Student/Query/induvitual/Reject/${e}`)
                .then((res) => {
                    console.log("gdujfdhks")
                    setQueryone(res.data.data)
                })
        } else if (permission == 1) {
            axios.get(`${BASEURL}/Teacher/Query/induvitual/Reject/${e}`)
                .then((res) => {
                    console.log("gdujfdhks")
                    setQueryone(res.data.data)
                })
        }

    }


    const handlePending = async(e) =>{
        if(permission == 0){
            const confirmed = await showConfirmDialog("Are you sure you want to Pending this query?");
            if(confirmed){
                axios.put(`${BASEURL}/Admin/Student/Query/pending/${Qeryone.id}`)
                .then((res)=>{
                    if(res.status == 200){
                        handleQueryget();
                        setshow(false);
                        setQueryone('');
                        alert(res.data.data.msg)
                    }
                })
            }
        }  else{
            const confirmed = await showConfirmDialog("Are you sure you want to Pending this query?");
            if(confirmed){
                axios.put(`${BASEURL}/Admin/Teacher/Query/pending/${Qeryone.id}`)
                .then((res)=>{
                    if(res.status == 200){
                        handleQueryget();
                        setshow(false);
                        setQueryone('');
                        alert(res.data.data.msg)
                    }
                })
            }
        }
    }

    const showConfirmDialog = (message) => {
        return new Promise((resolve) => {
            const confirmed = window.confirm(message);
            resolve(confirmed);
        });
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token, { complete: true });
        handleQueryget(decoded.user_id);
    }, [usertype])
    return (
        <>
            <Container style={{ width: '100%' }}>
                <Card className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                    <Card.Header>Resolove Query List</Card.Header>
                    <Card.Body className='border mb-4' style={{ display: "flex", justifyContent: "center", alignItems: 'center', minHeight: '400px', width: "70%" }} >
                        <>
                            <div className='col-6 chatparent'>
                                <h1 className='chathead div-sticky-class'>Resolove Query`s</h1>
                                {QueryList.length > 0 ?

                                    QueryList.map((data) => (
                                        <>
                                            <div className='col-11 chatchildadmin' style={{ position: 'relative' }} onClick={() => handleviewQuery(data.id)}>
                                                <span className='spanone'>
                                                   {permission == 0 ? data.student_name : data.teacher_name } 
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
                                            <button type="button" class="btn btn-primary btn-sm  me-2" onClick={() => setshow(!show)}>{show ? "See Student Query" : "See Admin Query"}{" "}<MDBIcon fas icon="book-open" /></button>
                                            <button type="button" class="btn btn-danger btn-sm me-2" onClick={()=>handlePending(Qeryone.id)}>Pending</button>
                                        </div>
                                        <div class="form-floating mb-2 d-inline d-flex col-12 justify-content-center align-items-center">
                                            <input
                                                style={{ width: '95%' }}
                                                type="search"
                                                class="form-control"
                                                id="floatingInput"
                                                placeholder="Enter Student PNR NUMBER...."
                                                value={"987657890-98765"}
                                                // onChange={(e) => handleInputChange(e)}
                                                readOnly // Add this attribute to make the input non-editable
                                            />
                                            <label for="floatingInput">PNR NUMBER</label>
                                        </div>
                                        {show ?
                                            <div class="form-floating  p-1">
                                                <textarea
                                                    style={{ minHeight: '310px', maxHeight: '300px', overflowY: 'scroll' }}
                                                    class="form-control"
                                                    placeholder="Enter Your Query Here"
                                                    value={Qeryone.admin_message}
                                                    id="floatingTextarea"
                                                    readOnly
                                                ></textarea>
                                                <label for="floatingTextarea">Admin Query</label>
                                            </div>
                                            :
                                            <div class="form-floating  p-1">
                                                <textarea
                                                    style={{ minHeight: '310px', maxHeight: '300px', overflowY: 'scroll' }}
                                                    class="form-control"
                                                    placeholder="Enter Your Query Here"
                                                    value={Qeryone.description}
                                                    id="floatingTextarea"
                                                    readOnly
                                                ></textarea>
                                                <label for="floatingTextarea">Student Query</label>
                                            </div>
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

export default RejectQuery;