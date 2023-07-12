package com.example.championship.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/home")
    public String getIndexPage() {
        return "index";
    }
    @GetMapping("/players")
    public String getPlayersPage() {
        return "playerPage";
    }

    @GetMapping("/teams")
    public String getTeamsPage() {
        return "teamPage";
    }

    @GetMapping("/games")
    public String getGamesPage() {
        return "gamePage";
    }
}
