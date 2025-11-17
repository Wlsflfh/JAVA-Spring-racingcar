package racingcar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import racingcar.domain.AttemptsCount;
import racingcar.domain.Cars;
import racingcar.domain.GoalDistance;
import racingcar.dto.RaceResultDto;
import racingcar.dto.RacingRequest;
import racingcar.mapper.RaceResultMapper;
import racingcar.service.RacingGameService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/racing")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class RacingGameApiController {

    private final RacingGameService racingGameService;
    private final RaceResultMapper raceResultMapper;

    @Autowired
    public RacingGameApiController(RacingGameService racingGameService, RaceResultMapper raceResultMapper) {
        this.racingGameService = racingGameService;
        this.raceResultMapper = raceResultMapper;
    }

    @PostMapping("/classic")
    public ResponseEntity<?> startRacing(@RequestBody RacingRequest request) {
        try {
            String carNamesStr = String.join(",", request.getCarNames());
            Cars cars = new Cars(carNamesStr);
            racingGameService.saveCars(cars);

            AttemptsCount attemptsCount = new AttemptsCount(request.getRoundCount());
            RaceResultDto raceResultDto = racingGameService.playClassicRace(attemptsCount);

            racingGameService.saveClassicWinners(raceResultDto.getWinners());

            List<Map<String, Integer>> raceHistory = raceResultMapper.toRaceHistory(raceResultDto.getRaceProgress());
            List<Map<String, Integer>> randomNumbers = raceResultMapper.toRaceHistory(raceResultDto.getRaceProgress());

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

    @PostMapping("/item")
    public ResponseEntity<?> itemMode(@RequestBody RacingRequest request) {
        try {
            String carNamesStr = String.join(",", request.getCarNames());
            Cars cars = new Cars(carNamesStr);
            racingGameService.saveCars(cars);

            GoalDistance goalDistance = new GoalDistance(request.getRoundCount());
            RaceResultDto itemRaceResultDto = racingGameService.playItemRace(goalDistance);

            racingGameService.saveItemWinners(itemRaceResultDto.getWinners());

            List<Map<String, Integer>> raceHistory = raceResultMapper.toRaceHistory(itemRaceResultDto.getRaceProgress());
            List<Map<String, Integer>> itemNumbers = raceResultMapper.toRaceHistory(itemRaceResultDto.getRaceProgress());

            Map<String, Object> response = new HashMap<>();
            response.put("raceHistory", raceHistory);
            response.put("randomNumbers", itemNumbers);
            response.put("winners", itemRaceResultDto.getWinners());

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
