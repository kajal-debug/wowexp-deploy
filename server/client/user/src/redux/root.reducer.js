import {combineReducers} from "redux";
import * as alertReducer from './alert/alert.reducer';
import * as userReducer from './users/user.reducers';

export const rootReducer = combineReducers({
    [alertReducer.alertFeatureKey] : alertReducer.reducer,
    [userReducer.userFeatureKey] : userReducer.reducer,
});