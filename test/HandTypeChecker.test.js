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
        let card1 = array1[i];
        let card2 = array2[i];
        if (!card1.isSameCardShallow(card2)) {
            return false;
        }
    }

    return true;
}

test('FIVE_OF_A_KIND simple', () => {
    //five cards of the same rank but different suits

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);
    let expectedOutput = {handType: TypesAndPriority.FIVE_OF_A_KIND, scoringCards: expectedScoringCards};

    expect(testOutput["handType"]).toBe(expectedOutput.handType);
    expect(areCardArraysEqual(expectedScoringCards, testOutput.scoringCards)).toBeTruthy();
    expect(testOutput["handType"] === TypesAndPriority.FLUSH_HOUSE).toBeFalsy();
});

test("FLUSH_FIVE simple", () => {
    //five cards of the same rank AND suit

    let testCards= [
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);
    let expectedOutput = {handType: TypesAndPriority.FIVE_OF_A_KIND, scoringCards: expectedScoringCards};

    expect(testOutput.handType).toBe(expectedOutput.handType);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("FLUSH_HOUSE simple", () => {
    //3 cards of one rank, 2 cards of another, all 5 sharing the SAME SUIT

    let testCards = [
        new PlayingCard(Ranks.JACK, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.JACK, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);
    let expectedOutput = {handType: TypesAndPriority.FLUSH_HOUSE, scoringCards: expectedScoringCards};

    expect(testOutput.handType).toBe(expectedOutput.handType);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("FULL_HOUSE simple", () => {
    //regular full house with 3 of one rank + 2 of another rank, different suits

    let testCards = [
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);
    let expectedOutput = {handType: TypesAndPriority.FULL_HOUSE, scoringCards: expectedScoringCards};

    expect(testOutput["handType"]).toBe(expectedOutput.handType);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("STRAIGHT_FLUSH simple", () => {
    //a simple straight flush WITHOUT the Four Fingers joker
    //cards are initially played out of order. But they are 8, 9, 10, Jack, Queen

    let testCards = [
        new PlayingCard(Ranks.TEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.EIGHT, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.NINE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.NINE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.EIGHT, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);
    let expectedOutput = {handType: TypesAndPriority.STRAIGHT_FLUSH, scoringCards: expectedScoringCards};

    expect(testOutput.handType).toBe(expectedOutput.handType);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("ROYAL_FLUSH simple", () => {
    //a royal flush which is technically still just a straight flush. In Balatro, they are scored the same
    //so there isn't necessarily any real point to distinguishing between them
    //cards are initially played out of order. But they are 10, Jack, Queen, King, Ace

    let testCards = [
        new PlayingCard(Ranks.TEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);
    let expectedOutput = {handType: TypesAndPriority.STRAIGHT_FLUSH, scoringCards: expectedScoringCards};

    expect(testOutput.handType).toBe(expectedOutput.handType);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("FOUR_OF_A_KIND simple", () => {
    //simple four of a kind test. 4 cards of one rank, can be different suits

    let testCards = [
        new PlayingCard(Ranks.THREE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.THREE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);
    let expectedOutput = {handType: TypesAndPriority.FOUR_OF_A_KIND, scoringCards: expectedScoringCards};

    expect(testOutput.handType).toBe(expectedOutput.handType);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("FOUR_OF_A_KIND priority > FLUSH", () => {
    //4 cards of one rank, and one unscored card, ALL with the SAME SUIT
    //has higher priority than flush, so this should still count as FOUR_OF_A_KIND instead of FLUSH

    let testCards = [
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);
    let expectedOutput = {handType: TypesAndPriority.FOUR_OF_A_KIND, scoringCards: expectedScoringCards};

    expect(testOutput.handType).toBe(expectedOutput.handType);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("HIGH_CARD simple one card", () => {
    //just a single card

    let testCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);
    let expectedOutput = {handType: TypesAndPriority.HIGH_CARD, scoringCards: expectedScoringCards};

    expect(testOutput.handType).toBe(expectedOutput.handType);
    expect(areCardArraysEqual(testCards, expectedScoringCards)).toBeTruthy();
});

