import React, {Component} from 'react';
import './App.css';
import Register from './components/Register/register'
import Dashboard from './components/dashboard/dashboard'
import {Router, Route, Switch, Link} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
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
                            <Route exact path={'/dashboard'} component={Dashboard}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
