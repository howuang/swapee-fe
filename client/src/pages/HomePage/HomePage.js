import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import PublicNavbar from '../../components/PublicNavbar/PublicNavbar'
import { itemActions } from '../../redux/actions/item.actions';
import "./style.scss"

const HomePage = () => {
    const dispatch = useDispatch();

    const items = useSelector((state) => state.items.items);

    useEffect(() => {
        dispatch(itemActions.getAllItems());
    }, []);
    return (
        <>
            <PublicNavbar/>
        <div className='wrapper'>
            <div className='hero'>
                <h1>Looking for things to swap today?</h1>
                <Link to='/explore'>
                    <button className='explore-btn'>Explore Now</button>
                </Link>
            </div>
            <section>
                <div>
                    <h1>
                        What is Swapee?
                    </h1>
                    <p>

                    </p>

                </div>
                <div>
                    <img />
                </div>
            </section>
            <section>
                <div>
                    <h3>
                        Things we love
                    </h3>
                </div>
                <div>
                    product cards
                </div>
            </section>


            This is Home Page
            </div>
            <Footer/>
        </>
    )
};

export default HomePage
