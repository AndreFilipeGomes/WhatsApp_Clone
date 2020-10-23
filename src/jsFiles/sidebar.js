import React, { useState, useEffect } from 'react'
import '../cssFiles/sidebar.css'
import SidebarChat from './sidebarChat'
import { Avatar, IconButton } from '@material-ui/core';
import { DonutLargeOutlined, MoreVert, Chat, SearchOutlined } from '@material-ui/icons';
import db from '../Services/firebase';
import { useStateValue } from './StateProvider';
import Menu from './Menu';

function Sidebar(){
    const [rooms, setRooms] = useState([]); 
    const [{user}] = useStateValue();


    useEffect(()=>{
         
        const unsubscribe = db.collection('Rooms').onSnapshot(snapshot =>{
            setRooms(
                snapshot.docs.map(
                    doc => ({
                        id: doc.id,
                        data: doc.data()
                    })
                )
            )
        });

        return () =>{
            unsubscribe();
        }

    }, [])

    return(
        
        <div className="sidebar">

        {
            //#region Header
            
            <div className="sidebar__header">
                <Avatar src={user.user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeOutlined></DonutLargeOutlined>    
                    </IconButton>
                    <IconButton>
                        <Chat></Chat>
                    </IconButton>
                    <Menu></Menu>
                </div>
            </div>
           
            //#endregion
        }
        {
            //#region Search
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined></SearchOutlined>
                    <input placeholder="Search or start new chat" type="text"></input>
                </div>
            </div>
            //#endregion
        }
        {
           //#region Chats
           <div className="sidebar__chats">
               <SidebarChat addNewChat></SidebarChat>
               {
                    rooms.map((room) =>(
                        <SidebarChat key={room.id} id={room.id} name={room.data.Name}></SidebarChat>
                    ))
               }
           </div>
           //#endregion
        }
          
        </div>
    )
}

export default Sidebar