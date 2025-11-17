package racingcar.repository;

import racingcar.domain.ClassicWinners;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataJpaClassicWinnerRepository extends JpaRepository<ClassicWinners, Long> {
}
