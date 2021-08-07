import React from 'react'
import {useSelector} from 'react-redux'
import {useQuery} from '@apollo/client'
import {UsersQuery} from '../utils/query'
import Button from './Button'
import User from '../images/avatar.jpg'
import CircularProgress from '@material-ui/core/CircularProgress';

function Users({enter_room}){
    const state = useSelector(state=>state)
    const {loading , error , data} = useQuery(UsersQuery)
    if(loading) return <CircularProgress/>
    if(error) return <div>error...</div>
    return (
        <>
            <h1 className="users-header">Users</h1>
            <div className="users style-1">
                {data.Users.map(user=>{
                  if(user.name!=state.user) return <Button key={user.id} enter_room={enter_room} room={user.name} src={User}/>
                })}
            </div>
        </>
    )
}

export default Users
