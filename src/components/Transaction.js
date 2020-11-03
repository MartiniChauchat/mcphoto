import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
//import './transaction/transaction.css';
import axios from 'axios';
import './transaction.css';

export default class Transaction extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  
  this.state = {
    user: [],
    trans_receive: [],
    trans_send: []
  };
}

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:3001/api/v1/users/getAUser',
      params: { email: new URLSearchParams(this.props.location.search).get("email") }
  }).then(res => { 
      console.log(res.data.user);
      const user = res.data.user;
      this.setState({ user: user });
  }).catch((err) => console.log(err));

  axios({
    method: 'get',
    url: 'http://localhost:3001/api/v1/transactions/getTransactionSent',
    params: this.state.user,
    headers: { 
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + window.localStorage.getItem('token'),
    }
  }).then(res => { 
    console.log(res.data.trans);
    const trans_send = res.data.trans;
    this.setState({ trans_send: trans_send });
    
}).catch((err) => console.log(err));
}

handleSubmit(e) {
  e.preventDefault();
}

  render() {
    return (
      <div>
          <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
            <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden" >
              
              <div class="my-3 py-3">
                <h2 class="display-5">Another headline</h2>
                <p class="lead">And an even wittier subheading.</p>
              </div>

              <div class="a bg-light box-shadow mx-auto"></div>
            </div>

            <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
              
              <div class="my-3 p-3">
                <h2 class="display-5">Another headline</h2>
                <p class="lead">And an even wittier subheading.</p>
              </div>

              <div class="a g-dark box-shadow mx-auto"></div>
            </div>

          </div>


      </div>
    );
  }
}
