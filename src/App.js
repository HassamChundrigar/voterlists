import logo from "./logo.svg";
import React, { useState, useEffect } from "react";

import "./App.css";
import VoterList from "./VoterList";

const username = "admin"
const password = "jikarachi"

function App() {
  const [isLogin, setIsLogin] = useState(false);
  let userNameRef = React.createRef();
  let passwordRef = React.createRef();
  function loggin(){
    if((userNameRef.current.value===username) & (passwordRef.current.value===password)){
      setIsLogin(true)
    }
    else{
      alert("username or password is incorrect")
    }
  }

  return (
    <div className="App">
      {!isLogin ?
        (
          <div style = {{display: "block", marginTop:'20%'}}>
            <form >
              <input ref={userNameRef} type="text" placeholder="user name" style = {{marginTop:'5px'}}></input>
              <br></br>
              <input ref={passwordRef} type = "password" placeholder="password" style = {{marginTop:'5px'}}></input>
              <br></br>
              <button type="submit"  onClick = {loggin}style = {{marginTop:'5px'}}> LOGIN</button>
            </form>
           
          </div>  
        )
        :
        <VoterList></VoterList>
      }
      
      
    </div>
  );
}

export default App;
