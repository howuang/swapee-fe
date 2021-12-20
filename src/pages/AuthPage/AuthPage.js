import React from 'react'
import { Link } from 'react-router-dom'
import FormSignup from '../../components/FormSignup/FormSignup'
import './style.scss'


const AuthPage = () => {
    
    return (
        <div className='form-container'>
            <div className='form-content-left'>
                <Link to='/'>Swapee</Link>
            </div>
            <FormSignup />
        </div>
    )
}

export default AuthPage
