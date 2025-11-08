package racingcar.repository;

import racingcar.domain.Car;

import java.util.List;

public interface CarRepository {

    Car save(Car car);
    void deleteAll();
    List<Car> findAll();
}
