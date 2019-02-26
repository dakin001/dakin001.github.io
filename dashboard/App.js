import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import RouteMain from './pages/main';
import { allRoutes } from "./route.jsx";
import framework from './framework.js';

const Main = RouteMain(allRoutes);
//Higher-Order Components 
const App = framework(Main)

export default App

