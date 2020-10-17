import React from 'react';
import './App.css';
import Sidebar from "./jsFiles/sidebar";
import Chat from "./jsFiles/Chat";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './jsFiles/Login';
import { useStateValue } from './jsFiles/StateProvider';

function App() {

  const [ user , dispatch] = useStateValue();
  // console.log(user);
  return (
    // BEM naming convention
    <div className="app">
     
        {!user ? (
          <Login></Login>
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
