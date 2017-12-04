import React, {Component} from 'react';
import './game.css';

class HistoryGuessPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="history-panel">
                <div className="history-record">
                    <div className="history-summary">
                        {'Guessed Word'}
                        <ul id="guess-word-history">
                            {this.props.attemptedWordList.map((val, ind) => <div key={ind}>{val}</div>)}
                        </ul>
                    </div>
                    <div className="history-summary">
                        {'Correct Letters'}
                        <ul id="matched-num">
                            {this.props.matchedByLetterList.map((val, ind) => <div key={ind}>{val}</div>)}
                            {/*{this.props.guessList ? (this.props.guessList).map(x => <li>{x[0]}</li>) : <div></div>}*/}
                        </ul>
                    </div>
                    <div className="history-summary">
                        {'Exactly Correct'}
                        <ul id="exactly-matched-num">
                            {this.props.matchedByPositionList.map((val, ind) => <div key={ind}>{val}</div>)}
                        </ul>
                    </div>
                </div>
                <div className="word-dict">
                    {'Word Dictionary'}
                    <ul className="word-set">
                        {(this.props.dicList || []).map((val, ind) => <li key={ind}>{val}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
}
export default HistoryGuessPanel;