//package racingcar.controller;
//
//import racingcar.domain.AttemptsCount;
//import racingcar.domain.Cars;
//import racingcar.dto.ClassicRaceResultDto;
//import racingcar.service.RacingGameService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//@Controller
//public class RacingGameController {
//
//    private final RacingGameService racingGameService;
//
//    @Autowired
//    public RacingGameController(RacingGameService racingGameService) {
//        this.racingGameService = racingGameService;
//    }
//
//    @PostMapping("/race/setup")
//    public String setupRace(@RequestParam("carNames") String carNames, Model model) {
//        try {
//            Cars cars = new Cars(carNames);
//            racingGameService.saveCars(cars);
//            model.addAttribute("carNames", racingGameService.getCarNames());
//
//            return "attempts";
//        } catch (IllegalArgumentException e) {
//            model.addAttribute("error", e.getMessage());
//
//            return "home";
//        }
//    }
//
//    @PostMapping("/race/start")
//    public String startRace(@RequestParam("attempts") int attempts, Model model) {
//        try {
//            AttemptsCount attemptsCount = new AttemptsCount(attempts);
//            ClassicRaceResultDto raceResultDto = racingGameService.playClassicRace(attemptsCount);
//
//            model.addAttribute("raceResults", raceResultDto);
//            model.addAttribute("carNames", racingGameService.getCarNames());
//
//            racingGameService.saveWinners(raceResultDto.getWinners());
//            return "race";
//        } catch (IllegalArgumentException e) {
//            model.addAttribute("error", e.getMessage());
//
//            return "attempts";
//        }
//    }
//}
