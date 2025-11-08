package racingcar.dto;

import racingcar.domain.RoundResult;

import java.util.List;

public class RaceResultDto {

    private final List<List<RoundResult>> raceProgress;
    private final List<String> winners;

    public RaceResultDto(List<List<RoundResult>> raceProgress, List<String> winners) {
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
