package racingcar.repository;

import racingcar.domain.Winners;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataJpaWinnerRepository extends JpaRepository<Winners, Long> {
}
