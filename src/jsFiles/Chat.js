import React, { useState, useEffect } from 'react';
import '../cssFiles/Chat.css';
import { Avatar,IconButton } from '@material-ui/core';
import { MoreVert, AttachFile, SearchOutlined, InsertEmoticon, Mic } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from '../Services/firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat (){
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}] = useStateValue();

    
    useEffect(()=>{
        if(roomId){
            db.collection('Rooms').doc(roomId).onSnapshot(
                snapshot =>(
                    setRoomName(snapshot.data().Name)
                )
            )

            db.collection('Rooms').doc(roomId).collection('Messages').orderBy('TimeStamp', 'asc').onSnapshot(
                snapshot => (
                    setMessages(
                        snapshot.docs.map(
                            doc => doc.data()
                        )
                    )
                )
            )

        }
    }, [roomId]);

    useEffect(() => {
        setSeed(
            Math.floor(Math.random() * 5000
            )
        );
    }, [roomId]);

    const sendMessage = (event) =>{
        event.preventDefault();

        db.collection('Rooms').doc(roomId).collection('Messages').add(
            {
                Message: input,
                Name: user.user.displayName,
                TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                Email: user.user.email
            }
        );

        setInput("");
    }

    return(
        <div className="chat">
            {
                //#region Header
                <div className="chat__header">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
                    <div className="chat__headerInfo">
                        <h3>{roomName}</h3>
                        <p>
                            {
                                
                                messages.length > 0? 
                                    "last seen " + new Date(messages[messages.length -1]?.TimeStamp?.toDate()).toLocaleString() 
                                : 
                                    ""

                            }
                        </p>
                    </div>
                    <div className="header_headerRight">
                        <IconButton>
                            <SearchOutlined></SearchOutlined>    
                        </IconButton>
                        <IconButton>
                            <AttachFile></AttachFile>
                        </IconButton>
                        <IconButton>
                            <MoreVert></MoreVert>
                        </IconButton>
                    </div>
                         
                </div>
                //#endregion
            }
            {
                //#region Body
                <div className="chat__body">
                    {
                        messages.map(
                            (message)=>(
                                <p className={`chat__message ${ message.Email === user.user.email && 'chat__receiver'}`}>
                                <span className="chat__name">
                                    {message.Name}
                                </span>
        
                                {message.Message}

                                <span className="chat__timestamp">
                                    {new Date(message.TimeStamp?.toDate()).toLocaleString()}
                               </span>
                            </p>
                            )
                        )
                    }
                
                </div>
                //#endregion
            }
            {
                //#region Footer
                <div className="chat__footer">
                    <InsertEmoticon></InsertEmoticon>
                    <form>
                        <input value={input} onChange={event => setInput(event.target.value)} placeholder="Type message" type="text"></input>
                        <button type="submit" onClick={sendMessage}>Send Message</button>
                    </form>
                    <Mic></Mic>
                </div>
                //#endregion
            }
        </div>
    )
}

export default Chat