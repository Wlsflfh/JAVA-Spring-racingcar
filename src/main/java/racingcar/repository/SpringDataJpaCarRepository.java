package racingcar.repository;

import racingcar.domain.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataJpaCarRepository extends JpaRepository<Car, Long> {
}
