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
function Home() {

  const { usertype } = useParams();
  const navigate = useNavigate();

  const [name, setname] = useState('');
  const [show, setshow] = useState(false);

  console.log(usertype, "dsh")

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token, { complete: true });
    setname(decoded.first_name + " " + decoded.last_name)
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
              <Accordion defaultActiveKey="" style={{ width: "60%" }} className='card-1' onClick={()=>setshow(!show)}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Welcome
                    <span className='user-name'>{name.toUpperCase()}</span>
                    your now Admin side so plese read your intructions </Accordion.Header>
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
                Tab content for Home
              </Tab>
              <Tab eventKey="profile" title="ADD PROFILES">
                <Selectteacherorstudent/>
              </Tab>
              <Tab eventKey="contact" title="VIEW PROFILE`S">
                Tab content for Contact
              </Tab>
            </Tabs>
          </section>
          {/* footer section */}
          <footer>
            <Footeradmin />
          </footer></>
      }
      {
        usertype === 'medium' &&
        <>
          <header>
            <HeaderTeacher />
          </header>
          <footer>
            <FooterTeacher />
          </footer></>
      }
      {
        usertype === 'low' &&
        <>
          <header>
            <HeaderStudents />
          </header>
          <footer>
            <FooterStudents />
          </footer></>
      }
    </>
  )
}

export default Home;