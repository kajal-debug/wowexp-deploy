import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import * as userActions from '../../../redux/users/user.actions';
import * as userReducer from '../../../redux/users/user.reducers';
import * as userUtil from '../../util/userUtil';

let Navbar = () => {
    let dispatch = useDispatch();

   // let {cartItems} = orderInfo;

    let userInfo = useSelector((state) => {
        return state[userReducer.userFeatureKey];
    });

    let {isAuthenticated , user} = userInfo;

    let clickLogOut = () => {
        dispatch(userActions.logOutUser());
    };

    let isLoggedIn = () => {
        return userUtil.isLoggedIn();
    };

    let afterLogin = (
       <React.Fragment>
           <li className="nav-item">
               <Link to="/users/profile" className="nav-link">
                  <img src={user.avatar} alt="" width="25" height="25" className="rounded-circle"/> {user.name}</Link>
           </li>
           <li className="nav-item">
               <Link to="/" className="nav-link" onClick={clickLogOut}>
                  <i className="fa fa-sign-out-alt"/> LogOut</Link>
           </li>
       </React.Fragment>
    );

    let beforeLogin = (
        <React.Fragment>
            <li className="nav-item">
                <Link to="/users/register" className="nav-link">Register</Link>
            </li>
            <li className="nav-item">
                <Link to="/users/login" className="nav-link">Login</Link>
            </li>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="container">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            {
                                isLoggedIn() ? afterLogin : beforeLogin
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
};
export default Navbar;