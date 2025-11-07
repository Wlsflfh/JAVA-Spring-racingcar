package com.example.demo.domain;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class PastWinners {

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

    public PastWinners() {}

    public PastWinners(List<String> winners) {
        this.winners = winners;
    }

    public List<String> getWinners() {
        return winners;
    }
}
