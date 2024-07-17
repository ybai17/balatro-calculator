class PlayedHand {

    handCardsArray = [];
    sizeField = 0;

    constructor(handCardsArray) {
        handCardsArray.forEach((curr) => {
            this.handCardsArray.push(curr);
            this.size += 1;
        })
    }

    get cards() {
        return this.handCardsArray;
    }

    get size() {
        return this.sizeField;
    }

    set cards(newCardsArray) {
        this.handCardsArray = newCardsArray;
    }

    set size(newSize) {
        this.sizeField = newSize;
    }
}

export default PlayedHand;