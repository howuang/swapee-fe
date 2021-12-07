import React, { useState } from 'react'

const FormSignup = () => {
    const [dataForm, setDataForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='form-content-right'>
            <form className='form' onSubmit={handleSubmit}>
                <h1>
                    Start declutter today! Create your account by filling out the information below.
                </h1>
                <div className='form-inputs'>
                    <label htmlFor="name" className='form-label'>
                        Name
                    </label>
                    <input
                        type='text'
                        name='name'
                        className='form-input'
                        placeholder='Enter your Name'
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
                        placeholder='Enter your Email'
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
                        placeholder='Enter your Password'
                        onChange={handleChange}
                    />
                </div>
                <button className='form-input-btn' type='submit'>
                    Sign up
                </button>
                <span className='form-input-login'>
                    Already have an account? Login <a href='#'>here</a>
                </span>

            </form>
            
        </div>
    )
}

export default FormSignup
