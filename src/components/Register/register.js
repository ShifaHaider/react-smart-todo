import React, {Component} from 'react';
import firebase from 'firebase'
import firestore from 'firebase/firestore'
import App from "../../App";
import '../../index.css';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                name: '',
                email: '',
                password: '',
                phone: ''
            }
        }
    };

    createAccount() {
        var db = firebase.firestore();
        console.log(this.state.userData);
        firebase.auth().createUserWithEmailAndPassword(this.state.userData.email, this.state.userData.password)
            .then((data) => {
                console.log(data.uid);
                var userData = this.state.userData;
                db.collection('Users').doc(data.uid).set(userData);
                this.props.history.push('/login');

            })
            .catch((error) => {
                alert(error.message)
            });
    }


    handleChangeReg(p, e) {
        var userData = this.state.userData;
        userData[p] = e.target.value;
        this.setState({userData: userData})
    }


    render() {
        return (
            <div>
                <AppBar
                    title= 'Register'
                />
                <TextField
                    hintText="Name Field"
                    floatingLabelText="Name"
                    type="text"
                    value={this.state.userData.name}
                    onChange={this.handleChangeReg.bind(this, 'name')}/><br/>
                <TextField
                    hintText="Email Field"
                    floatingLabelText="Email"
                    type="text"
                    value={this.state.userData.email}
                    onChange={this.handleChangeReg.bind(this, 'email')}/><br/>
                <TextField
                    hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"
                    value={this.state.userData.password}
                    onChange={this.handleChangeReg.bind(this, 'password')}/><br/>
                <TextField
                    hintText="Phone Number"
                    floatingLabelText="Phone Number"
                    type="number"
                    value={this.state.userData.phone}
                    onChange={this.handleChangeReg.bind(this, 'phone')}/><br/>
                <RaisedButton label='Register' secondary={true} onClick={this.createAccount.bind(this)}/>
            </div>
        )
    }
}

export default Register;

