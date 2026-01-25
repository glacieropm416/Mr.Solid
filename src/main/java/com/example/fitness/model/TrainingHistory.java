package com.example.fitness.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class TrainingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String activity;
    private int duration; // minutes
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public TrainingHistory() {}

    // getters and setters
}
