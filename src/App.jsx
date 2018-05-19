import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory, withRouter } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


import home from './home.jsx';
import log from './log.jsx';
import sign from './sign.jsx';
import BookList from './List.jsx';
import bookEdit from './OneBook.jsx';
import WishList from './WishList.jsx';
import Cart from './Cart.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;


const App = (props) => (
  <div>
    <div className="container-fluid">
      {props.children}
    </div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

const RoutedApp = () => (
  <Router history={browserHistory} >
    <Redirect from="/" to="/home" />
    <Route path="/" component={App} >
      <Route path="home" component={withRouter(home)} />
      <Route path="home/log" component={withRouter(log)} />
      <Route path="home/sign" component={withRouter(sign)} />
      <Route path="Books" component={withRouter(BookList)} />
      <Route path="WishList" component={withRouter(WishList)} />
      <Route path="Cart" component={withRouter(Cart)} />
      <Route path=":ISBN" component={bookEdit} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}
