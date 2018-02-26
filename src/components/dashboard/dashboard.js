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
import Toggle from 'material-ui/Toggle';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            todoText: 'Hello World ',
            editText: '',
            todo: [],
            open: false
        };
        this.resultForLogin();
        this.loadTodos();
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
        this.props.history.push('/register')
    }

    handleChange(e) {
        this.setState({todoText: e.target.value});
    }

    addTodo() {
        this.todoRef.add({
            text: this.state.todoText,
            time: Date.now()
        });
    }

    loadTodos() {
        this.todoRef.onSnapshot((todoCollection) => {
            todoCollection.docChanges.forEach((docTodo) => {
                var data = docTodo.doc.data();
                data.id = docTodo.doc.id;
                if (docTodo.type == 'added') {
                    var arr = this.state.todo;
                    arr.unshift(data);
                    this.setState({todo: arr});
                }
                else if (docTodo.type == 'removed') {
                    var todo = this.state.todo;
                    todo.forEach((value, ind) => {
                        if (data.id == value.id) {
                            todo.splice(ind, 1);
                            this.setState({todo: todo})
                        }
                    })
                }
                else if (docTodo.type == 'modified') {
                    var secArr = this.state.todo;
                    secArr.forEach((value, index) => {
                        if (data.id == value.id) {
                            secArr[index].text = this.state.editText;
                            this.setState({todo: secArr})
                        }
                    })
                }
            })
        })
    }

    deleteTodo(todo) {
        this.todoRef.doc(todo.id).delete();
    }

    textChange(e) {
        this.setState({editText: e.target.value});
    }

    editTodo() {
        this.todoRef.doc(this.todoForEdit.id).update({
            text: this.state.editText,
            time: Date.now()
        });
        this.setState({open: false, editText: ''})
    }

    handleOpen(todo) {
        this.todoForEdit = todo;
        this.setState({open: true, editText: todo.text})

    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}/>,
            <FlatButton
                label="Edit"
                primary={true}
                keyboardFocused={true}
                onClick={this.editTodo.bind(this)}/>,
        ];
        return (
            <div>
                <AppBar title={'Data of ' + this.state.userData.name}/>
                <List>
                    <ListItem key ={1}
                        primaryText={this.state.userData.name}
                        leftIcon={<ActionGrade color={pinkA200}/>}/>
                    <ListItem key ={2}
                        primaryText={this.state.userData.email}
                        leftIcon={<ActionGrade color={pinkA200}/>}/>
                    <ListItem key ={3}
                        primaryText={this.state.userData.phone}
                        leftIcon={<ActionGrade color={pinkA200}/>}/>
                </List>
                <RaisedButton label='LogOut' primary={true} onClick={this.logOut.bind(this)}/><br/>
                <TextField hintText="Text Field" floatingLabelText="React-Todo-App"
                           onChange={this.handleChange.bind(this)} value={this.state.todoText}/>
                <RaisedButton label="Add" primary={true} onClick={this.addTodo.bind(this)}/><br/>
                <List>{
                    this.state.todo.map((todo, index) => {
                        return (
                            <div>
                                <ListItem key={todo.id}
                                          primaryTogglesNestedList={true}
                                          nestedItems={[
                                              <ListItem key={1} primaryText="Delete" onClick={this.deleteTodo.bind(this, todo)} leftIcon={<ActionGrade/>}/>,
                                              <ListItem key={2} onClick={this.handleOpen.bind(this, todo)} primaryText="Edit" leftIcon={<ActionGrade/>}/>
                                          ]}>
                                    <b>{todo.text}</b><br/>
                                    <small>{new Date(todo.time).toLocaleString()}</small>
                                </ListItem>
                            </div>
                        )
                    })
                }
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}>
                        <TextField hintText="Text Field"
                                   onChange={this.textChange.bind(this)} value={this.state.editText}/>
                    </Dialog>
                </List>
            </div>
        )
    }
}

export default Dashboard;
