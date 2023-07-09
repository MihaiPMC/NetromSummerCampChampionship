package com.example.championship.controller;

import com.example.championship.model.Game;
import com.example.championship.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game")
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping("/all")
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @GetMapping("/one/{id}")
    public List<Game> getAllGamesByChampionshipId(@PathVariable("id") Long id) {
        return gameService.getAllGamesByChampionshipId(id);
    }

    @PostMapping("/add")
    public void addGame(@RequestBody Game game) {
        gameService.addGame(game);
    }

    @PutMapping("/update")
    public void updateGame(@RequestBody Game game) {
        gameService.updateGame(game);
    }

    @DeleteMapping("/delete")
    public void deleteGame(@RequestBody Game game) {
        gameService.deleteGame(game);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGameById(@PathVariable("id") Long id) {
        gameService.deleteGameById(id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAllGames() {
        gameService.deleteAllGames();
    }
}
