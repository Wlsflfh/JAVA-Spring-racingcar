package com.example.demo;

import com.example.demo.repository.CarRepository;
import com.example.demo.repository.WinnerRepository;
import com.example.demo.service.RacingGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    private final CarRepository carRepository;
    private final WinnerRepository winnerRepository;

    @Autowired
    public SpringConfig(CarRepository carRepository, WinnerRepository winnerRepository) {
        this.carRepository = carRepository;
        this.winnerRepository = winnerRepository;
    }

    @Bean
    public RacingGameService racingGameService() {
        return new RacingGameService(carRepository, winnerRepository);
    }
}
