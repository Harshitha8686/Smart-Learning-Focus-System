package com.slfs.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class StudySession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String taskName;

    private Integer targetHours;

    private LocalDate date;

    private Integer studiedTime;
    private Integer focusScore;

private Integer facePresence;

private Integer eyeTracking;

private Integer websiteDiscipline;

private Integer breakDiscipline;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Integer getTargetHours() {
        return targetHours;
    }

    public void setTargetHours(Integer targetHours) {
        this.targetHours = targetHours;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getStudiedTime() {
        return studiedTime;
    }

    public void setStudiedTime(Integer studiedTime) {
        this.studiedTime = studiedTime;
    }
    public Integer getFocusScore() {
    return focusScore;
}

public void setFocusScore(Integer focusScore) {
    this.focusScore = focusScore;
}

public Integer getFacePresence() {
    return facePresence;
}

public void setFacePresence(Integer facePresence) {
    this.facePresence = facePresence;
}

public Integer getEyeTracking() {
    return eyeTracking;
}

public void setEyeTracking(Integer eyeTracking) {
    this.eyeTracking = eyeTracking;
}

public Integer getWebsiteDiscipline() {
    return websiteDiscipline;
}

public void setWebsiteDiscipline(Integer websiteDiscipline) {
    this.websiteDiscipline = websiteDiscipline;
}

public Integer getBreakDiscipline() {
    return breakDiscipline;
}

public void setBreakDiscipline(Integer breakDiscipline) {
    this.breakDiscipline = breakDiscipline;
}
    
}