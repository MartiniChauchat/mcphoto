import React, { Component } from "react";
import './profile/common-css/fluidbox.min.css';
import './profile/css/styles.css';
import axios from 'axios';


export default class Profile extends Component {
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

// renderUserName() {
//     const name = this.state.user.age;
//     return name;
// }

render() {

    return (
        <div>
            <header>
                <div class="container">
                    <div class="heading-wrapper">
                        <div class="row">
                            <div class="col-sm-6 col-md-6 col-lg-4">
                                <div class="info">
                                    {/* <i class="icon ion-ios-location-outline"></i> */}
                                    <div class="right-area">
                                        <h5>{this.state.user.street}</h5>
                                        <h5>{this.state.user.region}</h5>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-6 col-md-6 col-lg-4">
                                <div class="info">
                                    {/* <i class="icon ion-ios-telephone-outline"></i> */}
                                    <div class="right-area">
                                        <h5>Major: {this.state.user.major}</h5>
                                        <h6>MIN - FRI,8AM - 7PM</h6>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-6 col-md-6 col-lg-4">
                                <div class="info">
                                    {/* <i class="icon ion-ios-chatboxes-outline"></i> */}
                                    <div class="right-area">
                                    <h5>{this.state.user.email}</h5>
                                        <h6>REPLY IN 24 HOURS</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </header>

            <section class="intro-section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-1 col-lg-2"></div>
                        <div class="col-md-10 col-lg-8">
                            <div class="intro">
                                <div class="profile-img">
                                    <img src="/images/portfolio-4-600x400.jpg" alt="" />
                                </div>
                                <h2><b>{this.state.user.name}</b></h2>
                                <h4 class="font-yellow">Student</h4>
                                <ul class="information margin-tb-30">
                                    <li><b>BORN : </b>August 25, 1987</li>
                                    <li><b>EMAIL : </b>mymith@mywebpage.com</li>
                                    <li><b>MARITAL STATUS : </b>Married</li>
                                </ul>
                                <ul class="social-icons">
                                    <li><a href="#"><i class="ion-social-pinterest"></i></a></li>
                                    <li><a href="#"><i class="ion-social-linkedin"></i></a></li>
                                    <li><a href="#"><i class="ion-social-instagram"></i></a></li>
                                    <li><a href="#"><i class="ion-social-facebook"></i></a></li>
                                    <li><a href="#"><i class="ion-social-twitter"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}
}