package com.slfs.controller;
import com.slfs.model.Task;
import com.slfs.service.TaskService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService service;

    @PostMapping
    public Task addTask(@RequestBody Task task) {

        task.setStudyHours(0.0);
task.setFocusScore(0);

task.setAllowedBreaks(5);
task.setUsedBreaks(0);
task.setRemainingBreaks(5);

task.setCompleted(false);

        return service.saveTask(task);
    }

    @GetMapping
    public List<Task> getTasks() {
        return service.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTask(@PathVariable Long id) {
        return service.getTaskById(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task task) {

        task.setId(id);

        return service.saveTask(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        service.deleteTask(id);
    }

    @PutMapping("/{id}/break")
    public Task takeBreak(@PathVariable Long id) {

        Task task = service.getTaskById(id);

        if (task == null) {
            return null;
        }

        if (task.getRemainingBreaks() > 0) {

            task.setUsedBreaks(task.getUsedBreaks() + 1);

            task.setRemainingBreaks(task.getRemainingBreaks() - 1);
        }

        return service.saveTask(task);
    }
}