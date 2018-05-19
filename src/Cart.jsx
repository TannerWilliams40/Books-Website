import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';

class BookRow extends React.Component{
constructor(props)
{
  super(props);
  this.handleClick=this.handleClick.bind(this);
}
  handleClick(ISBN)
  {
    const removeCart = this.props.removeCart;
    return function(event)
    {
    removeCart(ISBN);
    }
  }
render()
{
  return (
    <tr>
      <td><Link to={`/${this.props.book.ISBN}`}><img src={require(this.props.book.Cover)} className = 'format' /></Link></td>
      <td>{this.props.book.ISBN}</td>
      <td>{this.props.book.Title}</td>
      <td>{this.props.book.Author}</td>
      <td>{this.props.book.Genre}</td>
      <td>{this.props.book.Desc}  </td>
      <td id = "special"> <Button type="button" onClick = {(this.handleClick(this.props.book.ISBN))} className="btn" id="delwish">
        <span  className="glyphicon glyphicon-remove"></span>
        </Button></td>
    </tr>
  );
}
}

BookRow.propTypes = {
  book: React.PropTypes.object.isRequired,
};

function BookTable(props) {
  const BookRows = props.Books.map(book =>
    <BookRow key={book.ISBN} book={book} removeCart={props.removeCart}/>
  );
  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th>Cover</th>
          <th>ISBN</th>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Desc</th>
          <th id = "special2"></th>
        </tr>
      </thead>
      <tbody>{BookRows}</tbody>
    </Table>
  );
}

BookTable.propTypes = {
  Books: React.PropTypes.array.isRequired,
};

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = { Books: [] };
    this.loadData = this.loadData.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.removeCart = this.removeCart.bind(this);
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

  loadData() {
    fetch(`/api/Cart${this.props.location.search}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({ Books: data.records });
        });
      } else {
        response.json().then(error => {
          alert(`Failed to fetch Books ${error.message}`);
        });
      }
    }).catch(err => {
      alert(`Error in fetching data from server: ${err}`);
    });
  }
  clearCart()
  {
    fetch('/api/clearcart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    }).then(()=>(this.loadData()))
  }
  removeCart(ISBN)
  {
    fetch('/api/delcart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      ISBN: ISBN,
    }),
    }).then(()=>(this.loadData()))
  }

  render() {
    return (
      <div>
      <div id="whiteback">
      </div>
      <Link to ={`/Books`}><Button id ="Return" className="btn">Continue Shopping</Button></Link>
      <Button type="button" id ="clearcart"  className="btn" onClick={(event) => this.clearCart(event)}>Clear Cart</Button>
         <br />
          <br />
        <div id = "info">
        <BookTable Books={this.state.Books} removeCart={this.removeCart}/>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  location: React.PropTypes.object.isRequired,
  router: React.PropTypes.object,
};