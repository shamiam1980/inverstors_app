import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className='home wrapper'>
      <div className='qobba wrapper'> </div>
      <div className='home-content'>
        الصفحة الرئيسية
        <div>
          <NavLink
            to='/'
            exact
            className='login-navlink'
            title='To Login'
            activeStyle={{ color: "#f7f7f7", fontWeight: "bold" }}>
            تسجيل خروج
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
