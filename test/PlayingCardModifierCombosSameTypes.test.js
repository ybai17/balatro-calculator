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

test("BONUS + MULT", () => {
    expect(true).toBeFalsy();
});

test("BONUS + WILD", () => {
    expect(true).toBeFalsy();
});

test("BONUS + GLASS", () => {
    expect(true).toBeFalsy();
});

test("BONUS + STEEL", () => {
    expect(true).toBeFalsy();
});

test("BONUS + STONE", () => {
    expect(true).toBeFalsy();
});

test("BONUS + LUCKY", () => {
    expect(true).toBeFalsy();
});

test("MULT + WILD", () => {
    expect(true).toBeFalsy();
});

//order of cards played matters!
test("MULT + GLASS", () => {
    expect(true).toBeFalsy();
});

//order of cards played matters!
test("MULT + STEEL", () => {
    expect(true).toBeFalsy();
});

test("MULT + STONE", () => {
    expect(true).toBeFalsy();
});

test("MULT + LUCKY", () => {
    expect(true).toBeFalsy();
});

test("WILD + GLASS", () => {
    expect(true).toBeFalsy();
});

test("WILD + STEEL", () => {
    expect(true).toBeFalsy();
});

test("WILD + STONE", () => {
    expect(true).toBeFalsy();
});

test("WILD + LUCKY", () => {
    expect(true).toBeFalsy();
});

test("GLASS + STEEL", () => {
    expect(true).toBeFalsy();
});

//order of cards played matters!
test("GLASS + LUCKY", () => {
    expect(true).toBeFalsy();
});

test("STEEL + STONE", () => {
    expect(true).toBeFalsy();
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