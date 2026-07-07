package com.slfs.controller;

import com.slfs.model.User;
import com.slfs.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existingUser =
            userRepository.findByEmailAndPassword(
                user.getEmail(),
                user.getPassword()
            );

        if(existingUser != null){
            return "SUCCESS";
        }

        return "INVALID";
    }
}