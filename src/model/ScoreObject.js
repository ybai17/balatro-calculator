import { EditionTypes, EnhancementTypes, SealTypes } from "./CardTypes";
import { HandTypePriorities } from "./HandTypeDefs";
import { PlanetTracker } from "./PlanetCards/PlanetDefs";
import ScoreObjectRNGHandler from "./ScoreObjectRNGHandler";
import ScoreObjectRNGBundle from "./ScoreObjectRNGHandler";
import { splitmix32, cyrb128 } from "./Utils";

/**
 * This class represents the two components that make up the final, calculated score:
 * It starts with the base values based on what hand type was played, then applies the upgraded amounts from planet cards,
 * and then further modifies the two values based on the cards played, Joker effects, etc.
 * 
 * [Chips, Multiplier]
 * 
 * Both numbers can be affected by the type of hand played, the cards played, planet cards (which upgrade the scoring for
 * various hand types), and various joker effects.
 * 
 * This class will only be used for testing and for the score calculator, NOT the actual game implementation.
 */
class ScoreObject {

    handType;
    scoringCards = [];
    jokerCards = [];
    planetTracker;

    unplayedCardsInHand = [];

    chipsField;
    multiplierField;

    rngObject;

    /**
     * Constructs a scoring object.
     * 
     * @param {HandTypePriorities} handType the type of hand being played
     * @param {Array} scoringCards the array of cards that will count for scoring
     * @param {Array} unplayedCards the array of unplayed cards in the hand that may have an effect on scoring
     * @param {Array} jokers the array of jokers currently in play
     * @param {PlanetTracker} planetTracker the planet tracker managing the levels of each hand type
     * @param {String} rngSeedString the seed string for this run which other rng-based cards will use
     */
    constructor(handType, scoringCards, unplayedCards, jokers, planetTracker, rngSeedString) {
        this.handType = handType;
        this.scoringCards = scoringCards;
        this.unplayedCardsInHand = unplayedCards;
        this.jokerCards = jokers;
        this.planetTracker = planetTracker;

        //initialize the RNG handler
        this.rngObject = new ScoreObjectRNGHandler(rngSeedString);

        //it will start with the updated score values based on the hand type levels
        [this.chipsField, this.multiplierField] = planetTracker.getHandBaseScore(this.handType);
    }

    activateJokers() {
        //do nothing for now
    }

    activatePlayingCardEffects() {

        let cardCount = 0;

        this.scoringCards.forEach((currCard) => {
            let numberOfTimes = 1; //by default, without red seal, score the card once

            //check for red seal, which activates the card twice (including enhancement + edition effects)
            if (currCard.seal === SealTypes.RED) {
                numberOfTimes = 2;
            }

            for (let i = 0; i < numberOfTimes; i++) {
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
                    case EnhancementTypes.LUCKY:
                        //we need to differentiate between lucky being used for gameplay purposes in the future,
                        //vs using predictable pseudo-random outcomes during testing

                        let multRoll = Math.floor(this.rngObject.generateLuckyCardRNG(cardCount) * 5);
                        //let multRoll = Math.floor(this.rngObject.generateLuckyCardRNG(currCard.id));
                        if (multRoll === 0) {
                            this.multiplierField += 20;
                        }
                        break;
                }
            }
            //todo: check if red seal on LUCKY cards means that if it triggers the first time,
            //it's guaranteed to trigger again.
            //OR, maybe it just means to just roll again (with 1/5 and 1/15 chances for its effects to trigger)
            cardCount++;
        });
    }

    activateUnplayedCardEffects() {
        this.unplayedCardsInHand.forEach((currCard) => {
            let numberOfTimes = 1;

            //check for red seal
            if (currCard.seal === SealTypes.RED) {
                numberOfTimes = 2;
            }

            for (let i = 0; i < numberOfTimes; i++) {
                //check for unplayed STEEL cards in hand
                if (currCard.enhancement === EnhancementTypes.STEEL) {
                    this.multiplierField *= 1.5;
                }
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

/**
 * This class will be the one that handles all the joker effects. 
 * The ScoreObject class will pass along the necessary information and variables to
 * a JokerHandler, which will then apply all the effects that impact the scoring.
 * 
 * There are a few Joker cards that have other effects, and so they will be handled elsewhere.
 */
class JokerHandler {

    /**
     * 
     */
    constructor() {
        
    }

}

export default ScoreObject;