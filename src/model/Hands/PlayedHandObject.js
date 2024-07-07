class PlayedHand {

    handCardsArray = [];
    size = 0;

    constructor(handCardsArray) {
        handCardsArray.forEach((curr) => {
            this.handCardsArray.push(curr);
            size += 1;
        })
    }

    get cards() {
        return this.handCardsArray;
    }

    get size() {
        return this.size;
    }
}

export default PlayedHand;