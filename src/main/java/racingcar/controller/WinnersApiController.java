package racingcar.controller;

import org.springframework.web.bind.annotation.*;
import racingcar.domain.ClassicWinners;
import racingcar.domain.ItemWinners;
import racingcar.repository.SpringDataJpaClassicWinnerRepository;
import racingcar.repository.SpringDataJpaItemWinnerRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/racing")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class WinnersApiController {

    private final SpringDataJpaClassicWinnerRepository springDataJpaClassicWinnerRepository;
    private final SpringDataJpaItemWinnerRepository springDataJpaItemWinnerRepository;

    public WinnersApiController(SpringDataJpaClassicWinnerRepository springDataJpaClassicWinnerRepository, SpringDataJpaItemWinnerRepository springDataJpaItemWinnerRepository) {
        this.springDataJpaClassicWinnerRepository = springDataJpaClassicWinnerRepository;
        this.springDataJpaItemWinnerRepository = springDataJpaItemWinnerRepository;
    }

    @GetMapping("/classic/winners")
    public List<List<String>> getClassicWinners() {
        List<ClassicWinners> entities = springDataJpaClassicWinnerRepository.findAll();
        return entities.stream()
                .map(ClassicWinners::getWinners)
                .collect(Collectors.toList());
    }

    @GetMapping("/item/winners")
    public List<List<String>> getItemWinners() {
        List<ItemWinners> entities = springDataJpaItemWinnerRepository.findAll();
        return entities.stream()
                .map(ItemWinners::getWinners)
                .collect(Collectors.toList());
    }
}

