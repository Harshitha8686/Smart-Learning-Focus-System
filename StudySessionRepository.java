package com.slfs.repository;

import com.slfs.model.StudySession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudySessionRepository
        extends JpaRepository<StudySession, Long> {
}