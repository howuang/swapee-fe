import React from 'react'
import { Outlet, Route, Routes } from 'react-router'
import { Container } from "react-bootstrap";
import PublicNavbar from '../components/PublicNavbar/PublicNavbar'
import AuthPage from '../pages/AuthPage/AuthPage'
import HomePage from '../pages/HomePage/HomePage'
import AlertMsg from './layouts/AlertMsg';
import ExplorePage from '../pages/ExplorePage/ExplorePage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import PrivateRoute from './PrivateRoute';
import Footer from '../components/Footer/Footer';

const PublicLayout = () => {
    return (
        <>
            <PublicNavbar />
            <Container fluid style={{ padding: 0 }}>
                <AlertMsg />
                <Outlet />
            </Container>
            <Footer />
        </> 
    )
}

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PublicLayout />} >
                <Route exact path="/signup" element={<AuthPage />} />
                <Route exact path="/:name" element={<PrivateRoute>
                    <ProfilePage />
                </PrivateRoute>} />
                <Route exact path="/explore" element={<ExplorePage />} />
                <Route path="/" element={<HomePage />} />
            </Route>
        </Routes>
    )
};

export default AllRoutes;
