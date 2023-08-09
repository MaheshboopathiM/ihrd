import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Teachers from './Teachers';
import { BASEURL } from '../../../BaseUrl/Baseurl';
import axios from 'axios';
import Msc_cs from './Msc_cs';
import Bsc_cs from './Bsccs';
import Bcom from './Bcom';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useParams } from 'react-router-dom';

function ViewProfile() {

  const { usertype } = useParams();

  const [show, setshow] = useState(false);
  const [showM, setshowM] = useState(false);
  const [showB, setshowB] = useState(false);
  const [showC, setshowC] = useState(false);
  const [showsucess, setShowsucess] = useState(false);
  const [sucessmessage, setsucessmessage] = useState('');

  const [dataTeacher,setdataTeacher]=useState('');
  const [dataMsc,setdataMsc]=useState('');
  const [dataBsc,setdataBsc]=useState('');
  const [dataBcom,setdataBcom]=useState('');

  const dataFetchingTeacher = ()=>{
    axios.get(`${BASEURL}/admin/Teachers/get`
    ).then((res)=>{
      if(res.status == 200){
        setdataTeacher(res.data.data);
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  const dataFetchingMsc = (e)=>{
    if(e){
      let Year = e.target.value;
      
      axios.get(`${BASEURL}/admin/Msc/get/${Year}`
      ).then((res)=>{
        if(res.status == 200){
          setdataMsc(res.data.data);
        }
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      axios.get(`${BASEURL}/admin/Msc/get/:`
      ).then((res)=>{
        if(res.status == 200){
          setdataMsc(res.data.data);
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
  const dataFetchingBsc = (e)=>{
    if(e){
      let Year = e.target.value;
      
      axios.get(`${BASEURL}/admin/Bsc/get/${Year}`
      ).then((res)=>{
        if(res.status == 200){
          setdataBsc(res.data.data);
        }
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      axios.get(`${BASEURL}/admin/Bsc/get/:`
      ).then((res)=>{
        if(res.status == 200){
          setdataBsc(res.data.data);
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
  const dataFetchingBcom = (e)=>{
    if(e){
      let Year = e.target.value;
      
      axios.get(`${BASEURL}/admin/Bcom/get/${Year}`
      ).then((res)=>{
        if(res.status == 200){
          setdataBcom(res.data.data);
        }
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      axios.get(`${BASEURL}/admin/Bcom/get/:`
      ).then((res)=>{
        if(res.status == 200){
          setdataBcom(res.data.data);
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  const handleTeacher =() =>{
    setshowB(false);
    setshowC(false);
    setshowM(false);
    dataFetchingTeacher();
    setshow(true)
  }

  const handleMsc =() =>{
    setshow(false)
    setshowB(false);
    setshowC(false);
    dataFetchingMsc();
    setshowM(true)
  }

  const handleBsc =() =>{
    setshow(false)
    setshowM(false)
    setshowC(false)
    dataFetchingBsc();
    setshowB(true)
  }
  const handleBcom =() =>{
    setshowB(false)
    setshow(false)
    setshowM(false)
    dataFetchingBcom();
    setshowC(true)
  }
 useEffect(()=>{
  handleTeacher();
 },[])
  return (
    <>

     {/* teachers add Sucess message*/}
     <ToastContainer position="top-center" className="p-3" style={{ zIndex: 999 }}>
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

      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item className={show && 'border-botton'}>
          <Nav.Link onClick={handleTeacher}>TEACHER</Nav.Link>
        </Nav.Item>
        <Nav.Item  className={showM && 'border-botton'}>
          <Nav.Link eventKey="link-1" onClick={handleMsc}>MSC(CS)</Nav.Link>
        </Nav.Item>
        <Nav.Item  className={showB && 'border-botton'}>
          <Nav.Link eventKey="link-2" onClick={handleBsc}>BSC(CS)</Nav.Link>
        </Nav.Item>
        <Nav.Item  className={showC && 'border-botton'}>
          <Nav.Link eventKey="link-3" onClick={handleBcom}>BCOM(CA)</Nav.Link>
        </Nav.Item>
      </Nav>

      {show &&
        <Teachers data={dataTeacher} handleTeacher={handleTeacher} setShowsucess={setShowsucess} setsucessmessage={setsucessmessage}/>
      }
      {showM &&
        <Msc_cs data={dataMsc} filter={dataFetchingMsc} handleMsc={handleMsc} setShowsucess={setShowsucess} setsucessmessage={setsucessmessage} />
      }
      {showB &&
        <Bsc_cs data={dataBsc} filter={dataFetchingBsc}  handleBsc={handleBsc} setShowsucess={setShowsucess} setsucessmessage={setsucessmessage}/>
      }
      {showC &&
        <Bcom data={dataBcom} filter={dataFetchingBcom}  handleBcom={handleBcom} setShowsucess={setShowsucess} setsucessmessage={setsucessmessage}/>
      }
    </>
  )
}

export default ViewProfile