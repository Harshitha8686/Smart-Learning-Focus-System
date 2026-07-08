package com.slfs.repository;

import com.slfs.model.StudyStreak;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyStreakRepository
        extends JpaRepository<StudyStreak, Long> {
}