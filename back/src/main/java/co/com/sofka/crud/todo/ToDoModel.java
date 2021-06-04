package co.com.sofka.crud.todo;

import javax.persistence.CascadeType;
import javax.persistence.OneToMany;

public class ToDoModel {
    private Long id;
    private String name;
    private boolean completed;
    private Long listId;


    public ToDoModel(Long id, String name, boolean completed, Long listId) {
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.listId = listId;
    }

    public ToDoModel() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Long getListId() {
        return listId;
    }

    public void setListId(Long listId) {
        this.listId = listId;
    }
}
