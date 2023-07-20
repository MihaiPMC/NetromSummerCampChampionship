package com.example.championship.controller;

import com.example.championship.model.Game;
import com.example.championship.model.Player;
import com.example.championship.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/game")
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping("/all")
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @GetMapping("/all/sort={sort}/ord={ord}")
    public List<Game> getAllGamesSorted(@PathVariable("sort") String sort, @PathVariable("ord") String ord) {
        return gameService.getAllGamesSorted(sort, ord);
    }

    @GetMapping("/id={id}")
    public Game getGameById(@PathVariable("id") int id) {
        return gameService.getGameById(id);
    }


    @PostMapping("/add")
    public ResponseEntity<?> addGame(@RequestBody Game game) {
        try {
            gameService.addGame(game);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateGame(@RequestBody Game game) {
        try {
            gameService.updateGame(game);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Error e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete")
    public void deleteGame(@RequestBody Game game) {
        gameService.deleteGame(game);
    }

    @DeleteMapping("/delete/id={id}")
    public void deleteGameById(@PathVariable("id") Long id) {
        gameService.deleteGameById(id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAllGames() {
        gameService.deleteAllGames();
    }
}
