import React, {Component} from 'react';
import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAUItwpA9AmbqxtBKNcJSuRvXCbOMuSQkQ",
    authDomain: "react-smart-todo.firebaseapp.com",
    databaseURL: "https://react-smart-todo.firebaseio.com",
    projectId: "react-smart-todo",
    storageBucket: "react-smart-todo.appspot.com",
    messagingSenderId: "659919751663"
};
firebase.initializeApp(config);

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {

        });
    }

    render() {
        return (
            <div>
                <input type="text" placeholder='Name'/><br/>
                <input type="text" placeholder='Email'/><br/>
                <input type="password" placeholder='Password'/><br/>
                <input type="number" placeholder='Number'/><br/>
            </div>
        )
    }
}

