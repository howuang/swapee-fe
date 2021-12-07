import React from 'react'
import { Outlet, Route, Routes } from 'react-router'
import { Container } from "react-bootstrap";
import PublicNavbar from '../components/PublicNavbar/PublicNavbar'
import AuthPage from '../pages/AuthPage/AuthPage'
import HomePage from '../pages/HomePage/HomePage'
import AlertMsg from './layouts/AlertMsg';

const PublicLayout = () => {
    return (
        <>
            <PublicNavbar />
            <Container fluid style={{ padding: 0 }}>
                <AlertMsg />
                <Outlet />
            </Container>
        </> 
    )
}

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PublicLayout/>} >
                <Route exact path="/auth" element={<AuthPage />} />
                <Route path="/" element={<HomePage />} />
            </Route>
        </Routes>
    )
}

export default AllRoutes;
