import React, { Component } from 'react';
import axios from'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class ResetPasswordPage extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                username:'',
                password:'',
                confirmPassword:'',
                message: '',
                status: false
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    } 

    handleSubmit(event) {
        event.preventDefault();
        var token = localStorage.getItem('resetToken');
        const { password } = this.state;
        axios.post('/api/users/reset/'+token ,{password})
            .then((result) => {
                this.setState({ message: result.data.msg });
                this.setState({status: true });
                history.push("/login");
        })
        .catch((error) => {
            this.setState({ message: 'Password reset token is invalid or has expired.' });
            this.setState({status: true });
            console.log(error);
        }) 
    }
    
    render() {
        const { message } = this.state;
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                {this.state.status ?
                    <div id="display-login-failed">
                        { message }
                    </div>
                    : 
                    null
                }
                <Card className="card">
                    <header>
                        <div className="titleResetPassword">
                            <h2>Reset Password</h2>
                        </div>
                    </header>

                    <div className="container">
                    <CardContent>
                                {/* <TextField
                                    id="username"
                                    label="Email Id"
                                    margin="normal"
                                    // required
                                    onChange={this.handleChange} value={this.state.username}
                                />
                                <br/> */}

                                <TextField
                                    style={{width:200}}
                                    id="password"
                                    label="New Password"
                                    type="password"
                                    margin="normal"
                                    required
                                    onChange={this.handleChange} value={this.state.password}
                                />
                                <br/>

                                <TextField
                                    style={{width:200}}
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    margin="normal"
                                    required
                                    onChange={this.handleChange} value={this.state.confirmPassword}
                                />
                                <br/>
                            </CardContent>
                    </div>
                    <CardActions className="resetPasswordCardAction">
                        <Button className="resetPasswordBtn" color="primary" variant="contained" onClick={this.handleSubmit}>
                            Continue
                        </Button>
                    </CardActions>
                </Card>
                </form>
            </div>
        );
    }
}

export default ResetPasswordPage;