package racingcar.domain;

public class GoalDistance {

    private static final int MIN_DISTANCE_COUNT = 10;
    private static final int MAX_DISTANCE_COUNT = 100;

    private final int goalDistance;

    public GoalDistance(int goalDistance) {
        validateCountRange(goalDistance);
        this.goalDistance = goalDistance;
    }

    private void validateCountRange(int goalDistance) {
        if (goalDistance < MIN_DISTANCE_COUNT) {
            throw new IllegalArgumentException("목표 거리는 10보다 커야 합니다.");
        }

        if (goalDistance > MAX_DISTANCE_COUNT) {
            throw new IllegalArgumentException("목표 거리는 100회 이하여야 합니다.");
        }
    }

    public int getGoalDistance() {
        return goalDistance;
    }
}
