package racingcar.controller;

import org.springframework.web.bind.annotation.*;
import racingcar.domain.Winners;
import racingcar.repository.SpringDataJpaWinnerRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class WinnersApiController {

    private final SpringDataJpaWinnerRepository springDataJpaWinnerRepository;

    public WinnersApiController(SpringDataJpaWinnerRepository springDataJpaWinnerRepository) {
        this.springDataJpaWinnerRepository = springDataJpaWinnerRepository;
    }

    /**
     * 역대 우승자 목록 반환 (예시: [["pobi", "woni"], ["jun"]])
     */
    @GetMapping("/winners")
    public List<List<String>> getWinners() {
        List<Winners> entities = springDataJpaWinnerRepository.findAll();
        return entities.stream()
                .map(Winners::getWinners)
                .collect(Collectors.toList());
    }
}

