package racingcar.domain;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Winners {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    @CollectionTable(
            name = "winner_names",
            joinColumns = @JoinColumn(name = "winner_id")
    )
    @Column(name = "name")
    private List<String> winners;

    public Winners() {}

    public Winners(List<String> winners) {
        this.winners = winners;
    }

    public List<String> getWinners() {
        return winners;
    }
}
