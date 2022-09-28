import { useEffect, useState } from 'react';
import Socket from 'socket.io-client';
import './App.css';

const socket = Socket('http://localhost:3001');

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
      socket.on('connect', () => {
        console.log('connected');
      });
  
      socket.on('message', (message) => {
        setMessages((currentMessages) => [...currentMessages, message])
      });
  
      return () => {
        socket.off('connect');
        socket.off('message');
      };
    }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div className="App">
      <h1>Chat App</h1>
      <div>
        {messages.map((message) => (
          <p style={{display:'block'}}>{message}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <textarea name="message" value={message} onChange={handleChange} placeholder='your message here' />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default App;
