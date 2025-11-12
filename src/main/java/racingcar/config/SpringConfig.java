package racingcar.config;

import racingcar.repository.SpringDataJpaCarRepository;
import racingcar.repository.SpringDataJpaWinnerRepository;
import racingcar.service.RacingGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    private final SpringDataJpaCarRepository springDataJpaCarRepository;
    private final SpringDataJpaWinnerRepository springDataJpaWinnerRepository;

    @Autowired
    public SpringConfig(SpringDataJpaCarRepository springDataJpaCarRepository, SpringDataJpaWinnerRepository springDataJpaWinnerRepository) {
        this.springDataJpaCarRepository = springDataJpaCarRepository;
        this.springDataJpaWinnerRepository = springDataJpaWinnerRepository;
    }

    @Bean
    public RacingGameService racingGameService() {
        return new RacingGameService(springDataJpaCarRepository, springDataJpaWinnerRepository);
    }
}
