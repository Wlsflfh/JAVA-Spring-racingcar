package com.example.demo.dto;

import com.example.demo.domain.RoundResult;

import java.util.List;

public class RaceProgressDto {

    private final List<List<RoundResult>> raceProgress;
    private final List<String> winners;

    public RaceProgressDto(List<List<RoundResult>> raceProgress, List<String> winners) {
        this.raceProgress = raceProgress;
        this.winners = winners;
    }

    public List<List<RoundResult>> getRaceProgress() {
        return raceProgress;
    }

    public List<String> getWinners() {
        return winners;
    }
}
