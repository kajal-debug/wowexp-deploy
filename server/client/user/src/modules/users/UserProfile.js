import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as userActions from '../../redux/users/user.actions';
import * as userReducer from '../../redux/users/user.reducers';
import Spinner from "../../layout/util/spinner/Spinner";

let UserProfile = () => {
    let dispatch = useDispatch();

    let [enableAddress , setEnableAddress] = useState(false);

    // Get User Info from the REDUX Store
    let userInfo = useSelector((state) => {
        return state[userReducer.userFeatureKey]
    });

    let {loading , user} = userInfo;

    let [address , setAddress] = useState({
        flat : '',
        street : '',
        landmark : '',
        city : '',
        state : '',
        country : '',
        pin : '',
        mobile : ''
    });

    useEffect(() => {
        setAddress({
            flat : user && user.address ? user.address.flat : '',
            street : user && user.address ? user.address.street : '',
            landmark : user && user.address ? user.address.landmark : '',
            city : user && user.address ? user.address.city : '',
            state : user && user.address ? user.address.state : '',
            country : user && user.address ? user.address.country : '',
            pin : user && user.address ? user.address.pin : '',
            mobile : user && user.address ? user.address.mobile : '',
        });
    }, [user]);

    let updateInputAddress = (e) => {
        setAddress({
            ...address,
            [e.target.name] : e.target.value
        });
    };

    let submitUpdateAddress = () => {
        dispatch(userActions.updateAddress(address));
        setEnableAddress(false);
    };


    return (
        <React.Fragment>
            <section className="bg-brown text-dark p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>
                                <i className="fa fa-user-circle"/> Your Profile</h3>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            Object.keys(user).length > 0 &&
                            <section>
                                <div className="container mt-3">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <img src={user.avatar} className="img-fluid rounded-circle profile-img"/>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="card">
                                                <div className="card-header bg-dark text-brown">
                                                    <p className="h4">Your Information</p>
                                                </div>
                                                <div className="card-body bg-brown">
                                                    <ul className="list-group">
                                                        <li className="list-group-item">
                                                            NAME : <span className="font-weight-bold">{user.name}</span>
                                                        </li>
                                                        <li className="list-group-item">
                                                            Email : <span className="font-weight-bold">{user.email}</span>
                                                        </li>
                                                        {
                                                            user.address &&
                                                            <li className="list-group-item">
                                                                Mobile : <span className="font-weight-bold">{user.address.mobile}</span>
                                                            </li>
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="card mt-3">
                                                <div className="card-header bg-dark text-brown">
                                                    <span className="h4">Billing Address</span>
                                                    <div className="custom-control custom-switch float-right">
                                                        <input
                                                            onChange={e => setEnableAddress(e.target.checked)}
                                                            type="checkbox" className="custom-control-input" id="customSwitch1"/>
                                                        <label className="custom-control-label" htmlFor="customSwitch1">Enable Address</label>
                                                    </div>
                                                </div>
                                                {
                                                    user.address && !enableAddress &&
                                                    <div className="card-body bg-brown">
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                Flat : {user.address.flat}
                                                            </li>
                                                            <li className="list-group-item">
                                                                Street : {user.address.street}
                                                            </li>
                                                            <li className="list-group-item">
                                                                Landmark : {user.address.landmark}
                                                            </li>
                                                            <li className="list-group-item">
                                                                City : {user.address.city}
                                                            </li>
                                                            <li className="list-group-item">
                                                                State : {user.address.state}
                                                            </li>
                                                            <li className="list-group-item">
                                                                Country : {user.address.country}
                                                            </li>
                                                            <li className="list-group-item">
                                                                PinCode : {user.address.pin}
                                                            </li>
                                                            <li className="list-group-item">
                                                                Mobile : {user.address.mobile}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                }
                                                {
                                                    user.address && enableAddress &&
                                                        <div className="card-body bg-brown">
                                                            <form onSubmit={submitUpdateAddress}>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text bg-dark text-brown" >Flat</span>
                                                                    </div>
                                                                    <input
                                                                        name="flat"
                                                                        value={address.flat}
                                                                        onChange={updateInputAddress}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text bg-dark text-brown" >Street</span>
                                                                    </div>
                                                                    <input
                                                                        name="street"
                                                                        value={address.street}
                                                                        onChange={updateInputAddress}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text bg-dark text-brown" >Landmark</span>
                                                                    </div>
                                                                    <input
                                                                        name="landmark"
                                                                        value={address.landmark}
                                                                        onChange={updateInputAddress}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text bg-dark text-brown" >City</span>
                                                                    </div>
                                                                    <input
                                                                        name="city"
                                                                        value={address.city}
                                                                        onChange={updateInputAddress}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text bg-dark text-brown" >State</span>
                                                                    </div>
                                                                    <input
                                                                        name="state"
                                                                        value={address.state}
                                                                        onChange={updateInputAddress}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text bg-dark text-brown" >Country</span>
                                                                    </div>
                                                                    <input
                                                                        name="country"
                                                                        value={address.country}
                                                                        onChange={updateInputAddress}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text bg-dark text-brown" >Pincode</span>
                                                                    </div>
                                                                    <input
                                                                        name="pin"
                                                                        value={address.pin}
                                                                        onChange={updateInputAddress}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text bg-dark text-brown" >Mobile</span>
                                                                    </div>
                                                                    <input
                                                                        name="mobile"
                                                                        value={address.mobile}
                                                                        onChange={updateInputAddress}
                                                                        type="text" className="form-control"/>
                                                                </div>
                                                                <div>
                                                                    <input type="submit" className="btn btn-dark text-brown btn-sm" value="Update"/>
                                                                </div>
                                                            </form>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        }
                    </React.Fragment>
            }
        </React.Fragment>
    )
};
export default UserProfile;