import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Col, Form, Row, Table, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { HiPlus } from "react-icons/hi";

export default function CompanyTable() {

    const [companyData, setcompanyData] = useState([])

    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        showCompanies()
    }, [])


    function showCompanies() {
        axios.get('/company/findall')
            .then(res => {
                setcompanyData(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        const filtered = companyData.filter(
            (a) =>
                a.companyname.toLowerCase().includes(searchTerm.toLowerCase())
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
                                    placeholder="Search by Company Name"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className=' mt-1'
                                />

                            </Form>
                        </Col>

                    </Row>
                </div>

                <div className=' w-25'>
                    <Button className=" float-start mb-5 " variant="dark" onClick={() => navigate('/addcompany')}>
                        <HiPlus size={22} />
                        Add
                    </Button>
                </div>

                <div >
                    <Table className='table table-primary' bordered >
                        <thead>
                            <tr className=' text-center'>
                                <th>Company Name</th>
                                <th>User Name</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                companyData.map((a, index) => {
                                    return (
                                        <tr className=' text-center' >
                                            <td>{a.companyname}</td>
                                            <td>{a.username}</td>

                                            <td className='d-flex justify-content-evenly'>
                                                <button className='btn btn-warning '
                                                    onClick={() => {
                                                        navigate('/updatecompany')
                                                        localStorage.setItem('companyid', a._id)
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
