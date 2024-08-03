import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={() => <Login />} />
          <Route path='/home' exact component={() => <Home />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
