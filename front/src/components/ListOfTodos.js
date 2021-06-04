import React, { useContext, useEffect } from 'react'
import ListContext from '../context/List/ListContext'
import AddToDo from './AddTODo'
import TodoList from './TodoList'
const ListOfTodos = (props) => {

    const listContext = useContext(ListContext)
    const {getListOfTodos,list,todos,deleteList} = listContext

    useEffect(()=>{
        getListOfTodos()
        // eslint-disable-next-line
    },[])

    const onDelete = (id) =>{
        deleteList(id)
    }

    
    return (
        <>
            {
                list.listOfTodos.map((listOfTodo)=>{
                    return(
                    <div style={{border: '2px solid grey', margin: '5px', padding:'5px'}}>
                   <h2>Nombre de lista: {listOfTodo.name}</h2>
                    <AddToDo  todo ={todos}  todoList={listOfTodo} />
                    <button type="button" className="btn-danger btn" onClick={()=>onDelete(listOfTodo.id)} style={{margin: '10px'}}>Borrar Lista</button>
                   <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">¿Esta completado?</th>
                            <th scope="col">Eliminar</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Completar</th>


                            </tr>
                        </thead>
                    <TodoList todoList={listOfTodo} />
                    </table>
                    </div>)
                        
                })
            }
        </>
    )
}


export default ListOfTodos
