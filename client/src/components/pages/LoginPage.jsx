import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        username: '',
        password: '',
        message: '',
        status: false
      },
      submitted: false,
      users: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit() {
    const { username, password } = this.state;
    axios.post('/api/users/login', { username, password })
      .then((result) => {
        localStorage.setItem('jwtToken', result.data.token);
        localStorage.setItem('username',result.data.user.username);
        var user = result.data.user.firstname+" "+result.data.user.lastname;
        localStorage.setItem('user',user);
        this.setState({ message: '' });
        this.setState({status: false });
        history.push('/home/notes');
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({status: true});
          this.setState({ message: 'Authentication failed, User not found.' });
        }
        else if(error.response.status === 402) {
          this.setState({status: true});
          this.setState({ message: 'Authentication failed, Wrong password.' });
        }
      });
  }

  forgotPassword() {
    const { username } = this.state;
    axios.post('/api/users/forgot',{username})
        .then((result) => {
          if(result.data.success === false) {
            this.setState({ message: result.data.msg });
            this.setState({status: true});
            history.push("/login");
          }
          else {
            this.setState({ message: result.data.msg });
            this.setState({status: true});
            history.push("/login");
          }
    })
    .catch((error) => {
        if(error.response.status === 401) {
          this.setState({status: true});
          this.setState({ message: 'No account with email address exists.' });
          history.push("/login");
        }
    }); 
  }

  render() {
    const { username, password, message } = this.state;
    return (
      <div>
        <form>         
        {this.state.status ?
          <div id="display-login-failed">
            { message }
          </div>
          : 
          null
        }
        <Card className="card">
          <header>
            <div className="title">
              <h1>Login</h1>
            </div>
          </header>

          <div className="container">
              <CardContent>
                <TextField
                  id="username"
                  label="Username"
                  type="text"
                  margin="normal"
                  required
                  onChange={this.handleChange} value={username}
                />
                <br />

                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  margin="normal"
                  required
                  onChange={this.handleChange} value={password}
                />
                <br />
              </CardContent>

              <CardActions className="cardAction">
                <Button className="actions" onClick={this.handleSubmit} variant="contained" color="primary">
                  Login
                </Button>

                <Button className="actions" variant="contained" href='/register'>
                  Register
                </Button>
              </CardActions>

              <div className="forgotPwd">
                <Button color="primary" className="forgotPwdBtn" onClick={this.forgotPassword}>
                  Forgot Password?
                </Button>
              </div>
          </div>
        </Card>
        </form>
      </div>
    );
  }
}

export default LoginPage;