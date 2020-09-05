import React from 'react'
import '../cssFiles/sidebar.css'
import SidebarChat from './sidebarChat'
import { Avatar, IconButton } from '@material-ui/core';
import { DonutLargeOutlined, MoreVert, Chat, SearchOutlined } from '@material-ui/icons';

function Sidebar(){
    return(
        
        <div className="sidebar">

        {
            //#region Header
            
            <div className="sidebar__header">
                <Avatar/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeOutlined></DonutLargeOutlined>    
                    </IconButton>
                    <IconButton>
                        <Chat></Chat>
                    </IconButton>
                    <IconButton>
                        <MoreVert></MoreVert>
                    </IconButton>
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
               <SidebarChat></SidebarChat>
               <SidebarChat></SidebarChat>
               <SidebarChat></SidebarChat>
           </div>
           //#endregion
        }
          
        </div>
    )
}

export default Sidebar