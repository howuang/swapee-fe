import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Footer from '../../components/Footer/Footer';
import PublicNavbar from '../../components/PublicNavbar/PublicNavbar';
import "./style.scss"

const ProfilePage = () => {
    const dispatch = useDispatch();

    const params = useParams();
    const { name } = params;
    
    const { loading, isAuthenticated, accessToken } = useSelector((state) => state.auth);
    const user = useSelector(state => state.auth.user);
    
    return (
        <>
            <PublicNavbar />
            <div className='user-info'>
                <div className='user-details'>
                    <div className='user-details-left'>
                        <img src={user.avatarUrl} />
                        <button>Update profile photo</button>
                    </div>
                    <div className='user-details-right'>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <p>Looking for ...</p>
                        <button>Update Profile</button>
                    </div>

                </div>
                <div className='profile-avatar'>
                </div>
                <div className='profile-details'>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default ProfilePage
