import React from 'react'
import './style.scss'

const MembershipPage = () => {
    return (
        <>
            <div className="wrapper">
                <div className="membership">
                    <div className='membership-card'>
                        <div className='membership-card-header'>
                            <h3>BASIC</h3>

                        </div>
                        <div className='membership-card-main'>

                        <h1>FREE</h1>
                        </div>
                        <div className='membership-card-contents'>

                            <ul>
                                <li>Access to 5 item listing</li>
                                <li>Able to make 1 swap requests per week</li>
                            </ul>
                        </div>
                    </div>
                    <div className='membership-card'>
                        <div className='membership-card-header'>
                            <h3>PRO</h3>
                        </div>
                        <div className='membership-card-main'>

                        <h1>$10</h1>
                        <p>/monthly</p>
                        </div>
                        <div className='membership-card-contents'>

                            <button>Upgrade</button>
                            <ul>
                                <li>Access to 10 item listings</li>
                                <li>Able to make 5 swap requests per week</li>
                                <li>Weekly Newsletter</li>
                            </ul>
                        </div>
                    </div>
                    <div className='membership-card'>
                        <div className='membership-card-header'>
                            <h3>PREMIUM</h3>
                        </div>
                        <div className='membership-card-main'>

                        <h1>$20</h1>
                        <p>/monthly</p>
                        </div>
                        <div className='membership-card-contents'>
                            <button>Upgrade</button>

                            <ul>
                                <li>Access to unlimited item listings</li>
                                <li>Able to make unlimited swap requests</li>
                                <li>Weekly Newsletter</li>
                                <li>Invitation to our events</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
};

export default MembershipPage
