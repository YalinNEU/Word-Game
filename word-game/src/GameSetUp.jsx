import React, {Component} from 'react';
import {startNewGame} from './wordGameLogic';
import GameGuessWord from './GameGuessWord'
import './game.css';

class GameSetUp extends Component {
    constructor(props) {
        super(props);
        this.state = {countTimes: 0};
    }
    componentDidMount() {
        this.newGame();
    }
    setDiff = (e) => {
        const gameDetails = startNewGame(e.target.attributes[1].nodeValue);
        this.setState(gameDetails);
    };
    newGame = () => {
        const gameDetails = startNewGame(this.state.diff);
        this.setState(gameDetails);
    };

    updateCountTimes = () => {
        this.setState({countTimes: this.state.countTimes + 1});
    };
    logOutGame = () => {
        this.props.onLogOut(this.props.user);
    }

    render() {
        return (
            <div>
                <div className="banner">
                    <ul className="nav-header">
                        <li onClick={this.logOutGame}>Log {this.props.user} out</li>
                        <li id="new-game" onClick={this.newGame}>New Game</li>
                        <li id="difficulty">
                            <div>
                                Difficulty
                                <ul className="drop-down-content" id="diff-level" onClick={this.setDiff}>
                                    <li className="diff-level" name="Easy">Easy</li>
                                    <li className="diff-level" name="Normal">Normal</li>
                                    <li className="diff-level" name="Hard">Hard</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="summary-panel">
                    <div className="game-status">Word Difficulty: <span id="initial-diff">{this.state.diff}</span></div>
                    <div className="game-status">Word Length: <span
                        id="initial-word-length">{this.state.wordLength}</span></div>
                    <div className="game-status">Count Times: <span id="count-times">{this.state.countTimes}</span>
                    </div>
                </div>
                <GameGuessWord list={this.state} countTimesChange={this.updateCountTimes}/>
            </div>
        );
    }
}

export default GameSetUp;