import React from 'react'
import { useSelector } from 'react-redux';

const ProfilePage = () => {
    const { loading, isAuthenticated, accessToken } = useSelector((state) => state.auth);
    const user = useSelector(state => state.auth.user);
    
    return (
        <>
            <div className='user-info'>
                <div className='profile-avatar'>
                    <img src={user.avatarUrl}/>
                </div>
                <div className='profile-details'>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <p>Looking for ...</p>
                    <button>Update Profile</button>
                </div>
            </div>
        </>
    )
}

export default ProfilePage
