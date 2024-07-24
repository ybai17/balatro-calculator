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

import { HandTypePriorities } from "./HandTypeDefs";
import { PlanetTracker } from "./PlanetCards/PlanetDefs";

class ScoreObject {

    handType;
    scoringCards = [];
    jokerCards = [];
    planetTracker;

    chipsField;
    multiplierField;

    /**
     * Constructs a scoring object.
     * 
     * @param {HandTypePriorities} handType the type of hand being played
     * @param {Array} scoringCards the array of cards that will count for scoring 
     * @param {Array} jokers the array of jokers currently in play
     * @param {PlanetTracker} planetTracker the planet tracker managing the levels of each hand type
     */
    constructor(handType, scoringCards, jokers, planetTracker) {
        this.handType = handType;
        this.scoringCards = scoringCards;
        this.jokerCards = jokers;
        this.planetTracker = planetTracker;

        //it will start with the updated score values based on the hand type levels
        [this.chipsField, this.multiplierField] = planetTracker.getHandBaseScore(this.handType);
    }

    activateJokers() {
        //do nothing for now
    }

    activatePlayingCardEffects() {
        //editions, enhancements, seals
        
        //factor in each card's base score values

        this.scoringCards.forEach((currCard) => {
            this.chipsField += currCard.getChipsForScoring();
        });
    }

    getFinalScoreValues() {
        this.activateJokers();
        this.activatePlayingCardEffects();

        return [this.chipsField, this.multiplierField];
    }
}

export default ScoreObject;