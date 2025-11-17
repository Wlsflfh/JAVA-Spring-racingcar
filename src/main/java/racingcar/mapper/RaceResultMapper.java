package racingcar.mapper;

import org.springframework.stereotype.Component;
import racingcar.domain.RoundResult;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class RaceResultMapper {

    public List<List<Map<String, Integer>>> toRaceHistory(List<List<RoundResult>> raceProgress) {
        return raceProgress.stream()
                .map(roundResults -> roundResults.stream()
                        .map(result -> {
                            Map<String, Integer> carData = new HashMap<>();
                            carData.put(result.getCarName(), result.getCurrentPosition());
                            return carData;
                        })
                        .toList())
                .toList();
    }

    public List<List<Map<String, Integer>>> toRandomNumbers(List<List<RoundResult>> raceProgress) {
        return raceProgress.stream()
                .map(roundResults -> roundResults.stream()
                        .map(result -> {
                            Map<String, Integer> carData = new HashMap<>();
                            carData.put(result.getCarName(), result.getRandomNumber());
                            return carData;
                        })
                        .toList())
                .toList();
    }
}
