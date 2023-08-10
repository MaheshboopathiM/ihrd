import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import PendingQuery from './PendingQuery';
import ResoloveQuery from './ResoloveQuery.js';
import RejectQuery from './RejectQuery.js';


function Teacherqueries() {

    const [showM, setshowM] = useState(false);
    const [showB, setshowB] = useState(true);
    const [showC, setshowC] = useState(false);

    const hadleResloveQuery = () => {
        setshowM(true);
        setshowB(false);
        setshowC(false);

    }

    const handlePendingQuery = () => {
        setshowB(true)
        setshowC(false);
        setshowM(false);
    }

    const handleRejectQuery = () => {
        setshowC(true);
        setshowM(false);
        setshowB(false);
    }
    return (
        <>
            <Nav className="justify-content-center" activeKey="/home">
                <Nav.Item className={showB && 'border-botton'}>
                    <Nav.Link eventKey="link-2" onClick={handlePendingQuery}>Pending Query</Nav.Link>
                </Nav.Item>
                <Nav.Item className={showM && 'border-botton'}>
                    <Nav.Link eventKey="link-1" onClick={hadleResloveQuery} >Reslolve Query</Nav.Link>
                </Nav.Item>
                <Nav.Item className={showC && 'border-botton'}>
                    <Nav.Link eventKey="link-3" onClick={handleRejectQuery}>Reject Query</Nav.Link>
                </Nav.Item>
            </Nav>



            {showM &&
                <ResoloveQuery role={1}/>
            }
            {showB &&
                <PendingQuery role={1}/>
            }
            {showC &&
                <RejectQuery role={1}/>
            }
        </>
    )
}

export default Teacherqueries