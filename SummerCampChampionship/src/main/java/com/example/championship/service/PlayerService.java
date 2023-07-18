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
        String teamName = player.getTeam().getName();
        String gameType = player.getTeam().getType();

        player.setTeam(teamRepository.findByNameAndType(teamName, gameType));
        player.setType(gameType);

        if (player.getTeam() != null){
            playerRepository.save(player);
        }
        else
        {
            throw new Error("Team with name " + teamName + " and type " + gameType + " does not exist");
        }
    }

    public void updatePlayer(Player player) {
        String teamName = player.getTeam().getName();
        String gameType = player.getTeam().getType();

        player.setTeam(teamRepository.findByNameAndType(teamName, gameType));
        player.setType(gameType);

        if (player.getTeam() != null){
            playerRepository.save(player);
        }
        else
        {
            throw new Error("Team with name " + teamName + " and type " + gameType + " does not exist");
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
