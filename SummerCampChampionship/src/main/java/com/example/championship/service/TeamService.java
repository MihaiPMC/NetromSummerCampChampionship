package com.example.championship.service;

import com.example.championship.model.Team;
import com.example.championship.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    public List<Team> getAllTeams(){
        return teamRepository.findAll();
    }

    public void addTeam(Team team) {
        teamRepository.save(team);
    }

    public void updateTeam(Team team) {
        teamRepository.save(team);
    }

    public void deleteTeam(Team team) {
        teamRepository.delete(team);
    }

    public void deleteTeamById(Long id) {
        teamRepository.deleteById(Math.toIntExact(id));
    }

    public void deleteAllTeams() {
        teamRepository.deleteAll();
    }

    public Team getTeamById(int id) {
        return teamRepository.findById(id).get();
    }
}
