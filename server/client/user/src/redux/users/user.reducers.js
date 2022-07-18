import * as userActions from './user.actions';

export const userFeatureKey = 'users';

let initialState = {
    loading : false,
    token : '',
    user : {},
    isAuthenticated : false,
    errorMessage : ''
};

export const reducer = (state = initialState , action) => {
    let {type , payload} = action;
    switch(type) {
        // Register a User
        case userActions.REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userActions.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case userActions.REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };
        // Login a User
        case userActions.LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userActions.LOGIN_USER_SUCCESS:
            localStorage.setItem(process.env.REACT_APP_LOGIN_TOKEN, payload.token);
            return {
                ...state,
                loading: false,
                token: payload.token,
                isAuthenticated: true
            };
        case userActions.LOGIN_USER_FAILURE:
            localStorage.removeItem(process.env.REACT_APP_LOGIN_TOKEN);
            return {
                ...state,
                loading: false,
                token: '',
                isAuthenticated: false,
                errorMessage: payload
            };
        // Get User Info
        case userActions.GET_USER_INFO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userActions.GET_USER_INFO_SUCCESS:
            console.log(payload.user);
            return {
                ...state,
                loading: false,
                user: payload.user
            };
        case userActions.GET_USER_INFO_FAILURE:
           return {
                ...state,
                loading: false,
                user: {},
                errorMessage: payload
            };
        // update Address
        case userActions.UPDATE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userActions.UPDATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload.user
            };
        case userActions.UPDATE_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };
        // Logout User
        case userActions.LOGOUT_USER:
            localStorage.removeItem(process.env.REACT_APP_LOGIN_TOKEN);
            return {
                ...state,
                loading: false,
                token: '',
                isAuthenticated: false
            };
        default : return state;
    }
};
