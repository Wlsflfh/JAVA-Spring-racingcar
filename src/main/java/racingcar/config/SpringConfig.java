package racingcar.config;

import racingcar.repository.SpringDataJpaCarRepository;
import racingcar.repository.SpringDataJpaClassicWinnerRepository;
import racingcar.repository.SpringDataJpaItemWinnerRepository;
import racingcar.service.RacingGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    private final SpringDataJpaCarRepository springDataJpaCarRepository;
    private final SpringDataJpaClassicWinnerRepository springDataJpaClassicWinnerRepository;
    private final SpringDataJpaItemWinnerRepository springDataJpaItemWinnerRepository;

    @Autowired
    public SpringConfig(SpringDataJpaCarRepository springDataJpaCarRepository, SpringDataJpaClassicWinnerRepository springDataJpaClassicWinnerRepository, SpringDataJpaItemWinnerRepository springDataJpaItemWinnerRepository) {
        this.springDataJpaCarRepository = springDataJpaCarRepository;
        this.springDataJpaClassicWinnerRepository = springDataJpaClassicWinnerRepository;
        this.springDataJpaItemWinnerRepository = springDataJpaItemWinnerRepository;
    }

    @Bean
    public RacingGameService racingGameService() {
        return new RacingGameService(springDataJpaCarRepository, springDataJpaClassicWinnerRepository, springDataJpaItemWinnerRepository);
    }
}
