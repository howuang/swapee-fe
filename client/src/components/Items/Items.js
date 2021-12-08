import React from 'react'
import './style.scss'


const Items = (item) => {
    console.log(item)
    return (
        <div className='item-card'>
            <img className='item-img' src={item.imageUrl} />
            <div className='item-info'>
                <h5>{item.name}</h5>
                <p>{item.condition}</p>
            </div>
        </div>
    )
}

export default Items;
