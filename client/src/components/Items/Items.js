import React from 'react'
import { Link } from 'react-router-dom';
import './style.scss'


const Items = (item) => {
    return (
        <Link to={`/explore/${item._id}`} className='item-card'>
            <img className='item-img' src={item.imageUrl} />
            <div className='item-info'>
                <h5>{item.name}</h5>
                <p>{item.condition}</p>
            </div>
        </Link>
    )
}

export default Items;
