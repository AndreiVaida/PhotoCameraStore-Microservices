import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const API_URL = "http://localhost:3001";

function App() {
  const [message, setMessage] = useState("");

  function handleGetHello() {
      fetch(`${API_URL}/home`)
        .then(response => response.json())
        .then(data => setMessage(data.title));
  }

  return (
    <div className="App">
      <header className="App-header">
        <label onClick={handleGetHello} className={"clickableWhite"}>GET hello</label>
        <label>{message}</label>
      </header>
    </div>
  );
}

export default App;
