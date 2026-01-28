package com.example.fitness.service;

import com.example.fitness.model.User;
import com.example.fitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Add a new user
    public User addUser(User user) {
        return userRepository.save(user);
    }

    // Get a user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Update a user by ID
    public User updateUser(Long id, User user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setName(user.getName());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setAge(user.getAge());
            updatedUser.setPassword(user.getPassword());
            return userRepository.save(updatedUser);
        } else {
            return null; // User not found
        }
    }

    // Delete a user by ID
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        } else {
            return false; // User not found
        }
    }
}