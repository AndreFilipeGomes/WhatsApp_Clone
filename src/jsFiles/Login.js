import React, {useState} from 'react';
import "../cssFiles/Login.css"
import { Avatar, Button } from '@material-ui/core';
import { auth, provider } from '../Services/firebase';
import { Link, Router, useHistory } from 'react-router-dom';

function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    
    //#region Login/Registration
    const signIn = () =>{
        auth.signInWithPopup(provider)
        .then((result) =>{
            if(history)
                history.push('/');
        }).catch((e) => alert(e.message));
    };

    const login = (e) => {
        e.preventDefault();

        auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
            if(history)
                history.push('/');
        })
        .catch((e) => alert(e.message));
    }

    const register = e =>{
        e.preventDefault();
        
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth)=>{
            if(history)
                history.push('/');
        }).catch((message)=>{
            alert(message);
        });

        
    };
    //#endregion

    return(
        
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""></img>

                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                    <span>This can be a fictitious email/password</span>
                </div>

                <div className="login__formContainer">
                    <form>
                        <h5>E-mail</h5>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>

                        <h5>Password</h5>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                        {/* <Router> */}
                            {/* <Link to="/" > */}
                                <button className="login__formContainer_loginButton" onClick={login}>Sign In</button>
                            {/* </Link> */}
                        {/* </Router> */}
                        
                    </form>
                    
                    <button className="login__formContainer__Registration" onClick={register}>Create your Account</button>
                    
                </div>

                <hr></hr>
               
                <Button onClick={signIn}>
                    <Avatar className="login__signInGoogle__Avantar" alt="Remy Sharp" src="https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/google-icon.png" />
                    Sign In With Google
                </Button> 
                 
            </div>
        </div>
    )
};

export default Login