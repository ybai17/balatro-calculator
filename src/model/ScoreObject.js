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

import { EditionTypes, EnhancementTypes } from "./CardTypes";
import { HandTypePriorities } from "./HandTypeDefs";
import { PlanetTracker } from "./PlanetCards/PlanetDefs";

class ScoreObject {

    handType;
    scoringCards = [];
    jokerCards = [];
    planetTracker;

    unplayedCardsInHand = [];

    chipsField;
    multiplierField;

    /**
     * Constructs a scoring object.
     * 
     * @param {HandTypePriorities} handType the type of hand being played
     * @param {Array} scoringCards the array of cards that will count for scoring
     * @param {Array} unplayedCards the array of unplayed cards in the hand that may have an effect on scoring
     * @param {Array} jokers the array of jokers currently in play
     * @param {PlanetTracker} planetTracker the planet tracker managing the levels of each hand type
     */
    constructor(handType, scoringCards, unplayedCards, jokers, planetTracker) {
        this.handType = handType;
        this.scoringCards = scoringCards;
        this.unplayedCardsInHand = unplayedCards;
        this.jokerCards = jokers;
        this.planetTracker = planetTracker;

        //it will start with the updated score values based on the hand type levels
        [this.chipsField, this.multiplierField] = planetTracker.getHandBaseScore(this.handType);
    }

    activateJokers() {
        //do nothing for now
    }

    activatePlayingCardEffects() {

        this.scoringCards.forEach((currCard) => {
            this.chipsField += currCard.getChipsForScoring();
            
            //check for edition effects
            switch (currCard.edition) {
                case EditionTypes.FOIL:
                    this.chipsField += 50;
                    break;
                case EditionTypes.HOLOGRAPHIC:
                    this.multiplierField += 10;
                    break;
                case EditionTypes.POLYCHROME:
                    this.multiplierField *= 1.5;
                    break;
            }

            //check for enhancement effects
            switch (currCard.enhancement) {
                case EnhancementTypes.BONUS:
                    this.chipsField += 30;
                    break;
                case EnhancementTypes.MULT:
                    this.multiplierField += 4;
                    break;
                case EnhancementTypes.GLASS:
                    this.multiplierField *= 2;
                    break;
                case EnhancementTypes.STONE:
                    this.chipsField += 50 - currCard.getChipsForScoring();
                    break;
            }
        });
    }

    activateUnplayedCardEffects() {
        //check for unplayed STEEL cards in hand

        this.unplayedCardsInHand.forEach((currCard) => {
            if (currCard.enhancement === EnhancementTypes.STEEL) {
                this.multiplierField *= 1.5;
            }
        });
    }

    getFinalScoreValues() {
        this.activateJokers();
        this.activatePlayingCardEffects();
        this.activateUnplayedCardEffects();

        return [this.chipsField, this.multiplierField];
    }
}

export default ScoreObject;