import React, { useState,useContext, useRef } from 'react'
import ListContext from '../context/List/ListContext'

const AddToDo = ({todo,todoList}) => {
    const listContext = useContext(ListContext)
    const {addTodo,upDateTodo} = listContext
    const formRef = useRef(null);
    const item = todo.item[todoList.id] ? todo.item[todoList.id] : {};
    const [state, setState] = useState(item);

    const onAdd=(e)=>{
        e.preventDefault();
        addTodo(state,todoList.id)
        setState({name:""})
        formRef.current.reset();
    }

    const onEdit= ()=>{
        const todoUpDated= {
            name: state.name,
            id:item.id,
            listId: item.listId
        };
        upDateTodo(todoUpDated)
        setState({ name: "" });
        formRef.current.reset();
    }


    return (
        <form ref={formRef}>
            <div className="form-group ">
            <input type="text" name="name"  defaultValue={item.name} onChange={(event)=>{
            setState({...state,name:event.target.value})
        }} ></input>
        {item.id &&<button type="button" className="btn btn-primary" onClick={onEdit} style={{margin: '10px', padding:'5px'}}>Actualizar</button>}
        {!item.id &&<button type="button" className="btn btn-info" onClick={onAdd} style={{margin: '10px', padding:'5px'}}>Agregar</button>}


            </div>
  
  </form>
    )
}



export default AddToDo
