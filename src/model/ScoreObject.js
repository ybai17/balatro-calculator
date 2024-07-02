/**
 * This class represents the two components that make up the final, calculated score:
 * 
 * [Base Chips, Multiplier]
 * 
 * Both numbers can be affected by the type of hand played, the cards played, planet cards (which upgrade the scoring for
 * various hand types), and various joker effects.
 */

class ScoreObject {
    constructor(chips, multiplier) {
        this.chips = chips, this.multiplier = multiplier;
    }

    

    get score() {
        return this.chips * this.multiplier;
    }
}