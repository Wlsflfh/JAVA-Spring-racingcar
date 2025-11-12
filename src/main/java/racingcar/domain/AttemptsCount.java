package racingcar.domain;

public class AttemptsCount {

    private static final int MIN_ATTEMPTS_COUNT = 1;
    private static final int MAX_ATTEMPTS_COUNT = 30;


    private final int attemptsCount;

    public AttemptsCount(int attemptsCount) {
        validateCountRange(attemptsCount);
        this.attemptsCount = attemptsCount;
    }

    private void validateCountRange(int attemptsCount) {
        if (attemptsCount < MIN_ATTEMPTS_COUNT) {
            throw new IllegalArgumentException("시도 횟수는 1보다 커야 합니다.");
        }

        if (attemptsCount > MAX_ATTEMPTS_COUNT) {
            throw new IllegalArgumentException("시도 횟수는 30회 이하여야 합니다.");
        }
    }

    public int getAttemptsCount() {
        return attemptsCount;
    }
}
