package com.slfs.repository;

import com.slfs.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository
        extends JpaRepository<User, Long> {

    User findByEmail(String email);

    User findByEmailAndPassword(
            String email,
            String password
    );
}