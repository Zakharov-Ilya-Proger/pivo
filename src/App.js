import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SuccessTable from './cmp/SuccessTable/SuccessTable';
import AchievementsTable from './cmp/AchivmentsTable/AchivmentsTable';
import TeachersTable from './cmp/TeacherTable/TeacherTable';
import LoginForm from './cmp/LoginForm/LoginForm';
import UserPage from './cmp/UserPage/UserPage';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    console.log('Login');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('Logout');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="mirealogo_xd.png"
              width="30"
              height="30"
              className="d-inline-block align-top me-4"
            />
            Личный кабинет студента
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn && (
                <>
                  <Link to="/success" >Успеваемость </Link>
                  <Link to="/achievements">Личные достижения </Link>
                  <Link to="/teachers">Преподаватели </Link>
                  <Link to="/user">Пользователь </Link>
                </>
              )}
            </Nav>
            {isLoggedIn ? (
              <Button variant="outline-primary" onClick={handleLogout}>
                Выйти
              </Button>
            ) : (
             <></>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/success" /> : <Navigate to="/login" />}
        />
        <Route
          path="/success"
          element={isLoggedIn ? <SuccessTable /> : <Navigate to="/login" />}
        />
        <Route
          path="/achievements"
          element={isLoggedIn ? <AchievementsTable /> : <Navigate to="/login" />}
        />
        <Route
          path="/teachers"
          element={isLoggedIn ? <TeachersTable /> : <Navigate to="/login" />}
        />
        <Route
          path="/user"
          element={isLoggedIn ? <UserPage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
