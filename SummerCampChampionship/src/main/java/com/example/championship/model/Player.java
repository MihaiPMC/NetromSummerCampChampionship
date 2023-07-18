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

    @Column(name = "player_first_name")
    private String firstName;

    @Column(name = "player_last_name")
    private String lastName;

    @Column(name = "player_age")
    private int age;

    @Column(name = "type")
    private String type;

    //@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;


}
