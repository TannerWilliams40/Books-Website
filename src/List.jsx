import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';

class BookRow extends React.Component {
  constructor(props)
  {
    super(props);
    this.dragStart = this.dragStart.bind(this);
  }
  dragStart(event)
  {
    var data = {
      ISBN: this.props.book.ISBN,
      Title: this.props.book.Title,
      Author: this.props.book.Author,
      Genre: this.props.book.Genre,
      Desc: this.props.book.Desc,
      Cover: this.props.book.Cover
    };

    event.dataTransfer.setData('text', JSON.stringify(data)); 
  }

  render()
{
  return (
    <tr>
      <td><Link to={`/${this.props.book.ISBN}`}><img src={require(this.props.book.Cover)} className = 'format' draggable = "true" onDragStart={this.dragStart} /></Link></td>
      <td>{this.props.book.ISBN}</td>
      <td>{this.props.book.Title}</td>
      <td>{this.props.book.Author}</td>
      <td>{this.props.book.Genre}</td>
      <td>{this.props.book.Desc}</td>
    </tr>
  );
}
};

BookRow.propTypes = {
  book: React.PropTypes.object.isRequired,
};

function BookTable(props) {
  const BookRows = props.Books.map(book =>
    <BookRow key={book.ISBN} book={book} />
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
        </tr>
      </thead>
      <tbody>{BookRows}</tbody>
    </Table>
  );
}

BookTable.propTypes = {
  Books: React.PropTypes.array.isRequired,
};

export default class BookList extends React.Component {
  constructor() {
    super();
    this.state = { Books: [],
                    User: null};
    this.loadData = this.loadData.bind(this);
    this.dropcart = this.dropcart.bind(this);
    this.dropwish = this.dropwish.bind(this);
    this.preventDefault = this.preventDefault.bind(this);
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
  dropcart(event)
  {
    event.preventDefault();
    var data;
    try {
      data = JSON.parse(event.dataTransfer.getData('text'));
    } catch (e) {
      // If the text data isn't parsable we'll just ignore it.
      return;
    }
    fetch('/api/addcart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }
  dropwish(event)
  {
    event.preventDefault();
    var data;
    try {
      data = JSON.parse(event.dataTransfer.getData('text'));
    } catch (e) {
      // If the text data isn't parsable we'll just ignore it.
      return;
    }
    fetch('/api/addwish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }
  preventDefault(event)
  {
    event.preventDefault();
  }
  loadData() {
    fetch(`/api/Books${this.props.location.search}`).then(response => {
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
    fetch(`/api/user`).then(response => {response.json().then(data => {
       this.setState({User : data.uname });  
      });
    }).catch(err => {
      alert(`Error in fetching data from server: ${err}`);
    });
  }

  render() {
    return (
      <div>
      <div id="whiteback">
      </div>
      <div id="logout">
      Logged in as:
      <br />
      {this.state.User}
      <br />
      <Link to ={`/home`}><Button type="button" className="btn" id="signout">
      <span className="glyphicon glyphicon-log-out" id = "symbol"></span></Button></Link>
      </div>
      <div id = "cart" onDragOver={this.preventDefault} onDragEnter={this.preventDefault} onDrop={this.dropcart}>
      <Link to ={`/Cart`}><Button className="btn">Shopping Cart</Button></Link>
      </div>
      <div id = "wish" onDragOver={this.preventDefault} onDragEnter={this.preventDefault} onDrop={this.dropwish}>
      <Link to ={`/WishList`}><Button className="btn">Wish List ★</Button></Link>
      </div> 
        <div id = "info">
        <BookTable Books={this.state.Books} />
        </div>
      </div>
    );
  }
}

BookList.propTypes = {
  location: React.PropTypes.object.isRequired,
  router: React.PropTypes.object,
};

  //<td><img src={`/cover/${props.book.cover}`}> </img></td>
