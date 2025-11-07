package com.example.demo.service;

import com.example.demo.domain.*;
import com.example.demo.dto.CarNamesDto;
import com.example.demo.dto.RaceResultDto;
import com.example.demo.repository.CarRepository;
import com.example.demo.repository.WinnerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Transactional
public class RacingGameService {

    private final CarRepository carRepository;
    private final WinnerRepository winnerRepository;

    @Autowired
    public RacingGameService(CarRepository carRepository, WinnerRepository winnerRepository) {
        this.carRepository = carRepository;
        this.winnerRepository = winnerRepository;
    }

    public void saveCars(Cars cars) {
        carRepository.deleteAll();

        for (Car car : cars.getCars()) {
            carRepository.save(car);
        }
    }

    public void saveWinners(List<String> winners) {
        Winners pastWinners = new Winners(winners);
        winnerRepository.save(pastWinners);
    }

    public RaceResultDto playRace(AttemptsCount attemptsCount) {
        List<List<RoundResult>> raceProgress = new ArrayList<>();
        CarRandomMoveGenerator carRandomMoveGenerator = new CarRandomMoveGenerator();

        for (int i = 0; i < attemptsCount.getAttemptsCount(); i++) {
            List<RoundResult> roundResults = new ArrayList<>();

            for (Car car : findCars()) {
                car.move(carRandomMoveGenerator.generate());
                System.out.println(car.getPosition());
                roundResults.add(new RoundResult(car.getName(), car.getPosition()));
            }

            raceProgress.add(roundResults);
        }

        return new RaceResultDto(raceProgress, findWinners());
    }

    private List<String> findWinners() {
        List<Car> cars = findCars();
        List<String> winners = new ArrayList<>();

        for (Car car : cars) {
            if (car.getPosition() == getMaxPosition(cars)) {
                winners.add(car.getName());
            }
        }

        return winners;
    }

    public CarNamesDto getCarNames() {
        List<String> carNames = new ArrayList<>();

        for (Car car : findCars()) {
            carNames.add(car.getName());
        }

        return new CarNamesDto(carNames);
    }

    private int getMaxPosition(List<Car> cars) {
        return cars.stream()
                .mapToInt(Car::getPosition)
                .max()
                .orElse(0);
    }

    private List<Car> findCars() {
        return carRepository.findAll();
    }
}
