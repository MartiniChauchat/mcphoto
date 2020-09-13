import React, { Component } from "react";
import './profile/common-css/fluidbox.min.css';
import './profile/css/styles.css';
import axios from 'axios';
import profile from '../images/profile.jpg'


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
        params: { email: new URLSearchParams(this.props.location.search).get("email") }
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
                                    <img src={profile} alt=""/>
                                </div>
                                <h2><b>{this.state.user.name}</b></h2>
                                <h4 class="font-yellow">McGill Student</h4>
                                <ul class="information margin-tb-30">
                                    <li><b>BORN : </b>August 25, 1987</li>
                                    <li><b>EMAIL : </b>{this.state.user.email}</li>
                                    <li><b>Age : </b>{this.state.user.age}</li>
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

            <section class="about-section section">
		<div class="container">
			<div class="row">
				<div class="col-sm-4">
					<div class="heading">
						<h3><b>About me</b></h3>
						<h6 class="font-lite-black"><b>PROFESSIONAL PATH</b></h6>
					</div>
				</div>
				<div class="col-sm-8">
					<p class="margin-b-50">Duis non volutpat arcu, eu mollis tellus. Sed finibus aliquam neque 
					sit amet sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
					Nulla maximus pellentes que velit, quis consequat nulla effi citur at. 
					Maecenas sed massa tristique.Duis non volutpat arcu, eu mollis tellus. 
					Sed finibus aliquam neque sit amet sodales. Lorem ipsum dolor sit amet, 
					consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur 
					adipiscing elit. Nulla maximus pellentes que velit, quis consequat nulla 
					effi citur at.Maecenas sed massa tristique.</p>
					
				</div>
			</div>
		</div>
	</section>

    <section class="experience-section section">
		<div class="container">
			<div class="row">
				<div class="col-sm-4">
					<div class="heading">
						<h3><b>Work Experience</b></h3>
						<h6 class="font-lite-black"><b>PREVIOUS JOBS</b></h6>
					</div>
				</div>
				<div class="col-sm-8">
				
					<div class="experience margin-b-50">
						<h4><b>JUNIOR PROJECT MANAGER</b></h4>
						<h5 class="font-yellow"><b>DESIGN STUDIO</b></h5>
						<h6 class="margin-t-10">MARCH 2015 - PRESENT</h6>
						<p class="font-semi-white margin-tb-30">Duis non volutpat arcu, eu mollis tellus. Sed finibus aliquam neque sit amet sodales. 
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus pellentes que velit, 
							quis consequat nulla effi citur at. Maecenas sed massa tristique.Duis non volutpat arcu, 
							eu mollis tellus. Sed finibus aliquam neque sit amet sodales. </p>
						<ul class="list margin-b-30">
							<li>Duis non volutpat arcu, eu mollis tellus.</li>
							<li>Quis consequat nulla effi citur at.</li>
							<li>Sed finibus aliquam neque sit.</li>
						</ul>
					</div>
					
				</div>
			</div>
		</div>
		
	</section>

    <section class="education-section section">
		<div class="container">
			<div class="row">
				<div class="col-sm-4">
					<div class="heading">
						<h3><b>Education</b></h3>
						<h6 class="font-lite-black"><b>ACADEMIC CAREER</b></h6>
					</div>
				</div>
				<div class="col-sm-8">
					<div class="education-wrapper">
						<div class="education margin-b-50">
							<h4><b>MASTER DEGREE IN SCIENCE</b></h4>
							<h5 class="font-yellow"><b>UCLA - SCIENCE AND ENGINEERING</b></h5>
							<h6 class="font-lite-black margin-t-10">GRADUATED IN MAY 2010(2 YEARS)</h6>
							<p class="margin-tb-30">Duis non volutpat arcu, eu mollis tellus. Sed finibus aliquam neque sit amet sodales. 
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus pellentes que velit, 
							quis consequat nulla effi citur at. Maecenas sed massa tristique.Duis non volutpat arcu, 
							eu mollis tellus. Sed finibus aliquam neque sit amet sodales. </p>
						</div>
						
						<div class="education margin-b-50">
							<h4><b>COURSE ON COMPUTER SCIENCE</b></h4>
							<h5 class="font-yellow"><b>NEW YORK PUBLIC UNIVERSITY</b></h5>
							<h6 class="font-lite-black margin-t-10">GRADUATED IN MAY 2009(6 MONTHS)</h6>
							<p class="margin-tb-30">Duis non volutpat arcu, eu mollis tellus. Sed finibus aliquam neque sit amet sodales. 
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus pellentes que velit, 
							quis consequat nulla effi citur at. Maecenas sed massa tristique.Duis non volutpat arcu, 
							eu mollis tellus. Sed finibus aliquam neque sit amet sodales. </p>
						</div>
						
						<div class="education margin-b-50">
							<h4><b>GRADUATED VALEDICTERIAN</b></h4>
							<h5 class="font-yellow"><b>PUBLIC COLLEGE</b></h5>
							<h6 class="font-lite-black margin-t-10">GRADUATED IN MAY 2008(4 YEARS)</h6>
							<p class="margin-tb-30">Duis non volutpat arcu, eu mollis tellus. Sed finibus aliquam neque sit amet sodales. 
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus pellentes que velit, 
							quis consequat nulla effi citur at. Maecenas sed massa tristique.Duis non volutpat arcu, 
							eu mollis tellus. Sed finibus aliquam neque sit amet sodales. </p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</section>


        </div>
    )
}
}