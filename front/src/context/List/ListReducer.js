import {GET_LIST,ADD_LIST,ADD_TODO, DELETE_LIST, DELETE_TODO,UPDATE_TODO,
    UPDATE_TODO_ITEM,GET_TODO_LIST} from '../Types'


const reducer=(state,action) =>{
    switch(action.type){
    case GET_LIST:
    return {...state, list:{listOfTodos:action.payload}}
    case ADD_LIST:
        const newList = state.list.listOfTodos;
        newList.push(action.payload)
        return { ...state,list : { listOfTodos: newList } }
    case DELETE_TODO:
        const delList = state.todos.listOfTodos.filter((element) => {
            return element.id !== action.payload;
        });
        return { ...state, todos: { listOfTodos: delList, item: {} } }
    case UPDATE_TODO:
        console.log(action.payload)
        const listUpdate = state.todos.listOfTodos.map((element) => {
            if(element.id === action.payload[1].id){
                return {...action.payload[1], listId: action.payload[0]};
            }
            return element;
        });
        return { ...state, todos: { listOfTodos: listUpdate, item: {} } }
    case UPDATE_TODO_ITEM:
        const editToDo = { ...state.todos };
        editToDo.item[action.payload[1]] = action.payload[0];
        return { ...state, todos: editToDo }
    case DELETE_LIST:
        const list = state.list.listOfTodos.filter((element) => { return element.id !== action.payload;});
        return {...state, list: {listOfTodos:list}}
    case ADD_TODO:
        const newTodo = state.todos.listOfTodos;
        newTodo.push(action.payload);
        return { ...state, todos: { listOfTodos: newTodo, item: {} } }
    case  GET_TODO_LIST:
        const getTodoList = state.todos.listOfTodos;
        action.payload.forEach(element => {getTodoList.push(element);});
        return { ...state, todos: { listOfTodos: getTodoList, item: {} }}

    default: 
        return state
}
}

export default  reducer