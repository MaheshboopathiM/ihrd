import React, { useEffect, useState } from 'react'
import Headeradmin from '../../components/admin/header/header.js';
import HeaderTeacher from '../../components/Teachers/header/header.js';
import HeaderStudents from '../../components/Students/header/Header.js';
import Footeradmin from '../../components/admin/footer/footer.js';
import FooterTeacher from '../../components/Teachers/footer/footer.js';
import FooterStudents from '../../components/Students/footer/Footer.js';
import Selectteacherorstudent from '../../components/others/selectteacherorstudent.js';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Accordion from 'react-bootstrap/Accordion';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { BsFillBackspaceFill } from 'react-icons/bs';
import ViewProfile from '../../components/admin/viewprofile/ViewProfile.js';
import InternalMarks from '../../components/admin/Internamark/InternalMarks.js';
import Teacherquery from '../../components/Teachers/teacherquery/teacherquery.js';
import StudentInternalMarks from '../../components/Students/studentInternalmark.js';
import { BASEURL } from '../../BaseUrl/Baseurl.js';
import axios from 'axios';
import Studentqueries from '../../components/admin/Quries.js/Studentqueries.js';
import Teacherqueries from '../../components/admin/Quries.js/Teacherqueries.js'
import Homecomponent from '../../components/others/homecomponent.js';
function Home() {

  const { usertype } = useParams();
  const navigate = useNavigate();

  const [name, setname] = useState('');
  const [show, setshow] = useState(false);
  const [studentdetail, setstudentdetail] = useState('');
  const [semester, setsemester] = useState('');


  const handleadmincheck = () => {

    const token = localStorage.getItem("token");

    const decoded = jwt_decode(token, { complete: true });

    if (decoded.user_type == 2) {
      return true
    } else {
      navigate("/")
    }
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className={show && "displayhiden"}>
      {!show && 'Click And see'}
    </Tooltip>
  );

  const handleStudentGet = async (e) => {
    let result = await axios.get(`${BASEURL}/admin/students/internal/${e}`)
    if (result.status == 200) {
      setstudentdetail(result.data.data.studentdetail)
      setsemester(result.data.data.subject)
    }
    if (result.status == 201) {
      setstudentdetail('');
      setsemester('');
    }
    console.log(result.data.data)
  }


  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token, { complete: true });
    setname(decoded.first_name + " " + decoded.last_name)
    if (usertype === 'low') {
      let Pnrnumber = localStorage.getItem("Pnrnumber");
      handleStudentGet(Pnrnumber)
    }
  }, [])
  return (
    <>
      {
        usertype === 'hard' && handleadmincheck() &&
        <>
          <header>
            <Headeradmin />
          </header>
          {/* user type and given instructions info */}
          <section style={{ display: "flex", justifyContent: "center", marginBottom: "5px" }}  >
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Accordion defaultActiveKey="" style={{ width: "60%" }} className='card-1' onClick={() => setshow(!show)}>
                <Accordion.Item eventKey="0" >
                  <Accordion.Header>Welcome
                    <span className='user-name'>{name.toUpperCase()}</span>
                    you are now Admin side so please read your intructions
                  </Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </OverlayTrigger>
          </section>
          {/* tabs section dive  */}
          <section>
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Tab eventKey="home" title="Home">
              <Homecomponent/>
              </Tab>
              <Tab eventKey="profile" title="ADD PROFILES">
                <Selectteacherorstudent />
              </Tab>
              <Tab eventKey="viewprofile" title="VIEW PROFILES">
                <ViewProfile />
              </Tab>
              <Tab eventKey="internal" title="INTERNAL MARKS">
                <InternalMarks />
              </Tab>
              <Tab eventKey="studentquery" title="Student QUERYS">
                <Studentqueries  />
              </Tab>
              <Tab eventKey="teacherquery" title="Teacher QUERYS">
                <Teacherqueries  />
              </Tab>
            </Tabs>
          </section>
          {/* footer section */}
          <Footeradmin />
        </>
      }
      {
        usertype === 'medium' &&
        <>
          <header>
            <HeaderTeacher />
          </header>
          {/* tabs section dive  */}
          <section>
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Tab eventKey="home" title="Home">
                <Homecomponent />
              </Tab>
              <Tab eventKey="profile" title="ADD PROFILES">
                <Selectteacherorstudent />
              </Tab>
              <Tab eventKey="viewprofile" title="VIEW PROFILES">
                <ViewProfile />
              </Tab>
              <Tab eventKey="internal" title="INTERNAL MARKS">
                <InternalMarks />
              </Tab>
              <Tab eventKey="query" title="QUERYS">
                <Teacherquery />
              </Tab>
            </Tabs>
          </section>
          <FooterTeacher />
        </>
      }
      {
        usertype === 'low' &&
        <>
          <header>
            <HeaderStudents />
          </header>
          <section>
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Tab eventKey="home" title="Home">
                <Homecomponent />
              </Tab>
              <Tab onClick={() => handleStudentGet(localStorage.getItem("Pnrnumber"))} eventKey="viewprofile" title="VIEW INTERNAL MARKS">
                <StudentInternalMarks
                  studentdetail={studentdetail}
                  semester={semester}
                />
              </Tab>
              <Tab eventKey="query" title="QUERYS">
                <Teacherquery  />
              </Tab>
            </Tabs>
          </section>
          <FooterTeacher />
        </>
      }
    </>
  )
}

export default Home;