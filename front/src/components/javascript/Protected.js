import React from 'react'
import {Route ,Redirect } from 'react-router-dom'
import Rooms from './Rooms';


function Protected({component : Component , condition , setLogin}) {
    let Comp = condition ? Rooms : Component ; 
    return (
        <Route render={()=>{return (<Comp setLogin={setLogin}/>);}}/>
    )
}

export default Protected
