import React, { useState,useContext } from 'react'
import ListContext from '../context/List/ListContext'

const AddList = () => {
    const listContext = useContext(ListContext)
    const {addList} = listContext
    const [state, setState] = useState({ name: "" });

    const onChange = (event) => {
        setState({ name: event.target.value })
    }
    const onAddList =(e)=>{
        e.preventDefault();
        if(state.name !==''){
        addList(state)
        setState({ name:""})}
    }

    return (
        <div>
         <input type="text" name="name"  placeholder="Nombre de la nueva lista" onChange={onChange} value={state.name} ></input>
        <button onClick={onAddList} className="btn btn-primary" style={{margin: '15px', padding:'5px'}}>Nueva lista</button>
        </div>
    )
}



export default AddList
