package com.example.demo.controller;

import com.example.demo.domain.Winners;
import com.example.demo.repository.WinnerRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class WinnerController {

    private final WinnerRepository winnerRepository;

    public WinnerController(WinnerRepository winnerRepository) {
        this.winnerRepository = winnerRepository;
    }

    @GetMapping("/winners")
    public String showWinners(Model model) {
        List<Winners> winners = winnerRepository.findAll();
        model.addAttribute("winners", winners);
        return "winners";
    }
}