import React, { useState, useEffect } from 'react';
import '../cssFiles/Chat.css';
import { Avatar,IconButton } from '@material-ui/core';
import { MoreVert, AttachFile, SearchOutlined, InsertEmoticon, Mic } from '@material-ui/icons';

function Chat (){
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(
            Math.floor(Math.random() * 5000
            )
        );
    }, []);

    const sendMessage = (event) =>{
        event.preventDefault();
        console.log("you tipped >>>>> ", input);
    }

    return(
        <div className="chat">
            {
                //#region Header
                <div className="chat__header">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}></Avatar>
                    <div className="chat__headerInfo">
                        <h3>Room name</h3>
                        <p>Last seen at .........</p>
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
                    <p className={`chat__message ${ true && 'chat__receiver'}`}>
                        <span className="chat__name">
                            azasfasf
                        </span>

                        hey guys
                        <span className="chat__timestamp">
                            3:25pm
                       </span>
                    </p>
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