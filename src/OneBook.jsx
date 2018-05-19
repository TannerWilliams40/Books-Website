import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

export default class bookEdit extends React.Component {
  constructor() {
    super();
    this.loadData = this.loadData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      book: {
        Cover: '', ISBN: '', Title: '', Author: '',
        Genre: '', Desc: '',
      },
      rating: null,
      rtitle: '',
      rbody: ''
    };
  }
  componentDidMount() {
      this.loadData();
    }

  loadData() {
    fetch(`/api/Books/${this.props.params.ISBN}`).then(response => {
      if (response.ok) {
        response.json().then(newbook => {
          this.setState({ book: newbook });
          this.setState({rating: newbook.Rating})
          this.setState({rtitle: newbook.ReviewTitle})
          this.setState({rbody: newbook.Review})
        });
      } else {
        response.json().then(error => {
          alert(`Failed to fetch book: ${error.message}`);
        });
      }
    }).catch(err => {
      alert(`Error in fetching data from server: ${err.message}`);
    });
  }
  handleWish() {
    fetch('/api/addwish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      ISBN: this.state.book.ISBN,
      Title: this.state.book.Title,
      Author: this.state.book.Author,
      Genre: this.state.book.Genre,
      Desc: this.state.book.Desc,
      Cover: this.state.book.Cover,
    }),
    })
  }
  handleCart() {
    fetch('/api/addcart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      ISBN: this.state.book.ISBN,
      Title: this.state.book.Title,
      Author: this.state.book.Author,
      Genre: this.state.book.Genre,
      Desc: this.state.book.Desc,
      Cover: this.state.book.Cover,
    }),
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.myform;
    this.setState({rtitle: form.title.value, rbody: form.body.value})
    // clear the form for the next input
    fetch('/api/editreview', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({Title: form.title.value, Body: form.body.value, ISBN: this.state.book.ISBN}),
    })
    form.title.value = ''; form.body.value = '';
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    fetch('/api/editrating', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({value: nextValue, ISBN: this.state.book.ISBN}),
    })
  }

  render() {
    const book = this.state.book;
    return (
      <div>
      <div id="whiteback">
      </div>
      <Link to ={`/Books`}><Button id ="Return" className="btn">Continue Shopping</Button></Link>
      <Button type="button" id ="addtocart"  className="btn" onClick={(event) => this.handleCart(event)}>Add to Cart</Button>
      <Button type="button" id ="addtowish"  className="btn" onClick={(event) => this.handleWish(event)}>Add to Wish List</Button>
        <div id = "indinfo">
          <img src={book.Cover?require(book.Cover):''} className = 'format' /> 
          <div id = "desc">
          <b>Synopsis:</b> {book.Desc}
          </div>
          <div id = "review">
            <div id = "product">
            {this.state.rtitle}
            <br />
            {this.state.rbody}
            <br />
            <br />
            <br />
            </div>
            <form name = "myform" id ="form" onSubmit={this.handleSubmit}>
            <input type="text" name="title" id="addtitle" placeholder="Title" />
            <textarea className="form-control" name="body" rows="6" cols="60" id="addwords" placeholder="Your Review"/>
            <br />
            <Button type="button" className="btn" onClick={this.handleSubmit}>Add Review</Button>
            </form>
          </div>
          <br />
          <br />
          <div id = "rating">
          <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={this.state.rating}
          onStarClick={this.onStarClick.bind(this)}
          />
          </div>
          <b>ISBN:</b> {book.ISBN}
          <br />
          <b>Title:</b> {book.Title}
          <br />
          <b>Author:</b> {book.Author}
          <br />
          <b>Genre:</b> {book.Genre}
          <br />
        </div>
        </div>
    );
  }
}

bookEdit.propTypes = {
  params: React.PropTypes.object.isRequired,
};

          //cover: <img src={`/cover/${book.cover}`}> </img>
          //<br />
