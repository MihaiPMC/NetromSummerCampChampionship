package com.example.championship.controller;


import com.example.championship.model.Team;
import com.example.championship.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/team")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping("/all")
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping("all/sort={sort}")
    public List<Team> getAllTeamsSorted(@PathVariable("sort") String sort) {
        return teamService.getAllTeamsSorted(sort);
    }

    @GetMapping("/id={id}")
    public Team getTeamById(@PathVariable("id") int id) {
        return teamService.getTeamById(id);
    }


    @PostMapping("/add")
    public void addTeam(@RequestBody Team team) {
        teamService.addTeam(team);
    }

    @PutMapping("/update")
    public void updateTeam(@RequestBody Team team) {
        teamService.updateTeam(team);
    }

    @DeleteMapping("/delete")
    public void deleteTeam(@RequestBody Team team) {
        teamService.deleteTeam(team);
    }

    @DeleteMapping("/delete/id={id}")
    public void deleteTeamById(@PathVariable("id") Long id) {
        teamService.deleteTeamById(id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAllTeams() {
        teamService.deleteAllTeams();
    }
}
