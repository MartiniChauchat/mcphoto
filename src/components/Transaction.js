import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
//import './transaction/transaction.css';
import axios from 'axios';
import './transaction.css';

export default class Transaction extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.findArtWorkTitle = this.findArtWorkTitle.bind(this);
    // this.isPending = this.isPending.bind(this);

    this.state = {
      user: [],
      trans_receive: [],
      trans_send: [],
      art: [],
      isPending: true,
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
      params: { email: new URLSearchParams(this.props.location.search).get("email") }
    }).then(res => {
      console.log(res.data.trans);
      const trans_send = res.data.trans;
      this.setState({ trans_send: trans_send });

    }).catch((err) => console.log(err));

    this.state.trans_send.forEach((trans) => {
      axios({
        method: 'get',
        url: 'http://localhost:3001/api/v1/artwork',
        params: { _id: trans._id }
      }).then(res => {
        console.log(res.data.a);
        const art_item = res.data.a;
        this.setState({ art: this.state.art.concat(art_item) });
      }).catch((err) => console.log(err))

    });

    axios({
      method: 'get',
      url: 'http://localhost:3001/api/v1/transactions/getTransactionReceived',
      params: { email: new URLSearchParams(this.props.location.search).get("email") }
    }).then(res => {
      console.log(res.data.trans);
      const trans_receive = res.data.trans;
      this.setState({ trans_receive: trans_receive });
    }).catch((err) => console.log(err));

  }

  handleSubmit(e) {
    e.preventDefault();
  }

  // findArtWorkTitle(id) {
  //   axios({
  //     method: 'get',
  //     url: 'http://localhost:3001/api/v1/artwork',
  //     params: { _id: id }
  //     // headers: { 
  //     //   'Content-Type': 'application/json',
  //     //   'authorization': 'Bearer ' + window.localStorage.getItem('token'),
  //     // }
  //   }).then(res => {
  //     console.log(res.data.a);
  //     const art_item = res.data.a;
  //     this.setState({ art: this.state.art.concat(art_item) });
  //   }).catch((err) => console.log(err));
  // }

  //   isPending(s) {
  //     s == "pending" ? 
  //     <td><Button variant="primary">Cancel</Button>{' '}</td> 
  //     :
  //     <td><Button variant="primary">Cancel</Button>{' '}</td>
  // }


  render() {
    return (
      <div>
        <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
          <div class="container-fluid" id="container-wrapper">
            <div class="row">
              <div class="col-lg-12 mb-4">
                <div class="card">
                  <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Transactions sending....</h6>
                  </div>
                  <div class="table-responsive t">
                    <table class="table align-items-center table-flush">
                      <thead class="thead-light">
                        <tr>
                          {/* <th>Transaction ID</th> */}
                          <th>Send To</th>
                          <th>Type</th>
                          <th>Artwork</th>
                          {/* <th>Status</th> */}
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody >
                        {this.state.trans_send.map((trans) =>
                          <tr>
                            {/* <td><a href="#">{trans._id}</a></td> */}
                            <td>{trans.receiver_email}</td>
                            <td>{trans.type}</td>
                            <td>{trans.artwork}</td>
                            {/* {this.isPending({trans.status})}; */}
                            {/* <td><span class="badge badge-success">{trans.status}</span></td> */}
                            {(() => {
                                switch (trans.status) {
                                  case "pending": return <Button variant="primary" size="sm">Cancel</Button>;
                                  case "finished": return <Button variant="success" size="sm">Download*</Button>;
                                  case "canceled": return <Button variant="secondary" size="sm" disabled>Cancel</Button>;
                                  default: return <Button variant="primary" size="sm">Cancel</Button>;
                                }
                              })()}
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div class="card-footer"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="container-fluid" id="container-wrapper">
            <div class="row">
              <div class="col-lg-12 mb-4">
                <div class="card">
                  <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Transactions receiving....</h6>
                  </div>
                  <div class="table-responsive t">
                    <table class="table align-items-center table-flush">
                      <thead class="thead-light">
                        <tr>
                          {/* <th>Transaction ID</th> */}
                          <th>Send From</th>
                          <th>Type</th>
                          <th>Artwork</th>
                          {/* <th>Status</th> */}
                          <th>Action</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody >
                        {this.state.trans_receive.map((trans) =>
                          <tr>
                            {/* <td><a href="#">{trans._id}</a></td> */}
                            <td>{trans.sender_email}</td>
                            <td>{trans.type}</td>
                            <td>{trans.artwork}</td>
                            {/* <td><span class="badge badge-success">{trans.status}</span></td> */}
                            <td>
                              {(() => {
                                switch (trans.status) {
                                  case "pending": return <Button variant="primary" size="sm">Accept</Button>;
                                  case "finished": return <Button variant="success" size="sm">Accepted</Button>;
                                  case "canceled": return <Button variant="secondary" size="sm" disabled>Accept</Button>;
                                  default: return <Button variant="primary" size="sm">Accept</Button>;
                                }
                              })()}
                            </td>
                            <td>
                              {(() => {
                                switch (trans.status) {
                                  case "pending": return <Button variant="primary" size="sm">Reject</Button>;
                                  case "finished": return <Button variant="primary" size="sm" disabled>Reject</Button>;
                                  case "canceled": return <Button variant="secondary" size="sm" disabled>Reject</Button>;
                                  default: return <Button variant="primary" size="sm">Reject</Button>;
                                }
                              })()}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div class="card-footer"></div>
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* )} */}
          </div>

        </div>


      </div>
    );
  }
}
