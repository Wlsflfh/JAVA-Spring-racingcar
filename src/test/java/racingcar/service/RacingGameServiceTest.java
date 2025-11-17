package racingcar.service;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import racingcar.domain.AttemptsCount;
import racingcar.domain.Cars;
import racingcar.domain.ClassicWinners;
import racingcar.domain.ItemWinners;
import racingcar.dto.RaceResultDto;
import racingcar.repository.SpringDataJpaCarRepository;
import racingcar.repository.SpringDataJpaClassicWinnerRepository;
import racingcar.repository.SpringDataJpaItemWinnerRepository;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class RacingGameServiceTest {

    @Autowired
    private RacingGameService racingGameService;

    @Autowired
    private SpringDataJpaCarRepository carRepository;

    @Autowired
    private SpringDataJpaClassicWinnerRepository classicWinnerRepository;

    @Autowired
    private SpringDataJpaItemWinnerRepository ItemWinnerRepository;

    @BeforeEach
    void setUp() {
        carRepository.deleteAll();
        classicWinnerRepository.deleteAll();
        ItemWinnerRepository.deleteAll();
    }

    @Test
    @DisplayName("자동차 이름들을 저장하고 불러올 수 있다")
    void saveAndGetCarNames() {
        // given
        Cars cars = new Cars("pobi,woni,jun");

        // when
        racingGameService.saveCars(cars);
        var carNamesDto = racingGameService.getCarNames();

        // then
        assertThat(carNamesDto.getCarNames()).containsExactlyInAnyOrder("pobi", "woni", "jun");
    }

    @Test
    @DisplayName("클래식 모드에서 시도 횟수만큼 경주를 진행하고 결과를 반환한다")
    void playClassicRace() {
        // given
        Cars cars = new Cars("pobi,woni");
        racingGameService.saveCars(cars);
        AttemptsCount attemptsCount = new AttemptsCount(3);

        // when
        RaceResultDto result = racingGameService.playClassicRace(attemptsCount);

        // then
        assertThat(result.getRaceProgress()).hasSize(3);
        assertThat(result.getRaceProgress().get(0)).isNotEmpty();
        assertThat(result.getWinners()).isNotEmpty();
    }

    @Test
    @DisplayName("클래식 모드 우승자를 DB에 저장할 수 있다")
    void saveClassicWinners() {
        // given
        List<String> winners = Arrays.asList("pobi", "woni");

        // when
        racingGameService.saveClassicWinners(winners);

        // then
        List<ClassicWinners> saved = classicWinnerRepository.findAll();
        assertThat(saved).hasSize(1);

        List<String> winnerNames = saved.get(0).getWinners();
        assertThat(winnerNames).containsExactlyInAnyOrder("pobi", "woni");
    }

    @Test
    @DisplayName("아이템 모드 우승자를 DB에 저장할 수 있다")
    void saveItemWinners() {
        // given
        List<String> winners = Arrays.asList("pobi", "woni");

        // when
        racingGameService.saveItemWinners(winners);

        // then
        List<ItemWinners> saved = ItemWinnerRepository.findAll();
        assertThat(saved).hasSize(1);

        List<String> winnerNames = saved.get(0).getWinners();
        assertThat(winnerNames).containsExactlyInAnyOrder("pobi", "woni");
    }
}
