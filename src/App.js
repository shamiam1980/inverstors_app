import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import "./App.css";

const App = () => {
  const [screenLoading, setScreenLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.location.pathname.replace(/\/+$/, "").length === 0) {
      setScreenLoading(true);
      setTimeout(() => {
        setScreenLoading(false);
        setLoaded(true);
      }, 6000);
    }
  }, []);

  return (
    <div className='App'>
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
