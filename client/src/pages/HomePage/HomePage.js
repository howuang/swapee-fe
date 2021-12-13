import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Items from '../../components/Items/Items';
import { itemActions } from '../../redux/actions/item.actions';
import "./style.scss"

const HomePage = () => {
    const dispatch = useDispatch();

    const items = useSelector((state) => state.items.items);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(itemActions.getAllItems(null, 5, 1, null, +1, null));
    }, []);

    return (
        <>
            <div className='wrapper'>
                <div className='hero'>
                    <h1>Looking for things to swap today?</h1>
                    <Link to='/explore'>
                        <button className='explore-btn'>Explore Now</button>
                    </Link>
                </div>
                <section>
                    <div className='intro'>
                        <h1>
                            What is Swapee?
                        </h1>
                        <p>
                            Swapee is the marketplace app where the next generation come to discover and swap unique items. 
                            With the sustainable living on the rise, swapping used items instead of buying new products means less clutter in life and less waste to the evnironment.

                        </p>

                    </div>
                    <div className='intro-img'>
                        <img src='https://i.pinimg.com/originals/ba/7c/d4/ba7cd455dcc0afeeaa5d20c6d4b8e72e.jpg'/>
                    </div>
                </section>
                <section className="home-products">
                    <h3>
                        Things we love
                    </h3>
                    <div className="home-products-bar">
                        
                        <div className="home-items">
                            {items.filter((e) => e.isSwapped === "false" && e.owner?._id !== user._id).map((e) => {
                                return <Items key={e._id} {...e} />
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
};

export default HomePage
