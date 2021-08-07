import React , {useState} from 'react';
import { BrowserRouter as Router, Redirect, Route , Switch} from "react-router-dom";
import Join from "./components/javascript/Join"
import Protected from './components/javascript/Protected'
import {useSelector} from 'react-redux'
import Register from '../src/components/javascript/Register'
import Login from '../src/components/javascript/Login'

function App(){
  const state = useSelector(state=>state)
  const [login , setLogin] = useState(false)
  let Comp = login ?  Login : Register ; 
  
  return(
    <Router>
      
          <Switch>
            <Protected exact path="/" component={Comp} condition={state.user} setLogin={setLogin}/>
            <Route exact path="/join" render={()=>{
              if(state.room){
                return <Join/>
              }else return <Redirect to="/"/>
            }}/>
          </Switch>
    </Router>
  )
}

export default App;
