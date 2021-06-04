package co.com.sofka.crud.list;

import co.com.sofka.crud.todo.Todo;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Table(name = "todolist")
@Entity
public class ToDoList {

    @Id
    @GeneratedValue
    private long todo_list_id;
    @NotBlank(message = "Name is mandatory")
    private String name;

    //This attribute connect the table todolist with todos
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Todo> items;

    public long getTodo_list_id() {
        return todo_list_id;
    }

    public void setTodo_list_id(long todo_list_id) {
        this.todo_list_id = todo_list_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Todo> getItems() {
        return items;
    }

    public void setItems(Set<Todo> items) {
        this.items = items;
    }
}
