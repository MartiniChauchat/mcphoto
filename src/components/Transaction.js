import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
//import './transaction/transaction.css';
import axios from 'axios';
import './transaction.css';

export default class Transaction extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findArtWorkTitle = this.findArtWorkTitle(this);


    this.state = {
      user: [],
      trans_receive: [],
      trans_send: [],
      art: []
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
      // headers: { 
      //   'Content-Type': 'application/json',
      //   'authorization': 'Bearer ' + window.localStorage.getItem('token'),
      // }
    }).then(res => {
      console.log(res.data.trans);
      const trans_send = res.data.trans;
      this.setState({ trans_send: trans_send });

    }).catch((err) => console.log(err));

    axios({
      method: 'get',
      url: 'http://localhost:3001/api/v1/transactions/getTransactionReceived',
      params: { email: new URLSearchParams(this.props.location.search).get("email") }
      // headers: { 
      //   'Content-Type': 'application/json',
      //   'authorization': 'Bearer ' + window.localStorage.getItem('token'),
      // }
    }).then(res => {
      console.log(res.data.trans);
      const trans_receive = res.data.trans;
      this.setState({ trans_receive: trans_receive });

    }).catch((err) => console.log(err));
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  findArtWorkTitle(id) {
    axios({
      method: 'get',
      url: 'http://localhost:3001/api/v1/artwork',
      params: { _id: id}
      // headers: { 
      //   'Content-Type': 'application/json',
      //   'authorization': 'Bearer ' + window.localStorage.getItem('token'),
      // }
    }).then(res => {
      console.log(res.data.a);
      const art_item = res.data.a;
      this.setState({art: this.state.art.concat(art_item)});

    }).catch((err) => console.log(err));
  }

  render() {
      this.state.trans_send.forEach((trans) => {
        findArtWorkTitle(trans._id);
      })

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
                        <th>Transaction ID</th>
                        <th>Send To</th>
                        <th>Type</th>
                        <th>Artwork</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody >
                      {this.state.trans_send.map((trans) => 
                      <tr>
                        <td><a href="#">{trans._id}</a></td>
                        <td>{trans.receiver_email}</td>
                        <td>{trans.type}</td>
                        <td>{this.state.art.title}</td>
                        <td><span class="badge badge-success">Delivered</span></td>
                        <td><a href="#" class="btn btn-sm btn-primary">Detail</a></td>
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
                      <th>Transaction ID</th>
                        <th>Send From</th>
                        <th>Type</th>
                        <th>Artwork</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      <tr>
                        <td><a href="#">RA0449</a></td>
                        <td>Udin Wayang</td>
                        <td>Rental</td>
                        <td>Nasi Padang</td>
                        <td><span class="badge badge-success">Delivered</span></td>
                        <td><a href="#" class="btn btn-sm btn-primary">Detail</a></td>
                      </tr>
                      <tr>
                        <td><a href="#">RA5324</a></td>
                        <td>Jaenab Bajigur</td>
                        <td>Gundam 90' Edition</td>
                        <td><span class="badge badge-warning">Shipping</span></td>
                        <td><a href="#" class="btn btn-sm btn-primary">Detail</a></td>
                      </tr>
                      <tr>
                        <td><a href="#">RA8568</a></td>
                        <td>Rivat Mahesa</td>
                        <td>Oblong T-Shirt</td>
                        <td><span class="badge badge-danger">Pending</span></td>
                        <td><a href="#" class="btn btn-sm btn-primary">Detail</a></td>
                      </tr>
                      <tr>
                        <td><a href="#">RA1453</a></td>
                        <td>Indri Junanda</td>
                        <td>Hat Rounded</td>
                        <td><span class="badge badge-info">Processing</span></td>
                        <td><a href="#" class="btn btn-sm btn-primary">Detail</a></td>
                      </tr>
                      <tr>
                        <td><a href="#">RA1998</a></td>
                        <td>Udin Cilok</td>
                        <td>Baby Powder</td>
                        <td><span class="badge badge-success">Delivered</span></td>
                        <td><a href="#" class="btn btn-sm btn-primary">Detail</a></td>
                      </tr>
                      <tr>
                        <td><a href="#">RA1998</a></td>
                        <td>Udin Cilok</td>
                        <td>Baby Powder</td>
                        <td><span class="badge badge-success">Delivered</span></td>
                        <td><a href="#" class="btn btn-sm btn-primary">Detail</a></td>
                      </tr>
                      <tr>
                        <td><a href="#">RA1998</a></td>
                        <td>Udin Cilok</td>
                        <td>Baby Powder</td>
                        <td><span class="badge badge-success">Delivered</span></td>
                        <td><a href="#" class="btn btn-sm btn-primary">Detail</a></td>
                      </tr>
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
