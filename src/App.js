import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import { io } from "socket.io-client";
import axios from 'axios'

function App() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get('http://localhost:5000/orders')
      const ordersData = response.data;
      setOrders(ordersData)
    } 

    getOrders()
  }, [])

  useEffect(() => {
    const socket = io('ws://localhost:5000')

    socket.on('connnection', () => {
      console.log('connected to server');
    })

    socket.on('order-added', (newOrders) => {
      setOrders(newOrders)
    })

    socket.on('message', (message) => {
      console.log(message);
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnecting');
    })

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
