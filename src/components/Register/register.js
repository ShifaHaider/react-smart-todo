import React, {Component} from 'react';
import firebase from 'firebase'
import firestore from 'firebase/firestore'
import App from "../../App";



class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                name: '',
                email: '',
                password: '',
                phone: ''
            },
            loginData: {
                logEmail: '',
                logPassword: ''
            }
        };

    }

    createAccount() {
        var db = firebase.firestore();
        console.log(this.state.userData);
        firebase.auth().createUserWithEmailAndPassword(this.state.userData.email, this.state.userData.password)
            .then((data) => {
                console.log(data.uid);
                var userData = this.state.userData;
                db.collection('Users').doc(data.uid).set(userData)
            })
            .catch((error) => {
                alert(error.message)
            });
    }

    loginAccount() {
        firebase.auth().signInWithEmailAndPassword(this.state.loginData.logEmail, this.state.loginData.logPassword)
            .then((data) => {

                console.log(localStorage.setItem('Id', data.uid));
                console.log(this.props.history.push('./dashboard'));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChangeReg(p, e) {
        var userData = this.state.userData;
        userData[p] = e.target.value;
        this.setState({userData: userData})
    }

    handleChangeLog(p,e) {
        var loginData = this.state.loginData;
       loginData[p] = e.target.value;
        this.setState({loginData: loginData})
    }

    render() {
        return (
            <div>
                <input type="text" placeholder='Name' value={this.state.userData.name}
                       onChange={this.handleChangeReg.bind(this, 'name')}/><br/>
                <input type="text" placeholder='Email' value={this.state.userData.email}
                       onChange={this.handleChangeReg.bind(this, 'email')}/><br/>
                <input type="password" placeholder='Password' value={this.state.userData.password}
                       onChange={this.handleChangeReg.bind(this, 'password')}/><br/>
                <input type="number" placeholder='PhoneNumber' value={this.state.userData.phone}
                       onChange={this.handleChangeReg.bind(this, 'phone')}/><br/>
                <button onClick={this.createAccount.bind(this)}>Register</button>
                <div>
                <input type="text" placeholder='Email' value={this.state.loginData.logEmail}
                onChange={this.handleChangeLog.bind(this,'logEmail')}/><br/>
                <input type="password" placeholder='Password' value={this.state.loginData.logPassword}
                onChange={this.handleChangeLog.bind(this,'logPassword')}/><br/>
                <button onClick={this.loginAccount.bind(this)}>Login</button>
                </div>
            </div>
        )
    }
}

export default Register;

