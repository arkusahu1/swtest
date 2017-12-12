import React, { Component, PropTypes } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: '',
    password: '',
    errorMsg: '',
    userList: [],
    isLoading: false
  }

  handleChange= (event) => {
    if (event.target.name === 'username') {
      this.setState({
        username: event.target.value
      });
    } else if(event.target.name === 'password') {
      this.setState({
        password: event.target.value
      });
    }
  }

  fetchUser = () => {
    axios.get('https://swapi.co/api/people/')
    .then((response) => {
      response.data.results.forEach((item) => {
        if (item.name === this.state.username &&
          item.birth_year === this.state.password) {
            this.context.router.push('/home');
            return;
        } else {
          this.setState({
            errorMsg: 'Username or Password is incorrect'
          });
        }
      });

    })
    .catch((error) => {
      console.log(error);
    });
  }

  submitForm = () => {
    if (this.state.username !== '' && this.state.password !== ''){
      this.fetchUser();
    } else {
      this.setState({
        errorMsg: 'Username and Password can not be empty'
      });
    }
  }
  render() {
    return (
      <div>
        <div className="loginContainer">
            <div>
                <label>Username: </label>
                <input name="username" type="text" onChange={(evt) => this.handleChange(evt)} />
            </div>
            <div>
                <label>Password: </label>
                <input name="password" type="password" onChange={(evt) => this.handleChange(evt)} />
            </div>
            <button onClick={this.submitForm}>Submit</button>
            {this.state.errorMsg && <div>{this.state.errorMsg}</div>}
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
};
