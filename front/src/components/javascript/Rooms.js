import React,{useEffect} from 'react'
import counter from '../images/counter.jpeg'
import football from '../images/football.jpg'
import math from '../images/math.jpeg'
import '../css/rooms.css'
import {useHistory} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import {logout,login_room,logout_room} from '../../reducer'
import Button from './Button'
import Users from './Users'

function Rooms() {
    const history = useHistory()
    const dispatch = useDispatch()
    const state = useSelector(state=>state)
    const rooms = ["FootBall" , "Math" , "Counter"]

    useEffect(()=>{
      dispatch(logout_room())   
    },[])
    
    const close = ()=>{
      dispatch(logout())
      history.push("/")
    }

    const enter_room = (room)=>{
      const name = state.user
      const lexic = (room>name)?name+room:room+name
      rooms.includes(room)?dispatch(login_room(room)):dispatch(login_room(lexic)) ; 
      history.push({pathname:'/join'})
    }

    return (
      <div className="chat">
          <div className="rooms-container">
              <h1 className="rooms-header">Rooms</h1>
              <div className="rooms">
                <Button enter_room={enter_room} room={"Counter"} src={counter}/>
                <Button enter_room={enter_room} room={"Math"} src={math}/>
                <Button enter_room={enter_room} room={"FootBall"} src={football}/>
              </div>
              <Users enter_room={enter_room}/>
              <div className="container-login100-form-btn m-t-32">
                <button className="login" type="submit" onClick={close}>
                  LOGOUT
                </button>
					    </div>
          </div>
      </div>
        
    )
}

export default Rooms