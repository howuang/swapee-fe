import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { itemActions } from '../../redux/actions/item.actions';
import './style.scss'


const Items = (item) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    
    const handleDeleteItem = () => {
        dispatch(itemActions.deleteItem(item._id, user._id))
    }
    
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
