package racingcar.domain;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Cars {

    private final List<Car> cars;

    public Cars(String inputCarNames) {
        List<String> carNames = splitCarNames(inputCarNames);
        validateDuplicateName(carNames);
        this.cars = getCarNames(carNames);
    }

    private List<String> splitCarNames(String inputCarNames) {
        validateEmptyInput(inputCarNames);

        return Arrays.asList(inputCarNames.split(","));
    }

    private void validateEmptyInput(String inputCarNames) {
        if (inputCarNames == null || inputCarNames.trim().isEmpty()) {
            throw new IllegalArgumentException("자동차 이름을 입력해주세요.");
        }
    }

    private List<Car> getCarNames(List<String> carNames) {
        return carNames.stream()
                .map(String::trim)
                .map(Car::new)
                .toList();
    }

    private void validateDuplicateName(List<String> carNames) {
        Set<String> uniqueCars = new HashSet<>(carNames);

        if (uniqueCars.size() != carNames.size()) {
            throw new IllegalArgumentException("자동차 이름은 중복될 수 없습니다.");
        }
    }

    public List<Car> getCars() {
        return cars;
    }
}