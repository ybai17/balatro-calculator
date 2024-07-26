/**
 * This file will test playing card modifiers and how they interact with the scoring values.
 * 
 * So it will test if the different playing card Editions, Enhancements, and Seals score properly.
 * 
 * No jokers in play here, but we will test hands and hand levels/planet card use.
 */

import PlayingCard from "../src/model/PlayingCard";
import PlayedHand from "../src/model/PlayedHandObject";
import { Ranks, Suits, EnhancementTypes, EditionTypes, SealTypes } from "../src/model/CardTypes";
import checkHandType from "../src/model/HandTypeChecker";
import ScoreObject from "../src/model/ScoreObject";
import { PlanetTracker } from "../src/model/PlanetCards/PlanetDefs";
import { HandTypePriorities } from "../src/model/HandTypeDefs";
import { expect, test } from "vitest"; 

//----------------------------------------------------------
//EDITIONS (FOIL, HOLOGRAPHIC, POLYCHROME)
//----------------------------------------------------------

test("FOIL 1 card HIGH_CARD", () => {
    //HIGH_CARD hand with the scoring card being a FOIL card (+50 chips)

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.FOIL, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.NINE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(testChips).toBe(66);
    expect(testMult).toBe(1);
});

test("FOIL 3 cards THREE_OF_A_KIND", () => {
    //THREE_OF_A_KIND hand with the 3 scoring cards all being FOIL cards (+50 chips)

    let testCards = [
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.FOIL, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.FOIL, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.HEARTS, EditionTypes.FOIL, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.THREE_OF_A_KIND);
    expect(testChips).toBe(210);
    expect(testMult).toBe(3);
});

test("FOIL 1 nonscoring card HIGH_CARD", () => {
    //HIGH_CARD hand with with a FOIL card played, but it shouldn't score

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.NINE, Suits.DIAMONDS, EditionTypes.FOIL, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(testChips).toBe(16);
    expect(testMult).toBe(1);
});

test("HOLOGRAPHIC 1 card HIGH_CARD", () => {
    //HIGH_CARD hand with the scoring card being a HOLOGRAPHIC card (+10 Mult)

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.HOLOGRAPHIC, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.NINE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(testChips).toBe(15);
    expect(testMult).toBe(11);
});

test("HOLOGRAPHIC 4 cards FOUR_OF_A_KIND", () => {
    //FOUR_OF_A_KIND hand with 4 HOLOGRAPHIC cards (+10 Mult)

    let testCards = [
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.HOLOGRAPHIC, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.HOLOGRAPHIC, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.HOLOGRAPHIC, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.HOLOGRAPHIC, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.FOUR_OF_A_KIND);
    expect(testChips).toBe(72);
    expect(testMult).toBe(47);
});

test("HOLOGRAPHIC 1 card nonscoring FOUR_OF_A_KIND", () => {
    //FOUR_OF_A_KIND hand with 4 normal cards and 1 HOLOGRAPHIC card that shouldn't score

    let testCards = [
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.THREE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.SPADES, EditionTypes.HOLOGRAPHIC, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.FOUR_OF_A_KIND);
    expect(testChips).toBe(72);
    expect(testMult).toBe(7);
});

test("POLYCHROME 1 card HIGH_CARD", () => {
    //HIGH_CARD hand with the scoring card being a POLYCHROME card (x1.5 Mult)

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.SPADES, EditionTypes.POLYCHROME, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.NINE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(testChips).toBe(15);
    expect(testMult).toBeCloseTo(1.5, 1);
});

test("POLYCHROME 5 cards FLUSH", () => {
    //FLUSH hand with 5 scoring cards being POLYCHROME (x1.5 Mult)

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.POLYCHROME, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.POLYCHROME, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.POLYCHROME, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.CLUBS, EditionTypes.POLYCHROME, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.POLYCHROME, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.FLUSH);
    expect(testChips).toBe(68);
    expect(testMult).toBeCloseTo(30.375, 3);
});

test("POLYCHROME 2 cards nonscoring THREE_OF_A_KIND", () => {
    //THREE_OF_A_KIND hand with 3 scoring cards, but 2 POLYCHROME cards that shouldn't score

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.POLYCHROME, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.POLYCHROME, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let handCheck = checkHandType(hand, jokers);

    let tracker = new PlanetTracker();

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);

    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.THREE_OF_A_KIND);
    expect(testChips).toBe(60);
    expect(testMult).toBeCloseTo(3, 1);
});

//--------------------------------------------------------------------------------
//ENHANCEMENTS (BONUS, MULT, WILD, GLASS, STEEL, STONE, GOLD, LUCKY)
//
// 
// This section will be more tricky because LUCKY + STEEL cards work slightly differently. 
// LUCKY cards: 1 in 5 chance for +20 Mult, 1 in 15 chance to win $20
// STEEL cards: x1.5 Mult while this card stays in hand
//--------------------------------------------------------------------------------
//todo: STONE cards need to actually count for scoring. Right now they only show up in the scoringCards array

test("BONUS 1 card HIGH_CARD", () => {
    //HIGH_CARD hand with the scoring card being a BONUS card (+30 Chips)

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.BONUS, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let tracker = new PlanetTracker();
    let handCheck = checkHandType(hand, jokers);

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(testChips).toBe(45);
    expect(testMult).toBe(1);
});

test("BONUS 2 cards PAIR", () => {
    //PAIR hand with 2 scoring BONUS cards

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.BONUS, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.BONUS, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let tracker = new PlanetTracker();
    let handCheck = checkHandType(hand, jokers);

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.PAIR);
    expect(testChips).toBe(90);
    expect(testMult).toBe(2);
});

test("BONUS 3 cards nonscoring PAIR", () => {
    //PAIR hand with 3 nonscoring BONUS cards

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.BONUS, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.BONUS, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.BONUS, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let tracker = new PlanetTracker();
    let handCheck = checkHandType(hand, jokers);

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.PAIR);
    expect(testChips).toBe(30);
    expect(testMult).toBe(2);
});

test("MULT 1 card HIGH_CARD", () => {
    //HIGH_CARD hand with the scoring card being a MULT card (+4 Mult)

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let tracker = new PlanetTracker();
    let handCheck = checkHandType(hand, jokers);

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(testChips).toBe(15);
    expect(testMult).toBe(5);
});

test("MULT 5 cards FLUSH", () => {
    //FLUSH hand with the 5 scoring cards all being MULT cards (+4 Mult)

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE),
        new PlayingCard(Ranks.JACK, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.MULT, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let tracker = new PlanetTracker();
    let handCheck = checkHandType(hand, jokers);

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.FLUSH);
    expect(testChips).toBe(62);
    expect(testMult).toBe(24);
});

test("MULT 1 cards nonscoring TWO_PAIR", () => {
    //TWO_PAIR hand with 1 nonscoring MULT card

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.QUEEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.BONUS, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let tracker = new PlanetTracker();
    let handCheck = checkHandType(hand, jokers);

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.TWO_PAIR);
    expect(testChips).toBe(44);
    expect(testMult).toBe(2);
});

test("GLASS 1 card HIGH_CARD", () => {
    //HIGH_CARD hand with the scoring card being a GLASS card (x2 Mult)

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let tracker = new PlanetTracker();
    let handCheck = checkHandType(hand, jokers);

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(testChips).toBe(12);
    expect(testMult).toBe(2);
});

test("GLASS 5 cards FLUSH_FIVE", () => {
    //FLUSH_FIVE hand with 5 scoring cards being GLASS (x2 Mult)

    let testCards= [
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
        new PlayingCard(Ranks.KING, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let tracker = new PlanetTracker();
    let handCheck = checkHandType(hand, jokers);

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.FLUSH_FIVE);
    expect(testChips).toBe(210);
    expect(testMult).toBe(512);
});

test("GLASS 4 card nonscoring HIGH_CARD", () => {
    //HIGH_CARD hand with the scoring card being a GLASS card (x2 Mult)

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
        new PlayingCard(Ranks.FIVE, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
        new PlayingCard(Ranks.SIX, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.GLASS, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let tracker = new PlanetTracker();
    let handCheck = checkHandType(hand, jokers);

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(testChips).toBe(12);
    expect(testMult).toBe(1);
});

test("STONE 1 card FOUR_OF_A_KIND", () => {
    //FOUR_OF_A_KIND hand with 1 STONE card that also scores

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TWO, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let tracker = new PlanetTracker();
    let handCheck = checkHandType(hand, jokers);

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.FOUR_OF_A_KIND);
    expect(testChips).toBe(118);
    expect(testMult).toBe(7);
});

test("STONE 5 cards HIGH_CARD", () => {
    //HIGH_CARD hand because there are 5 STONE cards, who do not count for special hands

    let testCards = [
        new PlayingCard(Ranks.TWO, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.EIGHT, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let tracker = new PlanetTracker();
    let handCheck = checkHandType(hand, jokers);

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.HIGH_CARD);
    expect(testChips).toBe(255);
    expect(testMult).toBe(1);
});

test("STONE 3 cards PAIR", () => {
    //PAIR hand with 3 scoring STONE cards

    let testCards = [
        new PlayingCard(Ranks.ACE, Suits.HEARTS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.TEN, Suits.SPADES, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.ACE, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.NONE, SealTypes.NONE),
        new PlayingCard(Ranks.FOUR, Suits.CLUBS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
        new PlayingCard(Ranks.SEVEN, Suits.DIAMONDS, EditionTypes.NONE, EnhancementTypes.STONE, SealTypes.NONE),
    ];

    let hand = new PlayedHand(testCards);
    let jokers = [];
    let tracker = new PlanetTracker();
    let handCheck = checkHandType(hand, jokers);

    let testScore = new ScoreObject(handCheck.handType, handCheck.scoringCards, jokers, tracker);
    let [testChips, testMult] = testScore.getFinalScoreValues();

    expect(handCheck.handType).toBe(HandTypePriorities.PAIR);
    expect(testChips).toBe(182);
    expect(testMult).toBe(2);
});

//RED SEAL

//EDITIONS + ENHANCEMENTS

//EDITIONS + RED SEAL

//ENHANCEMENTS + RED SEAL

//EDITIONS + ENHANCEMENTS + RED SEAL