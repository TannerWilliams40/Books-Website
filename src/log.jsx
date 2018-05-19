import React from 'react';
import { Link } from 'react-router';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';

export default class log extends React.Component {
  constructor() {
    super();
    this.handleLog = this.handleLog.bind(this);
    this.handleExit = this.handleExit.bind(this);
}
handleExit(){
  
}
handleLog(e) {
  e.preventDefault();
  var form = document.forms.loginform;
  var myobj = {
  email: form.usernamel.value,
  pass: form.passwordl.value,
  };
  fetch('/api/bookstore/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(myobj),
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          if (data.message == `Successfully logged in.`)
          {
            form.usernamel.value = ''; form.passwordl.value = '';
            //alert(`This is where we link to main page`)
            this.props.history.push('/Books');
          }
          else
          {
            alert(`${data.message}`)
          }
          });
      } else {
        response.json().then(error => {
          alert(`Failed to fetch ${error.message}`);
        });
      }
    }).catch(err => {
      alert(`Error in fetching data from server: ${err}`);
    });
  
}
render() {
  return (
    <div>
      <div id = "log">
        <div id = "inner">
        </div>
      </div>
    <div id = "loginfields">
        <Link to ={`/home`}><Button type="button"  className="btn" onClick={this.handleExit} id="exit">
        <span  className="glyphicon glyphicon-remove"></span>
        </Button></Link>
      <form name = "loginform">
        <input type="text"  className="form-control req" id="usernamel" name="usernamel" placeholder="Username (email)" /* onFocus = "focusfield(this)" onBlur = "unfocus(this)"*/></input>
        <br></br>
        <input type="password"  className="form-control req" id="passwordl" name="passwordl" placeholder="Password" /* onKeyPress="password(event)" onFocus = "focusfield(this)" onBlur = "unfocus(this)" */></input>
        <br></br>
        <Button type="button" id ="submit"  className="btn" onClick={this.handleLog}>Submit</Button>
      </form>
    </div>
    </div>
    );
  }
}