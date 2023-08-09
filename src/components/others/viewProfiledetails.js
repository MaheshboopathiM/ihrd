import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import AddProfileTEacher from '../Teachers/addProfile/addProfileTEacher';
import axios from 'axios';
import { BASEURL } from '../../BaseUrl/Baseurl';
import FirstYear from '../Students/departments/bscProfileForms/FirstYear';
import Studendetailsedit from './studendetailsedit';
import { useParams } from 'react-router-dom';


function ViewProfiledetails({ show, close, data, role, handleTeacher, setShowsucess, setsucessmessage, handleMsc, handleBsc, handleBcom }) {


    const { usertype } = useParams();
    const rolename = role ? "Teacher" : "Student";
    const [Edit, setEdit] = useState(false);



    const handleeditsucess = () => {
        close();
        setEdit(false);
    }

    const handleStudentDelete = async () => {
        let id = data && data[0].user_id;
        let first_name = data && data[0].first_name;
        let last_name = data && data[0].last_name;
        let result = await axios.delete(`${BASEURL}/admin/delete/student/${id}/${first_name}/${last_name}`)
        console.log(result)
        if (result.status == 200) {
            if (handleMsc) {
                handleMsc();
            } else if (handleBsc) {
                handleBsc();
            } else {
                handleBcom()
            }
            close();
            setEdit(false)
            setShowsucess(true);
            setsucessmessage(result.data.data.message)
        }
    }
    const handleDelete = async () => {
        let id = data && data[0].user_id;
        let first_name = data && data[0].first_name;
        let last_name = data && data[0].last_name;
        let result = await axios.delete(`${BASEURL}/admin/delete/teacher/${id}/${first_name}/${last_name}`)
        console.log(result)
        if (result.status == 200) {
            handleTeacher();
            close();
            setEdit(false)
            setShowsucess(true);
            setsucessmessage(result.data.data.message)
        }
    }
    return (
        <>

            {
                role ?
                    <Offcanvas show={show} onHide={() => { close(); setEdit(false) }} placement={'top'} name={'top'} style={{ display: 'flex', justifyContent: 'center', height: "100%", width: '80%', marginLeft: "10%", overflowY: 'scroll' }}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <span style={{ marginRight: '5px', textTransform: 'capitalize' }}>
                                    {data[0].first_name}{" "}{data[0].last_name}{" "}{rolename}
                                </span>
                                DETAIL
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <div className='d-flex justify-content-center' style={{ width: '100%' }}>
                            <div style={{ width: "60%", display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
                                {Edit ?
                                    <Button variant="btn btn-warning me-3" onClick={() => setEdit(false)}>View</Button>
                                    :
                                    usertype === 'hard' &&
                                    <Button variant="btn btn-warning me-3" onClick={() => setEdit(true)}>Edit</Button>
                                }
                                {usertype === 'hard' &&
                                    <Button variant="btn btn-danger" onClick={handleDelete}>Delete</Button>
                                }
                            </div>
                        </div>
                        {
                            Edit ?
                                <AddProfileTEacher detail={data} close={handleeditsucess} handleTeacher={handleTeacher} />
                                :
                                <Offcanvas.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "80%", marginLeft: '10%', border: '1px solid rgba(0, 0, 0, 0.175)', marginBottom: '15px', borderRadius: '0.375rem' }}>
                                    <Table striped bordered hover size="sm" style={{ textAlign: "center", width: '60%', height: "200px" }}>
                                        {data &&
                                            <tbody>
                                                <tr>
                                                    <th>First Name</th>
                                                    <td>{data[0].first_name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Last Name</th>
                                                    <td>{data[0].last_name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Email Id</th>
                                                    <td>{data[0].email_id}</td>
                                                </tr>
                                                <tr>
                                                    <th>Joined Date</th>
                                                    <td>{new Date(data[0].joined_date).toLocaleDateString()}</td>
                                                </tr>
                                            </tbody>
                                        }
                                    </Table>
                                </Offcanvas.Body>
                        }
                    </Offcanvas>
                    :
                    <Offcanvas show={show} onHide={close} placement={'top'} name={'top'} style={{ display: 'flex', justifyContent: 'center', height: "100%", width: '80%', marginLeft: "10%", overflowY: 'scroll' }}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <span style={{ marginRight: '5px', textTransform: 'capitalize' }}>
                                    {data[0].first_name}{" "}{data[0].last_name}{" "}{rolename}
                                </span>
                                DETAIL
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <div className='d-flex justify-content-center' style={{ width: '100%' }}>
                            <div style={{ width: "60%", display: 'flex', justifyContent: 'flex-end' }}>
                                {Edit ?
                                    <Button variant="btn btn-warning me-3" onClick={() => setEdit(false)}>View</Button>
                                    :
                                    <Button variant="btn btn-warning me-3" onClick={() => setEdit(true)}>Edit</Button>
                                }
                                {usertype === 'hard' &&
                                    <Button variant="btn btn-danger" onClick={handleStudentDelete}>Delete</Button>
                                }
                            </div>
                        </div>
                        {Edit ?
                            <Studendetailsedit detail={data} close={close} handleMsc={handleMsc} handleBsc={handleBsc} handleBcom={handleBcom} />
                            :
                            <Offcanvas.Body style={{ display: 'flex', justifyContent: 'center' }}>
                                <Table striped bordered hover size="sm" style={{ textAlign: "center", width: '60%' }}>
                                    {data &&
                                        <tbody>
                                            <tr>
                                                <th>First Name</th>
                                                <td>{data[0].first_name}</td>
                                            </tr>
                                            <tr>
                                                <th>Last Name</th>
                                                <td>{data[0].last_name}</td>
                                            </tr>
                                            <tr>
                                                <th>Email Id</th>
                                                <td>{data[0].email_id}</td>
                                            </tr>
                                            <tr>
                                                <th>PNR Number</th>
                                                <td>{data[0].prnnumber}</td>
                                            </tr>
                                            <tr>
                                                <th>Department</th>
                                                <td>{data[0].deparment}</td>
                                            </tr>
                                            <tr>
                                                <th>Semester</th>
                                                <td>{data[0].semester}</td>
                                            </tr>
                                            <tr>
                                                <th>Year</th>
                                                <td>{data[0].year}</td>
                                            </tr>
                                            <tr>
                                                <th>Joined Date</th>
                                                <td>{new Date(data[0].joined_date).toLocaleDateString()}</td>
                                            </tr>
                                        </tbody>
                                    }
                                </Table>
                            </Offcanvas.Body>
                        }
                    </Offcanvas>
            }
        </>

    )
}

export default ViewProfiledetails;