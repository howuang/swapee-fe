import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Items from '../../components/Items/Items';
import { authActions } from '../../redux/actions/auth.actions';
import { itemActions } from '../../redux/actions/item.actions';
import './style.scss'

const DetailPage = () => {
    const [swapPopup, setSwapPopup] = useState(false);
    const [updatePopup, setUpdatePopup] = useState(false);
    const [itemInfo, setItemInfo] = useState({
        name: "",
        category: "",
        description: "",
        condition: "",
        imageUrl: "",
    });
    const [swapOfferMessage, setSwapOfferMessage] = useState("");
    const [itemOffers, setItemOffers] = useState([]);
    const [chosenItems, setChosenItems] = useState([]);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const itemId = params.id;

    const productPhoto = window.cloudinary.createUploadWidget({
        cloudName: 'hoangnguyen',
        uploadPreset: 'panther'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
            setItemInfo({ ...itemInfo, imageUrl: result.info.url })
        }
    });
  
    // open profile photo upload widget
    const handleProductPhoto = () => {
        productPhoto.open();
    };

    const item = useSelector(state => state.items.singleItem);
    const user = useSelector(state => state.auth.user);
    const items = useSelector(state => state.items.items);
    const ownItems = useSelector(state => state.items.ownItems);
    // console.log(("item owner id", item.owner._id))

    const handleItemInfo = (e) => {
        setItemInfo({ ...itemInfo, [e.target.name]: e.target.value })
    };
    
    const handleUpdateItem = (e) => {
        e.preventDefault();
        dispatch(itemActions.updateItem({ ...itemInfo }, item._id))
    };
    
    const handleSwapOfferMessage = (e) => {
        setSwapOfferMessage(e.target.value)
    };

    const handleItemOffers = (x) => {
        console.log("item", x)
        if (itemOffers.length === 0) {
            setItemOffers([...itemOffers, x._id])
            setChosenItems([...chosenItems, x.name])
        } else if (itemOffers.length >= 1) {
            itemOffers.map((e) => {
                if (e === x._id) {
                    const newArray = itemOffers.filter((item) => item !== x._id)
                    setItemOffers(newArray)
                    const newArr = chosenItems.filter((item)=>item !==x.name)
                    setChosenItems(newArr)
                } else {
                    setItemOffers([...itemOffers, x._id])
                    setChosenItems([...chosenItems, x.name])
                }
            })
        }
    };

    // console.log("item offers", itemOffers);
    console.log("chosen items", chosenItems)

    const handleCreateOffer = (e) => {
        e.preventDefault();
        dispatch(itemActions.createOffer(itemOffers, swapOfferMessage, itemId));
        setSwapPopup(!swapPopup)
    };

    const handleDeleteItem = () => {
        dispatch(itemActions.deleteItem(item._id, user._id))
        navigate(`/${user.displayName}`)
    }

    useEffect(() => {
        dispatch(authActions.getCurrentUser());
    }, []);
    
    useEffect(() => {
        dispatch(itemActions.getSingleItem(itemId));
    }, [itemId]);

    useEffect(() => {
        dispatch(itemActions.getAllItems(null, 10, 1, null, null, item.category));
    }, [item.category]);

    useEffect(() => {
        dispatch(itemActions.getOwnItems())
    }, [user])

    return (
        <>
            <div className="wrapper">
                <div className="content">
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
                            <div className="item-info">
                                {item.isSwapped === "true" ? <button className='item-btn-gone'>Gone</button> : <>
                                    {item.owner?._id !== undefined && item.owner?._id === user._id ?
                                        <div className='item-btns'>

                                            <button className='item-btn' onClick={() => setUpdatePopup(!updatePopup)}>Update Item</button>
                                            <button className='item-btn' onClick={handleDeleteItem}>Delete Item</button>
                                        </div>
                                        : <button onClick={() => setSwapPopup(!swapPopup)} className='item-btn-swap'>Swap request</button>}
                                </>}
                                {/* {item.owner?._id !== undefined && item.owner?._id === user._id ?
                                    <div className='item-btns'>
                                        {item.isSwapped === "true " ? <button className='item-btn-gone'>Gone</button> : 
                                            <button className='item-btn' onClick={() => setUpdatePopup(!updatePopup)}>Update Item</button>
                                        }
                                    </div> : <div>
                                        {item.isSwapped === "true" ? <button className='item-btn-gone'>Gone</button> : <button onClick={() => setSwapPopup(!swapPopup)} className='item-btn-swap'>Swap request</button>}
                                    </div>} */}
                                {updatePopup &&
                                    <div className='item-popup'>
                                        <button onClick={() => setUpdatePopup(!updatePopup)}><id className='fas fa-times' /></button>
                                        <button onClick={handleProductPhoto}>Item photo</button>
                                        <form onSubmit={handleUpdateItem}>
                                            <div className='form-inputs'>
                                                <label htmlFor="name" className='form-label'>
                                                    Name
                                                </label>
                                                <input
                                                    type='text'
                                                    name='name'
                                                    className='form-input'
                                                    onChange={handleItemInfo}
                                                />
                                            </div>
                                            <div className='form-inputs'>
                                                <label htmlFor="category" className='form-label'>
                                                    Category
                                                </label>
                                                <select name="category" id="category" onChange={handleItemInfo}>
                                                    <option selected>Choose category</option>
                                                    <option value="clothing">Clothing</option>
                                                    <option value="furniture">Furniture</option>
                                                    <option value="electronics">Electronics</option>
                                                    <option value="books">Books</option>
                                                </select>
                                            </div>
                                            <div className='form-inputs'>
                                                <label htmlFor="description" className='form-label'>
                                                    Description
                                                </label>
                                                <textarea
                                                    type='text'
                                                    name='description'
                                                    className='form-input'
                                                    onChange={handleItemInfo}
                                                />
                                            </div>
                                            <div className='form-inputs'>
                                                <label htmlFor="condition" className='form-label'>
                                                    Condition
                                                </label>
                                                <input
                                                    type='text'
                                                    name='condition'
                                                    className='form-input'
                                                    onChange={handleItemInfo}
                                                />
                                            </div>
                                            <button type='submit'>Update Item</button>
                                        </form>
                                    </div>}
                                {swapPopup &&
                                    <div className='swap-popup'>
                                        <button className='swap-popup-btn' onClick={() => setSwapPopup(!swapPopup)}>Cancel</button>
                                        <form onSubmit={handleCreateOffer}>
                                            {ownItems &&
                                                <div className='user-item'>
                                                    {ownItems.filter((e) => e.isSwapped === "false").map((e) => {
                                                        return (
                                                            <button key={e._id} onClick={() => handleItemOffers(e)} className='user-item-card' type='button'>
                                                                <img className='user-item-card-img' src={e.imageUrl} />
                                                            </button>
                                                        )
                                                    })}
                                                </div>}
                                            {itemOffers.length >= 1 ?
                                                < div >
                                                    <p>Chosen Items:</p>
                                                    {chosenItems.map((e) => {
                                                        console.log("item name", e)
                                                        return (
                                                            <p><small>{e}</small></p>
                                                        )
                                                    })}
                                                </div>
                                                :
                                                null
                                            }
                                            <div className='form-inputs'>
                                                <label htmlFor="message" className='form-label'>
                                                    Message:
                                                </label>
                                                <textarea
                                                    type='text'
                                                    name='message'
                                                    className='form-input'
                                                    onChange={handleSwapOfferMessage}
                                                />
                                            </div>
                                            <button className='swap-popup-btn' type="submit">Let's swap</button>
                                        </form>
                                    </div>}
                            
                            
                                <div className="item-info">
                                    <h4>{item.name}</h4>
                                    <p>{item.description}</p>
                                    <div className="item-info-details">
                                        <p>Category:</p>
                                        <p>{item.category}</p>
                                    </div>
                                    <div className="item-info-details">

                                        <p>Condition:</p>
                                        <p>{item.condition}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='extra-items'>
                        <h4>More things you might like</h4>
                        <div className='extra-items-list'>
                            {items.filter((e) => e.isSwapped === "false" && e.owner?._id !== user._id).map((e) => {
                                return <Items key={e._id} {...e} />
                    
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};


export default DetailPage
