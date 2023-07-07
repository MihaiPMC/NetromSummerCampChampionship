package com.example.championship.controller;

import com.example.championship.model.Player;
import com.example.championship.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @GetMapping("/all")
    public List<Player> getAllPlayers(){
        return playerService.getAllPlayers();
    }

    @PostMapping("/add")
    public void addPlayer(Player player) {
        playerService.addPlayer(player);
    }

    @PostMapping("/update")
    public void updatePlayer(Player player) {
        playerService.updatePlayer(player);
    }

    @PostMapping("/delete")
    public void deletePlayer(Player player) {
        playerService.deletePlayer(player);
    }

}
