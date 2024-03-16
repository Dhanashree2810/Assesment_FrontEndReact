import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Navbars() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary ">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Link> <Link to='/' className='text-decoration-none text-dark'>User List</Link> </Nav.Link>
            <Nav.Link><Link to='/adduser'className='text-decoration-none text-dark'>Add User</Link></Nav.Link>
            <Nav.Link><Link to='/updateuser'className='text-decoration-none text-dark'>User Update </Link></Nav.Link>

            
            <Nav.Link><Link to='/clientlist'className='text-decoration-none text-dark'>Client List</Link></Nav.Link>
            <Nav.Link> <Link to='/addclient' className='text-decoration-none text-dark'>Add Client</Link> </Nav.Link>
            <Nav.Link><Link to='/updateclient'className='text-decoration-none text-dark'> Update Client</Link></Nav.Link>

            <Nav.Link><Link to='/companylist'className='text-decoration-none text-dark'>Company List</Link></Nav.Link>
            <Nav.Link> <Link to='/addcompany' className='text-decoration-none text-dark'>Add Company</Link> </Nav.Link>
            <Nav.Link><Link to='/updatecompany'className='text-decoration-none text-dark'> Update Company</Link></Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
