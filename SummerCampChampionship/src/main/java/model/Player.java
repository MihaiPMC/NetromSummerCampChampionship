package model;


import jakarta.persistence.*;

@Entity
@Table(name = "player")
public class Player {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private int id;

    @Column(name = "player_name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;


}
