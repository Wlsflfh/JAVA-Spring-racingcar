package racingcar.domain;

public class RoundResult {

    private final String carName;
    private final int currentPosition;

    public RoundResult(String carName, int currentPosition) {
        this.carName = carName;
        this.currentPosition = currentPosition;
    }

    public String getCarName() {
        return carName;
    }

    public int getCurrentPosition() {
        return currentPosition;
    }
}
