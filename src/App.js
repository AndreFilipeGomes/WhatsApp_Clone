import React, { useEffect } from 'react';
import './App.css';
import Sidebar from "./jsFiles/sidebar";
import Chat from "./jsFiles/Chat";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './jsFiles/Login';
import { useStateValue } from './jsFiles/StateProvider';
import { auth } from './Services/firebase';

function App() {

  const [user , dispatch] = useStateValue();

  useEffect(() => {
    //Initialize listener to AuthState change
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      
        if(authUser){
          dispatch({
            type: 'SET_USER',
            user: authUser
          })
        }else{
          dispatch({
            type: 'SET_USER',
            user: null
          })
        }
    });

    return () => {
      // detach listener in refresh
      unsubscribe();
    }
  }, [])



  return (
    // BEM naming convention
    <div className="app">
        {
        !(user?.user.user) ? (
          <Router>
            <Login></Login>
          </Router>
        ): (
          <div className="app__body">
            <Router>
              <Sidebar ></Sidebar>
              <Switch>

                <Route path="/Rooms/:roomId">
                  <Chat></Chat>
                </Route>

                <Route path="/">
                  {/* <Chat></Chat> */}
                </Route>
              
              </Switch>
            </Router>
          </div>
        )}

    </div>
  );
}

export default App;
