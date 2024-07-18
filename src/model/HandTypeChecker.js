/**
 * This class will handle the logic for checking for what kind of hand the player has played.
 * 
 * The Flush Five, Flush House, and Five of a Kind hands are secret hands unique to Balatro and not found in poker normally.
 * 
 * TODO: Need to consider the fact that stone cards will always be counted for +50 chips and score.
 * FOR NOW, ASSUME NO STONE CARDS
 */

import { EnhancementTypes } from "./CardTypes";
import TypesAndPriority from "./HandTypesAndPriority";
import JokerCards from "./JokerCards/JokerDefs";
import { Suits } from "./CardTypes";

function checkHandType(playedHand, jokers) {

    //what if we just clear out the stone cards here first, to avoid repetition in each function checking for them?
    let stoneCards = [];

    for (let i = 0; i < playedHand.size; i++) {
        let currCard = playedHand.cards[i];
        if (currCard.enhancement === EnhancementTypes.STONE) {
            stoneCards.push(currCard);
            playedHand.cards.splice(i, 1);
        }
    }

    //sort cards in descending order ahead of time for convenience
    playedHand.cards = playedHand.cards.sort((cardA, cardB) => {
        return cardB.rank - cardA.rank;
    });

    //boolean, array of Cards
    let handCheck;

    //for speed, checks for small hand sizes will go first
    if (playedHand.size === 1) {
        return {handType: TypesAndPriority.HIGH_CARD, scoringCards: playedHand.cards};
    } else if (playedHand.size === 2) {
        handCheck = isPair(playedHand, jokers);
        if (handCheck.isHand) {
            return {handType: TypesAndPriority.PAIR, scoringCards: handCheck.scoringCards.concat(stoneCards)};
        }

    } else if (playedHand.size === 3) {
        handCheck = isThreeOfAKind(playedHand, jokers);
        if (handCheck.isHand) {
            return {handType: TypesAndPriority.THREE_OF_A_KIND, scoringCards: handCheck.scoringCards.concat(stoneCards)};
        }
    }

    if (playedHand.size === 5) {
        handCheck = isFlushFive(playedHand, jokers);
        if (handCheck.isHand) {
            return {handType: TypesAndPriority.FLUSH_FIVE, scoringCards: handCheck.scoringCards.concat(stoneCards)};
        }

        handCheck = isFlushHouse(playedHand, jokers);
        if (handCheck.isHand) {
            return {handType: TypesAndPriority.FLUSH_HOUSE, scoringCards: handCheck.scoringCards.concat(stoneCards)};
        }

        handCheck = isFiveOfAKind(playedHand, jokers);
        if (handCheck.isHand) {
            return {handType: TypesAndPriority.FIVE_OF_A_KIND, scoringCards: handCheck.scoringCards.concat(stoneCards)};
        }

        handCheck = isFullHouse(playedHand, jokers);
        if (handCheck.isHand) {
            return {handType: TypesAndPriority.FULL_HOUSE, scoringCards: handCheck.scoringCards.concat(stoneCards)};
        }
    }
    
    handCheck = isStraightFlush(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.STRAIGHT_FLUSH, scoringCards: handCheck.scoringCards.concat(stoneCards)};
    }

    handCheck = isFourOfAKind(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.FOUR_OF_A_KIND, scoringCards: handCheck.scoringCards.concat(stoneCards)};
    }

    handCheck = isFlush(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.FLUSH, scoringCards: handCheck.scoringCards.concat(stoneCards)};
    }

    handCheck = isStraight(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.STRAIGHT, scoringCards: handCheck.scoringCards.concat(stoneCards)};
    }

    handCheck = isThreeOfAKind(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.THREE_OF_A_KIND, scoringCards: handCheck.scoringCards.concat(stoneCards)};
    }

    handCheck = isTwoPair(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.TWO_PAIR, scoringCards: handCheck.scoringCards.concat(stoneCards)};
    }

    handCheck = isPair(playedHand, jokers);
    if (handCheck.isHand) {
        return {handType: TypesAndPriority.PAIR, scoringCards: handCheck.scoringCards.concat(stoneCards)};
    }

    handCheck = isHighCard(playedHand, jokers);
    return {handType: TypesAndPriority.HIGH_CARD, scoringCards: handCheck.scoringCards.concat(stoneCards)};
}

//-----------------------------------------
//The functions that do the checking. Need to return true or false, as well as a Hand object containing the scoring cards
//-----------------------------------------

function isFlushFive(playedHand, jokers) {

    if (playedHand.size == 5) {
        let firstCard = playedHand.cards[0];

        for (let i = 1; i < 5; i++) {
            let curr = playedHand.cards[i];

            if (firstCard.rank != curr || !firstCard.areSuitsEqual(curr)) {
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
            let curr = playedHand.cards[i];

            if (firstCard.rank !== curr.rank) {
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

    if (playedHand.size < 4) {
        return {isHand: false, scoringCards: []};
    }

    let uniqueRanksAndCounts = {};

    playedHand.cards.forEach((curr) => {
        if (!uniqueRanksAndCounts.hasOwnProperty(curr.rank)) {
            uniqueRanksAndCounts[curr.rank] = [curr]; //store it as a scoring card
        }
        uniqueRanksAndCounts[curr.rank].push(curr);
    });

    for (const rankKey in uniqueRanksAndCounts) {
        let currRankArray = uniqueRanksAndCounts[rankKey];

        if (currRankArray.length === 4) {
            return {isHand: true, scoringCards: currRankArray};
        }
    }

    return {isHand: false, scoringCards: []};
}

function isFullHouse(playedHand, jokers) {
    if (playedHand.size === 5) {

        let uniqueRanksAndCounts = {};

        playedHand.cards.forEach((curr) => {
            if (!uniqueRanksAndCounts.hasOwnProperty(curr.rank)) {
                uniqueRanksAndCounts[curr.rank] = 1;
                return;
            }
            uniqueRanksAndCounts[curr.rank] += 1;
        });

        if (Object.keys(uniqueRanksAndCounts).length !== 2) {
            return {isHand: false, scoringCards: []};
        }

        //here we can guarantee that there are only 2 ranks. Now we have to confirm it's a 3-2 distribution
        //we cannot guarantee the order of the ranks stored in the differentRanks object
        let [first, second] = Object.keys(uniqueRanksAndCounts);

        if ((uniqueRanksAndCounts[first] === 3 && uniqueRanksAndCounts[second] === 2) ||
            (uniqueRanksAndCounts[first] === 2 && uniqueRanksAndCounts[second] === 3)) {
            return {isHand: true, scoringCards: playedHand.cards};
        }
    }

    return {isHand: false, scoringCards: []};
}

function isFlush(playedHand, jokers) {

    if (playedHand.size < 4) {
        return {isHand: false, scoringCards: []};
    }

    let suitsAndCounts = {
        CLUBS: [],
        DIAMONDS: [],
        HEARTS: [],
        SPADES: [],
    };

    playedHand.cards.forEach((currCard) => {
        if (currCard.enhancement === EnhancementTypes.WILD) {
            suitsAndCounts.CLUBS.push(currCard);
            suitsAndCounts.DIAMONDS.push(currCard);
            suitsAndCounts.HEARTS.push(currCard);
            suitsAndCounts.SPADES.push(currCard);
            return;
        }
        switch (currCard.suit) {
            case Suits.CLUBS:
                suitsAndCounts.CLUBS.push(currCard);
                break;
            case Suits.DIAMONDS:
                suitsAndCounts.DIAMONDS.push(currCard);
                break;
            case Suits.HEARTS:
                suitsAndCounts.HEARTS.push(currCard);
                break;
            case Suits.SPADES:
                suitsAndCounts.SPADES.push(currCard);
                break;
        }
    });

    for (const suitKey in suitsAndCounts) {
        let currArray = suitsAndCounts[suitKey];

        if (jokers.includes(JokerCards.FOUR_FINGERS)) {
            if (currArray.length === 4) {
                return {isHand: true, scoringCards: currArray};
            }
        }
        if (currArray.length === 5) {
            return {isHand: true, scoringCards: currArray};
        }
    }

    return {isHand: false, scoringCards: []};
}

//cards should already be sorted in descending order by rank when this is called
function isStraight(playedHand, jokers) {

    if (playedHand.size < 4) {
        return {isHand: false, scoringCards: []};
    }

    let handArray = playedHand.cards;

    if (jokers.includes(JokerCards.FOUR_FINGERS)) {
        //todo: implement check for straight with a combo of 4 cards
        if (handArray[0].rank - handArray[1].rank === 1 &&
            handArray[1].rank - handArray[2].rank === 1 &&
            handArray[2].rank - handArray[3].rank === 1) {
            
            return {isHand: true, scoringCards: playedHand.cards};
        }

        if (handArray[1].rank - handArray[2].rank === 1 &&
            handArray[2].rank - handArray[3].rank === 1 &&
            handArray[3].rank - handArray[4].rank === 1) {
            
            return {isHand: true, scoringCards: playedHand.cards};
        }
    } else {
        //normal check with 5 cards
        if (handArray[0].rank - handArray[1].rank === 1 &&
            handArray[1].rank - handArray[2].rank === 1 &&
            handArray[2].rank - handArray[3].rank === 1 &&
            handArray[3].rank - handArray[4].rank === 1) {
            
            return {isHand: true, scoringCards: playedHand.cards};
        }
    }

    return {isHand: false, scoringCards: []};
}

function isThreeOfAKind(playedHand, jokers) {

    if (playedHand.size < 3) {
        return {isHand: false, scoringCards: []};
    }

    let uniqueRanksAndCounts = {};

    playedHand.cards.forEach((curr) => {
        if (!uniqueRanksAndCounts.hasOwnProperty(curr.rank)) {
            uniqueRanksAndCounts[curr.rank] = [curr];
        }
        uniqueRanksAndCounts[curr.rank].push(curr);
    });

    for (const rankKey in uniqueRanksAndCounts) {
        let currRankArray = uniqueRanksAndCounts[rankKey];
        if (currRankArray.length === 3) {
            if (stoneCards.length !== 0) {
                return {isHand: true, scoringCards: currRankArray.concat(stoneCards)};
            }
        }
    }

    return {isHand: false, scoringCards: []};
}

function isTwoPair(playedHand, jokers) {
    if (playedHand.size < 4) {
        return {isHand: false, scoringCards: []};
    }

    let uniqueRanksAndCounts = {};

    playedHand.cards.forEach((curr) => {
        if (!uniqueRanksAndCounts.hasOwnProperty(currCard.rank)) {
            uniqueRanksAndCounts[currCard.rank] = [currCard];
        }  
        uniqueRanksAndCounts[currCard.rank].push(currCard);
    });

    let ranksWithPairArray = [];

    for (const rankKey in uniqueRanksAndCounts) {
        let currRankArray = uniqueRanksAndCounts[rankKey];
        if (currRankArray.length === 2) {
            ranksWithPairArray = ranksWithPairArray.concat(currRankArray);
        }
    }

    if (ranksWithPairArray.length == 4) {
        return {isHand: true, scoringCards: ranksWithPairArray};
    }

    return {isHand: false, scoringCards: []};
}

function isPair(playedHand, jokers) {
    if (playedHand.size < 2) {
        return {isHand: false, scoringCards: []};
    }

    let uniqueRanksAndCounts = {};

    playedHand.cards.forEach((curr) => {
        if (!uniqueRanksAndCounts.hasOwnProperty(currCard.rank)) {
            uniqueRanksAndCounts[currCard.rank] = [currCard];
        }  
        uniqueRanksAndCounts[currCard.rank].push(currCard);
    });

    let ranksWithPairArray = [];

    for (const rankKey in uniqueRanksAndCounts) {
        let currRankArray = uniqueRanksAndCounts[rankKey];
        if (currRankArray.length === 2) {
            ranksWithPairArray = ranksWithPairArray.concat(currRankArray);
        }
    }

    if (ranksWithPairArray.length == 2) {
        return {isHand: true, scoringCards: ranksWithPairArray};
    }

    return {isHand: false, scoringCards: []};
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