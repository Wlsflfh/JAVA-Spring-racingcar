package racingcar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import racingcar.domain.AttemptsCount;
import racingcar.domain.Cars;
import racingcar.domain.RoundResult;
import racingcar.dto.RaceResultDto;
import racingcar.dto.RacingRequest;
import racingcar.service.RacingGameService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class RacingGameApiController {

    private final RacingGameService racingGameService;

    @Autowired
    public RacingGameApiController(RacingGameService racingGameService) {
        this.racingGameService = racingGameService;
    }

    @PostMapping("/racing/start")
    public ResponseEntity<?> startRacing(@RequestBody RacingRequest request) {
        try {
            String carNamesStr = String.join(",", request.getCarNames());
            Cars cars = new Cars(carNamesStr);
            racingGameService.saveCars(cars);

            AttemptsCount attemptsCount = new AttemptsCount(request.getRoundCount());
            RaceResultDto raceResultDto = racingGameService.playRace(attemptsCount);

            racingGameService.saveWinners(raceResultDto.getWinners());

            List<Map<String, Integer>> raceHistory = convertToRaceHistory(raceResultDto.getRaceProgress());
            List<Map<String, Integer>> randomNumbers = convertToRandomNumbers(raceResultDto.getRaceProgress());

            Map<String, Object> response = new HashMap<>();
            response.put("raceHistory", raceHistory);
            response.put("randomNumbers", randomNumbers);
            response.put("winners", raceResultDto.getWinners());

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * 백엔드 데이터 형식을 프론트엔드가 기대하는 형식으로 변환
     * List<List<RoundResult>> -> List<Map<String, Integer>>
     *
     * 예: [
     *   {"car1": 1, "car2": 0, "car3": 1},  // 1라운드 후 위치
     *   {"car1": 2, "car2": 1, "car3": 1},  // 2라운드 후 위치
     * ]
     */
    private List<Map<String, Integer>> convertToRaceHistory(List<List<RoundResult>> raceProgress) {
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

    /**
     * 랜덤 숫자를 프론트엔드가 기대하는 형식으로 변환
     *
     * 예: [
     *   {"car1": 5, "car2": 3, "car3": 7},  // 1라운드 랜덤 숫자
     *   {"car1": 2, "car2": 6, "car3": 4},  // 2라운드 랜덤 숫자
     * ]
     */
    private List<Map<String, Integer>> convertToRandomNumbers(List<List<RoundResult>> raceProgress) {
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
