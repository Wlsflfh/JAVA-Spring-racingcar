package racingcar.domain;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class ClassicWinners {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    @CollectionTable(
            name = "classic_winner_names",
            joinColumns = @JoinColumn(name = "winner_id")
    )
    @Column(name = "name")
    private List<String> winners;

    public ClassicWinners() {}

    public ClassicWinners(List<String> winners) {
        this.winners = winners;
    }

    public List<String> getWinners() {
        return winners;
    }
}
