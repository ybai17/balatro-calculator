/**
 * This class will handle the logic for checking for what kind of hand the player has played.
 * 
 * The Flush Five, Flush House, and Five of a Kind hands are secret hands unique to Balatro and not found in poker normally.
 * 
 * TODO: Need to consider the fact that stone cards will always be counted for +50 chips and score.
 */

import TypesAndScores from "./HandTypesAndBaseScores";
import TypesAndPriority from "./HandTypesAndPriority";
import PlayedHand from "./Hands/PlayedHandObject";
import JokerCards from "./JokerCards/JokerDefs";
import PlayingCard from "./PlayingCard";

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

    } else if (playedHand.size === 3) {
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

        handCheck = isFullHouse(playedHand, jokers);
        if (handCheck.isHand) {
            return {handType: TypesAndPriority.FULL_HOUSE, scoringCards: handCheck.scoringCards};
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
            if (firstCard.rank != playedHand.cards[i] || !firstCard.areSuitsEqual(playedHand.cards[i])) {
                return {isHand: false, scoringCards: []};
            }
        }

        return {isHand: true, scoringCards: playedHand.cards};
    }

    return {isHand: false, scoringCards: []};
}

function isFlushHouse(playedHand, jokers) {

    let fullHouseCheck = isFullHouse(playedHand, jokers);
    if (fullHouseCheck.isHand) {

        let flushCheck = isFlush(playedHand, jokers);
        return {isHand: flushCheck.isHand, scoringCards: flushCheck.scoringCards};
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

    let flushCheck = isFlush(playedHand, jokers);
    if (flushCheck.isHand) {

        let straightCheck = isStraight(flushCheck.scoringCards, jokers);
        return {isHand: straightCheck.isHand, scoringCards: straightCheck.scoringCards};
    }

    return {isHand: false, scoringCards: []};
}

function isFourOfAKind(playedHand, jokers) {
    if (playedHand.size == 4 || playedHand.size == 5) {

    }

    return {isHand: false, scoringCards: []};
}

function isFullHouse(playedHand, jokers) {
    if (playedHand.size === 5) {

    }

    return {isHand: false, scoringCards: []};
}

function isFlush(playedHand, jokers) {

    if (playedHand.size !== 4 || playedHand.size !== 5) {
        return {isHand: false, scoringCards: []};
    }

    if (jokers.includes(JokerCards.FOUR_FINGERS)) {
        
        //todo: implement checking for a flush of 4 cards

        return {isHand: false, scoringCards: []};
    }

    //normal check for a flush with 5 cards
    for (let i = 0; i < playedHand.size - 1; i++) {
        let curr = playedHand.cards[i];
        let next = playedHand.cards[i + 1];

        if (!curr.areSuitsEqual(next)) {
            return {isHand: false, scoringCards: []};
        }
    }

    return {isHand: true, scoringCards: playedHand.cards};

}

function isStraight(playedHand, jokers) {

    if (playedHand.size !== 4 || playedHand.size !== 5) {
        return {isHand: false, scoringCards: []};
    }

    if (jokers.includes(JokerCards.FOUR_FINGERS)) {
        //todo: implement check for straight with a combo of 4 cards
    }

    //normal check with 5 cards


    return {isHand: true, scoringCards: playedHand.cards};

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

    for (let i = 0; i < playedHand.size; i++) {
        let currCompare = playedHand.cards[i];

        if (highestCard.rank > currCompare.rank) {
            highestCard = currCompare;
        }
    }

    return {isHand: true, scoringCards: [highestCard]};
}

export default checkHandType;