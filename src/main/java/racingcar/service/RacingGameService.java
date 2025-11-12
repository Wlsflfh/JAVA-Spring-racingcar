package racingcar.service;

import racingcar.domain.*;
import racingcar.dto.CarNamesDto;
import racingcar.dto.RaceResultDto;
import racingcar.repository.SpringDataJpaCarRepository;
import racingcar.repository.SpringDataJpaWinnerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Transactional
public class RacingGameService {

    private final SpringDataJpaCarRepository springDataJpaCarRepository;
    private final SpringDataJpaWinnerRepository springDataJpaWinnerRepository;

    @Autowired
    public RacingGameService(SpringDataJpaCarRepository springDataJpaCarRepository, SpringDataJpaWinnerRepository springDataJpaWinnerRepository) {
        this.springDataJpaCarRepository = springDataJpaCarRepository;
        this.springDataJpaWinnerRepository = springDataJpaWinnerRepository;
    }

    public void saveCars(Cars cars) {
        springDataJpaCarRepository.deleteAll();
        springDataJpaCarRepository.saveAll(cars.getCars());
    }

    public void saveWinners(List<String> winners) {
        Winners pastWinners = new Winners(winners);
        springDataJpaWinnerRepository.save(pastWinners);
    }

    public RaceResultDto playRace(AttemptsCount attemptsCount) {
        List<List<RoundResult>> raceProgress = new ArrayList<>();
        CarRandomMoveGenerator carRandomMoveGenerator = new CarRandomMoveGenerator();

        for (int i = 0; i < attemptsCount.getAttemptsCount(); i++) {
            List<RoundResult> roundResults = new ArrayList<>();

            for (Car car : findCars()) {
                int randomNumber = carRandomMoveGenerator.generate();
                car.move(randomNumber);
                roundResults.add(new RoundResult(car.getName(), car.getPosition(), randomNumber));
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
        return springDataJpaCarRepository.findAll();
    }
}
