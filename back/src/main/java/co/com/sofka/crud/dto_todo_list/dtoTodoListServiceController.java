package co.com.sofka.crud.dto_todo_list;

import co.com.sofka.crud.list.ToDoListModel;
import co.com.sofka.crud.todo.ToDoModel;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class dtoTodoListServiceController {

    private dtoTodoListService toDoListService;

    @Autowired
    public dtoTodoListServiceController(dtoTodoListService toDoListService) {
        this.toDoListService = toDoListService;
    }

    //Update  todos
    @PutMapping(value = "api/{listId}/todo")
    public ToDoModel toDoListService(@PathVariable("listId") Long listId, @RequestBody ToDoModel todo) throws NotFoundException {
        if(todo.getId() != null){
            return toDoListService.updateTodo(listId, todo);
        }
        throw new NotFoundException("No existe el id para actualizar");
    }

    //Add todos and lists
    @PostMapping(value = "api/{listId}/todo")
    public ToDoModel addTodoToList(@PathVariable("listId") Long listId, @RequestBody ToDoModel todo){
        return toDoListService.addTodoToList(listId, todo);
    }
    @PostMapping(value = "api/listoftodos")
    public ToDoListModel addList(@RequestBody ToDoListModel todo){
        return toDoListService.addList(todo);
    }

    //Get todos and lists
    @GetMapping(value = "api/listsOfTodos")
    public Iterable<ToDoListModel> getListOfTodos(){
        return toDoListService.getListOfTodos();
    }
    @GetMapping(value = "api/{listId}/todoslist")
    public Iterable<ToDoModel> getListOfTodos(@PathVariable("listId") Long listId) {
        return toDoListService.getListOfTodos(listId);
    }


    //Delete todos and lists
    @DeleteMapping(value = "api/{id}/listoftodos")
    public void deleteList(@PathVariable("id") Long id){
        toDoListService.deleteList(id);
    }
    @DeleteMapping(value = "api/{id}/todo")
    public void deleteTodo(@PathVariable("id")Long id){
        toDoListService.deleteTodo(id);
    }

}

