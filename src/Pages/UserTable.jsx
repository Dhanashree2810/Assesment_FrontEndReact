import React, { useEffect, useState } from 'react';
import { Table, Form, Row, Col, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HiPlus } from "react-icons/hi";

export default function UserTable() {
  const [userData, setuserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    showUsers();
  }, []);

  function showUsers() {
    axios
      .get('/user/findall')
      .then((res) => {
        setuserData(res.data.data);
        setFilteredData(res.data.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }


  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filtered = userData.filter(
      (a) =>
        a.username.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h2>User Table</h2>
            </Col>
            <Col lg={6}>
              <Form className="mb-3 ">

                <Form.Control
                  type="text"
                  placeholder="Search by User Name"
                  value={searchTerm}
                  onChange={handleSearch}
                  className=' mt-1'
                />

              </Form>
            </Col>

          </Row>
        </div>

        <div className=' w-25'>          
            <Button className=" float-start mb-5" variant="dark" onClick={() => navigate('/adduser')}>
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
                <th className='text-center'>Action</th>
              </tr>
            </thead>

            <tbody>
              {
                userData.map((a, index) => {
                  return (
                    <tr className=' text-center' >
                      <td>{a.clientname}</td>
                      <td>{a.username}</td>

                      <td className='d-flex justify-content-evenly'>
                        <button className='btn btn-warning '
                          onClick={() => {
                            navigate('/updateuser')
                            localStorage.setItem('userid', a._id)
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
  );
}

