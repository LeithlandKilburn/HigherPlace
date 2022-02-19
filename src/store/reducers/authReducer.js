
const initState = {
    authError: null,
    redirectNow: false,
}

const authReducer = (state = initState, action) => 
{
    switch(action.type)
    {
        case 'LOGIN_ERROR':
            console.log('login error')
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success')
            return {
                ...state,
                authError: "success",
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout success')   
            return {
                ...state,
                authError: null
            };
        case 'SIGNUP_SUCCESS':  
            console.log('signup success');
            return {
                ...state,
                redirectNow: true,
                authError: 'success'
            }
        case 'SIGNUP_ERROR':
            console.log("Signup error")
            return {
                ...state,
                authError: action.err.message
            }
        case 'RETRY_SUCCESS':
            console.log("Retry Success")
            return {
                ...state,
                authError: action.err.message
            }
        case 'RETRY_ERROR':
            console.log("Retry error")
            return {
                ...state,
                authError: action.err.message
            }
        case 'ART_CONT':
            console.log("Continue Sign Up For Artist")
            return {
                ...state,
                tempAcc: action.tempAcc,
            }
        case 'LOGOUT':
            console.log("Logged Out")
            return {
                ...state,
                authError: "logged out"
            }
        default:
        return state
    }
}

export default authReducer;
