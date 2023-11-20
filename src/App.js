import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Catalog />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/new-ticket' element={<PrivateRoute />}>
        <Route path='/new-ticket' element={<NewTicket />} />
      </Route>
      <Route path='/tickets' element={<PrivateRoute />}>
        <Route path='/tickets' element={<Tickets />} />
      </Route>
      <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
        <Route path='/ticket/:ticketId' element={<Ticket />} />
      </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
