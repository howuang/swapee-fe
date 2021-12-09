import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Footer from '../../components/Footer/Footer';
import Items from '../../components/Items/Items';
import PublicNavbar from '../../components/PublicNavbar/PublicNavbar';
import { itemActions } from '../../redux/actions/item.actions';
import "./style.scss";

const ExplorePage = () => {
    const dispatch = useDispatch();

    const items = useSelector(state => state.items.items);
    console.log("items", items)

    useEffect(() => {
        dispatch(itemActions.getAllItems());
    }, []);

    return (
        <>
            <div className='explore-container'>
                <div className='explore-top'>
                    <p>
                        Looking for something to swap?
                    </p>
                    <p>
                        Try searching for an item or category to find your perfect match
                    </p>
                    <h3>
                        Browse for things we love
                    </h3>
                </div>
                <div className="explore-items">
                    {items.map((e) => {
                        return <Items key={e._id} {...e} />
                    
                    })}
                </div>
 
            </div>
        </>
    )
};

export default ExplorePage
