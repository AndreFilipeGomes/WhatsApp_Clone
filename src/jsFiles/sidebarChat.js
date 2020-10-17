import React, {useEffect, useState} from 'react';
import '../cssFiles/sidebarChat.css';
import { Avatar } from '@material-ui/core';
import db from '../Services/firebase';
import { Link } from 'react-router-dom';

function SidebarChat({id, name, addNewChat}){
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(()=>{
        if(id){
            db.collection('Rooms').doc(id).collection('Messages').orderBy('TimeStamp', 'desc').onSnapshot(
                (snapshot)=>{
                    setMessages(
                        snapshot.docs.map(
                            (doc) => doc.data()
                        )
                    )
                }
            )
        }
    }, [id])

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
            
            db.collection('Rooms').add({
                Name: roomName
            })

        }
    };

    return !addNewChat ?(
        <Link to={`/Rooms/${id}`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <div className="sidebarChat__info--message">
                <p>
                    {
                        messages[0]?.Message
                    }
                </p>
                </div>
            </div>
        </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat