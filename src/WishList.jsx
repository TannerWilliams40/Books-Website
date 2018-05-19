import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';

class BookRow extends React.Component {
constructor(props)
{
  super(props);
  this.handleClick=this.handleClick.bind(this);
}
  handleClick(ISBN)
  {
    const removeBook = this.props.removeBook;
    return function(event)
    {
    removeBook(ISBN);
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
    <BookRow key={book.ISBN} book={book} removeBook={props.removeBook} />
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

export default class WishList extends React.Component {
  constructor() {
    super();
    this.state = { Books: [] };
    this.loadData = this.loadData.bind(this);
    this.clearWish = this.clearWish.bind(this);
    this.removeBook = this.removeBook.bind(this);
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
    fetch(`/api/Wish${this.props.location.search}`).then(response => {
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
  clearWish()
  {
    fetch('/api/clearwish', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    }).then(()=>(this.loadData()))
  }
  removeBook(ISBN)
  {
    fetch('/api/delwish', {
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
      <Button type="button" id ="clearwish"  className="btn" onClick={(event) => this.clearWish(event)}>Clear Wish List</Button>
         <br />
          <br />
        <div id = "info">
        <BookTable Books={this.state.Books} removeBook={this.removeBook} />
        </div>
      </div>
    );
  }
}

WishList.propTypes = {
  location: React.PropTypes.object.isRequired,
  router: React.PropTypes.object,
};
