package racingcar.service;

import racingcar.domain.*;
import racingcar.domain.random.CarRandomMoveGenerator;
import racingcar.domain.random.RandomItemGenerator;
import racingcar.dto.CarNamesDto;
import racingcar.dto.RaceResultDto;
import racingcar.repository.SpringDataJpaCarRepository;
import racingcar.repository.SpringDataJpaClassicWinnerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import racingcar.repository.SpringDataJpaItemWinnerRepository;

import java.util.ArrayList;
import java.util.List;

@Transactional
public class RacingGameService {

    private final SpringDataJpaCarRepository springDataJpaCarRepository;
    private final SpringDataJpaClassicWinnerRepository springDataJpaClassicWinnerRepository;
    private final SpringDataJpaItemWinnerRepository springDataJpaItemWinnerRepository;

    @Autowired
    public RacingGameService(SpringDataJpaCarRepository springDataJpaCarRepository, SpringDataJpaClassicWinnerRepository springDataJpaClassicWinnerRepository, SpringDataJpaItemWinnerRepository springDataJpaItemWinnerRepository) {
        this.springDataJpaCarRepository = springDataJpaCarRepository;
        this.springDataJpaClassicWinnerRepository = springDataJpaClassicWinnerRepository;
        this.springDataJpaItemWinnerRepository = springDataJpaItemWinnerRepository;
    }

    public void saveCars(Cars cars) {
        springDataJpaCarRepository.deleteAll();
        springDataJpaCarRepository.saveAll(cars.getCars());
    }

    public void saveClassicWinners(List<String> winners) {
        springDataJpaClassicWinnerRepository.save(new ClassicWinners(winners));
    }

    public void saveItemWinners(List<String> winners) {
        springDataJpaItemWinnerRepository.save(new ItemWinners(winners));
    }

    public RaceResultDto playClassicRace(AttemptsCount attemptsCount) {
        List<List<RoundResult>> raceProgress = new ArrayList<>();
        CarRandomMoveGenerator carRandomMoveGenerator = new CarRandomMoveGenerator();
        List<Car> cars = findCars();

        for (int i = 0; i < attemptsCount.getAttemptsCount(); i++) {
            List<RoundResult> roundResults = new ArrayList<>();

            for (Car car : cars) {
                int randomNumber = carRandomMoveGenerator.generate();
                car.move(randomNumber);
                roundResults.add(new RoundResult(car.getName(), car.getPosition(), randomNumber));
            }

            raceProgress.add(roundResults);
        }

        return new RaceResultDto(raceProgress, findWinners(getMaxPosition(cars)));
    }

    public RaceResultDto playItemRace(GoalDistance goalDistance) {
        List<List<RoundResult>> raceProgress = new ArrayList<>();

        RandomItemGenerator randomItemGenerator = new RandomItemGenerator();

        boolean goalReached = false;
        List<Car> cars = findCars();

        while (!goalReached) {
            List<RoundResult> roundResults = new ArrayList<>();

            for (Car car : cars) {
                int randomItemNumber = randomItemGenerator.generate();
                car.itemMove(Item.from(randomItemNumber).getEffect());
                roundResults.add(new RoundResult(car.getName(), car.getPosition(), randomItemNumber));
            }

            raceProgress.add(roundResults);

            goalReached = cars.stream().anyMatch(car -> car.getPosition() >= goalDistance.getGoalDistance());
        }

        return new RaceResultDto(raceProgress, findWinners(goalDistance.getGoalDistance()));
    }

    private List<String> findWinners(int goal) {
        List<Car> cars = findCars();
        List<String> winners = new ArrayList<>();

        for (Car car : cars) {
            if (car.getPosition() >= goal) {
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
