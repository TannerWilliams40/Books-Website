import React from 'react';
import { Link } from 'react-router';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';

export default class sign extends React.Component {
  constructor() {
    super();
    this.handleSign = this.handleSign.bind(this);
    this.handleExit = this.handleExit.bind(this);
}
handleExit(){
  
}
handleSign(e) {
    e.preventDefault();
    var form = document.forms.signupform;
    var myobj = {
    email: form.usernames.value,
    pass: form.passwords.value,
    passr: form.passwordr.value,
  };
    fetch('/api/bookstore/sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(myobj),
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          if (data.message == `Account successfully created.`)
          {
            form.usernames.value = ''; form.passwords.value = ''; form.passwordr.value = '';
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
          alert(`Failed: ${error.message}`);
        });
      }
    }).catch(err => {
      alert(`Cannot have empty fields.`);
    });
  }
/*focusfield(x)
{
  x.style.backgroundColor = "LightYellow ";
}
unfocus(x)
{
  x.style.backgroundColor = "white";
}
validate() {
    var form = document.forms.signupform;
    var password1 = form.passwords.value;
    var password2 = form.passwordr.value;
  if (password2 == ""){
      document.getElementById("passwords").style.borderColor = "transparent";
    }
    else if(password1 == password2) {
        document.getElementById("passwords").style.borderColor = "green";        
    }
    else{
    document.getElementById("passwordr").style.borderColor = "red";
    }
    
}
*/
render() {
  return (
    <div>
      <div id = "log">
        <div id = "inner">
        </div>
      </div>
    <div id = "signupfields">
        <Link to ={`/home`}><Button type="button"  className="btn" onClick={this.handleExit} id="exit2">
        <span  className="glyphicon glyphicon-remove"></span>
        </Button></Link>
      <form name = "signupform">
        <input type="text"  className="form-control" id="usernames" name = "usernames"placeholder="Username (email)" /*onFocus = focusfield(this) onBlur = unfocus(this)*/></input>
        <span  className="req">  </span>
        <br></br>
        <input type="password"  className="form-control" id="passwords" name="passwords" placeholder="Password" /*onKeyPress="validate()" onFocus = "focusfield(this)" onBlur = "unfocus(this)"*/></input>
        <span  className="req">  </span>
        <br></br>
        <input type="password"  className="form-control" id="passwordr" name="passwordr" placeholder="Retype Password" /*onKeyPress="validate()" onFocus = "focusfield(this)" onBlur = "unfocus(this)"*/></input>
        <span  className="req">  </span>
        <br></br>
        <Button type="button" id ="submit2"  className="btn" onClick={(e) => this.handleSign(e)}>Submit</Button>
        <br/>
        </form>
    </div>
    </div>
    );
  }
}