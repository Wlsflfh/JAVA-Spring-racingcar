package racingcar.mapper;

import org.springframework.stereotype.Component;
import racingcar.domain.RoundResult;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class RaceResultMapper {

    public List<Map<String, Integer>> toRaceHistory(List<List<RoundResult>> raceProgress) {
        return raceProgress.stream()
                .map(roundResults -> {
                    Map<String, Integer> positions = new HashMap<>();
                    for (RoundResult result : roundResults) {
                        positions.put(result.getCarName(), result.getCurrentPosition());
                    }
                    return positions;
                })
                .toList();
    }

    public List<Map<String, Integer>> toRandomNumbers(List<List<RoundResult>> raceProgress) {
        return raceProgress.stream()
                .map(roundResults -> {
                    Map<String, Integer> randoms = new HashMap<>();
                    for (RoundResult result : roundResults) {
                        randoms.put(result.getCarName(), result.getRandomNumber());
                    }
                    return randoms;
                })
                .toList();
    }
}
