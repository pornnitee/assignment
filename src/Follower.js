import React, { Component } from 'react';
import './Style.css';


class Follower extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name:'',
      showError:false,
      errorMessage:''

    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleErrors(response) {
    if (!response.ok) {
      if (response.status === 404) {
        throw Error("The Github user does not exist");
      } else if (response.status === 503){
        throw Error("Github API does not respond");
      }
      throw Error(response.statusText);
    }
    return response.json();
  }


  handleSubmit(e) {
    let self = this;
    e.preventDefault();

    fetch('https://api.github.com/users/'+this.state.name+'/followers')
    .then(this.handleErrors)
    .then(function(response) {
      self.setState({repos: response,showError:false, errorMessage:''});
    }).catch(function(err) {
      // Error :(
      self.setState({repos: null, showError:true, errorMessage:err.message});
    });
    }


  handleChange(e) {
    this.setState({name: e.target.value});
  }

  renderRepos() {
    if (this.state.repos) {
      if(this.state.repos.length > 0) {
        return (

          <div className="row justify-content-center">
             <div className ="detail" >
               <table className="table table-bordered">
              <thead>
                <tr>
                  <th>follower</th>
                </tr>
              </thead>
              <tbody>
                  {this.state.repos.map((follower, index)=>
                    <tr>
                      <td><img src= {follower.avatar_url}></img> </td>
                      <td><a href={follower.html_url} target='_blank'>{follower.login}</a></td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>

        );
      } else {
        return (
            <div className="alert alert-danger" role="alert">
              <strong>Github user has no follower</strong>
            </div>
          )
      }
    }
    return;
  }

  showError() {
    if(this.state.showError) {
      return (
          <div className="alert alert-danger" role="alert">
            <strong>{this.state.errorMessage}</strong>
          </div>
        );
    }
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <form onSubmit={this.handleSubmit} className="my-form">
            <p> Follower :  <input type="text" className="input-username" ref="name" placeholder ="Input github username" value={this.state.name} onChange={this.handleChange}/>
            <input type="submit" value="OK" className="btn-submit"/> </p>
          </form>
          {this.renderRepos()}
          {this.showError()}

        </div>
      </div>
    );
  }
}

export default Follower;
