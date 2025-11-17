package racingcar.domain;

public class ItemResult {

    private final String carName;
    private final int itemNumber;
    private final int randomMessageNumber;

    public ItemResult(String carName, int itemNumber, int randomMessageNumber) {
        this.carName = carName;
        this.itemNumber = itemNumber;
        this.randomMessageNumber = randomMessageNumber;
    }

    public String getCarName() {
        return carName;
    }

    public int getItemNumber() {
        return itemNumber;
    }

    public int getRandomMessageNumber() {
        return randomMessageNumber;
    }
}
