import {createStore} from 'redux'
import {persistStore , persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const initialState = {
    user : false ,
    room : false ,
}

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const LOGIN_ROOM = 'LOGIN_ROOM'
const LOGOUT_ROOM = 'LOGOUT_ROOM'


export const login = (name)=>{
    return{
        type : LOGIN,
        payload:name
    }
} 

export const logout = ()=>{
    return{
        type : LOGOUT
    }
} 

export const logout_room = ()=>{
    return{
        type : LOGOUT_ROOM
    }
}

export const login_room = (name)=>{
    return{
        type : LOGIN_ROOM,
        payload : name
    }
}


const reducer = (state = initialState , action)=>{
    switch(action.type){
        case LOGIN : return{
            room : false ,
            user : action.payload
        }
        case LOGOUT : return{
            room : false ,
            user : false
        }
        case LOGIN_ROOM : return{
            ...state , 
            room : action.payload,
        }
        case LOGOUT_ROOM : return{
            ...state,
            room : false
        }
        default : return state ;
    }
}

const persistConfig = {
    key: 'root',
    storage,
}

const persisteReducer =  persistReducer(persistConfig , reducer)
export const store = createStore(persisteReducer) ;
export const persistor = persistStore(store) ;
