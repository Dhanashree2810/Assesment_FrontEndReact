
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Navbars from './Components/Navbars';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom'
import UserTable from './Pages/UserTable';
import UserRegistration from './Pages/UserRegistration';
import UserUpdateform from './Pages/UserUpdateform';
import ClientTable from './Pages/ClientTable';
import ClientRegistration from './Pages/ClientRegistration';
import ClientUpdateform from './Pages/ClientUpdateform';
import CompanyTable from './Pages/CompanyTable';
import CompanyRegistration from './Pages/CompanyRegistration';
import CompanyUpdateForm from './Pages/CompanyUpdateForm';

function App() {

  axios.defaults.baseURL = 'http://localhost:8080'

  return (
    <>
        <Navbars />
        <Routes>
          <Route path='/' element={<UserTable />} />
          <Route path='/adduser' element={<UserRegistration />} />
          <Route path='/updateuser' element={<UserUpdateform />} />
          <Route path='/clientlist' element={<ClientTable />} />
          <Route path='/addclient' element={<ClientRegistration />} />
          <Route path='/updateclient' element={<ClientUpdateform />} />

          <Route path='/companylist' element={<CompanyTable />} />
          <Route path='/addcompany' element={<CompanyRegistration />} />
          <Route path='/updatecompany' element={<CompanyUpdateForm />} />
        </Routes>

    </>

  );
}

export default App;
