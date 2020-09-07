import React, { Component } from "react";
import axios from 'axios';

export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            user: []
        }

    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/v1/users/getAUser',
            params: { email: window.localStorage.getItem("loggedInEmail") }
        }).then(res => {
            // console.log(res.data.user); 
            console.log(res.data.user);    
            const user = res.data.user;
            this.setState({ user });
        }).catch((err) => console.log(err));
    }
    
    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <h5> Ruby Wang is a pig</h5>
            </div>
        )
    }

}