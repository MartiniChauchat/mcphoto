import React from 'react';
import logo from './logo2.png';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        console.log(window.localStorage.getItem('token'));
      } else {
        window.localStorage.removeItem('loggedIn');
      }
    } catch (e) {
      console.log(e);
      window.localStorage.removeItem('loggedIn');
    }
  },
  logout() {
    window.localStorage.removeItem('token');
    console.log(window.localStorage.getItem('token'));
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
        <header className="App-header">
          <div className="App-logo-div">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <AuthButton />
        </header>
        <h1>Homepage</h1>

        {/** This Protected page is for testing purpose. To test, when access without logging in, it will redirect to log in page, after logging in, it redirect back to this page */}
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>

        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Protected} />
      </div>
    </Router>
  );
}

export default App;
