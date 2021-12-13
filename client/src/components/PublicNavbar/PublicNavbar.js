import React, { useEffect, useState } from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import "./style.scss"
import PublicDropdown from '../PublicDropdown/PublicDropdown';
import PublicButton from '../PublicButton/PublicButton';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/actions/auth.actions';
import { itemActions } from '../../redux/actions/item.actions';

const Avatar = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <a href="#" className='avatar' onClick={() => setOpen(!open)}>
        <img src={props.url} />
      </a>
      {open && <DropdownMenu />}

    </li>
  
  )
};

const DropdownMenu = () => {
  const dispatch = useDispatch();
  
   const handleLogout = () => {
     dispatch(authActions.logout());
   };
  const user = useSelector(state => state.auth.user);

  return (
    <div className='dropdown'>
      <Link className='dropdown-link' to={`/${user.displayName}`}>My Profile</Link>
      <Link className='dropdown-link' to={`/${user.displayName}/messages`}>Messages</Link>
      <Link className='dropdown-link' to="/membership">Membership</Link>
      <hr></hr>
      <button className='logout-btn' onClick={handleLogout}>Log Out</button>
      </div>
  )
};

const PublicNavbar = () => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  
  const { loading, isAuthenticated, accessToken } = useSelector((state) => state.auth);
  const user = useSelector(state => state.auth.user);

  const closeMobileMenu = () => setClick(false);

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(itemActions.getAllItems({ query: query }))
    navigate('/explore')
  };
  
  const handleSearch = (e) => {
    setQuery(e.target.value)
  };

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
            <form onSubmit={handleSearchSubmit}>
              <input className='searchbox' onChange={handleSearch}/>
            </form>
          </li>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link>
          </li>
          <li className='nav-item' onClick={() => setOpen(!open)}
          >
            <Link to="/explore" className="nav-links" onClick={closeMobileMenu}>
              Explore
            </Link>
          </li>
          {!loading && <>{isAuthenticated ?
            <li className='nav-item'>
              <Avatar url={user.avatarUrl} />
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
