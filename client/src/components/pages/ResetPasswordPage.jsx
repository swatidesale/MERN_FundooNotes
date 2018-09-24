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
                confirmPassword:''
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
        console.log("Inside Reset");
        event.preventDefault();

        const { password } = this.state;
        console.log("Inside submit : ");
        axios.post('/api/users/reset',{password})
            .then((result) => {
                console.log(result);
                history.push("/login");
        })
        .catch((error) => {
            console.log("Inside catch ");
            console.log(error);
        }) 
    }
    
    render() {
        return(
            <div>
                <Card className="card">
                    <header>
                        <div className="titleResetPassword">
                            <h2>Reset Password</h2>
                        </div>
                    </header>

                    <div className="container">
                        <form onSubmit={this.handleSubmit}>
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
                                    id="password"
                                    label="New Password"
                                    type="password"
                                    margin="normal"
                                    // required
                                    onChange={this.handleChange} value={this.state.password}
                                />
                                <br/>

                                <TextField
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    margin="normal"
                                    // required
                                    onChange={this.handleChange} value={this.state.confirmPassword}
                                />
                                <br/>
                            </CardContent>
                        </form>
                    </div>
                    <CardActions className="resetPasswordCardAction">
                        <Button className="resetPasswordBtn" color="primary" variant="contained" onClick={this.handleSubmit}>
                            Continue
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default ResetPasswordPage;