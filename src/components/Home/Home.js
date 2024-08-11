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
          <div className='home-section home-section-1'>البيانات</div>
          <div className='home-title'>حساب الأرباح</div>
          <div className='home-section home-section-2'>البيانات</div>
        </div>
      </Container>
      <div></div>
    </div>
  );
};

export default Home;
