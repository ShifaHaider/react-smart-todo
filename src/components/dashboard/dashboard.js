import React, {Component} from 'react';
import App from "../../App";

class Dashboard extends Component{
render(){
    localStorage.getItem('Id');
    return(
        <div>
            <h1>Data</h1>
        </div>
    )
}
}
export default Dashboard;
