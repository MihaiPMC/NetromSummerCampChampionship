package com.example.championship.service;

import com.example.championship.model.Game;
import com.example.championship.repository.GameRepository;
import com.example.championship.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private TeamRepository teamRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public void addGame(Game game) {
        String team1Name = game.getTeam1().getName();
        String team2Name = game.getTeam2().getName();
        String gameType = game.getType();

        if (team2Name.equals(team1Name)) {
            throw new IllegalArgumentException("Team names are the same");
        }

        game.setTeam1(teamRepository.findByNameAndType(team1Name, gameType));
        game.setTeam2(teamRepository.findByNameAndType(team2Name, gameType));


        if (game.getTeam1() != null && game.getTeam2() != null) {
            gameRepository.save(game);
        }
        else {
            throw new Error("Team with name " + team1Name + " or " + team2Name + " and type " + gameType + " does not exist");
        }
    }

    public void updateGame(Game game) {
        String team1Name = game.getTeam1().getName();
        String team2Name = game.getTeam2().getName();
        String gameType = game.getType();

        if (team2Name.equals(team1Name)) {
            throw new IllegalArgumentException("Team names are the same");
        }

        game.setTeam1(teamRepository.findByNameAndType(team1Name, gameType));
        game.setTeam2(teamRepository.findByNameAndType(team2Name, gameType));

        if (game.getTeam1() != null && game.getTeam2() != null) {
            gameRepository.save(game);
        }
        else {
            System.out.println("Game team is null");
        }
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

    public List<Game> getAllGamesSorted(String sort, String ord) {
        ord = ord.toLowerCase();
        sort = sort.toLowerCase();

        List<Game> print = switch (sort) {
            case "id" -> gameRepository.findAllByOrderByIdAsc();
            case "team1" -> gameRepository.findAllByOrderByTeam1Asc();
            case "team2" -> gameRepository.findAllByOrderByTeam2Asc();
            case "score1" -> gameRepository.findAllByOrderByScore1Asc();
            case "score2" -> gameRepository.findAllByOrderByScore2Asc();
            default -> gameRepository.findAll();
        };

        if(ord == "desc")
        {
            for(int i = 0; i < print.size()/2; i++)
            {
                Game temp = print.get(i);
                print.set(i, print.get(print.size() - i - 1));
                print.set(print.size() - i - 1, temp);
            }
        }

        return print;

    }
}
