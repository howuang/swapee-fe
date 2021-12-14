import React, { useEffect } from 'react'
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
import MessagePage from '../pages/MessagePage/MessagePage';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/actions/auth.actions';
import MembershipPage from '../pages/MembershipPage/MembershipPage';

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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.getCurrentUser());
    }, []);
    return (
        <Routes>
            <Route exact path="/signup" element={<AuthPage />} />
            <Route path="/" element={<PublicLayout />} >
                <Route exact path="/:name" element={<PrivateRoute>
                    <ProfilePage />
                </PrivateRoute>} />
                <Route exact path="/:name/messages" element={<PrivateRoute>
                    <MessagePage />
                </PrivateRoute>} />
                <Route exact path="/membership" element={<PrivateRoute>
                    <MembershipPage />
                </PrivateRoute>} />
                <Route exact path="/explore" element={<ExplorePage />} />
                <Route exact path="/explore/:id" element={<DetailPage />} />
                <Route path="/" element={<HomePage />} />
            </Route>
        </Routes>
    )
};

export default AllRoutes;
