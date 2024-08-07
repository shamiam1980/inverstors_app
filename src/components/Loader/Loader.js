import React from "react";
import LoaderAnim1 from "./LoaderAnim1";
import LoaderAnim2 from "./LoaderAnim2";
import "./Loader.css";

const Login = () => {
  let randomize = (myArray) => {
    return myArray[Math.floor(Math.random() * myArray.length)];
  };

  let arr = [<LoaderAnim1 />, <LoaderAnim2 />];

  return (
    <div className='loader-wrapper'>
      <div className='login wrapper'>{randomize(arr)}</div>
    </div>
  );
};

export default Login;
