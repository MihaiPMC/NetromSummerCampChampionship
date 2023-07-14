package com.example.championship.service;

import com.example.championship.model.Player;
import com.example.championship.repository.PlayerRepository;
import com.example.championship.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private TeamRepository teamRepository;

    public List<Player> getAllPlayers(){
        return playerRepository.findAllByOrderByIdAsc();
    }

    public void addPlayer(Player player) {
        if (teamRepository.findById(player.getTeam().getId()).isPresent()){
            playerRepository.save(player);
        }
        else
        {
            throw new Error("Team with id " + player.getTeam().getId() + " does not exist");
        }
    }

    public void updatePlayer(Player player) {
        if (teamRepository.findById(player.getTeam().getId()).isPresent()){
            playerRepository.save(player);
        }
        else
        {
            throw new Error("Team with id " + player.getTeam().getId() + " does not exist");
        }
    }

    public void deletePlayer(Player player) {
        playerRepository.delete(player);
    }

    public void deletePlayerById(Long id) {
        playerRepository.deleteById(Math.toIntExact(id));
    }

    public void deleteAllPlayers() {
        playerRepository.deleteAll();
    }

    public Player getPlayerById(int id) {
        return playerRepository.findById(id).get();
    }

    public List<Player> getAllPlayersSorted(String sort) {
        sort = sort.toLowerCase();
        return switch (sort) {
            case "id" -> playerRepository.findAllByOrderByIdAsc();
            case "first_name" -> playerRepository.findAllByOrderByFirstNameAsc();
            case "last_name" -> playerRepository.findAllByOrderByLastNameAsc();
            case "age" -> playerRepository.findAllByOrderByAgeAsc();
            case "team" -> playerRepository.findAllByOrderByTeamAsc();
            default -> playerRepository.findAll();
        };
    }
}
