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

    public Game getGameById(int id) {
        return gameRepository.findById(id).get();
    }

    public List<Game> getAllGamesSorted(String sort) {
        sort = sort.toLowerCase();
        return switch (sort) {
            case "id" -> gameRepository.findAllByOrderByIdAsc();
            case "team1" -> gameRepository.findAllByOrderByTeam1Asc();
            case "team2" -> gameRepository.findAllByOrderByTeam2Asc();
            case "score1" -> gameRepository.findAllByOrderByScore1Asc();
            case "score2" -> gameRepository.findAllByOrderByScore2Asc();
            default -> gameRepository.findAll();
        };
    }
}
