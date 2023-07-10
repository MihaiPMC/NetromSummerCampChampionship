package com.example.championship.repository;
import com.example.championship.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {

    List<Game> findAllByOrderByIdAsc();

    List<Game> findAllByOrderByTeam1Asc();

    List<Game> findAllByOrderByTeam2Asc();

    List<Game> findAllByOrderByScore1Asc();

    List<Game> findAllByOrderByScore2Asc();

}
