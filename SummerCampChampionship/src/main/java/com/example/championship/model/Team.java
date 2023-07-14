package com.example.championship.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "team",
        uniqueConstraints = @UniqueConstraint(columnNames = {"team_name", "team_type"}))
@Data
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "team_type")
    private String type;

    @Column(name = "team_name")
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "team")
    private List<Player> player;

    @JsonIgnore
    @OneToMany(mappedBy = "team1")
    private List<Game> team1Games;

    @JsonIgnore
    @OneToMany(mappedBy = "team2")
    private List<Game> team2Games;
}
