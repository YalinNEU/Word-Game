import React, { Component } from 'react';
import './App.css';
import {login, setAccount, logout, checkLoggedIn} from './wordGameLogic';
import LoginForm from './LoginForm';
import GameSetUp from './GameSetUp'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false
        };
        this.submitLogin = this.submitLogin.bind(this);
    }
    submitLogin = ({username, password}) =>{
       login(username, password)
           .then(loginInfo => {
               this.setState({
                   loggedIn:true,
                   user: loginInfo.username
               })
           });
    }
    componentDidMount() {
        checkLoggedIn().then(loginInfo => {
            if (loginInfo.username) {
                this.setState({loggedIn: true, user: loginInfo.username})
            }
        })
    }
    createAccount = ({username, password}) => {
        setAccount(username, password)
            .then(accountInfo => {
                this.setState({
                    loggedIn:true,
                    user: accountInfo.username
                })
            });
    }
    logOutGame = (username) => {
        logout(username)
            .then(() => {
                this.setState({
                    loggedIn: false,
                    user: ''
                })
            });
    }
  render() {
    return (
        <div className="App">
            {this.state.loggedIn ? <GameSetUp user={this.state.user} onLogOut ={this.logOutGame}/> : <LoginForm onLogin={this.submitLogin} onCreateAccount={this.createAccount}/>}
        </div>
    );
  }
}

export default App;
