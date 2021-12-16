import React, { useEffect, useState } from 'react'
import './style.scss'
import StripeCheckout from 'react-stripe-checkout';
import { userActions } from '../../redux/actions/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/actions/auth.actions';
import { toast } from 'react-toastify';


const KEY = process.env.REACT_APP_STRIPE

const MembershipPage = () => {
    const dispatch = useDispatch();
    
    const [amount, setAmount] = useState(null);
    const [stripeToken, setStripeToken] = useState(null);

    const user = useSelector(state => state.auth.user);

    const onToken = (token) => {
        setStripeToken(token)
    };

    useEffect(() => {
        if (stripeToken && amount) {
            dispatch(userActions.upgradeMembership({ tokenId: stripeToken?.id, amount: amount }, user._id))
        }
    }, [stripeToken, amount]);


    useEffect(() => {
        dispatch(authActions.getCurrentUser());
    }, []);

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
                                <li>Able to have 2 pending swap requests.</li>
                                <li>Weekly Newsletter</li>
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
                            <StripeCheckout
                                name='Swapee'
                                description={`Your total is $10`}
                                amount={1000}
                                token={onToken}
                                stripeKey={KEY}
                            >
                                <button onClick={()=>setAmount(10)} >Upgrade</button>
                            </StripeCheckout>
                            <ul>
                                <li>Access to 10 item listings.</li>
                                <li>Able to have 5 pending swap requests.</li>
                                <li>Weekly Newsletter.</li>
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
                            <StripeCheckout
                                name='Swapee'
                                description={`Your total is $20`}
                                amount={2000}
                                token={onToken}
                                stripeKey={KEY}
                            >
                                <button onClick={() => setAmount(20)}>Upgrade</button>
                            </StripeCheckout>
                            <ul>
                                <li>Access to unlimited item listings.</li>
                                <li>Able to make unlimited swap requests.</li>
                                <li>Weekly Newsletter.</li>
                                <li>Invitation to our events.</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
};

export default MembershipPage;
