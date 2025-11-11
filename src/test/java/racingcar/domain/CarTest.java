package racingcar.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

class CarTest {

    @Test
    @DisplayName("비즈니스 로직에 맞게 움직임 여부를 처리하는지 확인한다")
    void moveTest() {
        // given
        Car car1 = new Car();
        Car car2 = new Car();
        int moveValue = 7;
        int notMoveValue = 3;

        // when
        car1.move(moveValue);
        car2.move(notMoveValue);

        // then
        assertEquals(car1.getPosition(), 1);
        assertEquals(car2.getPosition(), 0);
    }

    @Test
    @DisplayName("자동차 이름의 길이에 대하여 올바르게 처리하는지 확인한다")
    void validateNameLengthTest() {
        // given
        String shortCarName = "";
        String longCarName = "LooooongName";

        // when - then
        assertThatThrownBy(() -> new Car(shortCarName))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("자동차 이름은 1글자 이상이여야 합니다.");

        assertThatThrownBy(() -> new Car(longCarName))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("자동차 이름은 5글자 이하여야 합니다.");
    }
}
