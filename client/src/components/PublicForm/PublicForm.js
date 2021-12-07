import React from 'react'
import FormSignup from '../FormSignup/FormSignup'
import './style.scss'

const PublicForm = () => {
    return (
        <div className='form-container'>
            <div className='form-content-left'>
                <h1>
                    Swapee
                </h1>
            </div>
            <FormSignup />
        </div>
    )
}

export default PublicForm
