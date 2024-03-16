import { Col, Form, Row,Card ,FormGroup, Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React, { useEffect, useState } from "react"
import axios from 'axios'


export default function CompanyRegistration() {
    const [companyname, setcompanyname] = useState("")
    const [username, setusername] = useState("");
    const [userData, setuserData] = useState([]);

    useEffect(() => {
        showUsers();
      }, []);
    
      function showUsers() {
        axios
          .get('/user/findall')
          .then((res) => {
            setuserData(res.data.data);
          })          
          .catch((err) => {
            console.log(err);
          });
      }


    function handleSubmit(e) {
        e.preventDefault()

        const selectedUsers = userData.find(a => a.username === username);

        let newData = { 
            companyname,
            username,
            userId : selectedUsers ? selectedUsers._id : null,
        }

        axios.post('/company/add', newData)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            setcompanyname("")
            setusername("")
    }

    return (
        <>
            <div style={{ backgroundColor: '#9BB0C1' }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={7}>
                            <Card className="shadow-lg border-0 rounded-lg mt-5 mb-5">
                                <Card.Header>
                                    <h3 className="text-center font-weight-light my-4">
                                        Add Company
                                    </h3>
                                </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                            <Col md={8}>
                                                <Form.Floating className="mb-3 mb-md-0">
                                                    <Form.Control
                                                        type="text"
                                                        id="companyname"
                                                        placeholder="Enter your Company Name"
                                                        value={companyname}
                                                        onChange={(e) => setcompanyname(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="companyname">Company Name</label>
                                                </Form.Floating>
                                            </Col>
                                        </Row>

                                        <Row className="mb-3">
                                            <Col md={8}>
                                                <FloatingLabel controlId="floatingSelect" label="User Name">
                                                    <Form.Select aria-label="Select User Name" onChange={(e) => setusername(e.target.value)} value={username}>
                                                        <option>Select User Name</option>
                                                        {userData.map((a) => (
                                                            <option key={a._id} value={a.username}>
                                                                {a.username}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                        
                                        <Row className="mb-3">
                                            <div className="d-grid">
                                                <FormGroup>
                                                    <Col mdOffset={3} lg="12" sm="12" className=' text-center'>
                                                        <Button type="submit" variant="primary">
                                                            Add
                                                        </Button>
                                                    </Col>
                                                </FormGroup>
                                            </div>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}
