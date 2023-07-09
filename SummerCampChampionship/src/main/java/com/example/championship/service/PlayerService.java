package com.example.championship.service;

import com.example.championship.model.Player;
import com.example.championship.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepository;

    public List<Player> getAllPlayers(){
        return playerRepository.findAll();
    }

    public void addPlayer(Player player) {
        playerRepository.save(player);
    }

    public void updatePlayer(Player player) {
        playerRepository.save(player);
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

    public List<Player> getAllPlayersByTeamId(Long id) {
        return playerRepository.findAllByTeamId(id);
    }
}
