import React, { useReducer } from 'react';
import ListContext from './ListContext';
import ListReducer from './ListReducer';
import {GET_LIST,ADD_LIST,DELETE_LIST,ADD_TODO,DELETE_TODO,
     UPDATE_TODO,UPDATE_TODO_ITEM,GET_TODO_LIST} from '../Types'
import Axios from 'axios'
import axios from 'axios';



const ListState = props => { 
    const initialState ={
        list: {
            listOfTodos: []
        },
        todos: {
            item: {},
            listOfTodos: []     
        },
    }

    const [state,dispatch] = useReducer(ListReducer,initialState)

    //Get ListsOfToDos
    const getListOfTodos =async () => {     
        const config ={
            headers: {'Content-Type':'application/json'}
        } 
        try {
            const res = await Axios.get('/listsOfTodos',config)
            dispatch({type:GET_LIST, payload:res.data})
        } catch (err) {
            alert("ha ocurrido un error cargando los datos")

        }
        
    }

    const addList = async (name) => {
        const config ={
            headers: {'Content-Type':'application/json'}
        }
        
        try {
            const res = await Axios.post('/listoftodos',name ,config)
            dispatch({type:ADD_LIST, payload:res.data})
        } catch (err) {
            alert("ha ocurrido un error")
        }
        
    }

    const deleteList = async (idList) =>{
        const config ={
            headers: {'Content-Type':'application/json'}
        }
        try {
            axios.delete('/'+idList+'/listoftodos',config)
            dispatch({type: DELETE_LIST, payload:idList })
        } catch (err) {
                alert("ha ocurrido un error añadiendo la lista")
        }

    }

    const addTodo = async (todo,idlist) =>{
        const config ={
            headers: {'Content-Type':'application/json'}
        }
        try {
            const to ={ name: todo.name, completed:false}
            const res = await Axios.post('/'+idlist+'/todo',to,config)
            dispatch({type: ADD_TODO, payload:res.data })
        } catch (err) {
            alert("Ha ocurrido un error, ingrese un nombre valido por favor")

        }
    }


   
    const deleteTodo = async (todoId) =>{
        const config ={
            headers: {'Content-Type':'application/json'}
        }
        try {
            axios.delete('/'+todoId+'/todo', config)
            dispatch({type: DELETE_TODO, payload:todoId })

        } catch (error) {
            alert("ha ocurrido un error borrando un todo")
        }
        
    }


    const upDateTodo = async (todo) =>{
        const config ={
            headers: {'Content-Type':'application/json'}
        }
        try {
            
            const res= await  axios.put('/'+todo.listId+'/todo',todo, config)
            dispatch({type: UPDATE_TODO, payload:[todo.listId,res.data] })

        } catch (error) {
            alert("ha ocurrido un error actualizando un todo")
        }

    }

   const onEditTodoItem = async (todo,listId)=>{

    dispatch({type: UPDATE_TODO_ITEM, payload:[todo,listId] })

   }

   const loadList = async (listId) =>{
    const config ={
        headers: {'Content-Type':'application/json'}
    }
    try {
        const res = await Axios.get('/'+listId+'/todoslist',config)
        dispatch({type:GET_TODO_LIST, payload:res.data})
    } catch (err) {
        alert("ha ocurrido un error cargando la lista")

    }

   }





    return(
        <ListContext.Provider value={{
        list:state.list,
        todos:state.todos,
        getListOfTodos,
        addList,
        deleteList,
        addTodo,
        deleteTodo,
        upDateTodo,
        onEditTodoItem,
        loadList
    }
        }

        {...props}></ListContext.Provider>
    )


}


export default ListState