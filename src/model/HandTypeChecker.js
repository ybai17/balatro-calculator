/**
 * This class will handle the logic for checking for what kind of hand the player has played.
 * 
 * The Flush Five, Flush House, and Five of a Kind hands are secret hands unique to Balatro and not found in poker normally.
 */

import TypesAndScores from "./HandTypesAndBaseScores";
import TypesAndPriority from "./HandTypesAndPriority";
import PlayedHand from "./Hands/PlayedHandObject";
import JokerCards from "./JokerCards/JokerDefs";



function checkHandType(playedHand, jokers) {

    if (isFlushFive(playedHand, jokers)) {
        return TypesAndPriority.FLUSH_FIVE;
    }

    if (isFlushHouse(playedHand, jokers)) {
        return TypesAndPriority.FLUSH_HOUSE;
    }

    if (isFiveOfAKind(playedHand, jokers)) {
        return TypesAndPriority.FIVE_OF_A_KIND;
    }

    if (isStraightFlush(playedHand, jokers)) {
        return TypesAndPriority.STRAIGHT_FLUSH;
    }

    if (isFourOfAKind(playedHand, jokers)) {
        return TypesAndPriority.FOUR_OF_A_KIND;
    }

    if (isFullHouse(playedHand, jokers)) {
        return TypesAndPriority.FULL_HOUSE;
    }

    if (isFlush(playedHand, jokers)) {
        return TypesAndPriority.FLUSH;
    }

    if (isStraight(playedHand, jokers)) {
        return TypesAndPriority.STRAIGHT;
    }

    if (isThreeOfAKind(playedHand, jokers)) {
        return TypesAndPriority.THREE_OF_A_KIND;
    }

    if (isTwoPair(playedHand, jokers)) {
        return TypesAndPriority.TWO_PAIR;
    }

    if (isPair(playedHand, jokers)) {
        return TypesAndPriority.PAIR;
    }
}

function isFlushFive(playedHand, jokers) {
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

function isFlushHouse(playedHand, jokers) {
    if (isFlush(playedHand) && isFullHouse(playedHand)) {
        return true;
    }

    return false;
}

function isFiveOfAKind(playedHand, jokers) {
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

function isStraightFlush(playedHand, jokers) {
    if (isStraight(playedHand) && isFlush(playedHand)) {
        return true;
    }

    return false;
}

function isFourOfAKind(playedHand, jokers) {
    if (playedHand.size == 4 || playedHand.size == 5) {

    }
}

function isFullHouse(playedHand, jokers) {

}

function isFlush(playedHand, jokers) {

    if (jokers.includes(JokerCards.FOUR_FINGERS)) {

    }



}

function isStraight(playedHand, jokers) {

}

function isThreeOfAKind(playedHand, jokers) {

}

function isTwoPair(playedHand, jokers) {

}

function isPair(playedHand, jokers) {

}

//high card will be the default if no other hands are detected

export default checkHandType;