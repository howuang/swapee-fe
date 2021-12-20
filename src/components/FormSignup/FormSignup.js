import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { authActions } from '../../redux/actions/auth.actions';
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";


const Modal = ({ showModal, setShowModal }) => {
    const dispatch = useDispatch();
    const [dataForm, setDataForm] = useState({
        email: "",
        password: ""
    });
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(authActions.loginRequest(dataForm.email, dataForm.password));
    };

    const responseGoogle = (response) => {
        console.log(response);
        dispatch(authActions.loginGoogleRequest(response.tokenId))
    };

    if (isAuthenticated) return <Navigate to="/" />;
    
    return (
        <>
            {showModal ?
                <div className="login-form" showModal={showModal}>
                    <form className='form' onSubmit={handleLogin}>
                        <button className="close-btn" onClick={() => setShowModal(prev => !prev)}>
                            <i className="fas fa-times" />
                        </button>
                        <div className='login-btns'>
                            <GoogleLogin
                                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                                buttonText="Continue With Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                className='login-btn'
                            />
                            {/* <FacebookLogin
                                    appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                    cssClass="login-btn"
                                    icon="fa-facebook"
                                /> */}
                        </div>
                        <span className='form-input-login'>
                            or
                        </span>
                        <div className='form-inputs'>
                            <label htmlFor="email" className='form-label'>
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                className='form-input'
                                onChange={handleLoginChange}
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
                                onChange={handleLoginChange}
                            />
                        </div>
                        <button className='form-input-btn' type='submit'>
                            Log In
                        </button>
                    </form>
                </div>
                : null}
        </>
    )
};

const FormSignup = () => {
    const dispatch = useDispatch();

    const [dataForm, setDataForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [showModal, setShowModal] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setShowModal(prev => !prev);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authActions.register(dataForm.name, dataForm.email, dataForm.password));
    };

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const responseGoogle = (response) => {
        console.log(response);
        dispatch(authActions.loginGoogleRequest(response.tokenId))
    };
  
    if (isAuthenticated) return <Navigate to="/" />;
    
    return (
        <div className='form-content-right'>
            <div className='register'>
                <form className='form' onSubmit={handleSubmit}>
                    <h1>
                        Start declutter today! Create your account by filling out the information below.
                    </h1>
                    <div className='login-btns'>
                        <GoogleLogin
                            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                            buttonText="Continue With Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className='login-btn'
                        />
                    </div>
                    <span className='form-input-login'>
                        or
                    </span>
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
                    <button className='form-input-btn' type='submit'>
                        Create account
                    </button>
                    <span className='form-input-login'>
                        Already have an account? Login <span>
                            <button className='login-link' onClick={openModal}>
                                here
                            </button>
                        </span>
                    </span>
                </form>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
};

export default FormSignup