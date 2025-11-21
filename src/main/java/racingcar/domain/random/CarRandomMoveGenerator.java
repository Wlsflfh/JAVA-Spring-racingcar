package racingcar.domain.random;

import java.util.concurrent.ThreadLocalRandom;

public class CarRandomMoveGenerator implements RandomNumberGenerator {

    private static final int RANDOM_LOWER_INCLUSIVE = 0;
    private static final int RANDOM_UPPER_EXCLUSIVE = 10;

    @Override
    public int generate() {
        return ThreadLocalRandom.current().nextInt(RANDOM_LOWER_INCLUSIVE, RANDOM_UPPER_EXCLUSIVE);
    }
}
