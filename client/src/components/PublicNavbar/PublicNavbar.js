import React, { useEffect, useState } from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import "./style.scss"
import PublicDropdown from '../PublicDropdown/PublicDropdown';
import PublicButton from '../PublicButton/PublicButton';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/actions/auth.actions';

const PublicNavbar = () => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false)
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false)
    } else {
      setDropdown(false);
    }
  };

  const { loading, isAuthenticated, accessToken } = useSelector((state) => state.auth);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(authActions.getCurrentUser());
  }, []);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          SWAPEE
        </Link>
        <div className="menu-icon">
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link>
          </li>
          <li className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link to='/explore' className='nav-links' onClick={closeMobileMenu}>
              Explore <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <PublicDropdown />}
          </li>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>Contact</Link>
          </li>
          {!loading && <>{isAuthenticated ?
            <li className='nav-item'>
              <Link to={`/${user.displayName}`} className='nav-links'>{user.name}</Link>
            </li>
            :
            <PublicButton />
          }
          </>}
        </ul>
      </nav>
    </>
  )
};

export default PublicNavbar
