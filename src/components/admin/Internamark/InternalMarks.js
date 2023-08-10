import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import axios from 'axios';
import { BASEURL } from '../../../BaseUrl/Baseurl';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader from '../../loader/loader';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useParams } from 'react-router-dom';

function InternalMarks() {

    const { usertype } = useParams();
    // borderBottom:'none', borderTop: 'none',
    const buttondesign = { borderWidth: '2.6px', background: 'none', color: '#000000', borderRadius: '14px' }

    const [load, setload] = useState(false);
    const [add, setadd] = useState(false);
    const [Edit, setEdit] = useState(false);
    const [View, setView] = useState(false);
    const [load1, setload1] = useState(false);
    const [showsucess, setShowsucess] = useState(false);
    const [responseerror, setresponseerror] = useState('');
    const [sucessmessage, setsucessmessage] = useState('');
    const [mark, setmark] = useState('')
    const [markerror, setmarkerror] = useState('')
    const [show, setshow] = useState(false);
    const [Pnrnumber, setpnrnumber] = useState('');
    const [studentnotfound, setstudentnotfound] = useState('');
    const [studentdetail, setstudentdetail] = useState('');
    const [semester, setsemester] = useState('');
    const [addsemester, setaddsemester] = useState('');
    const [Editsemester, setEditsemester] = useState('');

    console.log(studentdetail)

    const handleStudentGet = async () => {
        if (Pnrnumber) {
            setload(true);
            let result = await axios.get(`${BASEURL}/admin/students/internal/${Pnrnumber}`)
            if (result.status == 200) {
                setstudentdetail(result.data.data.studentdetail)
                setsemester(result.data.data.subject)
            }
            if (result.status == 201) {
                setstudentnotfound(result.data.data.message)
                setstudentdetail('');
                setsemester('');
            }
            console.log(result.data.data)
            setload(false)
        }
    }

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
        setpnrnumber(numericValue);
    };

    const handleMarkChange = (index, newValue) => {
        if (newValue == -1) {
            const newMarks = [...mark]; // Create a copy of the marks array
            newMarks[index] = '';
            setmark(newMarks);
        } else if (newValue <= 20) {
            const newMarks = [...mark]; // Create a copy of the marks array
            newMarks[index] = newValue;
            setmark(newMarks);
        } else {
            const newMarks = [...mark]; // Create a copy of the marks array
            newMarks[index] = '';
            setmark(newMarks);
        }
    };

    const handleAdd = (e) => {
        setshow(true);
        setadd(true);
        setaddsemester(e);
        console.log(addsemester);
    }
    const close = () => {
        setshow(false);
        setadd(false);
        setEdit(false);
        setView(false);
        setShowsucess(false);
        setsucessmessage('');
        setmark('')
    }

    const handleView = async(e) => {
        setView(true);
        setshow(true);
        setload1(true);

        let semester = await e;
        let prnnumber = studentdetail.prnnumber;

        axios.get(`${BASEURL}/admin/students/internal/${prnnumber}/${semester}`)
            .then(async (res) => {
                if (res.status == 200) {
                    setEditsemester(res.data.data);
                    setload1(false);
                }
            })
    }

    const handleEdit = (e) => {
        setEdit(true);
        setshow(true);
        setload1(true);

        let semester = e;
        let prnnumber = studentdetail.prnnumber;

        axios.get(`${BASEURL}/admin/students/internal/${prnnumber}/${semester}`)
            .then(async (res) => {
                if (res.status == 200) {
                    setEditsemester(res.data.data);
                    let array = [];
                    let arrayerror = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        array.push(res.data.data[i].mark);
                        console.log(res.data.data[i].mark)
                        arrayerror.push('');
                    }
                    setmark(array);
                    setmarkerror(arrayerror);
                    setload1(false);
                }
            })
            
        }
        
        
    const hanldeDelete = (e) => {
        setload(true);
        let id = studentdetail.id;
        let semester = e;
        let first_name = studentdetail.first_name;
        let last_name = studentdetail.last_name;
        axios.delete(`${BASEURL}/admin/delete/internal/${id}/${first_name}/${last_name}/${semester}`)
            .then(async (res) => {
                if (res.status == 200) {
                    handleStudentGet()
                    setsucessmessage(res.data.data.message)
                    setShowsucess(true);
                    setload(false);
                }
            })
    }

    const validation = async () => {
        let isValid = true;
        const markerrorCopy = [...markerror];
        for (let i = 0; i < addsemester.subject.length; i++) {
            if (!mark[i]) {
                markerrorCopy[i] = 'Cannot be Empty';
                setmarkerror(markerrorCopy);
                isValid = false;
            } else {
                markerrorCopy[i] = '';
                setmarkerror(markerrorCopy);
            }
        }

        return isValid;
    };

    const validationEdit = async () => {
        let isValid = true;
        const markerrorCopy = [...markerror];
        for (let i = 0; i < Editsemester.length; i++) {
            if (!mark[i]) {
                markerrorCopy[i] = 'Cannot be Empty';
                setmarkerror(markerrorCopy);
                isValid = false;
            } else {
                markerrorCopy[i] = '';
                setmarkerror(markerrorCopy);
            }
        }

        return isValid;
    };

    const handleEditSave = async () => {
        if (await validationEdit()) {
            setload1(true);
            let marks = [];
            for (let i = 0; i < mark.length; i++) {
                let subjectmarks;
                subjectmarks = {
                    id: Editsemester[i].id,
                    mark: mark[i],
                }

                marks.push(subjectmarks);
            }

            axios.post(`${BASEURL}/admin/students/internal/save`, {
                data: marks,
                role: 0,
                first_name: studentdetail.first_name,
                last_name: studentdetail.last_name,
                semester: Editsemester[0].semester,
            }).then(async (res) => {
                if (res.status == 200) {
                    const newMarks = [...mark]; // Create a copy of the marks array
                    for (let i = 0; i < mark.length; i++) {
                        newMarks[i] = '';
                        setmark(newMarks);
                    }

                    handleStudentGet()
                    setShowsucess(true);
                    setsucessmessage(res.data.data.message)
                    setload1(false);
                    setTimeout(close, 4000);
                }
                if (res.status == 201) {
                    console.log(res.data.data)
                    setload1(false);
                }
            })
        }
    }
    const handleSave = async () => {
        console.log(addsemester)
        if (await validation()) {
            setload1(true);
            let marks = [];
            for (let i = 0; i < mark.length; i++) {
                let subjectmarks;
                subjectmarks = {
                    prnnumber: studentdetail.prnnumber,
                    student_id: studentdetail.user_id,
                    department: studentdetail.deparment,
                    semester: addsemester.subject[i].semester,
                    subjectname: addsemester.subject[i].subject_name,
                    mark: mark[i],
                    grandtotal: addsemester.subject[i].grand_total
                }

                marks.push(subjectmarks);
            }

            axios.post(`${BASEURL}/admin/students/internal/save`, {
                data: marks,
                role: 1,
                first_name: studentdetail.first_name,
                last_name: studentdetail.last_name,
                semester: addsemester.subject[0].semester,
            }).then(async (res) => {
                if (res.status == 200) {
                    const newMarks = [...mark]; // Create a copy of the marks array
                    for (let i = 0; i < mark.length; i++) {
                        newMarks[i] = '';
                        setmark(newMarks);
                    }

                    handleStudentGet()
                    setShowsucess(true);
                    setsucessmessage(res.data.data)
                    setload1(false);
                    setTimeout(close, 4000);
                }
                if (res.status == 201) {
                    console.log(res.data.data)
                    setload1(false);
                }
            })
        }
    }

    // const handleScroll = (e) => {
    //     const { scrollTop, scrollHeight, clientHeight } = e.target;
    //     const remainingScrollableHeight = scrollHeight - scrollTop - clientHeight;
    //     setScrollableHeight(remainingScrollableHeight);
    // };

    useEffect(() => {
        let array = [];
        for (let i = 0; i > addsemester.subject; i++) {
            array.push('');
        }
        setmark(array);
        setmarkerror(array);
    }, [addsemester])

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
                            </strong>
                            {sucessmessage.mes}
                        </strong>
                    </Toast.Body>
                </Toast>
            </ToastContainer>


            {/* loader component  */}
            <Loader loader={load} />

            <Container style={{ width: '60%' }}>
                <Card className="text-center">
                    <Card.Header>INTERNAL MARK</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Please enter student PNR NUMBER and add details
                        </Card.Text>
                        <div className='d-inline d-flex col-12 justify-content-center align-items-center'>
                            <input
                                className="form-control me-2 d-inline w-75"
                                type="search"
                                aria-label="Search"
                                name=""
                                id=""
                                placeholder="Enter Student PNR NUMBER...."
                                value={Pnrnumber}
                                onChange={(e) => handleInputChange(e)}
                            />
                            <Button variant="primary d-inline" onClick={handleStudentGet} >Submit</Button>
                        </div>
                    </Card.Body>
                    {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                </Card>
            </Container>

            <Container className='mt-3'>
                <Card className="text-center" >
                    <Card.Header>INTERNAL MARK SEMESTER WISE DETAILS</Card.Header>
                    <Card.Body>
                        {studentdetail ?
                            <div className='w-100 d-flex  justify-content-center my-3'>
                                <div className='w-25 border d-flex flex-column justify-content-between align-items-start pt-3 ps-3 py-3'>
                                    <span>Name : {studentdetail.first_name}{' '}{studentdetail.last_name}</span>
                                    <span>PNR number : {studentdetail.prnnumber}</span>
                                </div>
                            </div>
                            :
                            studentnotfound ?
                                <div class="alert alert-warning" role="alert">
                                    <mark class="highlight">{studentnotfound}{' '}Please Check Student PNR NUMBER</mark>
                                </div>
                                :
                                <div class="alert alert-warning" role="alert">
                                    Please Enter Student <mark class="highlight">PNR NUMBER</mark>
                                </div>
                        }
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
                                                                    <Button variant="button-design primary d-inline btn btn-warning  me-2" style={buttondesign} onClick={() => handleEdit(data.subject[0].semester)}>Edit</Button>
                                                                    <Button variant="button-design primary d-inline btn me-2 btn-primary " style={buttondesign} onClick={async() => handleView(await data.subject[0].semester)}>View</Button>
                                                                    {usertype === 'hard' &&
                                                                        <Button variant="button-design primary d-inline btn btn-danger me-2" style={buttondesign} onClick={() => hanldeDelete(data.subject[0].semester)}>Delete</Button>
                                                                    }
                                                                </>
                                                                :
                                                                <Button variant="button-design primary d-inline btn btn-primary me-2" style={buttondesign} onClick={() => handleAdd(data)}>Add</Button>
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
                <Loader loader={load1} />
                {add &&
                    <>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}>
                                Add
                                <span style={{ marginRight: '5px', marginLeft: '5px', textTransform: 'capitalize' }}>
                                    {addsemester && addsemester.Semester}
                                </span>
                                detail of {studentdetail.first_name}{' '}{studentdetail.last_name}
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", border: '1px solid rgba(0, 0, 0, 0.175)', marginBottom: '15px', borderRadius: '0.375rem' }}>

                            {/* teachers add Sucess message*/}
                            <ToastContainer position="top-center" className="p-3" style={{ zIndex: 99999999999999 }} >
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

                            {/* data table  */}
                            <table class="table table-borderless w-75">
                                <thead>
                                    <tr>
                                        <th scope="col" className='text-right'>Subject</th>
                                        <th scope="col" className='text-right'>Mark</th>
                                        <th scope="col" className='text-center'>Grand Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {addsemester && addsemester.subject.map((data, index) =>
                                        <tr key={index}>
                                            <td className='text-right'>{data.subject_name}</td>
                                            <td className='text-center position-relative'>
                                                <input
                                                    style={{ width: '140px', maxWidth: '140px' }}
                                                    type="number"
                                                    class="form-control"
                                                    placeholder="Enter Mark"
                                                    min="-1"
                                                    max={`${data.grand_total}`}
                                                    value={mark[index]}
                                                    onChange={(e) => handleMarkChange(index, parseInt(e.target.value))}
                                                />
                                                {markerror[index] &&
                                                    <span className='errormsg'>{markerror[index]}</span>
                                                }
                                            </td>
                                            <td className='text-center'>{data.grand_total}</td>
                                        </tr>
                                    )}
                                    <tr style={{ width: '100%' }}>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <div className='d-flex  justify-content-start'>
                                                <Button
                                                    variant="button-design primary d-inline btn btn-primary p-5 pt-2 pb-2"
                                                    onClick={handleSave}
                                                >Save</Button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Offcanvas.Body>
                    </>
                }
                {Edit &&
                    <>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', width: '100%' }}>
                                Edit
                                <span style={{ marginRight: '5px', marginLeft: '5px', textTransform: 'capitalize' }}>
                                    {addsemester.Semester}
                                </span>
                                detail of {studentdetail.first_name}{' '}{studentdetail.last_name}
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", border: '1px solid rgba(0, 0, 0, 0.175)', marginBottom: '15px', borderRadius: '0.375rem' }}>

                            {/* teachers add Sucess message*/}
                            <ToastContainer position="top-center" className="p-3" style={{ zIndex: 99999999999999 }} >
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

                            {/* data table  */}
                            <table class="table table-borderless w-75">
                                <thead>
                                    <tr>
                                        <th scope="col" className='text-right'>Subject</th>
                                        <th scope="col" className='text-right'>Mark</th>
                                        <th scope="col" className='text-center'>Grand Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Editsemester && Editsemester.map((data, index) =>
                                        <tr key={index}>
                                            <td className='text-right'>{data.subject_name}</td>
                                            <td className='text-center position-relative'>
                                                <input
                                                    style={{ width: '140px', maxWidth: '140px' }}
                                                    type="number"
                                                    class="form-control"
                                                    placeholder="Enter Mark"
                                                    min="-1"
                                                    max={`${data.grand_total}`}
                                                    value={mark[index]}
                                                    onChange={(e) => handleMarkChange(index, parseInt(e.target.value))}
                                                />
                                                {markerror[index] &&
                                                    <span className='errormsg'>{markerror[index]}</span>
                                                }
                                            </td>
                                            <td className='text-center'>{data.grand_total}</td>
                                        </tr>
                                    )}
                                    <tr style={{ width: '100%' }}>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <div className='d-flex  justify-content-start'>
                                                <Button
                                                    variant="button-design primary d-inline btn btn-primary p-5 pt-2 pb-2"
                                                    onClick={handleEditSave}
                                                >Save</Button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Offcanvas.Body>
                    </>
                }

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

export default InternalMarks