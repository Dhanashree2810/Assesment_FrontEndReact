import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Col, Form, Row, Table, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { HiPlus } from "react-icons/hi";

export default function ClientTable() {

  const [clientData, setclientData] = useState([])

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    showClients()
  }, [])


  function showClients() {
    axios.get('/client/findall')
      .then(res => {
        setclientData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filtered = clientData.filter(
      (a) =>
        a.clientname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  return (
    <>
      <Container fluid>
        <div>
          <Row>

            <Col lg={6} >
              <h2>Client Table</h2>
            </Col>
            <Col lg={6}>
              <Form className="mb-3 ">

                <Form.Control
                  type="text"
                  placeholder="Search by Client Name"
                  value={searchTerm}
                  onChange={handleSearch}
                  className=' mt-1'
                />

              </Form>
            </Col>

          </Row>
        </div>

        <div className=' w-25'>
          <Button className=" float-start mb-5 " variant="dark" onClick={() => navigate('/addclient')}>
            <HiPlus size={22} />
            Add
          </Button>
        </div>

        <div >
          <Table className='table table-primary' bordered >
            <thead>
              <tr className=' text-center'>
                <th>Client Name</th>
                <th>User Name</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th className='text-center'>Action</th>
              </tr>
            </thead>

            <tbody>
              {
                clientData.map((a, index) => {
                  return (
                    <tr className=' text-center' >
                      <td>{a.clientname}</td>
                      <td>{a.username}</td>
                      <td>{a.companyname}</td>
                      <td>{a.email}</td>
                      <td>{a.phone}</td>

                      <td className='d-flex justify-content-evenly'>
                        <button className='btn btn-warning '
                          onClick={() => {
                            navigate('/updateclient')
                            localStorage.setItem('clientid', a._id)
                          }}>Update</button>

                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table >
        </div>

      </Container>

    </>
  )
}
