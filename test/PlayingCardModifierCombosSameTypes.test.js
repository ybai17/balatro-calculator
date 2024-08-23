/**
 * This file will contain tests for different combinations of the various card modifiers,
 * with combinations from those of the same type (i.e. EDITION + EDITION, ENHANCEMENT + ENHANCEMENT)
 */

import ScoreObject from "../src/model/ScoreObject";
import PlayedHand from "../src/model/PlayedHandObject";
import PlayingCard from "../src/model/PlayingCard";
import checkHandType from "../src/model/HandTypeChecker";

import { EditionTypes, EnhancementTypes, SealTypes, Suits, Ranks } from "../src/model/CardTypes";
import { HandTypePriorities } from "../src/model/HandTypeDefs";
import { PlanetTracker } from "../src/model/PlanetCards/PlanetDefs";

import { test, expect } from "vitest";
import { JokerDefs, JokerIDs } from "../src/model/JokerCards/JokerDefs";

//---------------------------------------------------------
/**
 * EDITIONS + EDITIONS
 * 
 * FOIL, HOLOGRAPHIC, POLYCHROME
 */
//---------------------------------------------------------

test("FOIL + HOLOGRAPHIC 2 cards PAIR", () => {
    //PAIR hand with 1 FOIL, 1 HOLOGRAPHIC scoring

    let testCards = [
        new PlayingCard(Ranks.THREE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.FOIL, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.HOLOGRAPHIC, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(64);
    expect(testMult).toBe(12);
});

test("FOIL + POLYCHROME 3 cards THREE_OF_A_KIND", () => {
    //THREE_OF_A_KIND hand with 1 FOIL, 1 POLYCHROME cards scoring + 1 random

    let testCards = [
        new PlayingCard(Ranks.THREE, Suits.CLUBS, EditionTypes.FOIL, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.HEARTS, EditionTypes.POLYCHROME, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(89);
    expect(testMult).toBeCloseTo(4.5, 1);
});

//order of cards played matters!
test("HOLOGRAPHIC + POLYCHROME 2 cards PAIR", () => {
    //PAIR hand with 1 HOLOGRAPHIC, 1 POLYCHROME, in that order

    let testCards = [
        new PlayingCard(Ranks.THREE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.HOLOGRAPHIC, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.POLYCHROME, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(14);
    expect(testMult).toBeCloseTo(18);
});

//order of cards played matters!
test("POLYCHROME + HOLOGRAPHIC 5 cards STRAIGHT", () => {
    //STRAIGHT hand with 1 HOLOGRAPHIC, 1 POLYCHROME, in that order
    //Mult: 4 x 1.5 + 10
    //TWO of DIAMONDS should be scored first (x1.5 Mult), and then FOUR OF HEARTS (+10 Mult)
    let testCards = [
        new PlayingCard(Ranks.THREE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.POLYCHROME, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.HOLOGRAPHIC, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(50);
    expect(testMult).toBeCloseTo(16);
});
//---------------------------------------------------------
/**
 * ENHANCEMENTS + ENHANCEMENTS
 * 
 * BONUS, MULT, WILD, GLASS, STEEL, STONE, LUCKY
 */
//---------------------------------------------------------

test("BONUS + MULT 4 cards STRAIGHT_FLUSH", () => {
    //STRAIGHT_FLUSH hand with 2 BONUS cards and 2 MULT cards

    let testCards = [
        new PlayingCard(Ranks.THREE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.BONUS, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.BONUS, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(185);
    expect(testMult).toBe(16);
});

test("BONUS + WILD 2 cards FLUSH", () => {
    //FLUSH hand with 1 BONUS and 1 WILD card

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.BONUS, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(89);
    expect(testMult).toBe(4);
});

test("BONUS + GLASS 2 cards TWO_PAIR", () => {
    //TWO_PAIR hand with 1 BONUS and 1 GLASS card split amongst the pairs

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.BONUS, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(74);
    expect(testMult).toBe(4);
});

test("BONUS + STEEL 1 card played, 7 cards in Hand HIGH_CARD", () => {
    //HIGH_CARD hand with 1 BONUS card played, 7 unplayed HIGH_CARDs

    let testCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.BONUS, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let unplayedCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE),
    ];

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, unplayedCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(45);
    expect(testMult).toBeCloseTo(17.0859, 3);
});

test("BONUS + STONE 3 cards THREE_OF_A_KIND", () => {
    //THREE_OF_A_KIND with 1 BONUS card in the played hand + 2 STONE cards

    let testCards = [
        new PlayingCard(Ranks.JACK, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE, 0),
        new PlayingCard(Ranks.KING, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE, 1),
        new PlayingCard(Ranks.JACK, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE, 2),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE, 3),
        new PlayingCard(Ranks.JACK, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.BONUS, SealTypes.NONE, 4),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(190);
    expect(testMult).toBe(3);
});

test("BONUS + LUCKY 2 cards 2 cards PAIR preseeded", () => {
    //PAIR hand with 1 BONUS card and 1 LUCKY card, preseeded to trigger

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.BONUS, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.LUCKY, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker ,"e");
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(48);
    expect(testMult).toBe(22);
});

test("MULT + WILD 5 cards FLUSH", () => {
    //FLUSH hand with 4 WILD cards and 1 MULT card

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(59);
    expect(testMult).toBe(8);
});

//order of cards played matters!
test("MULT + GLASS 2 cards PAIR", () => {
    //PAIR with 1 MULT and 1 GLASS card, in that order

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(20);
    expect(testMult).toBe(12);
});

test("MULT + STEEL 5 cards played, 3 in hand FIVE_OF_A_KIND", () => {
    //FIVE_OF_A_KIND hand with 5 MULT cards and 3 unplayed STEEL cards

    let testCards = [
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE, 0),
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE, 1),
        new PlayingCard(Ranks.FIVE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE, 2),
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE, 3),
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE, 4),
    ];

    let unplayedCards = [
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE, 5),
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE, 6),
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE, 7),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, unplayedCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(145);
    expect(testMult).toBe(108);
});

test("MULT + STONE 2 cards HIGH_CARD", () => {
    //HIGH_CARD with 1 MULT card and 1 STONE card

    let testCards = [
        new PlayingCard(Ranks.FIVE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE, 0),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE, 1),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE, 2),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE, 3),
        new PlayingCard(Ranks.SIX, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE, 4),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(65);
    expect(testMult).toBe(5);
});

test("MULT + LUCKY", () => {
    expect(true).toBeFalsy();
});

test("WILD + GLASS 4 cards FLUSH", () => {
    //FLUSH hand with 2 GLASS cards and 2 WILD cards

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(64);
    expect(testMult).toBe(16);
});

test("WILD + STEEL 5 cards played, 3 in hand FLUSH", () => {
    //FLUSH 5 WILD cards, 3 STEEL cards in hand

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
    ];

    let unplayedCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, unplayedCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(64);
    expect(testMult).toBe(13.5);
});

test("WILD + STONE 5 cards FLUSH", () => {
    //FLUSH with 4 WILD cards (FOUR_FINGERS joker) + 1 STONE card

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [JokerIDs.FOUR_FINGERS];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(107);
    expect(testMult).toBe(4);
    expect(handCheck.handType).toBe(HandTypePriorities.FLUSH);
});

test("WILD + LUCKY 5 cards FLUSH", () => {
    //FLUSH with 1 LUCKY card and 4 WILD cards (FOUR_FINGERS)

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.LUCKY, SealTypes.NONE, 1),
        new PlayingCard(Ranks.SIX, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.WILD, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [JokerIDs.FOUR_FINGERS];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker, "e");
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(63);
    expect(handCheck.handType).toBe(HandTypePriorities.FLUSH);
    expect(testMult).toBe(24);
});

test("GLASS + STEEL 5 cards played 3 in hand FULL_HOUSE", () => {
    //FULL_HOUSE with 5 GLASS cards + 3 unplayed STEEL cards

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE, 0),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE, 1),
        new PlayingCard(Ranks.FIVE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE, 2),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE, 3),
        new PlayingCard(Ranks.FIVE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE, 4),
    ];

    let unplayedCards = [
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE, 5),
        new PlayingCard(Ranks.THREE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE, 6),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE, 2),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, unplayedCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(56);
    expect(testMult).toBe(432);
});

//order of cards played matters!
test("GLASS + LUCKY", () => {
    expect(true).toBeFalsy();
});

//order of cards played matters!
test("GLASS + MULT 2 cards PAIR", () => {
    //PAIR with 1 GLASS and 1 MULT card, in that order

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, [], jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(20);
    expect(testMult).toBe(8);
});

test("STEEL + STONE 1 card played, 7 cards in hand HIGH_CARD", () => {
    //HIGH_CARD with 1 STONE card, 7 STEEL unplayed cards in hand

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE, 0),
    ];

    let unplayedCards = [
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE, 5),
        new PlayingCard(Ranks.THREE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE, 6),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE, 7),
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE, 8),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE, 9),
        new PlayingCard(Ranks.JACK, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE, 10),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STEEL, SealTypes.NONE, 11),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);
    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, unplayedCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(testChips).toBe(55);
    expect(testMult).toBeCloseTo(17.0859, 3);
});

test("STEEL + LUCKY", () => {
    expect(true).toBeFalsy();
});

test("STONE + LUCKY", () => {
    expect(true).toBeFalsy();
});

//order of cards played matters!
test("LUCKY + GLASS", () => {
    expect(true).toBeFalsy();
});

//order of cards played matters!
test("LUCKY + STEEL", () => {
    expect(true).toBeFalsy();
});