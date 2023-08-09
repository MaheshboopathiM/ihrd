import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { BASEURL } from '../../../BaseUrl/Baseurl';
import ViewProfiledetails from '../../others/viewProfiledetails';

function Teachers({ data, handleTeacher, setShowsucess, setsucessmessage }) {

  const [View, setview] = useState(false);
  const [viewdetails, setdata] = useState('');
  const [search, setsearch] = useState("");
  const [currentPage, setCurrentpage] = useState(1);
  const [recordsPerPage, setrecordsPerPage] = useState(5);


  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentpage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentpage(currentPage + 1);
    }
  };

  const changeCpage = (id) => {
    setCurrentpage(id);
  };

  const handleView = async (id) => {
    let role = 1;
    let result = await axios.get(`${BASEURL}/admin/details/get/${id}/${role}`)
    console.log(result)
    if (result.status === 200) {
      setdata(result.data.data)
      setview(true)
    } else {
      setview(false)
    }
  }

  const handleClose = () => setview(false);

  return (
    <>
      <>
        <div className='container mt-2 d-flex align-items-center flex-column'>
          <div className="col-10 mb-3 d-flex justify-content-between">
            <div className='col-1 me-2'>
              <Form.Select onChange={(e) => setrecordsPerPage(e.target.value)}>
                {/* <option disabled style={{ opacity: '0' }}>Select filter</option> */}
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </Form.Select>
            </div>
            <input
              className="form-control me-2"
              type="search"
              aria-label="Search"
              name=""
              id=""
              onChange={(e) => setsearch(e.target.value)}
              placeholder="Search...."
            />
            <div className="col-2 justify-self-end" style={{ maxHeight: '20px' }}>
              <button className="btn btn-secondary " type="button">
                Total Record:{" "}{data.length}
              </button>
            </div>
          </div>
          <Table striped bordered hover size="lg">
            <thead>
              <tr>
                <th>SL.NO</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>EMAIL</th>
                <th>JOIN DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            {data.length > 0 ?
              <tbody>
                {data && (search ? data.filter((item) => {
                  return search.toLocaleLowerCase() == false
                    ? records
                    : (item.first_name.toLocaleLowerCase() || item.last_name.toLocaleLowerCase() || item.email_id.toLocaleLowerCase).includes(search);
                }) : records).map((d) => (
                  <>
                    <tr>
                      <td>1</td>
                      <td>{d.first_name}</td>
                      <td>{d.last_name}</td>
                      <td>{d.email_id}</td>
                      <td>{new Date(d.joined_date).toLocaleDateString()}</td>
                      <td>
                        <Button variant="secondary" onClick={() => handleView(d.id)}>View</Button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
              :
              <div className='container mt-2'>
                <Alert variant={"primary"}>
                  No data Available Please Add Teachers details!
                </Alert>
              </div>
              }
          </Table>
          {numbers.length > 1 &&
            <nav className='col-12' aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item" onClick={prePage} >
                  <a class="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    {/* <span class="sr-only">Previous</span> */}
                  </a>
                </li>
                {numbers && numbers.map((d) =>
                  <li class="page-item" onClick={() => changeCpage(d)}><a class="page-link" >{d}</a></li>
                )}
                <li class="page-item" onClick={nextPage}>
                  <a class="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    {/* <span class="sr-only">Next</span> */}
                  </a>
                </li>
              </ul>
            </nav>
          }
        </div>
      </>
      {View &&
        <ViewProfiledetails show={View} close={handleClose} data={viewdetails} role={true} handleTeacher={handleTeacher} setShowsucess={setShowsucess} setsucessmessage={setsucessmessage} />
      }
    </>
  )
}

export default Teachers

// className={`page-link ${currentPage === num ? "active-button" : ""
// }`}
