/**
 * A file for testing the HandTypeChecker file and its checkHandType function. All it tests is whether the 
 * function can detect different poker hands (and unique Balatro hands) accurately.
 * 
 * Uses Vitest as the testing framework.
 * 
 */

import checkHandType from "../src/model/HandTypeChecker";
import { EditionTypes, EnhancementTypes, SealTypes, Suits, Ranks } from "../src/model/CardTypes";
import { HandTypePriorities } from "../src/model/HandTypeDefs";
import PlayingCard from "../src/model/PlayingCard";
import PlayedHand from "../src/model/PlayedHandObject";
import { JokerDefs, JokerIDs } from "../src/model/JokerCards/JokerDefs";
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

    expect(testOutput.handType).toBe(HandTypePriorities.FIVE_OF_A_KIND);
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

    expect(testOutput.handType).toBe(HandTypePriorities.FLUSH_HOUSE);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

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

    expect(testOutput["handType"]).toBe(HandTypePriorities.FIVE_OF_A_KIND);
    expect(areCardArraysEqual(expectedScoringCards, testOutput.scoringCards)).toBeTruthy();
    expect(testOutput["handType"] === HandTypePriorities.FLUSH_HOUSE).toBeFalsy();
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

    expect(testOutput.handType).toBe(HandTypePriorities.STRAIGHT_FLUSH);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("STRAIGHT_FLUSH simple ROYAL FLUSH", () => {
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

    expect(testOutput.handType).toBe(HandTypePriorities.STRAIGHT_FLUSH);
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

    expect(testOutput.handType).toBe(HandTypePriorities.FOUR_OF_A_KIND);
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

    expect(testOutput.handType).toBe(HandTypePriorities.FOUR_OF_A_KIND);
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

    expect(testOutput["handType"]).toBe(HandTypePriorities.FULL_HOUSE);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("FLUSH simple", () => {
    //without the Four Fingers joker, it should be 5 cards all sharing one suit,
    //but potentially different ranks

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.ACE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.FLUSH);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("FLUSH priority > THREE_OF_A_KIND", () => {
    //without the Four Fingers joker, it should be 5 cards all sharing one suit,
    //and should have priority over the THREE_OF_A_KIND hand

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.QUEEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.FLUSH);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("FLUSH priority > TWO_PAIR", () => {
    //without the Four Fingers joker, it should be 5 cards all sharing one suit,
    //and should have priority over the TWO_PAIR hand

    let testCards = [
        new PlayingCard(Ranks.SIX, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.FLUSH);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("FLUSH priority > PAIR", () => {
    //without the Four Fingers joker, it should be 5 cards all sharing one suit,
    //and should have priority over the PAIR hand

    let testCards = [
        new PlayingCard(Ranks.NINE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.QUEEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.NINE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.FLUSH);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("STRAIGHT simple", () => {
    //without the Four Fingers joker, it should be 5 cards with consecutive ranks, different suits
    //2, 3, 4, 5, 6

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.STRAIGHT);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("THREE_OF_A_KIND simple", () => {
    //3 cards of one rank, can be different suits

    let testCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.THREE_OF_A_KIND);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("THREE_OF_A_KIND 4 cards", () => {
    //3 cards of one rank, can be different suits, this time with a played hand size of only 4 cards

    let testCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.THREE_OF_A_KIND);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("THREE_OF_A_KIND 3 cards", () => {
    //3 cards of one rank, can be different suits, this time with a played hand size of only 3 cards

    let testCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.THREE_OF_A_KIND);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("TWO_PAIR simple", () => {
    //2 cards of same rank + another 2 cards of same rank, can be different suits

    let testCards = [
        new PlayingCard(Ranks.SEVEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.TEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.TWO_PAIR);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("TWO_PAIR 4 cards", () => {
    //2 cards of same rank + another 2 cards of same rank, can be different suits
    //this time with a played hand of 4 cards

    let testCards = [
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.TEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.TWO_PAIR);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("PAIR simple", () => {
    //2 cards with the same rank, but can be different suits

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.PAIR);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("PAIR 4 cards", () => {
    //2 cards with the same rank, but can be different suits
    //this time with a played hand of size 4

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.PAIR);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("PAIR 2 cards", () => {
    //2 cards with the same rank, but can be different suits
    //this time with a played hand of size 2

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.PAIR);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("HIGH_CARD simple", () => {
    //need to test for a high card when no other hands can be found

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("HIGH_CARD 1 card", () => {
    //just a single card

    let testCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(areCardArraysEqual(testCards, expectedScoringCards)).toBeTruthy();
});

//---------------------------------------------
//now test hands with the Four Fingers joker card, which allows for FLUSH and STRAIGHT (and STRAIGHT_FLUSH)
//hands to be counted using only 4 cards instead of 5.
//---------------------------------------------

test("FOUR_FINGERS simple STRAGHT_FLUSH", () => {
    //testing a STRAIGHT_FLUSH with the FOUR_FINGERS joker card

    let testCards = [
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [JokerIDs.FOUR_FINGERS, JokerIDs.DROLL_JOKER, JokerIDs.HALF_JOKER];

    let expectedScoringCards = [
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, jokers);

    expect(testOutput.handType).toBe(HandTypePriorities.STRAIGHT_FLUSH);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("FOUR_FINGERS simple FLUSH", () => {
    //testing a flush with the FOUR_FINGERS joker card, which allows flushes and straights to be counted
    //using only 4 cards instead of 5

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [JokerIDs.JOKER, JokerIDs.FOUR_FINGERS, JokerIDs.CRAZY_JOKER];

    let expectedScoringCards = [
        new PlayingCard(Ranks.ACE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, jokers);

    expect(testOutput.handType).toBe(HandTypePriorities.FLUSH);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("FOUR_FINGERS simple STRAIGHT", () => {
    //testing a straight hand using the FOUR_FINGERS joker card

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [JokerIDs.LUSTY_JOKER, JokerIDs.DEVIOUS_JOKER, JokerIDs.FOUR_FINGERS,];

    let expectedScoringCards = [
        new PlayingCard(Ranks.FIVE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, jokers);

    expect(testOutput["handType"]).toBe(HandTypePriorities.STRAIGHT);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

//---------------------------------------------
//need to test hands that include STONE cards (which always score)
//---------------------------------------------

test("FOUR_OF_A_KIND + stone", () => {
    //testing a FOUR_OF_A_KIND hand that will also have a 5th stone card be scored
    //no joker

    let testCards = [
        new PlayingCard(Ranks.THREE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.THREE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.FOUR_OF_A_KIND);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("FOUR_OF_A_KIND + stone instead of FIVE_OF_A_KIND", () => {
    //this is 5 cards of the same type, except 1 card is actually a STONE card.
    //so it should be FOUR_OF_A_KIND instead, as STONE "overwrites" a card's underlying rank and suit

    let testCards = [
        new PlayingCard(Ranks.THREE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.THREE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.FOUR_OF_A_KIND);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("THREE_OF_A_KIND + 1 stone", () => {
    //testing THREE_OF_A_KIND with 1 stone card and 1 random non-scoring card

    let testCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.THREE_OF_A_KIND);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("THREE_OF_A_KIND + 2 stones", () => {
    //testing THREE_OF_A_KIND with 2 stone cards

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);
    
    expect(testOutput.handType).toBe(HandTypePriorities.THREE_OF_A_KIND);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("THREE_OF_A_KIND + 1 stone, 4 cards", () => {
    //testing THREE_OF_A_KIND with 1 stone card and 1 random non-scoring card
    //played hand has size 4

    let testCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.THREE_OF_A_KIND);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("TWO_PAIR + 1 stone card", () => {
    //testing TWO_PAIR hand with 1 stone card

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.ACE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.TWO_PAIR);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards)).toBeTruthy();
});

test("PAIR + 1 stone card", () => {
    //testing PAIR hand + 1 stone card and 2 random nonscoring cards

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.PAIR);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards));
});

test("PAIR + 3 stone cards", () => {
    //test PAIR hand + 3 stone cards

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.PAIR);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards));
});

test("PAIR + 1 stone card, 3 cards", () => {
    //a PAIR hand + 1 stone card, where the total played hand size is only 3 cards

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.PAIR);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards));
});

test("HIGH_CARD + 4 stone cards", () => {
    //testing HIGH_CARD when it's 1 random card + 4 stone cards

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.NINE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.NINE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards));
});

test("HIGH_CARD only 5 stone cards", () => {
    //testing HIGH_CARD trigger when 5 stone cards are played

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.NINE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.NINE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards));
});

test("HIGH_CARD only 1 stone card", () => {
    //testing HIGH_CARD when only 1 card is played and it's a stone card

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);

    let expectedScoringCards = [
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let testOutput = checkHandType(hand, []);

    expect(testOutput.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(areCardArraysEqual(testOutput.scoringCards, expectedScoringCards));
});

//---------------------------------------------
//need to test hands that are played with the Four Fingers joker card + STONE cards
//---------------------------------------------