
import React, { Component } from 'react';
import Follower from './Follower';
import Repo from './Repo';
import './App.css';

class App extends Component {

  constructor() {
   super();
  this.state = {
    username : null,
    bio :null,
    avatar_url : null
  }
  }

  getUser(username) {
    return fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(response => {
      return response;
    })
  }

  async handleSubmit(e) {
    e.preventDefault();
    let user = await this.getUser(this.refs.username.value);
    this.setState({username : user.login,
                  avatar_url : user.avatar_url,
                  bio : user.bio});
  }

  render() {
    let user;
    if(this.state.username) {
      user =
      <div className ="content">
      <h2 className = "username"> {this.state.username} </h2>
      <div class="grid-container">
        <img className = "image" src={this.state.avatar_url}/>
        <p className = "bio">Bio : {this.state.bio}</p>
        </div>
        <Follower />
        <Repo />
      </div>
    }
    return (
      <div className="App">
      <form onSubmit={e => this.handleSubmit(e)}>
        <input type ="text" placeholder ="Input github username" ref="username" ></input>
        <input type="submit" value="OK" className="btn-submit"/>
        </form>
        {user}
     </div>
    );
  }
  }
export default App;
