package com.example.championship.repository;

import com.example.championship.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {

    List<Team> findAllByOrderByIdAsc();

    List<Team> findAllByOrderByNameAsc();

    List<Team> findAllByOrderByTypeAsc();

    List<Team> findAllByOrderByPlayerAsc();
}