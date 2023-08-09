import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import axios from 'axios';
import { BASEURL } from '../../BaseUrl/Baseurl';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader from '../loader/loader';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useParams } from 'react-router-dom';

function StudentInternalMarks({studentdetail,semester}) {

    const { usertype } = useParams();
    // borderBottom:'none', borderTop: 'none',
    const buttondesign = { borderWidth: '2.6px', background: 'none', color: '#000000', borderRadius: '14px' }

    const [View, setView] = useState(false);
    const [show, setshow] = useState(false);
    const [Editsemester, setEditsemester] = useState('');

    console.log(semester,studentdetail)

    const close = () => {
        setshow(false);
        setView(false);
    }

    const handleView = (e) => {
        setView(true);
        setshow(true);

        let semester = e;
        let prnnumber = localStorage.getItem("Pnrnumber");

        axios.get(`${BASEURL}/admin/students/internal/${prnnumber}/${semester}`)
            .then(async (res) => {
                if (res.status == 200) {
                    setEditsemester(res.data.data);
                }
            });
    }

    return (
        <>
            <Container className='mt-3'>
                <Card className="text-center" style={{ minHeight: '400px' }}>
                    <Card.Header>INTERNAL MARK SEMESTER WISE DETAILS</Card.Header>
                    <Card.Body>
                        {semester &&
                            <>
                                <Card.Header>SEMESTER DETAILS</Card.Header>
                                <div className='w-100 d-flex  justify-content-center my-3 '>
                                    <table class="table table-borderless w-75 border">
                                        <thead style={{ borderBottom: "1px solid rgb(212, 212, 212)" }}>
                                            <tr>
                                                <th scope="col">SEMESTER</th>
                                                <th scope="col">Handle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                semester.map((data, key) =>
                                                    <tr style={{ borderBottom: "1px solid rgb(212, 212, 212)" }} key={key}>
                                                        <td>
                                                            <span className='fst-italic  border border-2 border-top-2 border-start-0 border-end-0 rounded-pill border-primary  ps-3 pe-3'>
                                                                {data.Semester}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {data.existResult > 0 ?
                                                                <>
                                                                 <Button variant="button-design primary d-inline btn btn-primary me-2" style={buttondesign} onClick={()=>handleView(data.subject[0].semester)}>View</Button>
                                                                </>
                                                                :
                                                                <>Please contact with Admin</>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        }
                    </Card.Body>
                </Card>
            </Container>


            <Offcanvas show={show}
                backdrop={false}
                onHide={() => { close() }}
                placement={'top'}
                name={'top'}
                style={{ boxShadow: '0px 0px 300px 103px rgba(153,153,153,1)', display: 'flex', justifyContent: 'center', height: "100%", width: '80%', marginLeft: "10%", overflowY: 'scroll', }}
            >
                {/* loader component */}

                {View &&
                    <>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <span style={{ marginRight: '5px', marginLeft: '5px', textTransform: 'capitalize' }}>
                                    {Editsemester && Editsemester[0].semester}
                                </span>
                                Semester detail of {studentdetail.first_name}{' '}{studentdetail.last_name}
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", border: '1px solid rgba(0, 0, 0, 0.175)', marginBottom: '15px', borderRadius: '0.375rem' }}>

                            {/* data table  */}
                            <table class="table border w-75">
                                <thead>
                                    <tr>
                                        <th scope="col" className='text-right'>Subject</th>
                                        <th scope="col" className='text-center'>Mark</th>
                                        <th scope="col" className='text-center'>Grand Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Editsemester && Editsemester.map((data, index) =>
                                        <tr key={index}>
                                            <td className='text-right'>{data.subject_name}</td>
                                            <td className='text-center position-relative'>
                                                {data.mark}
                                            </td>
                                            <td className='text-center'>{data.grand_total}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </Offcanvas.Body>
                    </>
                }
            </Offcanvas>
        </>
    )
}

export default StudentInternalMarks