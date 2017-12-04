const test = require('tape');
const game = require('./wordGameLogic');

test('load game with a default model', t => {
    const res = game.startNewGame();
    t.equal(res.wordLength, 5);
    t.equal(res.diff, 'normal');
    t.end();
});

test('load game with a easy model', t => {
    const res = game.startNewGame('easy');
    t.equal(res.wordLength, 3);
    t.equal(res.diff, 'easy');
    t.end();
});

test('load game with a normal model', t => {
    const res = game.startNewGame('normal');
    t.equal(res.wordLength, 5);
    t.equal(res.diff, 'normal');
    t.end();
});

test('load game with a hard model', t => {
    const res = game.startNewGame('hard');
    t.equal(res.wordLength, 6);
    t.equal(res.diff, 'hard');
    t.end();
});

test('matched letters & exact matched letters', t => {
    game.startNewGame('test');
    const res = game.twoWordsMatchedByLetter('CAT', 'CAT');
    t.equal(res.countMatchedByLetter, 3);
    t.end();
});

