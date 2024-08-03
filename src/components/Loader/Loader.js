import React from "react";
import PalestineDotsMap from "../../images/palestine-dots.svg";

import "./Loader.css";

const Login = () => {
  return (
    <div className='loader-wrapper'>
      <div className='login wrapper'>
        <div className='loader-palestine-map'>
          <img src={PalestineDotsMap} alt='palestine map in dots' />
        </div>
      </div>
    </div>
  );
};

export default Login;
