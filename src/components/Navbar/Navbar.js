import React, { useState, useEffect, useRef, Fragment } from "react";
import { useHistory } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import LoginFormIcon from "../../images/login-form-icon.png";
import baseURL from "../../baseURL";
import "./Navbar.css";
// import logo from "../../images/logo.png";

const AppNavbar = (props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const sideNavRef = useRef(null);

  const isMobileNav = useMediaQuery({ maxWidth: 992 });
  const isSmlMobile = useMediaQuery({ maxWidth: 470 });

  const history = useHistory();

  let arabicChars = /[\u0600-\u06FF]/;

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

  const handleLogout = () => {
    const url = new URL("./logout", baseURL);

    fetch(url, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
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

  const JSXAraNum = (
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
      <span className='nav-item-text'>{`تحويل إلى  "${
        props.isAraNum ? "الأرقام العربية الحقيقية" : "ما يعرف بالأرقام العربية"
      }"`}</span>
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
            <span
              className={`nav-username-name ${
                !arabicChars.test(props.userFullName) && "eng-text rtl pb-1"
              }`}>
              {props.userFullName}
            </span>
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
            <Nav.Item className='nav-item-ara-nums'>
              <Nav.Link
                onClick={() => (
                  props.setIsAraNum(!props.isAraNum),
                  props.setShowAraNumInfo(true)
                )}>
                {JSXAraNum}
              </Nav.Link>
              {props.showAraNumInfo && (
                <span
                  className='home-card-info-icon desktop'
                  onClick={props.openOriginOfNumsModal}>
                  <svg
                    width='30'
                    height='31'
                    viewBox='0 0 30 31'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M14.0644 14.5625C14.0644 14.3139 14.1631 14.0754 14.339 13.8996C14.5148 13.7238 14.7532 13.625 15.0019 13.625C15.2505 13.625 15.489 13.7238 15.6648 13.8996C15.8406 14.0754 15.9394 14.3139 15.9394 14.5625V20.1875C15.9394 20.4361 15.8406 20.6746 15.6648 20.8504C15.489 21.0262 15.2505 21.125 15.0019 21.125C14.7532 21.125 14.5148 21.0262 14.339 20.8504C14.1631 20.6746 14.0644 20.4361 14.0644 20.1875V14.5625ZM13.5956 10.8125C13.5956 11.1852 13.7437 11.5427 14.0072 11.8062C14.2708 12.0698 14.6282 12.2178 15.0009 12.2178C15.3736 12.2178 15.7311 12.0698 15.9946 11.8062C16.2582 11.5427 16.4062 11.1852 16.4062 10.8125C16.4062 10.44 16.2583 10.0828 15.9949 9.81946C15.7315 9.55609 15.3743 9.40812 15.0019 9.40812C14.6294 9.40812 14.2722 9.55609 14.0088 9.81946C13.7455 10.0828 13.5956 10.44 13.5956 10.8125ZM15 2.375C18.481 2.375 21.8194 3.75781 24.2808 6.21922C26.7422 8.68064 28.125 12.019 28.125 15.5C28.125 18.981 26.7422 22.3194 24.2808 24.7808C21.8194 27.2422 18.481 28.625 15 28.625C11.519 28.625 8.18064 27.2422 5.71922 24.7808C3.25781 22.3194 1.875 18.981 1.875 15.5C1.875 12.019 3.25781 8.68064 5.71922 6.21922C8.18064 3.75781 11.519 2.375 15 2.375ZM26.25 15.5C26.25 14.0226 25.959 12.5597 25.3936 11.1948C24.8283 9.8299 23.9996 8.58971 22.955 7.54505C21.9103 6.50039 20.6701 5.67172 19.3052 5.10636C17.9403 4.54099 16.4774 4.25 15 4.25C13.5226 4.25 12.0597 4.54099 10.6948 5.10636C9.3299 5.67172 8.08971 6.50039 7.04505 7.54505C6.00039 8.58971 5.17172 9.8299 4.60636 11.1948C4.04099 12.5597 3.75 14.0226 3.75 15.5C3.75 18.4837 4.93526 21.3452 7.04505 23.455C9.15483 25.5647 12.0163 26.75 15 26.75C17.9837 26.75 20.8452 25.5647 22.955 23.455C25.0647 21.3452 26.25 18.4837 26.25 15.5Z'
                      fill='black'
                    />
                  </svg>
                </span>
              )}
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={handleLogout}
                className='nav-link nav-link-custom'>
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
              {isMobileNav && (
                <Nav.Item className='noclick'>
                  <Nav.Link disabled>
                    <div className='nav-username-mobile'>
                      <span className='nav-username-text'>أهلاً</span>{" "}
                      <span
                        className={`nav-username-name ${
                          !arabicChars.test(props.userFullName) &&
                          "eng-text rtl pb-1"
                        }`}>
                        {props.userFullName}
                      </span>
                      <span className='nav-username-text'>,</span>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              )}
              <Nav.Item>
                <Nav.Link
                  onClick={() => (
                    isMobileNav
                      ? props.handleOpenSupportModalMobile()
                      : props.handleOpenSupportModal(),
                    closeNav()
                  )}>
                  {JSXSupport}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => (
                    props.setIsAraNum(!props.isAraNum),
                    closeNav(),
                    setTimeout(() => {
                      props.setShowAraNumInfo(true);
                    }, 300)
                  )}>
                  {JSXAraNum}
                </Nav.Link>
              </Nav.Item>
              {props.showAraNumInfo && (
                <Nav.Item id='origin-of-numbers-mobile'>
                  <Nav.Link
                    onClick={() => (
                      closeNav(),
                      setTimeout(() => {
                        props.openOriginOfNumsModal();
                      }, 300)
                    )}>
                    <span className='home-card-info-icon'>
                      <svg
                        width='30'
                        height='31'
                        viewBox='0 0 30 31'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M14.0644 14.5625C14.0644 14.3139 14.1631 14.0754 14.339 13.8996C14.5148 13.7238 14.7532 13.625 15.0019 13.625C15.2505 13.625 15.489 13.7238 15.6648 13.8996C15.8406 14.0754 15.9394 14.3139 15.9394 14.5625V20.1875C15.9394 20.4361 15.8406 20.6746 15.6648 20.8504C15.489 21.0262 15.2505 21.125 15.0019 21.125C14.7532 21.125 14.5148 21.0262 14.339 20.8504C14.1631 20.6746 14.0644 20.4361 14.0644 20.1875V14.5625ZM13.5956 10.8125C13.5956 11.1852 13.7437 11.5427 14.0072 11.8062C14.2708 12.0698 14.6282 12.2178 15.0009 12.2178C15.3736 12.2178 15.7311 12.0698 15.9946 11.8062C16.2582 11.5427 16.4062 11.1852 16.4062 10.8125C16.4062 10.44 16.2583 10.0828 15.9949 9.81946C15.7315 9.55609 15.3743 9.40812 15.0019 9.40812C14.6294 9.40812 14.2722 9.55609 14.0088 9.81946C13.7455 10.0828 13.5956 10.44 13.5956 10.8125ZM15 2.375C18.481 2.375 21.8194 3.75781 24.2808 6.21922C26.7422 8.68064 28.125 12.019 28.125 15.5C28.125 18.981 26.7422 22.3194 24.2808 24.7808C21.8194 27.2422 18.481 28.625 15 28.625C11.519 28.625 8.18064 27.2422 5.71922 24.7808C3.25781 22.3194 1.875 18.981 1.875 15.5C1.875 12.019 3.25781 8.68064 5.71922 6.21922C8.18064 3.75781 11.519 2.375 15 2.375ZM26.25 15.5C26.25 14.0226 25.959 12.5597 25.3936 11.1948C24.8283 9.8299 23.9996 8.58971 22.955 7.54505C21.9103 6.50039 20.6701 5.67172 19.3052 5.10636C17.9403 4.54099 16.4774 4.25 15 4.25C13.5226 4.25 12.0597 4.54099 10.6948 5.10636C9.3299 5.67172 8.08971 6.50039 7.04505 7.54505C6.00039 8.58971 5.17172 9.8299 4.60636 11.1948C4.04099 12.5597 3.75 14.0226 3.75 15.5C3.75 18.4837 4.93526 21.3452 7.04505 23.455C9.15483 25.5647 12.0163 26.75 15 26.75C17.9837 26.75 20.8452 25.5647 22.955 23.455C25.0647 21.3452 26.25 18.4837 26.25 15.5Z'
                          fill='black'
                        />
                      </svg>
                    </span>
                    <span className='origin-of-numbers-mobile-title'>
                      هل الأرقام العربية هي هندية حقاً؟ وهل الأرقام الإنجليزية
                      هي عربية حقاً؟
                    </span>
                  </Nav.Link>
                </Nav.Item>
              )}
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
