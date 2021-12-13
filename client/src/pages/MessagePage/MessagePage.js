import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { offerActions } from '../../redux/actions/offer.actions';
import './style.scss'

const Messages = (props) => {
    return (
        <div className='message-card'>
            <div className='message-card-row'>
                <div className='message-card-sender'>
                    <div className='message-card-avatar'>
                        <img src={props.owner?.avatarUrl} />
                    </div>
                    <div className='message-card-sender-info'>
                        <h4>{props.owner?.name}</h4>
                        <p>{props.owner?.email}</p>
                    </div>
                </div>
                <div className="message-card-btns">
                    <button>Accpept</button>
                    <button>Deny</button>
                </div>
            </div>
            <hr></hr>
            <div className='message-card-row'>
                <div className='message-card-row-left'>
                    <div className='message-card-item'>

                        <img src={props.item.imageUrl} />
                    </div>
                    <p>{props.item.name}</p>
                </div>
                <p>{props.message}</p>
                <div>
                    <div className='message-card-item'>
                        <img src={props.itemOffer.imageUrl} />
                    </div>
                    <p>{props.itemOffer.name}</p>
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
    console.log("user Id", user._id)
    console.log("offers", offers)

    console.log(offers.filter((e) => { return e.owner._id === user._id; }));
    
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
                            {offers.filter((e) => {
                                if (filter === "sent") {
                                    return e.owner._id === user._id
                                } else if (filter === "received") {
                                    return e.item.owner._id === user._id
                                } else if (filter === "swapped") {
                                    return e.status === "success" && e.owner._id === user._id
                                }
                            }).map((e) => {
                                return (
                                    <Messages key={e._id} {...e} {...user}/>
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
