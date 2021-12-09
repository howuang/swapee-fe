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
import DetailPage from '../pages/DetailPage/DetailPage';

const PublicLayout = () => {
    return (
        <>
            <PublicNavbar/>
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
            <Route exact path="/signup" element={<AuthPage />} />
            <Route path="/" element={<PublicLayout />} >
                <Route exact path="/:name" element={<PrivateRoute>
                    <ProfilePage />
                </PrivateRoute>} />
                <Route exact path="/explore" element={<ExplorePage />} />
                <Route exact path="/explore/:id" element={<DetailPage />} />
                <Route path="/" element={<HomePage />} />
            </Route>
        </Routes>
    )
};

export default AllRoutes;
