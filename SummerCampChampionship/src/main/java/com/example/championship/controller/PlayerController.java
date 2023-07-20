package com.example.championship.controller;

import com.example.championship.model.Player;
import com.example.championship.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @GetMapping("/all")
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }


    @GetMapping("all/sort={sort}")
    public List<Player> getAllPlayersSorted(@PathVariable("sort") String sort) {
        return playerService.getAllPlayersSorted(sort);
    }


    @GetMapping("/id={id}")
    public Player getPlayerById(@PathVariable("id") int id) {
        return playerService.getPlayerById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPlayer(@RequestBody Player player) {
        try {
            playerService.addPlayer(player);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/update")
    public ResponseEntity<?> updatePlayer(@RequestBody Player player) {
        try {
            playerService.updatePlayer(player);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete")
    public void deletePlayer(@RequestBody Player player) {
        playerService.deletePlayer(player);
    }

    @DeleteMapping("/delete/id={id}")
    public void deletePlayerById(@PathVariable("id") Long id) {
        playerService.deletePlayerById(id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAllPlayers() {
        playerService.deleteAllPlayers();
    }
}
