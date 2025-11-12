package racingcar.dto;

import java.util.List;

public class CarNamesDto {

    private final List<String> carNames;

    public CarNamesDto(List<String> carNames) {
        this.carNames = carNames;
    }

    public List<String> getCarNames() {
        return carNames;
    }
}
