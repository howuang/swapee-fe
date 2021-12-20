import React from 'react'
import './style.scss'

const Footer = () => {
    return (
        <>
            <footer className="footer-menu">
                <div className='footer-left'>
                    <ul>
                        <li>
                            <a href="#">Sustainability</a>
                        </li>
                        <li>
                            <a href="#">Blog</a>
                        </li>
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Swap on Swapee</a>
                        </li>
                        <li>
                            <a href="#">Community</a>
                        </li>
                        <li>
                            <a href="#">Jobs</a>
                        </li>
                        <li>
                            <a href="#">News</a>
                        </li>
                        <li>
                            <a href="#">Events</a>
                        </li>
                        <li>
                            <a href="#">Support</a>
                        </li>
                        <li>
                            <a href="#">Terms</a>
                        </li>
                        <li>
                            <a href="#">Privacy</a>
                        </li>
                        <li>
                            <a href="#">Safety</a>
                        </li>
                        <li>
                            <a href="#">Sitemap</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-right">
                    <a><i className="fab fa-facebook" /></a>
                    <a><i className="fab fa-instagram"/></a>
                </div>
            </footer>
        </>
    )
};

export default Footer
