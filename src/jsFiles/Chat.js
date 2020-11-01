import React, { useState, useEffect } from 'react';
import '../cssFiles/Chat.css';
import { Avatar,IconButton, Slide } from '@material-ui/core';
import { MoreVert, AttachFile, SearchOutlined, InsertEmoticon, Mic } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from '../Services/firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat (){
    const [input, setInput] = useState('');
    const [inputSearchActive, setInputSearchActive] = useState(false);
    const [inputSearch, setInputSearch] = useState('');
    const [seed, setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [{user}] = useStateValue();
    
    
    useEffect(()=>{
        if(roomId){
            db.collection('Rooms').doc(roomId).onSnapshot(
                snapshot =>(
                    setRoomName(snapshot.data()?.Name)
                )
            )
            
            db.collection('Rooms').doc(roomId).collection('Messages').orderBy('TimeStamp', 'asc').onSnapshot(
                snapshot =>{ 
                    setMessages(
                        snapshot.docs.map(
                            doc => doc.data()
                        )
                    )

                    setFilteredMessages(
                        snapshot.docs.map(
                            doc => doc.data()
                        )
                    )
                }
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

    const transitionStyles = {
        // entering: { opacity: 1 },
        // entered:  { opacity: 1 },
        // exiting:  { opacity: 0 },
        // exited:  { opacity: 0 },
        true: { opacity: 1 },
        false:  { opacity: 0 },
    };

    const inputSearchActiveChange = () =>{
        
        if(inputSearchActive === false)
            setInputSearchActive(true)
        else
            setInputSearchActive(false)
    };

    const inputSearchChange = (value) =>{
        
        setFilteredMessages(messages.filter(message => message.Message.toLowerCase().includes(value.toLowerCase())));

        setInputSearch(value);

    };

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
                        <Slide direction="top" in={inputSearchActive} timeout={500} mountOnEnter unmountOnExit>
                            <input className="header_headerRight_inputSearch" type="text" placeholder="Message search" value={inputSearch} onChange={event => inputSearchChange(event.target.value)}></input> 
                        </Slide>
                        <IconButton onClick={event => inputSearchActiveChange()}>
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
                        
                        filteredMessages.map(
                            (message)=>(
                                <p className={`chat__message ${ message.Email === user.user.email && 'chat__receiver'}`}>
                                <span className="chat__name">
                                    {message.Name? message.Name: message.Email}
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