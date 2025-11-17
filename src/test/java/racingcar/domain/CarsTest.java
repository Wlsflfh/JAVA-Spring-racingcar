package racingcar.domain;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatThrownBy;


class CarsTest {

    @Test
    @DisplayName("중복된 자동차 이름들 텍스트에 대하여 예외를 발생시키는지 확인한다.")
    void validateDuplicateTest() {
        // given
        String duplicateCarNames = "tesla,tesla,benz";

        // when - then
        Assertions.assertThatThrownBy(() -> new Cars(duplicateCarNames))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("자동차 이름은 중복될 수 없습니다.");
    }
}
