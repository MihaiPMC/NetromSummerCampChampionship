package com.example.championship.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "player")
@Data
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "player_name")
    private String name;

    @Column(name = "player_age")
    private int age;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;


}
