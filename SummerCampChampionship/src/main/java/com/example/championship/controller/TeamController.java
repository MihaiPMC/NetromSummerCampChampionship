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


}
