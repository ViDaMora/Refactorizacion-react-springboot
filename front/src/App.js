import React from 'react';
import ListState from './context/List/ListState'

import AddList from './components/AddList'
import axios from 'axios';
import ListOfTodos from './components/ListOfTodos';

axios.defaults.baseURL="http://localhost:8080/api/"

function App() {
  return <ListState>
    <h3 >To Do List</h3>
    <AddList />
    <ListOfTodos />
  </ListState>
}

export default App;