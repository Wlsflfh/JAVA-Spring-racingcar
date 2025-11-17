package racingcar.domain;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class ItemWinners {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    @CollectionTable(
            name = "item_winner_names",
            joinColumns = @JoinColumn(name = "winner_id")
    )
    @Column(name = "name")
    private List<String> winners;

    public ItemWinners() {}

    public ItemWinners(List<String> winners) {
        this.winners = winners;
    }

    public List<String> getWinners() {
        return winners;
    }
}
