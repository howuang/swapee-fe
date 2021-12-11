import React from 'react'
import { Link } from 'react-router-dom';
import './style.scss'


const Items = (item) => {
    return (
        <Link to={`/explore/${item._id}`} className='item-card'>
            <img className={item.isSwapped === "false" ? 'item-img' : "item-gone"} src={item.imageUrl} />
            <p className={item.isSwapped === "false" ? 'gone-text' : "gone-text-show"}>Swapped</p>
            <div className='item-info'>
                <p>{item.name}</p>
            </div>
        </Link>
    )
};

export default Items;
