import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import './App.css';
import Chat from './components/Chat';


function App() {
  const [socket] = useState(io(":8000"));

  useEffect(() => {
    console.log("Is this thing on?");
    socket.on("Welcome", data => console.log(data));
  },[])

  return (
    <div className="App">
      <h1>SocketTest</h1>
      <Chat />
    </div>
  );
}

export default App;
