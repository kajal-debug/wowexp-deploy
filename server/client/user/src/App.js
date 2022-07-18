import React, {useEffect} from 'react';
import './App.css';
import Navbar from "./layout/components/navbar/Navbar";
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import UserRegister from "./modules/users/UserRegister";
import UserLogin from "./modules/users/UserLogin";
import Alert from "./layout/util/alert/Alert";
import * as userActions from './redux/users/user.actions';
import {useDispatch} from "react-redux";


let App = () => {
    let dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem(process.env.REACT_APP_LOGIN_TOKEN)){
            dispatch(userActions.getUserInfo());
        }
    }, []);

  return (
    <React.Fragment>
      <Router>
          <Alert/>
          <Navbar/>
          <Switch>
              <Route exact path="/users/register" component={UserRegister}/>
              <Route exact path="/users/login" component={UserLogin}/>
          </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
