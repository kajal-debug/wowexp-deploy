import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as alertActions from '../../redux/alert/alert.actions';
import * as userActions from '../../redux/users/user.actions';
import {setAlert} from "../../redux/alert/alert.actions";
import Axios from "axios";

let UserRegister = () => {
    const[isAdmin,setisAdmin]=useState("")
    let dispatch = useDispatch();
    let history = useHistory();
    function data(){
        Axios.get(`${process.env.REACT_APP_EXPRESS_SERVER}/api/fetch_user`).then((response)=>{
        console.log("data from backend",response)
        response.data.data.map((item)=>{
         setisAdmin(item);
            console.log("item",item)
        })
       })}
       React.useEffect(()=>{
        data();
       },[])
       
      
    let [user , setUser] = useState({
        name : '',
        email : '',
        password : '',
        confirmPassword : ''
    });

    let [userError , setUserError] = useState({
        nameError : '',
        emailError : '',
        passwordError : '',
        confirmPasswordError : ''
    });

    let validateUsername = (event) => {
        setUser({...user , name : event.target.value});
        let regExp = /^[a-zA-Z0-9_]{4,16}$/;
        !regExp.test(event.target.value) ?
            setUserError({...userError , nameError: 'Enter a proper Username'})
            : setUserError({...userError , nameError: ''});
    }

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
            setUserError({...userError , passwordError: 'Enter a proper Password'})
            : setUserError({...userError , passwordError: ''});
    }

    let validateConfirmPassword = (event) => {
        setUser({...user , confirmPassword : event.target.value});
        (user.password !== event.target.value) ?
            setUserError({...userError , confirmPasswordError: 'Passwords Not Matched'})
            : setUserError({...userError , confirmPasswordError: ''});
    }

    let submitRegistration = (e) => {
        e.preventDefault();

        let {name , email , password , confirmPassword} = user;
        if(name !== '' && email !== '' && password !== '' && confirmPassword !== ''){
            dispatch(userActions.registerUser(user , history));
        }
        else{
            dispatch(setAlert('Please Fill in the Fields' , 'danger'));
        }
    };

    return (
        <React.Fragment>
             <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>
                                <i className="fa fa-user-cog"/> Register a User</h3>
                        </div>
                    </div>
                </div>
            </section>
            {isAdmin.isAdmin === true?
              <section> 
              <div className="container mt-3">
                  <div className="row">
                      <div className="col-md-4 m-auto">
                          <div className="card">
                              <div className="card-header bg-dark text-brown">
                                  <p className="h4">Register Here</p>
                              </div>
                              <div className="card-body bg-form-light">
                                  <form onSubmit={submitRegistration}>
                                      <div className="form-group">
                                          <input
                                              name="name"
                                              value={user.name}
                                              onChange={validateUsername}
                                              type="text" className={`form-control ${userError.nameError.length > 0 ? 'is-invalid' : ''}`} placeholder="Name"/>
                                          {userError.nameError.length > 0 ? <small className="text-danger">{userError.nameError}</small> : ''}
                                      </div>
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
                                      <div className="form-group">
                                          <input
                                              name="confirmPassword"
                                              value={user.confirmPassword}
                                              onChange={validateConfirmPassword}
                                              type="password" className={`form-control ${userError.confirmPasswordError.length > 0 ? 'is-invalid' : ''}`} placeholder="Confirm Password"/>
                                          {userError.confirmPasswordError.length > 0 ? <small className="text-danger">{userError.confirmPasswordError}</small> : ''}
                                      </div>
                                      <div>
                                          <input type="submit" className="btn btn-dark btn-sm text-brown" value="Register"/>
                                      </div>
                                  </form>
                                  <small>Already have an account ?
                                      <Link to="/users/login" className="font-weight-bold">{' '} Login</Link>
                                  </small>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
            :<div>You have Already an account as an admin</div>}
           
            {/*<pre>{JSON.stringify(user)}</pre>
            <pre>{JSON.stringify(userError)}</pre>*/}
          
        </React.Fragment>
    )
};
export default UserRegister;