/**
 * This class represents a regular playing card (2, 3, 4, ..., K, A).
 * Keep in mind that in Balatro, you can have more or fewer playing cards than the standard 52,
 * and that suit and rank distributions are mutable.
 * 
 * A card will be designated with an ID similar to their rank, except for the Ace, because Aces are high in this game.
 *  2 = 2
 *  3 = 3
 *  ...
 *  Jack = 11
 *  Queen = 12
 *  King = 13
 *  Ace = 14
 * 
 * ----------------------------------------------------
 * 
 * In Balatro, each card has a base chip value (adding to the score to be multiplied):
 *  2 = +2
 *  3 = +3
 *  ...
 *  10 = +10
 *  J, Q, K = +10
 *  A = +11
 * 
 * ---------------------------------------------------
 * 
 * Playing cards can also have a number of special modifiers, of which there are 3 types:   
 *  1). Editions (None, Foil, Holographic, Polychrome)
 *  2). Enhancements (None, Bonus Card, Mult Card, Wild Card, Glass Card, Steel Card, Stone Card, Gold Card, Lucky Card)
 *  3). Seals (None, Gold, Red, Blue, Purple)
 * 
 * Playing cards can only have one modifier of each type. Applying any edition, enhancement, or seal changes
 * overrides the previous one of the same type if it exists.
 * 
 * Balatro is a game that allows you to have multiple copies of a card (e.g. have 2 Polychrome Queen of Spades).
 * Thus, we need a way to check if two cards are similar, but still discern between them using unique ID's.
 * 
 * ---------------------------------------------------
 * 
 * Playing cards all come with the standard 4 suits, but suit gets overriden if it has the Wild Card enhancement.
 * 
 * ---------------------------------------------------
 * 
 * 
 */

import { EditionTypes, EnhancementTypes, SealTypes } from "./CardTypes";

class PlayingCard {

    jokerChipsModifierField = 0;
    uniqueID;

    constructor(rank, suit, edition, enhancement, seal) {
        this.rankField = rank;
        this.suitField = suit;
        this.editionField = edition;
        this.enhancementField = enhancement;
        this.sealField = seal;

        this.uniqueID = this.rankField + "_" +
                        this.suitField + "_" +
                        this.editionField + "_" +
                        this.enhancementField + "_" +
                        this.sealField + "_" + Math.random();
    }

    //getters and setters

    get rank() {
        return this.rankField;
    }

    get suit() {
        return this.suitField;
    }

    get edition() {
        return this.editionField;
    }

    get enhancement() {
        return this.enhancementField;
    }

    get seal() {
        return this.sealField;
    }

    //--------------------------------------
    set rank(newRank) {
        this.rankField = newRank;
    }

    set suit(newSuit) {
        this.suitField = newSuit;
    }

    set edition(newEdition) {
        this.editionField = newEdition;
    }

    set enhancement(newEnhancement) {
        this.enhancementField = newEnhancement;
    }

    set seal(newSeal) {
        this.sealField = newSeal;
    }

    set chipsModifer(newVal) {
        this.jokerChipsModifierField += newVal;
    }

    //-----------------------------------------------------------

    getChipsForScoring() {

        switch(this.rankField) {
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                return this.rankField + this.jokerChipsModifierField;
            case 11:
            case 12:
            case 13:
                return 10 + this.jokerChipsModifierField;
            case 14:
                return 11 + this.jokerChipsModifierField;
            default:
                return Math.min();
        }
    }

    get id() {
        return this.uniqueID;
    }

    hasEdition() {
        return this.edition !== EditionTypes.NONE;
    }

    hasEnhancement() {
        return this.edition !== EnhancementTypes.NONE;
    }

    hasSeal() {
        return this.seal !== SealTypes.NONE;
    }

    //helper function for comparing suits of two cards, taking wild cards into account
    areSuitsEqual(cardTwo) {
        if (this.suit === cardTwo.suit) {
            return true;
        }

        if (this.enhancement === EnhancementTypes.WILD || cardTwo.enhancement === EnhancementTypes.WILD) {
            return true;
        }

        return false;
    }

    //function for simply checking if two cards are similar (i.e. same rank, suit, modifiers)
    isSameCardShallow(cardTwo) {
        if (this.rank === cardTwo.rank &&
            this.suit === cardTwo.suit &&
            this.edition === cardTwo.edition &&
            this.enhancement === cardTwo.enhancement &&
            this.seal === cardTwo.seal) {

            return true;
        }

        return false;
    }

    isSameCardDeep(cardTwo) {
        if (this.rank === cardTwo.rank &&
            this.suit === cardTwo.suit &&
            this.edition === cardTwo.edition &&
            this.enhancement === cardTwo.enhancement &&
            this.seal === cardTwo.seal &&
            this.id === cardTwo.id) {

            return true;
        }

        return false;
    }
}

export default PlayingCard;