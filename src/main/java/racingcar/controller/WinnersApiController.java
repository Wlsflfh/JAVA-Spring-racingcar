package racingcar.controller;

import org.springframework.web.bind.annotation.*;
import racingcar.domain.ClassicWinners;
import racingcar.repository.SpringDataJpaClassicWinnerRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class WinnersApiController {

    private final SpringDataJpaClassicWinnerRepository springDataJpaClassicWinnerRepository;

    public WinnersApiController(SpringDataJpaClassicWinnerRepository springDataJpaClassicWinnerRepository) {
        this.springDataJpaClassicWinnerRepository = springDataJpaClassicWinnerRepository;
    }

    /**
     * 역대 우승자 목록 반환 (예시: [["pobi", "woni"], ["jun"]])
     */
    @GetMapping("/winners")
    public List<List<String>> getWinners() {
        List<ClassicWinners> entities = springDataJpaClassicWinnerRepository.findAll();
        return entities.stream()
                .map(ClassicWinners::getWinners)
                .collect(Collectors.toList());
    }
}

