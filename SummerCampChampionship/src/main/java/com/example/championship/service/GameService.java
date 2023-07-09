package com.example.championship.service;

import com.example.championship.model.Game;
import com.example.championship.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    public List<Game>getAllGames(){
        return gameRepository.findAll();
    }

    public void addGame(Game game) {
        gameRepository.save(game);
    }

    public void updateGame(Game game) {
        gameRepository.save(game);
    }

    public void deleteGame(Game game) {
        gameRepository.delete(game);
    }

    public void deleteGameById(Long id) {
        gameRepository.deleteById(Math.toIntExact(id));
    }

    public void deleteAllGames() {
        gameRepository.deleteAll();
    }

    public List<Game> getAllGamesByChampionshipId(Long id) {
        return gameRepository.findAllByChampionshipId(id);
    }
}
