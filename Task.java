package com.slfs.model;

import jakarta.persistence.*;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String taskName;

    private Double studyHours = 0.0;
    private Double targetHours = 1.0;

    private Integer focusScore = 0;

    private Integer allowedBreaks = 5;

    private Integer usedBreaks = 0;

    private Integer remainingBreaks = 5;

    private Boolean completed = false;

    public Task() {
    }

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

    public Double getStudyHours() {
        return studyHours;
    }

    public void setStudyHours(Double studyHours) {
        this.studyHours = studyHours;
    }

    public Double getTargetHours() {
        return targetHours;
    }

    public void setTargetHours(Double targetHours) {
        this.targetHours = targetHours;
    }

    public Integer getFocusScore() {
        return focusScore;
    }

    public void setFocusScore(Integer focusScore) {
        this.focusScore = focusScore;
    }

    public Integer getAllowedBreaks() {
        return allowedBreaks;
    }

    public void setAllowedBreaks(Integer allowedBreaks) {
        this.allowedBreaks = allowedBreaks;
    }

    public Integer getUsedBreaks() {
        return usedBreaks;
    }

    public void setUsedBreaks(Integer usedBreaks) {
        this.usedBreaks = usedBreaks;
    }

    public Integer getRemainingBreaks() {
        return remainingBreaks;
    }

    public void setRemainingBreaks(Integer remainingBreaks) {
        this.remainingBreaks = remainingBreaks;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}