package com.slfs.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class StudyStreak {

    @Id
    private Long id = 1L;

    private Integer streak = 0;

    private LocalDate lastCompletedDate;

    public StudyStreak() {}

    public Long getId() {
        return id;
    }

    public Integer getStreak() {
        return streak;
    }

    public void setStreak(Integer streak) {
        this.streak = streak;
    }

    public LocalDate getLastCompletedDate() {
        return lastCompletedDate;
    }

    public void setLastCompletedDate(LocalDate lastCompletedDate) {
        this.lastCompletedDate = lastCompletedDate;
    }
}