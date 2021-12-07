import React from 'react'
import { Link } from 'react-router-dom'
import PublicForm from '../../components/PublicForm/PublicForm'
import './style.scss'


const AuthPage = () => {
    return (
        <div className='wrapper'>
            <PublicForm />
        </div>
    )
}

export default AuthPage
