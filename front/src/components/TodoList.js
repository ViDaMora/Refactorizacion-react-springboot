import React, { useContext, useEffect } from 'react'
import ListContext from '../context/List/ListContext'

const TodoList = ({todoList}) => {

    const listContext = useContext(ListContext)
    const {todos,deleteTodo, onEditTodoItem,loadList,upDateTodo} = listContext
    var lista = todos.listOfTodos.filter((element) => { return element.listId === todoList.id;});

    useEffect(() => {
      loadList(todoList.id)
      // eslint-disable-next-line
  }, []);
    const onDelete=(todoId)=>{
        deleteTodo(todoId)
    }
    const onEdit=(todo)=>{
    onEditTodoItem(todo,todoList.id)
    }

    const onComplete=(todo)=>{
      const todoUpDated= {
        name: todo.name,
        id:todo.id,
        listId: todo.listId,
        completed: !todo.completed
    };
    upDateTodo(todoUpDated)
    }


    return (
        <tbody>
            { <>
      {lista.map((item)=>{
        return <tr key={item.id} >
          
          <td >{item.id}</td>
          <td>{item.name}</td>
          <td>{item.completed === true? <b style={{color: 'green'}}>Hecho</b> :<b  style={{color: 'red'}}>Sin hacer</b>}</td>
          <td><button type="button" className="btn btn-danger" onClick={() => onDelete(item.id)}>Eliminar</button></td>
          <td><button  type="button" className="btn btn-warning" onClick={() => onEdit(item)} >Editar</button></td>
          <td><button type="button" className={ item.completed ===true? "btn btn-outline-secondary":"btn btn-success"} onClick={() => onComplete(item)}  >{item.completed ===true? <>Cancelar</> : <>Completar</> }</button></td>

        </tr>
      })}
    </>}
        </tbody>
    )
}



export default TodoList
