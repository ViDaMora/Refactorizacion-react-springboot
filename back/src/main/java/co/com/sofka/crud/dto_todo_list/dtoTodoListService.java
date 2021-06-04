package co.com.sofka.crud.dto_todo_list;

import co.com.sofka.crud.list.ToDoList;
import co.com.sofka.crud.list.ToDoListModel;
import co.com.sofka.crud.list.ToDoListRepository;
import co.com.sofka.crud.todo.ToDoModel;
import co.com.sofka.crud.todo.Todo;
import co.com.sofka.crud.todo.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;



@Service
public class dtoTodoListService {

    private ToDoListRepository toDoListRepository;
    private TodoRepository toDoRepository;

    @Autowired
    public dtoTodoListService(ToDoListRepository toDoListRepository, TodoRepository toDoRepository) {
        this.toDoListRepository = toDoListRepository;
        this.toDoRepository = toDoRepository;
    }


    public void deleteList(Long listId){
        ToDoList listToDo = toDoListRepository.findById(listId).orElseThrow(() -> new RuntimeException("Error deleting the list"));
        toDoListRepository.delete(listToDo);
    }
    public void deleteTodo(Long todoId) {
        Todo toDo = toDoRepository.findById(todoId).orElseThrow(() -> new RuntimeException("Error deleting the todo item"));
        toDoRepository.delete(toDo);
    }

    public ToDoModel addTodoToList(Long listId, ToDoModel newTodo) {
        ToDoList list =  toDoListRepository.findById(listId).orElseThrow(() -> new RuntimeException("Error adding todo"));
        Todo toDo = new Todo();
        toDo.setId(newTodo.getId());
        toDo.setName(Objects.requireNonNull(newTodo.getName()));
        toDo.setCompleted(newTodo.isCompleted());
        list.getItems().add(toDo);
        toDoListRepository.save(list);
        newTodo.setListId(listId);
        return newTodo;
    }

    public ToDoModel updateTodo(Long listId, ToDoModel todoUpdated) {
        ToDoList listToDo = toDoListRepository.findById(listId).orElseThrow(() -> new RuntimeException("Error updating todo"));
        for(Todo todo : listToDo.getItems()){
            if(todo.getId().equals(todoUpdated.getId())){
                todo.setId(Objects.requireNonNull(todoUpdated.getId()));
                todo.setName(Objects.requireNonNull(todoUpdated.getName()));
                todo.setCompleted(todoUpdated.isCompleted());
            } }
        toDoListRepository.save(listToDo);
        return todoUpdated;
    }


    public ToDoListModel addList(ToDoListModel listOfTodos) {
        ToDoList listToDo = new ToDoList();
        listToDo.setName(listOfTodos.getName());
        ToDoList listSaved = toDoListRepository.save(listToDo);
        System.out.println(listSaved.getTodo_list_id());
        long id = listSaved.getTodo_list_id();
        listOfTodos.setId(id);
        return listOfTodos;
    }

    public Set<ToDoListModel> getListOfTodos() {
        //Se convierte de iterator a stream
        Stream<ToDoList> lit = StreamSupport.stream(toDoListRepository.findAll().spliterator(), false);
        return lit.map(toDoList -> {
            return new ToDoListModel(toDoList.getTodo_list_id(), toDoList.getName(), null);
        }).collect(Collectors.toSet());
    }
    public Set<ToDoModel> getListOfTodos(Long listId) {
        //orElseThrow nos sirve para evitar el optional"
        ToDoList list = toDoListRepository.findById(listId).orElseThrow(() -> new RuntimeException("Error geting the list"));
        Stream<ToDoModel> todos = list.getItems().stream().map((todo -> new ToDoModel(todo.getId(), todo.getName(), todo.isCompleted(), listId)));
        //Parsear el stream
        return todos.collect(Collectors.toSet());
    }


}
