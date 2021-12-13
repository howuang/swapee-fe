import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Items from '../../components/Items/Items';
import { itemActions } from '../../redux/actions/item.actions';
import "./style.scss";

const ExplorePage = () => {
    const [limit, setLimit] = useState(10);
    const [category, setCategory] = useState(null);
    const dispatch = useDispatch();

    const handleLimit = () => {
        setLimit(limit + 10);
    };

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    const items = useSelector(state => state.items.items);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(itemActions.getAllItems(null, limit, 1, null, null, category));
    }, [limit, category]);

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
                    <select name="category" id="category" onChange={handleCategory}>
                        <option selected value="" >Choose category</option>
                        <option value="clothing">Clothing</option>
                        <option value="furniture">Furniture</option>
                        <option value="electronics">Electronics</option>
                        <option value="books">Books</option>
                    </select>
                </div>
                <div className="explore-items">
                    <div className="explore-items-list">
                        {items.filter((e) => e.isSwapped === "false" && e.owner?._id !== user._id).map((e) => {
                            return <Items key={e._id} {...e} />
                    
                        })}
                    </div>
                    <button onClick={handleLimit}>Load More</button>
                </div>
 
            </div>
        </>
    )
};

export default ExplorePage
