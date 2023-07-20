package com.example.championship.controller;


import com.example.championship.model.Team;
import com.example.championship.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
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
    public ResponseEntity<?> addTeam(@RequestBody Team team) {
        try {
            teamService.addTeam(team);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Error e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateTeam(@RequestBody Team team) {
        try {
            teamService.updateTeam(team);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Error e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
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
