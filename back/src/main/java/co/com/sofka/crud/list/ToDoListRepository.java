package co.com.sofka.crud.list;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ToDoListRepository extends CrudRepository<ToDoList,Long> {


}
