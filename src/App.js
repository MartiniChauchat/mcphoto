import React from 'react';
import logo from './logo2.png';
import './App.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  withRouter
} from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Signup from './components/Signup';
import Gallery from './components/Gallery';

export const Auth = {
  async authenticate(userinfo) {
    try {
      const res = await axios({
        method: 'post',
        url: 'http://localhost:3001/api/v1/users/login',
        data: userinfo
      });
      if (res.status === 200) {
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('loggedIn', true);
      } else {
        window.localStorage.removeItem('loggedIn');
      }
    } catch (e) {
      console.log(e);
      alert(e.response.data.message);
      window.localStorage.removeItem('loggedIn');
    }
  },
  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('loggedIn');
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      window.localStorage.getItem('loggedIn') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const Protected = () => <h3>Protected</h3>;

const AuthButton = withRouter(({ history }) =>
  window.localStorage.getItem('loggedIn') ? (
    <div className="Login_Signup">
      <Button
        onClick={() => {
          Auth.logout();
          history.push('/');
        }}
        className="Logout"
      >
        Logout
      </Button>
    </div>
  ) : (
    <div className="Login_Signup">
      <Button className="Login" onClick={() => history.push('/login')}>
        Login
      </Button>
      <Button
        className="Signup"
        variant="danger"
        onClick={() => history.push('/signup')}
      >
        Signup
      </Button>
    </div>
  )
);

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <div className="App-logo-div">
            <Navbar.Brand>McGallery</Navbar.Brand>
          </div>

          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/gallery">Gallery</Nav.Link>
          </Nav>
          <AuthButton />
        </Navbar>

        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/gallery" component={Gallery} />
        <PrivateRoute path="/protected" component={Protected} />
      </div>
    </Router>
  );
}

export default App;
