package com.slfs.service;

import com.slfs.model.Task;
import com.slfs.repository.TaskRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    public Task saveTask(Task task) {
        return repository.save(task);
    }

    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    public void deleteTask(Long id) {
        repository.deleteById(id);
    }

    public Task getTaskById(Long id) {
        return repository.findById(id).orElse(null);
    }
    
}