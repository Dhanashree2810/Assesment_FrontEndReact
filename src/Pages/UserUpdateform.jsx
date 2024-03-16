import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Col, Form, Row,Card ,FormGroup, Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function UserUpdateform() {

  const [clientname, setclientname] = useState("")
  const [username, setusername] = useState("")
  const [clientList, setclientList] = useState([]);

  const xyz = localStorage.getItem('userid')

  useEffect(() => {
    fetchClients();
}, []);

const fetchClients = () => {
    axios.get('/client/findall')
        .then(response => {
            setclientList(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

  function handleSubmit(e) {
    e.preventDefault()

    const selectedClients = clientList.find(a => a.clientname === clientname);

    const newData = {
            clientname,
            clientId: selectedClients ? selectedClients._id : null,
            username
    }

    axios.put(`/user/update/${xyz}`, newData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      setclientname("")
      setusername("")    
  }


  useEffect(() => {
    axios.get(`/user/find/${xyz}`)
      .then(res => {
        console.log(res.data.data);
        const eData = res.data.data
      
        setclientname(eData.clientname)
        setusername(eData.username)       
      })
      .catch(err => {
        console.log(err);
      })
  }, [])


  return (
    <div style={{ backgroundColor: '#9BB0C1' }}>
    <Container>
        <Row className="justify-content-center">
            <Col lg={7}>
                <Card className="shadow-lg border-0 rounded-lg mt-5 mb-5">
                    <Card.Header>
                        <h3 className="text-center font-weight-light my-4">
                            Update User
                        </h3>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Col md={8}>
                                    <FloatingLabel controlId="floatingSelect" label="Client Name">
                                        <Form.Select aria-label="Select Client Name" onChange={(e) => setclientname(e.target.value)} value={clientname}>
                                            <option>Select Client Name</option>
                                            {clientList.map((a) => (
                                                <option key={a._id} value={a.clientname}>
                                                    {a.clientname}
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
                                            type="text"
                                            id="username"
                                            placeholder="Enter your User Name"
                                            value={username}
                                            onChange={(e) => setusername(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="username">User Name</label>
                                    </Form.Floating>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <div className="d-grid">
                                    <FormGroup>
                                        <Col mdOffset={3} lg="12" sm="12" className=' text-center'>
                                            <Button type="submit" variant="primary">
                                                Update
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
  )
}
