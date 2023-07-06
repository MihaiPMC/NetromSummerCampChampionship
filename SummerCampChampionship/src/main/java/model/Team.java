package model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "team")
public class Team {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private int id;

    @Column(name = "team_type")
    private String type;

    @Column(name = "team_name")
    private String name;

    @OneToMany(mappedBy = "team")
    private List<Player> player;


    //games

}
