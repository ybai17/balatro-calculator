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
    let handCheck;

    //for speed, checks for small hand sizes will go first
    if (playedHand.size === 1) {
        return {handType: TypesAndPriority.HIGH_CARD, scoringCards: playedHand.cards};
    } else if (playedHand.size === 2) {
        handCheck = isPair(playedHand, jokers);
        if (handCheck.isHand) {
            return {handType: TypesAndPriority.PAIR, scoringCards: handCheck.scoringCards};
        }

    } else if (playedHand.sie === 3) {
        handCheck = isThreeOfAKind(playedHand, jokers);
        if (handCheck.isHand) {
            return {handType: TypesAndPriority.THREE_OF_A_KIND, scoringCards: handCheck.scoringCards};
        }
    }

    if (playedHand.size === 5) {
        handCheck = isFlushFive(playedHand, jokers);
        if (handCheck.isHand) {
            return {handType: TypesAndPriority.FLUSH_FIVE, scoringCards: handCheck.scoringCards};
        }

        handCheck = isFlushHouse(playedHand, jokers);
        if (handCheck.isHand) {
            return {handType: TypesAndPriority.FLUSH_HOUSE, scoringCards: handCheck.scoringCards};
        }

        handCheck = isFiveOfAKind(playedHand, jokers);
        if (handCheck.isHand) {
            return {handType: TypesAndPriority.FIVE_OF_A_KIND, scoringCards: handCheck.scoringCards};
        }
    }
    
    handCheck = isStraightFlush(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.STRAIGHT_FLUSH, scoringCards: handCheck.scoringCards};
    }

    handCheck = isFourOfAKind(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.FOUR_OF_A_KIND, scoringCards: handCheck.scoringCards};
    }

    handCheck = isFullHouse(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.FULL_HOUSE, scoringCards: handCheck.scoringCards};
    }

    handCheck = isFlush(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.FLUSH, scoringCards: handCheck.scoringCards};
    }

    handCheck = isStraight(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.STRAIGHT, scoringCards: handCheck.scoringCards};
    }

    handCheck = isThreeOfAKind(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.THREE_OF_A_KIND, scoringCards: handCheck.scoringCards};
    }

    handCheck = isTwoPair(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.TWO_PAIR, scoringCards: handCheck.scoringCards};
    }

    handCheck = isPair(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.PAIR, scoringCards: handCheck.scoringCards};
    }

    handCheck = isHighCard(playedHand, jokers);

    return {handType: TypesAndPriority.HIGH_CARD, scoringCards: handCheck.scoringCards};
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

        return {isHand: true, scoringCards: playedHand.cards};
    }

    return {isHand: false, scoringCards: []};
}

function isFlushHouse(playedHand, jokers) {
    if (isFullHouse(playedHand, jokers)) {

        let firstCard = playedHand.cards[0];

        for (let i = 1; i < 5; i++) {
            if (firstCard.suit != playedHand.cards[i]) {
                return {isHand: false, scoringCards: []};
            }
        }

        return {isHand: true, scoringCards: []};
    }

    return {isHand: false, scoringCards: []};
}

function isFiveOfAKind(playedHand, jokers) {
    if (playedHand.size == 5) {
        let firstCard = playedHand.cards[0];

        for (let i = 1; i < 5; i++) {
            if (firstCard.rank != playedHand.cards[i]) {
                return {isHand: false, scoringCards: []};
            }
        }

        return {isHand: true, scoringCards: playedHand.cards};
    }

    return {isHand: false, scoringCards: []};
}

function isStraightFlush(playedHand, jokers) {
    if (isStraight(playedHand, jokers) && isFlush(playedHand, jokers)) {
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

    if (jokers.includes(JokerCards.FOUR_FINGERS)) {

    }

}

function isThreeOfAKind(playedHand, jokers) {

}

function isTwoPair(playedHand, jokers) {

}

function isPair(playedHand, jokers) {

}

//high card will be the default if no other hands are detected

function isHighCard(playedHand, jokers) {

    //find the card with the highest rank
    let highestCard = playedHand.cards[0];

    if (playedHand.size == 1)

    return {isHand: true, scoringCards: []};
}

export default checkHandType;