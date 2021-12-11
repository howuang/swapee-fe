import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
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
    // console.log("user id", user._id)
    // console.log(("item owner id", item.owner._id))

    useEffect(() => {
        dispatch(authActions.getCurrentUser());
    }, []);
    
    useEffect(() => {
        dispatch(itemActions.getSingleItem(itemId));
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
                            <div className="owner-info-details">
                                <Link className="owner-info-details-link" to={`/${item.owner.displayName}`}>
                                <h5>{item.owner.name}</h5>
                                </Link>
                                {item.owner.location ?
                                    <p>{item.owner.location}</p>
                                    : null}
                            </div>
                        </div>
                        : null}
                    <hr></hr>
                    {/* {item.owner._id !== undefined &&item.owner._id === user._id ?
                        <div className='item-btns'>
                            <button className='item-btn'>Update Item</button>
                        </div> : <div>
                            {item.isSwapped === "true" ? <button className='item-btn-gone'>Gone</button> : <button className='item-btn-swap'>Let's swap!</button>}

                        </div>} */}
                    <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>Description: {item.description}</p>
                        <p>Condition: {item.condition}</p>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    )
};

export default DetailPage
