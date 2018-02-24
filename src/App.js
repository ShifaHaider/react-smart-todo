import React, {Component} from 'react';
import './App.css';
import createBrowserHistory from 'history/createBrowserHistory'

import Register from './components/Register/register'
import Login from './components/login/login'
import Dashboard from './components/dashboard/dashboard'
import {Router, Route, Switch, Link} from 'react-router-dom'
import firebase from 'firebase'
import firestore from 'firebase/firestore'
var config = {
    apiKey: "AIzaSyAUItwpA9AmbqxtBKNcJSuRvXCbOMuSQkQ",
    authDomain: "react-smart-todo.firebaseapp.com",
    databaseURL: "https://react-smart-todo.firebaseio.com",
    projectId: "react-smart-todo",
    storageBucket: "react-smart-todo.appspot.com",
    messagingSenderId: "659919751663"
};
firebase.initializeApp(config);

const history = createBrowserHistory();


class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <div>
                        <Switch>
                            <Route exact path={'/'} component={Register}/>
                            <Route exact path={'/register'} component={Register}/>
                            <Route exact path={'/login'} component={Login}/>
                            <Route exact path={'/dashboard'} component={Dashboard}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
