import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { offerActions } from '../../redux/actions/offer.actions';
import './style.scss'

const Messages = (props) => {
    const dispatch = useDispatch();

    const handleSwapRequest = (e) => {
        dispatch(offerActions.updateOffers(props.offerId, { status: e.target.value }))
    }

    const handleCancelSwapRequest = () => {
        console.log("e", props.offerId)
        dispatch(offerActions.cancelOfferRequest(props.offerId))
    }

    return (
        <div className='message-card'>
            <div className='message-card-row-top'>
                <div className='message-card-sender'>
                    <div className='message-card-sender-left'>
                        <div className='message-card-sender-left-avatar'>
                            <img src={props.owner?.avatarUrl} />
                        </div>
                    </div>
                    <div className='message-card-sender-info'>
                        <Link to={`/${props.owner?.displayName}`}>
                            <h4>{props.owner?.name}</h4>
                        </Link>
                        <p>{props.owner?.email}</p>
                    </div>
                </div>
                {props.filter === "received" ?
                    <div className="message-card-btns">
                        <button value="success" onClick={handleSwapRequest}>Accept</button>
                        <button value="deny" onClick={handleSwapRequest}>Deny</button>
                    </div>
                    :
                    <div className="message-card-btns">
                        {props.filter === "sent" ? 
                        <button value="success" onClick={handleCancelSwapRequest}>Cancel</button>
                        :null}
                    </div>
                }
            </div>
            <div className='message-card-row-bottom'>
                <div className='message-card-row-bottom-left'>
                    <Link to={`/explore/${props.itemOffer._id}`}>
                        <div className='message-card-row-bottom-img'>
                            <img src={props.itemOffer.imageUrl} />
                        </div>
                        <p>{props.itemOffer.name}</p>
                        
                    </Link>
                </div>
                <div className='message-card-row-bottom-message'>

                    <p> {props.message}</p>
                </div>
                <div className='message-card-row-bottom-right'>
                    <Link to={`/explore/${props.item._id}`}>
                        <div className='message-card-row-bottom-img'>
                            <img src={props.item.imageUrl} />
                        </div>
                        <p>{props.item.name}</p>
                    </Link>
                </div>
            </div>
        </div>
    )
};

const MessagePage = () => {
    const dispatch = useDispatch();

    const [filter, setFilter] = useState("received");

    const offers = useSelector(state => state.offers.offers);
    const user = useSelector(state => state.auth.user);

    console.log("all offers", offers);
    
    useEffect(() => {
        dispatch(offerActions.getAllOffers())
    }, [])
    return (
        <>
            <div className="wrapper">
                <div className="message-container">
                    <div>
                        <h1>Messages</h1>
                    </div>
                    <div className="messages-content">
                        <div className='messages-filter'>
                            <button type="button" onClick={()=>setFilter("received")}>Received</button>
                            <button type="button" onClick={() => setFilter("sent")}>Sent</button>
                            <button type="button" onClick={() => setFilter("swapped")}>Swapped</button>
                        </div>
                        <div className="messages-list">
                            {offers?.filter((e) => {
                                if (filter === "sent") {
                                    return e.owner._id === user._id && e.status === "pending"
                                } else if (filter === "received") {
                                    return e.item.owner._id === user._id && e.status === "pending"
                                } else if (filter === "swapped") {
                                    return e.status === "success" && e.item.newOwner === user._id ||
                                        e.status === "success" && e.item.owner === user._id
                                }
                            }).map((e) => {
                                return (
                                    <Messages key={e._id} {...e} offerId={e._id} {...user} filter={filter}/>
                                    // <p>{e.item.owner?.name}</p>
                                )
                            })}
                        </div>

                    </div>


                </div>
            </div>
        </>
    )
};

export default MessagePage
