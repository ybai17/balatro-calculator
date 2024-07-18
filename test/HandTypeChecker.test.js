/**
 * A file for testing the HandTypeChecker file and its checkHandType function. All it tests is whether the 
 * function can detect different poker hands (and unique Balatro hands) accurately.
 * 
 * Uses Vitest as the testing framework.
 * 
 */

import checkHandType from "../src/model/HandTypeChecker";
import { EditionTypes, EnhancementTypes, SealTypes, Suits, Ranks } from "../src/model/CardTypes";
import TypesAndPriority from "../src/model/HandTypesAndPriority";
import PlayingCard from "../src/model/PlayingCard";
import PlayedHand from "../src/model/PlayedHandObject";
import JokerCards from "../src/model/JokerCards/JokerDefs";
import { expect, test } from "vitest";

//helper function for testing equality for arrays of PlayingCard objects
function areCardArraysEqual(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }

    for (let i = 0; i < array1.length; i++) {
        if (!array1[i].isSameCardShallow(array2[i])) {
            return false;
        }
    }

    return true;
}

test('checks for five of a kind hand', () => {
    let cardArrayInput = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(cardArrayInput);

    let outputScoringCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    let expectedOutput = {handType: TypesAndPriority.FIVE_OF_A_KIND, scoringCards: outputScoringCards};

    expect(testOutput["handType"]).toBe(expectedOutput.handType);
    expect(areCardArraysEqual(expectedOutput["scoringCards"], testOutput.scoringCards)).toBeTruthy();
    expect(testOutput["handType"] === TypesAndPriority.FLUSH_FIVE).toBeFalsy();
});