import React from 'react'
import { useEffect,useState} from 'react';
import io from 'socket.io-client'
import '../css/join.css'
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles"
import axios from 'axios'
import {useSelector} from 'react-redux'
import SendIcon from '@material-ui/icons/Send';
import {useHistory} from "react-router-dom"
import {outputMessage , adjust} from '../utils/message'




let socket = io('http://localhost:3001/',  {transports: ['websocket']});


const CssTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
        }
    },
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#ffb703',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#ffb703',
        },
      },
    },
  })(TextField);

function Join() {

    const history = useHistory()
    const state =  useSelector(state=>state)
    const [name , setName] = useState(state.user)
    const [room , setRoom] = useState(state.room)
    const [value, setValue] = React.useState("");
    const handleChange = (event) => {
        setValue(event.target.value);
    }
    
    //useEffect
    useEffect(()=>{
        socket.emit('join',{name,room});
    },[room])

    useEffect(()=>{
        const select = ()=>{
            axios.get('http://localhost:3001/messages',{params:{room}}).then(res=>{
                for (let i = 0; i < res.data.length; i++) {
                    outputMessage({username : res.data[i].sender , time:res.data[i].time, text:res.data[i].message},state)
                }
            })
        }
        select()
        window.addEventListener("popstate", e => {
            history.go(0)
        });
    },[])
    
    

    //useEffect
    useEffect(()=>{
        socket.on("message" , (ms)=>{
            outputMessage(ms,state); 
        }) 
    },[])
    
    const send = (e)=>{
        e.preventDefault() ;
        const v = adjust(value)
        const cond = (v=="" || v==" ")?false:true ; 
        if(cond) socket.emit('send',{name,ms:v}) ;
        setValue("")
    }


      const check = (event)=>{
        if (event.keyCode === 13) {
            event.preventDefault();
            send(event)
          }
      }
    return (
        <div className="join">
            <div class="chat-container">
                <header class="chat-header">
                    <h3>{state.room.replaceAll(state.user,"")}</h3>
                    <button onClick={()=>{history.push('/');history.go(0)}} class="btn red"><span >Leave</span></button>
                </header>
                <main class="chat-messages">
                </main>
                <footer class="chat-form-container">
                    
                    <form id="chat-form">
                        <CssTextField
                            id="standard-multiline-flexible msg"
                            label="Message"
                            multiline
                            rowsMax={3}
                            value={value}
                            onChange={handleChange}
                            inputProps={{ style: {color: 'white'}}}
                            fullWidth
                            InputLabelProps={{style:{color: 'white'}}}
                            style={{ borderColor: 'white'}} variant="outlined"
                            onKeyUp={(e)=>check(e)}
                        />
                        <SendIcon onClick={send} style={{color:"#ffb703" , fontSize:"30px",transform: "rotate(-45deg)" , marginLeft:"7px" , marginBottom:"5px" , cursor:"pointer"}}/>
                    </form>
                </footer>
            </div>
        </div>
            
    )
}

export default Join 
