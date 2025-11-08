package racingcar;

import racingcar.repository.CarRepository;
import racingcar.repository.SpringDataJpaWinnerRepository;
import racingcar.service.RacingGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    private final CarRepository carRepository;
    private final SpringDataJpaWinnerRepository springDataJpaWinnerRepository;

    @Autowired
    public SpringConfig(CarRepository carRepository, SpringDataJpaWinnerRepository springDataJpaWinnerRepository) {
        this.carRepository = carRepository;
        this.springDataJpaWinnerRepository = springDataJpaWinnerRepository;
    }

    @Bean
    public RacingGameService racingGameService() {
        return new RacingGameService(carRepository, springDataJpaWinnerRepository);
    }
}
