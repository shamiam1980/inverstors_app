import React from "react";
import { NavLink } from "react-router-dom";
import AlAqsa from "../../images/al-aqsa-min.png";
import "./Login.css";

const Login = () => {
  return (
    <div>
      {/* <div className='login-al-aqsa-wrapper'>
        <img className='login-al-aqsa' src={AlAqsa} alt='al-aqsa-qibly' />
      </div> */}
      <div className='login wrapper'>
        <div className='login-svg-wrapper'>
          <div className='login-al-aqsa-wrapper'>
            <div className='login-content'>
              تسجيل الدخول
              <div>
                <NavLink
                  to='/home'
                  exact
                  className='home-navlink'
                  title='To Home'
                  activeStyle={{ color: "#f7f7f7", fontWeight: "bold" }}>
                  دخول
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
