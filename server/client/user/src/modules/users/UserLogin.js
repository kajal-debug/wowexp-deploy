import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch,connect} from "react-redux";
//import FacebookIcon from '@mui/icons-material/Facebook';
import * as userActions from "../../redux/users/user.actions";
import {setAlert} from "../../redux/alert/alert.actions";

let UserLogin = ({token}) => {
    let dispatch = useDispatch();
    let history = useHistory();

    let [user , setUser] = useState({
        email : '',
        password : '',
    });

    let [userError , setUserError] = useState({
        emailError : '',
        passwordError : '',
    });

    let validateEmail = (event) => {
        setUser({...user , email : event.target.value});
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !regExp.test(event.target.value) ?
            setUserError({...userError , emailError: 'Enter a proper Email'})
            : setUserError({...userError , emailError: ''});
    }

    let validatePassword = (event) => {
        setUser({...user , password : event.target.value});
        let regExp = /^[A-Za-z]\w{7,14}$/;
        !regExp.test(event.target.value) ?
        setUserError({...userError , passwordError: ''}):
            setUserError({...userError , passwordError: 'Enter a proper Password'})
            
    }

    let submitLogin = (e) => {
        e.preventDefault();

        let {email , password} = user;
        if(email !== '' && password !== ''){
            dispatch(userActions.loginUser(user))
            history.push("/users/register")
            window.location.href="http://localhost:2002/"
        }
        else{
            dispatch(setAlert('Please Fill in the Fields' , 'danger'));
        }
       
    };
    console.log("token after login",token)

    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>
                                <i className="fa fa-sign-in-alt"/> Login a User</h3>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-4 m-auto">
                            <div className="card">
                                <div className="card-header bg-dark text-brown">
                                    <p className="h4">Login Here</p>
                                </div>
                                <div className="card-body bg-form-light">
                                    <form onSubmit={submitLogin}>
                                        <div className="form-group">
                                            <input
                                                name="email"
                                                value={user.email}
                                                onChange={validateEmail}
                                                type="email" className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : ''}`} placeholder="Email"/>
                                            {userError.emailError.length > 0 ? <small className="text-danger">{userError.emailError}</small> : ''}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="password"
                                                value={user.password}
                                                onChange={validatePassword}
                                                type="password" className={`form-control ${userError.passwordError.length > 0 ? 'is-invalid' : ''}`} placeholder="Password"/>
                                            {userError.passwordError.length > 0 ? <small className="text-danger">{userError.passwordError}</small> : ''}
                                        </div>
                                        <div>
                                            {console.log(token,"token after login")}
                                            <input type="submit" className="btn btn-dark btn-sm text-brown" value="Login"/>
                                        </div>
                                    </form>
                                    <small>Don't have an account ?
                                        <Link to="/users/register" className="font-weight-bold">{' '} Register</Link>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
const mapStateToProps = (store) => {
  console.log("store",store ,"token",store.users.token)
  return{
    token:store.users.token
  }
  };
export default connect(mapStateToProps) (UserLogin);