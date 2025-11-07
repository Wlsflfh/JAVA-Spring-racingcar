package com.example.demo.controller;

import com.example.demo.domain.AttemptsCount;
import com.example.demo.domain.Car;
import com.example.demo.domain.CarRandomMoveGenerator;
import com.example.demo.domain.Cars;
import com.example.demo.service.RacingGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

@Controller
public class RaceController {

    private final RacingGameService racingGameService;

    @Autowired
    public RaceController(RacingGameService racingGameService) {
        this.racingGameService = racingGameService;
    }

    @PostMapping("/race/setup")
    public String setupRace(@RequestParam("carNames") String carNames, Model model) {
        try {
            Cars cars = new Cars(carNames);
            racingGameService.getCarNames();
            model.addAttribute("carNames", cars.getCars());

            return "attempts";
        } catch (IllegalArgumentException e) {
            model.addAttribute("error", e.getMessage());

            return "home";
        }
    }

    @PostMapping("/race/start")
    public String startRace(@RequestParam("attempts") int attempts, Model model) {
        try {
            AttemptsCount attemptsCount = new AttemptsCount(attempts);

        } catch (IllegalArgumentException e) {
            model.addAttribute("error", e.getMessage());

            return "attempts";
        }

        racingGameService.playRace(attemptsCount, );

        List<Map<String, Integer>> raceResults = new ArrayList<>();
        CarRandomMoveGenerator carRandomMoveGenerator = new CarRandomMoveGenerator();

        for (int i = 0; i < attemptsCount.getAttemptsCount(); i++) {
            Map<String, Integer> roundResult = new LinkedHashMap<>();

            for (Car car : cars.getCars()) {
                car.move(carRandomMoveGenerator.generate());
                roundResult.put(car.getName(), car.getPosition());
            }

            raceResults.add(roundResult);
        }

        model.addAttribute("raceResults", raceResults);
        model.addAttribute("carNames", carNameList);

        return "race";
    }
}
