import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Footer from '../../components/Footer/Footer'
import PublicNavbar from '../../components/PublicNavbar/PublicNavbar'
import { authActions } from '../../redux/actions/auth.actions';
import { itemActions } from '../../redux/actions/item.actions';
import './style.scss'

const DetailPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const itemId = params.id;

    const item = useSelector(state => state.items.singleItem);
    const user = useSelector(state => state.auth.user);
    console.log("user id", user._id)
    console.log(("item owner id", item))

    
    useEffect(() => {
        dispatch(itemActions.getSingleItem(itemId));
    }, []);
    
    useEffect(() => {
        dispatch(authActions.getCurrentUser());
    }, []);
    return (
        <>
            <div className="item-container">
                <div className="item-container-left">
                    <img src={item.imageUrl} />
                </div>
                <div className="item-container-right">
                    {item.owner ?
                        <div className="owner-info">
                            <div className="owner-avatar">
                                <img src={item.owner.avatarUrl} />
                            </div>
                            <div>
                                <h5>{item.owner.name}</h5>
                            </div>
                        </div>
                        : null}
                    {item.owner._id === user._id ?
                        <div className='item-btn'>
                            <button>Update Item</button>
                        </div> : <div>
                            {item.isSwapped === "true" ? <button className='swap-btn-gone'>Gone</button> : <button className='swap-btn'>Let's swap!</button>}

                        </div>}
                    <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <p>Condition: {item.condition}</p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default DetailPage
