import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import './App.css';
import Chat from './components/Chat';
import {Link} from '@reach/router';



function App() {
  const [socket, setSocket] = useState(io(":8000"));

  useEffect(() => {
    console.log("Is this thing on?");
    socket.on("Welcome", data => console.log(data));
  },[])

  return (
    <div className="App">
      <Chat socket={socket} setSocket={setSocket} />
      {/* <p>
        <Link to={"/room1"}>Male - Male</Link> | <Link to={"/room2"}>Female - Female</Link> | <Link to={"/room3"}>Male - Female</Link> 
      </p> */}
    </div>
  );
}

export default App;
