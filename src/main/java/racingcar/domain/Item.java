package racingcar.domain;

public enum Item {
    ITEM_0(5),
    ITEM_1(3),
    ITEM_2(1),
    ITEM_3(0),
    ITEM_4(-1),
    ITEM_5(-3);

    private final int effect;

    Item(int effect) {
        this.effect = effect;
    }

    public static Item from(int index) {
        return values()[index];
    }

    public int getEffect() {
        return effect;
    }
}
