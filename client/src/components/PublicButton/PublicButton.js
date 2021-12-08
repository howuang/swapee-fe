import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const PublicButton = () => {
    return (
        <Link to='/signup'>
            <button className='btn'>Sign Up</button>
        </Link>
    )
}

export default PublicButton
