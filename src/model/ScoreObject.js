/**
 * This class represents the two components that make up the final, calculated score:
 * It starts with the base values based on what hand type was played, then applies the upgraded amounts from planet cards,
 * and then further modifies the two values based on the cards played, Joker effects, etc.
 * 
 * [Chips, Multiplier]
 * 
 * Both numbers can be affected by the type of hand played, the cards played, planet cards (which upgrade the scoring for
 * various hand types), and various joker effects.
 */

import { HandTypePriorities, HandTypeScores } from "./HandTypeDefs";

class ScoreObject {

    handType;
    scoringCards = [];

    constructor(handTypeAndScoringCards) {
        this.handType = handTypeAndScoringCards.handType;
        this.scoringCards = handTypeAndScoringCards.scoringCards;

        this.chips = HandTypeScores[this.handType][0];
        this.multiplier = HandTypeScores[this.handType][1];
    }

    setChips(newAmount) {
        this.chips = newAmount;
    }

    setMultiplier(newAmount) {
        this.multiplier = newAmount;
    }

    activateJokers(jokers) {

    }

    activatePlanets(currentHandLevels) {

    }

    activatePlayingCardEffects() {
        //editions, enhancements, seals, 
    }

    get finalScore() {
        return this.chips * this.multiplier;
    }
}

export default ScoreObject;