import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className='home wrapper'>
      الصفحة الرئيسية
      <div>
        <NavLink
          to='/'
          exact
          className='login-navlink'
          title='To Login'
          activeStyle={{ color: "#f7f7f7", fontWeight: "bold" }}>
          عودة
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
