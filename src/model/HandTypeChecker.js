/**
 * This class will handle the logic for checking for what kind of hand the player has played.
 * 
 * The Flush Five, Flush House, and Five of a Kind hands are secret hands unique to Balatro and not found in poker normally.
 */

import TypesAndScores from "./HandTypesAndBaseScores";
import TypesAndPriority from "./HandTypesAndPriority";
import PlayedHand from "./Hands/PlayedHandObject";

function checkHandType(playedHand) {

    if (isFlushFive(playedHand)) {
        return TypesAndPriority.FLUSH_FIVE;
    }

    if (isFlushHouse(playedHand)) {
        return TypesAndPriority.FLUSH_HOUSE;
    }

    if (isFiveOfAKind(playedHand)) {
        return TypesAndPriority.FIVE_OF_A_KIND;
    }

    if (isStraightFlush(playedHand)) {
        return TypesAndPriority.STRAIGHT_FLUSH;
    }

    if (isFourOfAKind(playedHand)) {
        return TypesAndPriority.FOUR_OF_A_KIND;
    }

    if (isFullHouse(playedHand)) {
        return TypesAndPriority.FULL_HOUSE;
    }

    if (isFlush(playedHand)) {
        return TypesAndPriority.FLUSH;
    }

    if (isStraight(playedHand)) {
        return TypesAndPriority.STRAIGHT;
    }

    if (isThreeOfAKind(playedHand)) {
        return TypesAndPriority.THREE_OF_A_KIND;
    }

    if (isTwoPair(playedHand)) {
        return TypesAndPriority.TWO_PAIR;
    }

    if (isPair(playedHand)) {
        return TypesAndPriority.PAIR;
    }
}

function isFlushFive(playedHand) {
    if (playedHand.size == 5) {
        let firstCard = playedHand.cards[0];

        for (let i = 1; i < 5; i++) {
            if (firstCard.rank != playedHand.cards[i] || firstCard.suit != playedHand.cards[i]) {
                return false;
            }
        }

        return true;
    }

    return false;
}

function isFlushHouse(playedHand) {
    if (isFlush(playedHand) && isFullHouse(playedHand)) {
        return true;
    }

    return false;
}

function isFiveOfAKind(playedHand) {
    if (playedHand.size == 5) {
        let firstCard = playedHand.cards[0];

        for (let i = 1; i < 5; i++) {
            if (firstCard.rank != playedHand.cards[i]) {
                return false;
            }
        }

        return true;
    }

    return false;
}

function isStraightFlush(playedHand) {
    if (isStraight(playedHand) && isFlush(playedHand)) {
        return true;
    }

    return false;
}

function isFourOfAKind(playedHand) {

}

function isFullHouse(playedHand) {

}

function isFlush(playedHand) {
    
}

function isStraight(playedHand) {

}

function isThreeOfAKind(playedHand) {

}

function isTwoPair(playedHand) {

}

function isPair(playedHand) {

}

//high card will be the default if no other hands are detected

export default checkHandType;