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

    //boolean, array of Cards
    let isHand, scoringCards;

    [isHand, scoringCards] = isFlushFive(playedHand, jokers);

    if (isHand) {
        return {handType: TypesAndPriority.FLUSH_FIVE, scoringCards: scoringCards};
    }

    [isHand, scoringCards] = isFlushHouse(playedHand, jokers);

    if (isHand) {
        return {handType: TypesAndPriority.FLUSH_HOUSE, scoringCards: scoringCards};
    }

    [isHand, scoringCards] = isFiveOfAKind(playedHand, jokers);

    if (isHand) {
        return {handType: TypesAndPriority.FIVE_OF_A_KIND, scoringCards: scoringCards};
    }

    [isHand, scoringCards] = isStraightFlush(playedHand, jokers);

    if (isHand) {
        return {handType: TypesAndPriority.STRAIGHT_FLUSH, scoringCards: scoringCards};
    }

    [isHand, scoringCards] = isFourOfAKind(playedHand, jokers);

    if (isHand) {
        return {handType: TypesAndPriority.FOUR_OF_A_KIND, scoringCards: scoringCards};
    }

    [isHand, scoringCards] = isFullHouse(playedHand, jokers);

    if (isHand) {
        return {handType: TypesAndPriority.FULL_HOUSE, scoringCards: scoringCards};
    }

    [isHand, scoringCards] = isFlush(playedHand, jokers);

    if (isHand) {
        return {handType: TypesAndPriority.FLUSH, scoringCards: scoringCards};
    }

    [isHand, scoringCards] = isStraight(playedHand, jokers);

    if (isHand) {
        return {handType: TypesAndPriority.STRAIGHT, scoringCards: scoringCards};
    }

    [isHand, scoringCards] = isThreeOfAKind(playedHand, jokers);

    if (isHand) {
        return {handType: TypesAndPriority.THREE_OF_A_KIND, scoringCards: scoringCards};
    }

    [isHand, scoringCards] = isTwoPair(playedHand, jokers);

    if (isHand) {
        return {handType: TypesAndPriority.TWO_PAIR, scoringCards: scoringCards};
    }

    [isHand, scoringCards] = isPair(playedHand, jokers);

    if (isHand) {
        return {handType: TypesAndPriority.PAIR, scoringCards: scoringCards};
    }

    scoringCards = findHighCard(playedHand, jokers);

    return {handType: TypesAndPriority.HIGH_CARD, scoringCards: scoringCards};
}

//-----------------------------------------
//The functions that do the checking. Need to return true or false, as well as a Hand object containing the scoring cards
//-----------------------------------------



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

function findHighCard(playedHand, jokers) {
    
}

export default checkHandType;