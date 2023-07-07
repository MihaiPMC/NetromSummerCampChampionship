package com.example.championship.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "team")
@Data
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "team_type")
    private String type;

    @Column(name = "team_name")
    private String name;

    @OneToMany(mappedBy = "team")
    private List<Player> player;

    @OneToMany(mappedBy = "team1")
    private List<Game> team1Games;

    @OneToMany(mappedBy = "team2")
    private List<Game> team2Games;



}
