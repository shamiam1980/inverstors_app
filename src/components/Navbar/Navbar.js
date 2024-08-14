import React, { useState, useEffect, useRef, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "./Navbar.css";
// import logo from "../../images/logo.png";

const AppNavbar = (props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const sideNavRef = useRef(null);

  const isLargeMobile = useMediaQuery({ maxWidth: 992 });
  const isSmlMobile = useMediaQuery({ maxWidth: 470 });

  useEffect(() => {
    // Add event listener to the document object
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
      closeNav();
    }
  }

  const openNav = () => {
    setNavbarOpen(true);
  };

  const closeNav = () => {
    setNavbarOpen(false);
  };

  const JSXSupport = (
    <Fragment>
      <svg
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M15.75 15V3L1.5 9L15.75 15ZM14.25 12.75L5.3625 9L14.25 5.25V7.875L9.75 9L14.25 10.125V12.75ZM14.25 12.75V9V5.25V7.875V10.125V12.75Z'
          fill='#083937'
        />
      </svg>
      <span className='nav-item-text'>مساعدة؟</span>
    </Fragment>
  );

  const JSXLogout = (
    <Fragment>
      <svg
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M9.75 12V5.8875L11.7 7.8375L12.75 6.75L9 3L5.25 6.75L6.3 7.8375L8.25 5.8875V12H9.75ZM13.5 15C13.9125 15 14.2656 14.8531 14.5594 14.5594C14.8531 14.2656 15 13.9125 15 13.5V11.25H13.5V13.5H4.5V11.25H3V13.5C3 13.9125 3.14687 14.2656 3.44062 14.5594C3.73438 14.8531 4.0875 15 4.5 15H13.5Z'
          fill='#083937'
        />
      </svg>
      <span className='nav-item-text'>خروج</span>
    </Fragment>
  );

  return (
    <Navbar collapseOnSelect expand='lg' expanded={null} id='navbar'>
      <Container fluid='xxl'>
        <Navbar.Brand>
          <div className='nav-logo flex-it'>
            شعار
            <br />
            الشركة
          </div>
          <div className='nav-username'>
            <span className='nav-username-text'>أهلاً</span>{" "}
            <span className='nav-username-name'>هشام إبراهيم القرم</span>
            <span className='nav-username-text'>,</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle onClick={openNav} />
        <Navbar.Collapse>
          <Nav id='nav' className='me-auto flex-grow-1 justify-content-end'>
            <Nav.Item>
              <Nav.Link onClick={props.handleOpenSupportModal}>
                {JSXSupport}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to='/' as={Link} className='nav-link nav-link-custom'>
                {JSXLogout}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <nav className='navbar-mobile' aria-label='main navigation'>
        {/* drawer */}
        <div className='sidenav-wrapper level-left has-text-centered'>
          <div
            id='mySidenav'
            ref={sideNavRef}
            className={"sidenav " + (navbarOpen ? "opened" : "")}>
            {/* <a className='closebtn' onClick={() => closeNav()}>
              &times;
            </a> */}
            <Nav
              id='nav-mobile'
              className='me-auto flex-grow-1 justify-content-end'>
              {isLargeMobile && (
                <Nav.Item className='noclick'>
                  <Nav.Link disabled>
                    <div className='nav-username-mobile'>
                      <span className='nav-username-text'>أهلاً</span>{" "}
                      <span className='nav-username-name'>
                        هشام إبراهيم القرم
                      </span>
                      <span className='nav-username-text'>,</span>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              )}
              <Nav.Item>
                <Nav.Link
                  onClick={() => (props.handleOpenSupportModal(), closeNav())}>
                  {JSXSupport}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link to='/' as={Link} className='nav-link nav-link-custom'>
                  {JSXLogout}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </nav>
    </Navbar>
  );
};

export default AppNavbar;
