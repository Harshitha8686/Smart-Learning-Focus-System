package com.slfs.controller;
import com.slfs.model.User;
import com.slfs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService service;
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

   // @PostMapping("/login")
    //public String login(@RequestBody User user) {
        //User existingUser =
       //         service.login(user.getEmail(), user.getPassword());

        //if(existingUser != null) {
          //  return "SUCCESS";
        //}
        //return "INVALID";
    //}
}