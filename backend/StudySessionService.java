package com.slfs.service;

import com.slfs.model.StudySession;
import com.slfs.repository.StudySessionRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudySessionService {

    @Autowired
    private StudySessionRepository repository;

    public StudySession saveSession(
            StudySession session) {

        return repository.save(session);
    }

    public List<StudySession> getAllSessions() {

        return repository.findAll();
    }
}