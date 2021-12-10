import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Footer from '../../components/Footer/Footer';
import Items from '../../components/Items/Items';
import PublicNavbar from '../../components/PublicNavbar/PublicNavbar';
import { authActions } from '../../redux/actions/auth.actions';
import { itemActions } from '../../redux/actions/item.actions';
import { userActions } from '../../redux/actions/user.actions';
import "./style.scss"

const ProfilePage = () => {
    const dispatch = useDispatch();
    const [updatePopup, setUpdatePopup] = useState(false);
    const [updateInfo, setUpdateInfo] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
        avatarUrl: "",
        about: ""
    });
    const [profilePhotoPopup, setProfilePhotoPopup] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState("");
    const [itemPopup, setItemPopup] = useState(false);
    const [itemInfo, setItemInfo] = useState({
        name: "",
        category: "",
        description: "",
        condition: "",
        imageUrl: "",
    });

    const params = useParams();
    const { name } = params;
    
    const { loading, isAuthenticated, accessToken } = useSelector((state) => state.auth);
    const user = useSelector(state => state.auth.user);
    const otherUser = useSelector(state => state.users.otherUser);
    const items = useSelector(state => state.items.items);
    
    var myWidget = window.cloudinary.createUploadWidget({
        cloudName: 'hoangnguyen',
        uploadPreset: 'panther'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
            setProfilePhoto(result.info.url)
        }
    });
    
    const handleProfilePhoto = (e) => {
        myWidget.open();
    };

    const handleChange = (e) => {
        setUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value });
    };

    const handleItemInfo = (e) => {
        setItemInfo({ ...itemInfo, [e.target.name]: e.target.value })
    };
    
    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(authActions.updateProfile({ ...updateInfo }, user._id))
    };

    const handleUpdateProfilePhoto = (e) => {
        e.preventDefault();
        dispatch(authActions.updateProfilePhoto(profilePhoto, user._id))
    };
    
    const handleCreateItem = (e) => {
        e.preventDefault();
        dispatch(itemActions.createItem({ ...itemInfo }))
    }
    
    useEffect(() => {
        dispatch(authActions.getCurrentUser());
    }, [profilePhoto, updateInfo]);

    useEffect(() => {
        if (name === user.displayName) {
            //true => the user === other User => get into his own profile page
            dispatch(itemActions.getAllItems(null, 10, 1, user._id, null))
        } else {
            //false => user != other User => user get into otherUser profile page
            dispatch(userActions.singleUsersRequest(name))
            //singleUserRequest: to get other User infomation
        }
    }, [user]);

    useEffect(() => {
        if (otherUser) {
            dispatch(itemActions.getAllItems(null, 10, 1, otherUser._id, null))
        }
    }, [otherUser]);
    
    let renderUser;
    if (name === user.displayName) {
        renderUser = user
    } else {
        renderUser = otherUser
    };
    
    return (
        <>
            <div className='user-info'>
                <div className='user-details'>
                    <div className='user-details-left'>
                        <img src={renderUser.avatarUrl} />
                        {name === user.displayName && <button onClick={() => { setProfilePhotoPopup(!profilePhotoPopup) }} className='camera-btn'><i className='fas fa-camera' /></button>}
                    </div>
                    {profilePhotoPopup && <div className='profile-popup'>
                        <button onClick={() => { setProfilePhotoPopup(!profilePhotoPopup) }}> <i className='fas fa-times' /></button>
                        <form onSubmit={handleUpdateProfilePhoto}>
                            <h1>hello</h1>
                            <button onClick={handleProfilePhoto}>Choose your photo</button>
                            <button type='submit'>Confirm</button>
                        </form>

                    </div>}
                    <div className='user-details-right'>
                        <h3>{renderUser.name}</h3>
                        <p>{renderUser.email}</p>
                        {name === user.displayName ?
                            <button className="update-btn" onClick={() => { setUpdatePopup(!updatePopup) }}>Edit profile</button> : null
                        }
                        {updatePopup &&
                            <div className='profile-popup'>
                                <button onClick={() => { setUpdatePopup(!updatePopup) }}><i className="fas fa-times" /></button>
                                <form onSubmit={handleUpdate}>
                                    <div className='form-inputs'>
                                        <label htmlFor="name" className='form-label'>
                                            Name
                                        </label>
                                        <input
                                            type='text'
                                            name='name'
                                            className='form-input'
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='form-inputs'>
                                        <label htmlFor="email" className='form-label'>
                                            Email
                                        </label>
                                        <input
                                            type='email'
                                            name='email'
                                            className='form-input'
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='form-inputs'>
                                        <label htmlFor="password" className='form-label'>
                                            Password
                                        </label>
                                        <input
                                            type='password'
                                            name='password'
                                            className='form-input'
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='form-inputs'>
                                        <label htmlFor="location" className='form-label'>
                                            Location
                                        </label>
                                        <input
                                            type='text'
                                            name='location'
                                            className='form-input'
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='form-inputs'>
                                        <label htmlFor="about" className='form-label'>
                                            About
                                        </label>
                                        <textarea
                                            type='text'
                                            name='about'
                                            className='form-input'
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button onClick={handleProfilePhoto}>Choose your photo</button>

                                    <button type='submit'>Edit Your Profile</button>
                                </form>
                            </div>}
                    </div>
                </div>
                <div className="user-intro">
                    <h5>Intro</h5>
                    {renderUser.about ?
                        <div>
                            {renderUser.about}
                        </div> : <p>No intro available</p>}
                </div>
                {items.length !== 0 ?
                    <div className='user-items'>
                        <div className='user-items-sort'>
                            <ul>
                                <li><a>All</a></li>
                                <li><a>Available</a></li>
                                <li><a>Swapped</a></li>
                            </ul>
                        </div>
                        {user && <button onClick={() => setItemPopup(!itemPopup)}>Add more items</button>}
                        {items.map((e) => {
                            return <Items key={e._id} {...e} />
                        })}
                    </div>
                    :
                    <div className='user-items'>
                        <div className='user-items-empty'>
                            <p>No item available</p>
                            {user && <button onClick={() => setItemPopup(!itemPopup)}>Let's add some item</button>}
                        </div>
                    </div>
                }
                        {itemPopup &&
                            <div className='profile-popup'>
                                <button onClick={() => setItemPopup(!itemPopup)}><id className='fas fa-times' /></button>
                                <form onSubmit={handleCreateItem}>
                                    <div className='form-inputs'>
                                        <label htmlFor="name" className='form-label'>
                                            Name
                                        </label>
                                        <input
                                            type='text'
                                            name='name'
                                            className='form-input'
                                            onChange={handleItemInfo}
                                        />
                                    </div>
                                    <div className='form-inputs'>
                                        <label htmlFor="category" className='form-label'>
                                            Category
                                        </label>
                                        <select name="category" id="category" onChange={handleItemInfo}>
                                            <option selected>Choose category</option>
                                            <option value="clothing">Clothing</option>
                                            <option value="furniture">Furniture</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="books">Books</option>
                                        </select>
                                    </div>
                                    <div className='form-inputs'>
                                        <label htmlFor="description" className='form-label'>
                                            Description
                                        </label>
                                        <textarea
                                            type='text'
                                            name='description'
                                            className='form-input'
                                            onChange={handleItemInfo}
                                        />
                                    </div>
                                    <div className='form-inputs'>
                                        <label htmlFor="condition" className='form-label'>
                                            Condition
                                        </label>
                                        <input
                                            type='text'
                                            name='condition'
                                            className='form-input'
                                            onChange={handleItemInfo}
                                        />
                                    </div>
                                    <button type='submit'>Add Item</button>
                                </form>

                            </div>
                        }
            </div>
        </>
    )
};

export default ProfilePage
