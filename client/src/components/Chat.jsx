import React, {useState, useEffect} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Container, Button, TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {Link} from '@reach/router';
import io from 'socket.io-client';



export default (props) => {
    const {socket, setSocket} = props;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [roomNum, setRoomNum] = useState();
    const [roomMessage, setRoomMessage] = useState("");
    // var socket = socket;
    

    const onChangeHandler = (e) => {
            setNewMessage(e.target.value);
            console.log(newMessage)
    }

    const onRoomClick = (roomNumber) =>{
        setMessages([]);
        setRoomNum(roomNumber);
        if(roomNumber === 1){
            // setSocket(io.of('/room1'));
            setRoomMessage("Welcome to the Male - Male chat big boy");
            socket.emit('room1', roomNum);
        }
        if(roomNumber === 2){
            // setSocket(io.of('/room2'));
            setRoomMessage("Welcome to the Female - Female chat kitten");
            socket.emit('room2', roomNum);
        }
        if(roomNumber === 3){
            // setSocket(io.of('/room3'))
            setRoomMessage("Welcome to the Male - Female chat")
            socket.emit('room3', roomNum);
        }
    }
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const msg = `${socket.id} says: ${newMessage}`;
        console.log(`msg = ${msg}`);
        socket.emit("event_from_client", msg)
        document.getElementById("chatinput").value = "";
        setNewMessage("");
    }

    useEffect(() => {
        console.log('running useEffect hook');
        console.log(`this is the newMessage: ${newMessage}`);
        socket.on("new_message_from_server", msg => 
            setMessages(prevMessages => {
                return [msg, ...prevMessages];
            }),
        );
    }, []);
    console.log(`messages: ${messages}`);

    // function generate(element) {
    //     return [0, 1, 2].map(value =>
    //       React.cloneElement(element, {
    //         key: value,
    //       }),
    //     );
    //   }

    return(
        <Container maxWidth="md">
            <Card>
                <CardContent>
                    <h1>Chat with Sexy Singles in Your Area</h1>
                    <p>
                        <Link to={"/room1"} onClick={(e) => onRoomClick(1)}>Male - Male</Link> | <Link to={"/room2" } onClick={(e) => onRoomClick(2)}>Female - Female</Link> | <Link to={"/room3"} onClick={(e) => onRoomClick(3)}>Male - Female</Link> 
                    </p>
                    <h5>{roomMessage}</h5>
                    <form onSubmit={onSubmitHandler}>
                        <TextField id="chatinput" label="send message..." size="small" variant="outlined" onChange={(e) => onChangeHandler(e)} />
                        <Button variant="outlined" type="submit" color="primary" disabled={!newMessage}>
                            Send
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <List>
                {messages.map((message, index) => 
                <div key={index}>
                    <ListItem >
                    <ListItemIcon>
                        <EmojiEmotionsIcon />
                    </ListItemIcon>
                        <ListItemText primary={message} />
                    </ListItem>
                    <Divider />
                </div>
                )}
            </List>
                     {/* <p key={index}>{message}</p> */}

        </Container>
    )
}