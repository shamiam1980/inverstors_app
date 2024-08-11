import React from "react";
import "./Card.css";

const Login = (props) => {
  return (
    <div id='home-card' className='flex-it'>
      <div className='home-card-icon-wrapper flex-it'>
        <div className='home-card-icon'>{props.icon}</div>
      </div>
      <div className='col'>
        <div className='row home-card-title'>{props.title}</div>
        <div className='row home-card-value eng-text'>{props.titleValue}</div>
      </div>
    </div>
  );
};

export default Login;
