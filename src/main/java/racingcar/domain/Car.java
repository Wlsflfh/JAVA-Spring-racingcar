package racingcar.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Car {

    private static final int INIT_POSITION = 0;
    private static final int MOVING_THRESHOLD = 4;
    private static final int MAX_NAME_LENGTH = 5;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int position;

    public Car() {}

    public Car(String name) {
        validateNameLength(name);
        this.name = name;
        this.position = INIT_POSITION;
    }

    public void move(int randomNumber) {
        if (isMoving(randomNumber)) {
            position++;
        }
    }

    public void itemMove(int itemEffect) {
        position += itemEffect;
    }

    private boolean isMoving(int randomNumber) {
        return randomNumber >= MOVING_THRESHOLD;
    }

    private void validateNameLength(String name) {
        if (name.isEmpty()) {
            throw new IllegalArgumentException("자동차 이름은 1글자 이상이여야 합니다.");
        }

        if (name.length() > MAX_NAME_LENGTH) {
            throw new IllegalArgumentException("자동차 이름은 5글자 이하여야 합니다.");
        }
    }

    public String getName() {
        return name;
    }

    public int getPosition() {
        return position;
    }
}
