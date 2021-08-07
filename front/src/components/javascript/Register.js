import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {login} from '../../reducer'
import "../css/main.css"
import "../fonts/Linearicons-Free-v1.0.0/icon-font.min.css"
import 'react-notifications/lib/notifications.css';
import {NotificationManager,NotificationContainer} from 'react-notifications';
import Input from './Input'
import Button from './submitButton'
import Reference from './Reference';
import {checker} from '../utils/check'



function Register1({setLogin}) {
	const dispatch = useDispatch() ;
    let history = useHistory();
    const [username , setUsername] = useState('') ; 
    const [email , setEmail] = useState('') ; 
    const [password1 , setPassword1] = useState('') ; 
    const [password2 , setPassword2] = useState('') ; 
    const submit = (e)=>{
        e.preventDefault() ; 
        let err  = checker(username,password1,password2) ; 
        if(err!=null) createNotification(err)
        else{
            const data = {
                username , 
                email , 
                password1 , 
                password2
            } 
            axios.post('http://localhost:3001/register' ,data)
            .then(res=>{
                if(res.data=="user register successfully"){
                    dispatch(login(username))
                    history.push('/')
                }else{
                    createNotification(res.data)
                }
            })
            .then(err=>{
               if(err) alert(err)
            })
        }
        
    }
    const createNotification = (message) => {
        NotificationManager.error(message ,"Registration error",2000)
    };
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-30 p-b-50">
                    <span className="login100-form-title p-b-41">
                        SIGN UP
                    </span>
                    <form className="login100-form validate-form p-b-33 p-t-5" onSubmit={submit}>

                        <Input 
                            type={"text"}
                            name={"username"}
                            placeholder={"User name"}
                            onchange={setUsername}
                            dataPlaceholder={'\ue82a'}
                        />
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
                        <Input 
                            type={"password"}
                            name={"rep-pass"}
                            placeholder={"Confirmation"}
                            onchange={setPassword2}
                            dataPlaceholder={'\ue80f'}
                        />
                        <p>have an account ? <span onClick={()=>{setLogin(true)}}> Sign In Now!</span></p>
                        <Button text={"SIGN UP"}/>
                    </form>
                    <Reference/>
                </div>
                <NotificationContainer/>
            </div>
        </div>
    )
}

export default Register1

