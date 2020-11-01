import React, { useEffect, useState } from 'react'
import '../cssFiles/sidebar.css'
import SidebarChat from './sidebarChat'
import { Avatar, IconButton } from '@material-ui/core';
import { DonutLargeOutlined, Chat, SearchOutlined } from '@material-ui/icons';
import db from '../Services/firebase';
import { useStateValue } from './StateProvider';
import Menu from './Menu';

function Sidebar(){
    const [inputSearch, setInputSearch] = useState('');
    const [{filterRooms, rooms, user}, dispatch] = useStateValue(); 

    const addChatRoom = (room) =>{

        dispatch({
            type: 'ADD_ROOM',
            item: {
                room
            }
        })

    };

    const inputSearchChange = (value) =>{
        
        dispatch({
            type: 'FILTER_ROOMS',
            value
        })

        setInputSearch(value);

    };

    useEffect(()=>{
        // console.log('useEffect');
        const unsubscribe = db.collection('Rooms').onSnapshot(snapshot =>{

            snapshot.docChanges().forEach((_room) => {
                // console.log(_room.doc.data);
                db.collection('Rooms').doc(_room.doc.id).collection('Rooms_User').onSnapshot(snapshotUser=>{

                    snapshotUser.docs.map((_user)=>{

                        if(_user.data().User_Id === user.user.uid){
                            
                            addChatRoom({id: _room.doc.id, data: {Name: _room.doc.data().Name}});
                            
                        }

                    });

                })
            })
           
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
                    <input value={inputSearch} onChange={event => inputSearchChange(event.target.value)} placeholder="Search or start new chat" type="text" ></input>
                </div>
            </div>
            //#endregion
        }
        {
           //#region Chats
           <div className="sidebar__chats">
               <SidebarChat addNewChat></SidebarChat>
               {

                    filterRooms?.map((room) =>(
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