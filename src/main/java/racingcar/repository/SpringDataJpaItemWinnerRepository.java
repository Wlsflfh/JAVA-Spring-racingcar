package racingcar.repository;

import racingcar.domain.ItemWinners;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataJpaItemWinnerRepository extends JpaRepository<ItemWinners, Long> {
}
