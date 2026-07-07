package com.slfs.controller;
import com.slfs.model.StudySession;
import com.slfs.repository.StudySessionRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/study")
@CrossOrigin(origins = "*")
public class StudyController {

    @Autowired
    private StudySessionRepository repo;

    @PostMapping("/save")
public StudySession save(@RequestBody StudySession session) {

    System.out.println("Saving Session");
    System.out.println(session.getTaskName());

    return repo.save(session);
}

    @GetMapping("/all")
    public List<StudySession> getAllSessions() {
        return repo.findAll();
    }

    @GetMapping("/subjects")
    public List<StudySession> getSubjectWiseData() {
        return repo.findAll();
    }
}