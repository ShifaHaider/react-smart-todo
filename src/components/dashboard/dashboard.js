import React, {Component} from 'react';
import firebase from 'firebase'
import firestore from 'firebase/firestore'
import App from "../../App";
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import AppBar from 'material-ui/AppBar';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            todoText: 'Hello World ',
            todo:[]
        };
        this.resultForLogin();
    }
    db = firebase.firestore();
    id = localStorage.getItem('Id');
     ref = this.db.collection('Users').doc(this.id);
     todoRef = this.ref.collection('todos');

    resultForLogin() {
        this.ref.get().then((userData) => {
            var data = userData.data();
            this.setState({userData: data})
        });
    }

    logOut() {
        console.log(this.props);
        this.props.history.push('/register')
    }

    handleChange(e) {
        this.setState({todoText: e.target.value})
    }

    addTodo() {
        // var arr = this.state.todo;
        // console.log(arr);
        // arr.push
        this.todoRef.add({
            text: this.state.todoText,
            time: Date.now()
        });

        // this.setState({todo: arr});
    }

    // add() {
    //
    //     todoRef.add({
    //         todo: inp.value,
    //         time: Date.now()
    //     });
    //
    //     console.log(inp.value);
    //     inp.value = '';
    // }
    render() {

        return (
            <div>
                <AppBar title={'Data of ' + this.state.userData.name}/>
                <List>
                    <ListItem
                        primaryText={this.state.userData.name}
                        leftIcon={<ActionGrade color={pinkA200}/>}/>
                    <ListItem
                        primaryText={this.state.userData.email}
                        leftIcon={<ActionGrade color={pinkA200}/>}/>
                    <ListItem
                        primaryText={this.state.userData.phone}
                        leftIcon={<ActionGrade color={pinkA200}/>}/>
                </List>
                <RaisedButton label='LogOut' primary={true} onClick={this.logOut.bind(this)}/><br/>
                <TextField hintText="Text Field" floatingLabelText="React-Todo-App"
                           onChange={this.handleChange.bind(this)} value={this.state.todoText}/>
                <RaisedButton label="Add" primary={true} onClick={this.addTodo.bind(this)}/>
                {console.log(this.state.todo)}
                {/*<List>*/}
                    {/*{*/}
                        {/*this.state.todo.map((todo, i ,a)=> {*/}
                            {/*console.log(todo);*/}
                            {/*return (*/}
                                {/*<ListItem*/}
                                    {/*primaryText={todo.text}*/}
                                    {/*secondaryText={new Date(todo.time).toLocaleString() }*/}
                                    {/*key={i}/>*/}
                            {/*)*/}
                        {/*})*/}
                    {/*}*/}
                {/*</List>*/}


            </div>
        )
    }
}

export default Dashboard;
