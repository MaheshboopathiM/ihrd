import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Newquery from './Newquery';
import PendingQuery from './PendingQuery';
import ResoloveQuery from './ResoloveQuery';
import RejectQuery from './RejectQuery';
function Teacherquery() {

  const [show, setshow] = useState(true);
  const [showM, setshowM] = useState(false);
  const [showB, setshowB] = useState(false);
  const [showC, setshowC] = useState(false);

  const handleNewQuery = () => {
    setshow(true);
    setshowM(false);
    setshowB(false);
    setshowC(false);
  }

  const hadleResloveQuery = () => {
    setshowM(true);
    setshowB(false);
    setshowC(false);
    setshow(false);
  }

  const handlePendingQuery = () => {
    setshowB(true)
    setshowC(false);
    setshow(false);
    setshowM(false);
  }

  const handleRejectQuery = () => {
    setshowC(true);
    setshow(false);
    setshowM(false);
    setshowB(false);
  }
  return (
    <>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item className={show && 'border-botton'}>
          <Nav.Link onClick={handleNewQuery}>New Query</Nav.Link>
        </Nav.Item>
        <Nav.Item className={showM && 'border-botton'}>
          <Nav.Link eventKey="link-1" onClick={hadleResloveQuery} >Resolve Query</Nav.Link>
        </Nav.Item>
        <Nav.Item className={showB && 'border-botton'}>
          <Nav.Link eventKey="link-2" onClick={handlePendingQuery}>Pending Query</Nav.Link>
        </Nav.Item>
        <Nav.Item className={showC && 'border-botton'}>
          <Nav.Link eventKey="link-3" onClick={handleRejectQuery}>Reject Query</Nav.Link>
        </Nav.Item>
      </Nav>


      {show &&
        <Newquery />
      }
      {showM &&
        <ResoloveQuery />
      }
      {showB &&
        <PendingQuery />
      }
      {showC &&
        <RejectQuery />
      }
    </>
  )
}

export default Teacherquery