import React from 'react';
import './App.css';
import Sidebar from "./jsFiles/sidebar";
import Chat from "./jsFiles/Chat";

function App() {
  return (
    // BEM naming convention
    <div className="app">
     <div className="app__body">
       <Sidebar />
      <Chat></Chat>
     </div>
    </div>
  );
}

export default App;
