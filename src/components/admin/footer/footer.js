import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';


function Footer() {
  return (
    <>
       <MDBFooter style={{color:'white',marginTop:'40px'}} className='text-center text-lg-start text-muted'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom border-footer'>
          <div className='me-5 d-none d-lg-block'>
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a  className='me-4 text-reset'>
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a  className='me-4 text-reset'>
              <MDBIcon fab icon="twitter" />
            </a>
            <a  className='me-4 text-reset'>
              <MDBIcon fab icon="google" />
            </a>
            <a  className='me-4 text-reset'>
              <MDBIcon fab icon="instagram" />
            </a>
            <a  className='me-4 text-reset'>
              <MDBIcon fab icon="linkedin" />
            </a>
            <a  className='me-4 text-reset'>
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>

        <section className='border-footer'>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                  <MDBIcon icon="gem" className="me-3" />
                  IHRD,Muttom Thodupuzha
                </h6>
                <p>
                  College of Applied Science, Thodupuzha is affiliated to Mahatma Gandhi University and is established in 2000 with regular courses in  MSc (Computer Science), B.Sc (Computer Sciences), and B.Com with Computer Applications.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Courses Offered</h6>
                <p>
                  <a className='text-reset'>
                    M.Sc. Computer Science  (30 Seats)
                  </a>
                </p>
                <p>
                  <a className='text-reset'>
                    B.Sc. Computer Science (40 Seats)
                  </a>
                </p>
                <p>
                  <a className='text-reset'>
                    B.Com With Computer Applications (40 Seats)
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                <p>
                  <a className='text-reset'>
                    Terms & Conditions
                  </a>
                </p>
                <p>
                  <a className='text-reset'>
                    Privacy Policy
                  </a>
                </p>
                <p>
                  <a className='text-reset'>
                    Hyperlinking Policy
                  </a>
                </p>
                <p>
                  <a className='text-reset'>
                    Credits
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  Near court complex, Muttom,Thodupuzha,
                  Pin 685587
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  casthodupuzha@ihrd.ac.in
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" /> 04862257811,2257447
                </p>
                <p>
                  <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2021 Copyright:  IHRD,Muttom Thodupuzha
        </div>
      </MDBFooter>
    </>
  )
}

export default Footer