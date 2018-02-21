import React, {Component} from 'react';
import firebase from 'firebase'
import firestore from 'firebase/firestore'
import App from "../../App";
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import AppBar from 'material-ui/AppBar';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {}

        };
        this.resultForLogin();
    }

    resultForLogin() {
        var db = firebase.firestore();
        var id = localStorage.getItem('Id');
        console.log(id);
        db.collection('Users').doc(id).get().then((userData) => {
            var data = userData.data();
            this.setState({userData: data})
        });
    }

    logOut() {
        console.log(this.props);
        this.props.history.push('./register')
    }

    render() {

        return (
            <div>
                <AppBar
                    title= {'Data of ' + this.state.userData.name}
                />
                <List>
                    <ListItem
                        primaryText={this.state.userData.name}
                        leftIcon={<ActionGrade color={pinkA200} />}
                    />
                    <ListItem
                        primaryText={this.state.userData.email}
                        leftIcon={<ActionGrade color={pinkA200} />}
                    />
                    <ListItem
                        primaryText={this.state.userData.phone}
                        leftIcon={<ActionGrade color={pinkA200} />}
                    />
                    </List>
                <RaisedButton label='LogOut' primary={true} onClick={this.logOut.bind(this)}/>
            </div>
        )
    }
}

export default Dashboard;
