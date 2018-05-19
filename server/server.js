import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
import 'babel-polyfill';

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';
import Issue from './issue.js';

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

let db;
var loggedu;
app.get('/api/user', function(req,response) {
  console.log(loggedu);
  response.json({uname: loggedu});
});
app.patch('/api/editrating', function(req,response) {
  const data = req.body;
   db.collection("Books").updateOne({ISBN: data.ISBN}, {$set: {Rating: data.value } } , function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    response.send("worked");
 })});
app.patch('/api/editreview', function(req,response) {
  const data = req.body;
  db.collection("Books").updateOne({ISBN: data.ISBN}, {$set: {Review: data.Body } } , function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  db.collection("Books").updateOne({ISBN: data.ISBN}, {$set: {ReviewTitle: data.Title } } , function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    response.send("worked!");
 })
 })});
/*app.post('/api/bookstore', (req, res) => {
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status) {
    newIssue.status = 'New';
  }

  const err = Issue.validateIssue(newIssue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }

  db.collection('bookstore').insertOne(Issue.cleanupIssue(newIssue)).then(result =>
    db.collection('bookstore').find({ _id: result.insertedId }).limit(1)
    .next()
  )
  .then(savedIssue => {
    res.json(savedIssue);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});
*/
app.post('/api/bookstore/sign', (req, res) => {
  const data = req.body;
  var u = data.email;
  var p = data.pass;
  var pr = data.passr;
  var a = true;
  /*console.log(u);
  console.log(p);
  console.log(pr);
  */
  loggedu = u;
  for (var x = 0; x < u.length; x++) {    
        if (u[x] === '@')
          a = false;
        }
  if (u == '' || p == '' || pr == '')
    res.json({message: `Cannot have empty fields.`});
  else if (a)
      res.json({message: `Invalid email.`});
  else if (p != pr)
    res.json({message: `Passwords must match.`});
  else{
  var dbo = db.db("news");
  var myobj = { username: u, pass: p };
    /*dbo.dropCollection("users", function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
     });*/
    var query = { username: u };
    dbo.collection("users").find(query).toArray(function(err, result) {
      console.log(result);
      if (err) {
        throw err;
        res.json({message: `Invalid`});
      }
      else if (result[0] == null) 
      {
      dbo.collection("users").insertOne(myobj, function(err, result) {
        if (err) {
          throw err;
          res.json({message: `Error: account not created.`});
        }
        else {
          console.log(result);
          console.log({message: `1 account inserted`});
          //loggedu = u;
          res.json({message: `Account successfully created.`});
        }
        });
      }
      else
      {
        console.log(result);
        res.json({message: `That email is already in use.`});
      }
    });
  }
  });

app.post('/api/bookstore/log', (req, res) => {
  const data = req.body;
  var u = data.email;
  var p = data.pass;
  var a = true;
  /*
  console.log(u);
  console.log(p);
  */
  loggedu = u;
  for (var x = 0; x < u.length; x++) {    
      if (u[x] === '@')
        a = false;
  }
  if (u == '' || p == '')
    res.json({message: `Cannot have empty fields.`});
  else if(a)
    res.json({message: `Invalid email.`});
  else{
    var dbo = db.db("news");
    var query = { username: u };
    console.log(query);
    dbo.collection("users").find(query).toArray(function(err, result) { 
      console.log(result);
      if (err) {
        throw err;
        res.json({message: `Invalid query.`});
      }
      else if (result[0] == null) {
          res.json({message: `Username not found`});
      }
      else {
        if(result[0].pass == p) {
          //loggedu = u;
          console.log(result);
          res.json({message: `Successfully logged in.`});
        }
        else {
          res.json({message: `Error: username and password does not match`});
        }
      }
      //db.close();
    });
  }
  });

app.get('/api/Books', (req, res) => {

  db.collection('Books').find().toArray()
  .then(Books => {
    const metadata = { total_count: Books.length };
    res.json({ _metadata: metadata, records: Books });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});
app.post('/api/addwish', (req, res) => {
  const newWish = req.body;
  var query = {ISBN: newWish.ISBN};
  console.log(query);
  db.collection("Wish").find(query).toArray(function(err, result) {
      if (err) {
        throw err;
      }
      else if (result[0] == null) 
      {
        db.collection('Wish').insertOne(newWish);
        res.send("worked");
      }
      else
      {
        res.send("didn't work")
      }

  });
});
app.post('/api/addcart', (req, res) => {
  const newCart = req.body;
  var query = {ISBN: newCart.ISBN};
  console.log(query);
  db.collection("Cart").find(query).toArray(function(err, result) {
      if (err) {
        throw err;
      }
      else if (result[0] == null) 
      {
        db.collection('Cart').insertOne(newCart);
        res.send("worked");
      }
      else
      {
        res.send("didn't work")
      }

  });
});
app.delete('/api/delwish', (req, res) => {
  const item = req.body;
  db.collection("Wish").find(item).toArray(function(err, result) {
      if (err) {
        throw err;
      }
      else if (result[0] != null) 
      {
        db.collection('Wish').deleteOne(item);
        res.send("worked");
      }
      else
      {
        res.send("didn't work")
      }

  });
});
app.delete('/api/clearwish', (req, res) => {
  db.collection('Wish').remove({});
  res.send("worked");
});
app.delete('/api/delcart', (req, res) => {
  const item = req.body;
  db.collection("Cart").find(item).toArray(function(err, result) {
      if (err) {
        throw err;
      }
      else if (result[0] != null) 
      {
        db.collection('Cart').deleteOne(item);
        res.send("worked");
      }
      else
      {
        res.send("didn't worked");
      }

  });
});
app.delete('/api/clearcart', (req, res) => {
  db.collection('Cart').remove({});
  res.send("worked");
});

app.get('/api/Wish', (req, res) => {

  db.collection('Wish').find().toArray()
  .then(Books => {
    const metadata = { total_count: Books.length };
    res.json({ _metadata: metadata, records: Books });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.get('/api/Cart', (req, res) => {

  db.collection('Cart').find().toArray()
  .then(Books => {
    const metadata = { total_count: Books.length };
    res.json({ _metadata: metadata, records: Books });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.get('/api/Books/:ISBN', (req, res) => {
  let bookId;
  try {
    bookId = req.params.ISBN;
  } catch (error) {
    res.status(422).json({ message: `Invalid ISBN format: ${error}` });
    return;
  }

  db.collection('Books').find({ ISBN: bookId }).limit(1)
  .next()
  .then(book => {
    //console.log(book);
    if (!book) res.status(404).json({ message: `No such issue: ${bookId}` });
    else res.json(book);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('static/index.html'));
});

MongoClient.connect('mongodb://localhost/Library').then(connection => {
  db = connection;
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});