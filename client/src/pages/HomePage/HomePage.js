import React from 'react'
import { Link } from 'react-router-dom';
import PublicNavbar from '../../components/PublicNavbar/PublicNavbar'
import "./style.scss"

const HomePage = () => {
    return (
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
    )
};

export default HomePage
