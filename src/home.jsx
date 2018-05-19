import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';

import log from './log.jsx';
import sign from './sign.jsx';

/*
const IssueRow = (props) => {
  function onDeleteClick() {
    props.deleteIssue(props.issue._id);
  }

  return (
    <div>
      <Link to={`/issues/${props.issue._id}`}>{props.issue._id.substr(-4)}</Link>
      {props.issue.title}
      <Link to ={`/issues/loginpage`}><Button id ="loginb" className="btn">Login</Button></Link>
      <Link to ={`/issues/signuppage`}><Button id ="signupb" className="btn">Sign Up</Button></Link>
    </div>
     //<Button bsSize="xsmall" onClick={onDeleteClick}><Glyphicon glyph="trash" /></Button>
  );
};

IssueRow.propTypes = {
  issue: React.PropTypes.object.isRequired,
  deleteIssue: React.PropTypes.func.isRequired,
};

function IssueTable(props) {
  const issueRows = props.issues.map(issue =>
    <IssueRow key={issue._id} issue={issue} deleteIssue={props.deleteIssue} />
  );
  return (
    <div>
      {issueRows}
    </div>
  );
}

IssueTable.propTypes = {
  issues: React.PropTypes.array.isRequired,
  deleteIssue: React.PropTypes.func.isRequired,
};
class log extends React.component {
  constructor() {
    super();
}
handleLog(e) {
    e.preventDefault();
    var form = document.forms.loginform;
    this.props.checklogin({
    email: form.usernamel.value,
    pass: form.passwordl.value,
    })
  }
render() {
  return (
    <div id = "loginfields">
        <button type="button"  className="btn" id="exit">
        <span  className="glyphicon glyphicon-remove"></span>
        </button>
      <form name = "loginform">
        <input type="text"  className="form-control req" id="usernamel" name="usernamel" placeholder="Username (email)" onfocus = "focusfield(this)" onblur = "unfocus(this)"></input>
        <br></br>
        <input type="password"  className="form-control req" id="passwordl" name="passwordl"onkeypress="password(event)" placeholder="Password" onfocus = "focusfield(this)" onblur = "unfocus(this)"></input>
        <br></br>
        <button type="button" id ="submit"  className="btn" onclick="return false;">Submit</button>
      </form>
    </div>
    );
  }
}
class sign extends React.component {
  constructor() {
    super();
}
handleSign(e) {
    e.preventDefault();
    var form = document.forms.signupform;
    this.props.checksignup({
    email: form.usernames.value,
    pass: form.passwords.value,
    passr: form.passwordr.value,
    })
  }
render() {
  return (
    <div id = "signupfields">
        <button type="button"  className="btn" id="exit2">
        <span  className="glyphicon glyphicon-remove"></span>
        </button>
      <form name = "signupform">
        <input type="text"  className="form-control" id="usernames" name = "usernames"placeholder="Username (email)" onfocus = "focusfield(this)" onblur = "unfocus(this)"></input>
        <span  className="req">  </span>
        <br></br>
        <input type="password"  className="form-control" id="passwords" name="passwords" onkeypress="password(event)" placeholder="Password" onfocus = "focusfield(this)" onblur = "unfocus(this)"></input>
        <span  className="req">  </span>
        <br></br>
        <input type="password"  className="form-control" id="passwordr" name="passwordr" onkeypress="password2(event)" placeholder="Retype Password" onfocus = "focusfield(this)" onblur = "unfocus(this)"></input>
        <span  className="req">  </span>
        <br></br>
        <button type="button" id ="submit2"  className="btn" onclick="return false;">Submit</button>
        <br/>
        </form>
    </div>
    );
  }
}
*/
export default class home extends React.Component {
  constructor() {
    super();
    //this.checksignup = this.checksignup.bind(this);
  }
  /*
    this.state = { issues: [] };

    this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;
    if (oldQuery.status === newQuery.status
        && oldQuery.effort_gte === newQuery.effort_gte
        && oldQuery.effort_lte === newQuery.effort_lte) {
      return;
    }
    this.loadData();
  }

  setFilter(query) {
    this.props.router.push({ pathname: this.props.location.pathname, query });
  }

  loadData() {
    fetch(`/api/issues${this.props.location.search}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          data.records.forEach(issue => {
            issue.created = new Date(issue.created);
            if (issue.completionDate) {
              issue.completionDate = new Date(issue.completionDate);
            }
          });
          this.setState({ issues: data.records });
        });
      } else {
        response.json().then(error => {
          alert(`Failed to fetch issues ${error.message}`);
        });
      }
    }).catch(err => {
      alert(`Error in fetching data from server: ${err}`);
    });
  }
  

  checklogin(data) {
    fetch('/api/bookstore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          issue.created = new Date(issue.created);
          issue.completionDate = issue.completionDate != null ?
            new Date(issue.completionDate) : null;
        });
      } else {
        response.json().then(error => {
          alert(`Failed to add issue: ${error.message}`);
        });
      }
    }).catch(err => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }
  /*
  deleteIssue(id) {
    fetch(`/api/issues/${id}`, { method: 'DELETE' }).then(response => {
      if (!response.ok) alert('Failed to delete issue');
      else this.loadData();
    });
  }
*/
  render() {
    return (
      /*<div>
        <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue} />
      </div>
      */
      <div>
      <Link to ={`/home/log`}><Button id ="loginb" className="btn">Login</Button></Link>
      <Link to ={`/home/sign`}><Button id ="signupb" className="btn">Sign Up</Button></Link>
      </div>
    );
  }
}
/*
IssueList.propTypes = {
  location: React.PropTypes.object.isRequired,
  router: React.PropTypes.object,
};
*/
