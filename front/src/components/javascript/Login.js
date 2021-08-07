import React,{useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {login} from '../../reducer'
import 'react-notifications/lib/notifications.css';
import {NotificationManager,NotificationContainer} from 'react-notifications';
import Input from './Input'
import Button from './submitButton'
import Reference from './Reference';



function Login1({setLogin}) {
    let history = useHistory();
    const dispatch = useDispatch() ;
    const [email , setEmail] = useState('') ; 
    const [password1 , setPassword1] = useState('') ; 
    
    const submit = (e)=>{
        e.preventDefault() ; 
            const data = { 
                email , 
                password1 
            } 
            axios.post('http://localhost:3001/login' ,data)
            .then(res=>{
                if(res.data.length>0){
                    dispatch(login(res.data[0].name))
                    history.push('/')
                }else createNotification("User doesen't exist")
            }) 
    }

    const createNotification = (message) => {
        NotificationManager.error(message ,"Login error",2000)
    };
    
    
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-30 p-b-50">
                    <span className="login100-form-title p-b-41">
                         SIGN IN
                    </span>
                    <form className="login100-form validate-form p-b-33 p-t-5" onSubmit={(e)=>submit(e)}>
                        <Input 
                            type={"email"}
                            name={"email"}
                            placeholder={"Email"}
                            onchange={setEmail}
                            dataPlaceholder={'\u2709'}
                        />
                        <Input 
                            type={"password"}
                            name={"pass"}
                            placeholder={"Password"}
                            onchange={setPassword1}
                            dataPlaceholder={'\ue80f'}
                        />
                        <p>have an account ? <span onClick={()=>{setLogin(false)}}> Sign Up Now!</span></p>
                        <Button text={"SIGN IN"}/>
                    </form>
                    <Reference/>
                </div>
            </div>
            <NotificationContainer/>
	    </div>
    )
}

export default Login1

