//package racingcar.controller;
//
//import racingcar.domain.Winners;
//import racingcar.repository.SpringDataJpaClassicWinnerRepository;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//
//import java.util.List;
//
//@Controller
//public class WinnerController {
//
//    private final SpringDataJpaClassicWinnerRepository springDataJpaWinnerRepository;
//
//    public WinnerController(SpringDataJpaClassicWinnerRepository springDataJpaWinnerRepository) {
//        this.springDataJpaWinnerRepository = springDataJpaWinnerRepository;
//    }
//
//    @GetMapping("/winners")
//    public String showWinners(Model model) {
//        List<Winners> winners = springDataJpaWinnerRepository.findAll();
//        model.addAttribute("winners", winners);
//        return "winners";
//    }
//}