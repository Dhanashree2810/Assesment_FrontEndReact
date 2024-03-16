import { Col, Form, Row,Card ,FormGroup, Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React, { useEffect, useState } from "react"
import axios from 'axios'


export default function ClientRegistration() {
    const [clientname, setclientname] = useState("")
    const [username, setusername] = useState("")
    const [companyname, setcompanyname] = useState("")
    const [email, setemail] = useState("")    
    const [phone, setphone] = useState("")
    const [userData, setuserData] = useState([]);
    const [companyData, setcompanyData] = useState([]);

    useEffect(() => {
        showUsers();
        showCompanies();
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


      function showCompanies() {
        axios
          .get('/company/findall')
          .then((res) => {
            setcompanyData(res.data.data);
          })          
          .catch((err) => {
            console.log(err);
          });
      }


    function handleSubmit(e) {
        e.preventDefault()

        const selectedUsers = userData.find(a => a.username === username);

        const selectedCompanies = companyData.find(a => a.companyname === companyname);


        let newData = { 
            clientname,
            username,
            userId : selectedUsers ? selectedUsers._id : null,
            companyname,
            companyId : selectedCompanies ? selectedCompanies._id : null,
            email,
            phone 
        }

        axios.post('/client/add', newData)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            setclientname("")
            setusername("")
            setcompanyname("")
            setemail("")
            setphone("")
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
                                        Add Client
                                    </h3>
                                </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                            <Col md={8}>
                                                <Form.Floating className="mb-3 mb-md-0">
                                                    <Form.Control
                                                        type="text"
                                                        id="clientname"
                                                        placeholder="Enter your Client Name"
                                                        value={clientname}
                                                        onChange={(e) => setclientname(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="clientname">Client Name</label>
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
                                            <Col md={8}>
                                                <FloatingLabel controlId="floatingSelect" label="Company Name">
                                                    <Form.Select aria-label="Select Company Name" onChange={(e) => setcompanyname(e.target.value)} value={companyname}>
                                                        <option>Select Company Name</option>
                                                        {companyData.map((a) => (
                                                            <option key={a._id} value={a.companyname}>
                                                                {a.companyname}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </FloatingLabel>
                                            </Col>
                                        </Row>

                                        <Row className="mb-3">
                                            <Col md={8}>
                                            <Form.Floating className="mb-3 mb-md-0">
                                                    <Form.Control
                                                        type="email"
                                                        id="email"
                                                        placeholder="Enter your Email"
                                                        value={email}
                                                        onChange={(e) => setemail(e.target.value)}
                                                        required
                                                        pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                                                    />
                                                    <label htmlFor="email">Email</label>
                                                </Form.Floating>
                                            </Col>
                                        </Row>


                                        <Row className="mb-3">
                                            <Col md={8}>
                                            <Form.Floating className="mb-3 mb-md-0">
                                                    <Form.Control
                                                        type="tel"
                                                        id="phone"
                                                        placeholder="Enter your Phone"
                                                        value={phone}
                                                        min={10}
                                                        max={10}
                                                        pattern='^\+(?:[0-9] ?){6,14}[0-9]$'
                                                        onChange={(e) => setphone(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="phone">Phone</label>
                                                </Form.Floating>
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
