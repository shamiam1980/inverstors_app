import React from "react";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

const Home = () => {
  return (
    <div className='home wrapper'>
      <div className='qobba wrapper'> </div>
      <Navbar />
      <Container fluid='xxl'>
        <div className='home-content'>
          <div className='home-title'>رأس المال ونوع الاستثمار</div>
        </div>
      </Container>
      <div>
        {/* <NavLink
            to='/'
            exact
            className='login-navlink'
            title='To Login'
            activeStyle={{ color: "#f7f7f7", fontWeight: "bold" }}>
            تسجيل خروج
          </NavLink> */}
      </div>
    </div>
  );
};

export default Home;
