import React, {useEffect, useState} from 'react';
import '../cssFiles/sidebarChat.css';
import { Avatar } from '@material-ui/core';

function SidebarChat({addNewChat}){
    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(
            Math.floor(
                Math.random() * 5000
            )
        );
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if(roomName){
            // do some clever name...
            //console.log(roomName);
        }
    };

    return !addNewChat ?(
        
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
            <div className="sidebarChat__info">
                <h2>Room Name</h2>
                <div className="sidebarChat__info--message">
                    <p>Last message...</p>
                </div>
            </div>
        </div>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat