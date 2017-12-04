import React, {Component} from 'react';
import {checkGuessWord, isWordValid} from './wordGameLogic';
import HistoryGuessPanel from './GameRecordPanel';
import './game.css';

class GameGuessWord extends Component {
    constructor(props) {
        super(props);
        this._initstate = {
            buttonStatus: 'disabled',
            inputStatus: '',
            messageToUser: 'Welcome to Word Game',
            attemptedWordList: [],
            matchedByLetterList: [],
            matchedByPositionList: [],
            guessWord: ""
        };
        this.state = this._initstate;
    }

    getGuessWord = (e) => {
        const isValid = isWordValid(e.target.value.toUpperCase(), this.props.list.targetWord, new Set(this.state.attemptedWordList));
        this.setState({
            guessWord: e.target.value,
            buttonStatus: isValid ? '' : 'disabled'
        });

        this.setState({messageToUser: !isValid ? 'Please enter a valid word' : "Make a guess!"});
    };

    submitGuessWord = () => {
        const res = checkGuessWord(this.props.list, this.state.guessWord);
        if (res.isWin) {
            this.setState({
                messageToUser: 'Congratulations! You got the word! It is ' + this.state.guessWord.toUpperCase(),
                inputStatus: 'disabled'
            });
        } else {
            this.setState({messageToUser: 'Do not give up, Keep going!'});
        }

        const wordPool = this.state.attemptedWordList.slice();
        wordPool.push(this.state.guessWord.toUpperCase());

        const letterMatched = this.state.matchedByLetterList.slice();
        letterMatched.push(res.matchedByLetter);

        const positionMatched = this.state.matchedByPositionList.slice();
        positionMatched.push(res.matchedByPosition);

        this.setState({
            matchedByLetterList: letterMatched,
            attemptedWordList: wordPool,
            matchedByPositionList: positionMatched,
            guessWord: '',
            buttonStatus: 'disabled'
        });

        this.props.countTimesChange();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.list.countTimes == 0) {
            this.setState(this._initstate);
        }
    }

    render() {
        return (
            <div>
                <div className="summary-panel">
                    <span>Enter Your Word :</span>
                    <input type="text"
                           id="guess-word"
                           value={this.state.guessWord}
                           disabled={this.state.inputStatus}
                           onChange={this.getGuessWord}/>
                    <button id="play-btn"
                            disabled={this.state.buttonStatus}
                            onClick={this.submitGuessWord}>
                        Submit
                    </button>
                </div>
                <div className="message">
                    <p id="insert-message"> {this.state.messageToUser} </p>
                </div>
                <HistoryGuessPanel
                    attemptedWordList={this.state.attemptedWordList}
                    matchedByLetterList={this.state.matchedByLetterList}
                    matchedByPositionList={this.state.matchedByPositionList}
                    dicList={this.props.list.potentialWordList}
                />
            </div>
        );
    }
}
export default GameGuessWord;