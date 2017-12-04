const difficuties = new Map();
difficuties.set('Easy', ['CAT', 'DOG', 'COG', 'PAT', 'HIT', 'PIE', 'PIG', 'DIP']);
difficuties.set('Normal', ['STARS', 'START', 'STRAP', 'PARTS', 'RANTS', 'STAND', 'GUESS', 'TREES', 'GUEST', 'TRAPS', 'GREET']);
difficuties.set('Hard', ['TEASER', 'RESCUE', 'STACKS', 'TRUCKS', 'DUCKED', 'SPIRIT', 'EASIER', 'PANDER', 'STUPOR', 'RUSTED', 'PLANTS', 'STRIPE', 'STRIDE', 'CUSTOM', 'MASKED', 'WREATH', 'STREWN', 'BRUTES', 'BRAINS', 'BEASTS', 'RIBBON', 'HAPPEN', 'NAPPED', 'NIGHTS', 'KNIGHT']);
difficuties.set('test', ['CAT']);
difficuties.set('testRandom', ['GUESS', 'START']);

export const login = (user, password) => {
    return Promise.resolve()
        .then ( () => {
            return fetch(`//sea-info6250-crud.herokuapp.com/users/test/${user}/session`, {
                method: 'POST',
                body: JSON.stringify({password: password}),
                credentials: 'include'
            });
        })
        .then (r => r.ok ? r.json() : r.json().then(j => Promise.reject(j)))
        .then(j => {console.log(j); return j})
        .catch(e => console.warn(e))
};

export const checkLoggedIn = () => {
    return Promise.resolve()
        .then(() => {
            return fetch(`//sea-info6250-crud.herokuapp.com/users/test/me`, {
                method: 'GET',
                credentials: 'include',
            });
        })
        .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
        .then(json => {console.log(json); return json})
        .catch(err => console.warn(err));
}

export const setAccount = (user, password) => {
    return Promise.resolve()
        .then(() => {
            return fetch(`//sea-info6250-crud.herokuapp.com/users/test/${user}`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({password: password})
            });
        })
        .then( response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
        .then(json => {console.log(json); return json})
        .catch(err => console.warn(err));
};
export const logout = (user) => {
    return fetch(`//sea-info6250-crud.herokuapp.com/users/test/${user}/session`, {
        method: 'DELETE',
        credentials: 'include',
    })
        .then(response => response.ok ? response.json() : response.json().then(err => Promise.reject(err)))
        .then(json => console.log(json))
        .catch(err => console.warn(err));
}

export const startNewGame = (diff) => {
    // initial a new set use to check duplicate inputs and initial count value
    const guessWordList = new Set();
    const countGuessTimes = 0;
    diff = diff || 'Normal';
    const targetWord = difficuties.get(diff)[Math.floor(Math.random() * difficuties.get(diff).length)];
    return {
        targetWord: targetWord,
        potentialWordList: difficuties.get(diff),
        countTimes: countGuessTimes,
        diff: diff,
        wordLength: targetWord.length,
        guessedWordList: guessWordList
    };
}

export const checkGuessWord = (list, word) => {

    const matchedByLetter = twoWordsMatchedByLetter(list.targetWord, word.toUpperCase());
    const matchedByPosition = twoWordsMatchedByPosition(list.targetWord, word.toUpperCase());
    const isWin = matchedByPosition === word.length;
    return {
        matchedByLetter: matchedByLetter,
        matchedByPosition: matchedByPosition,
        isWin: isWin,
    };
};

export const isWordValid = (currentWord, targetWord, guessedWordList) => {
    if (currentWord.length !== targetWord.length || guessedWordList.has(currentWord)) {
        return false;
    }
    else {
        return true;
    }
};

const twoWordsMatchedByLetter = (targetWord, guessWord) => {
    const targetWordLetters = targetWord.split('');
    const guessWordLetters = guessWord.split('');
    let countMatchedByLetter = 0;
    for (let targetIndex = 0; targetIndex < targetWordLetters.length; targetIndex++) {
        for (let guessIndex = 0; guessIndex < guessWordLetters.length; guessIndex++) {
            if (targetWordLetters[targetIndex] === guessWordLetters[guessIndex]) {
                countMatchedByLetter += 1;
                guessWordLetters.splice(guessIndex, 1);
            }
        }
    }
    return countMatchedByLetter;
}

const twoWordsMatchedByPosition = (targetWord, guessWord) => {
    const targetWordLetters = targetWord.split('');
    const guessWordLetters = guessWord.split('');
    let countMatchedByPosition = 0;
    for (let index = 0; index < targetWordLetters.length; index++) {
        if (targetWordLetters[index] === guessWordLetters[index]) {
            countMatchedByPosition += 1;
        }
    }
    return countMatchedByPosition;
}

if(typeof module !== 'undefined' && module.exports) {
    module.exports = {startNewGame, twoWordsMatchedByLetter, twoWordsMatchedByPosition};
}