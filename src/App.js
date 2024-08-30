import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import "./App.css";
import BGImage from "../src/images/bg-space-desktop.png";

const App = () => {
  const [screenLoading, setScreenLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  useEffect(() => {
    let img = new Image();
    img.src = BGImage;
  }, [imageIsLoaded]);

  useEffect(() => {
    if (imageIsLoaded) {
      if (window.location.pathname.replace(/\/+$/, "").length === 0) {
        setScreenLoading(true);
        setTimeout(() => {
          setScreenLoading(false);
          setLoaded(true);
        }, 6500);
      } else {
        setLoaded(true);
      }
    }
  }, [imageIsLoaded]);

  return (
    <div className='App'>
      <img
        id='app-bg-img'
        src={BGImage}
        onLoad={() => setImageIsLoaded(true)}
        style={{ display: imageIsLoaded ? "inline-block" : "none" }}
      />
      {screenLoading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Switch>
            {loaded && <Route path='/' exact component={() => <Login />} />}
            <Route path='/home' exact component={() => <Home />} />
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
