package com.slfs.controller;
import com.slfs.model.StudyStreak;
import com.slfs.repository.StudyStreakRepository;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/streak")
@CrossOrigin(origins = "*")
public class StudyStreakController {

    @Autowired
    private StudyStreakRepository repo;

    @PostMapping("/complete")
    public StudyStreak completeStudy() {

        LocalDate today = LocalDate.now();

        StudyStreak streak =
                repo.findById(1L).orElse(new StudyStreak());

        if (streak.getLastCompletedDate() == null) {

            streak.setStreak(1);

        }

        else if (streak.getLastCompletedDate().equals(today)) {

            return streak;

        }

        else if (streak.getLastCompletedDate()
                .plusDays(1)
                .equals(today)) {

            streak.setStreak(
                    streak.getStreak() + 1
            );

        }

        else {

            streak.setStreak(1);

        }

        streak.setLastCompletedDate(today);

        return repo.save(streak);
    }

    @GetMapping
    public StudyStreak getStreak() {

        return repo.findById(1L)
                .orElse(new StudyStreak());

    }
}