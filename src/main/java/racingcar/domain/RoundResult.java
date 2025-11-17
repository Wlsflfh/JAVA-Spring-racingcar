package racingcar.domain;

public class RoundResult {

    private final String carName;
    private final int currentPosition;
    private final int randomNumber;

    public RoundResult(String carName, int currentPosition, int randomNumber) {
        this.carName = carName;
        this.currentPosition = currentPosition;
        this.randomNumber = randomNumber;
    }

    public String getCarName() {
        return carName;
    }

    public int getCurrentPosition() {
        return currentPosition;
    }

    public int getRandomNumber() {
        return randomNumber;
    }
}
