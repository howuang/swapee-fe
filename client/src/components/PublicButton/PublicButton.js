import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const PublicButton = () => {
    return (
        <Link to='sign-up'>
            <button className='btn'>Sign Up</button>
        </Link>
    )
}

export default PublicButton
