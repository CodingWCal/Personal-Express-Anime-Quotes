const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://calvinUser:1234@cluster-personal-expres.jnrqk19.mongodb.net/?retryWrites=true&w=majority";
const dbName = "animeQuotesDB";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('animeQuotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {animeQuotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('animeQuotes').insertOne({
    character: req.body.character, 
    quote: req.body.quote, 
    anime:req.body.anime
  }, (err, result) => {
    if (err) return console.log(err)
    console.log('Quote saved to database')
    res.redirect('/')
  })
})

//edited yoinked thumbsup for stars on anime quotes
app.put('/star', (req, res) => {
  db.collection('animeQuotes')
  .findOneAndUpdate(
    {character: req.body.character, quote: req.body.quote}, 
    {
    $inc: {stars: 1}
  }, 
  {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

//Old Savage Demo APP.POST
// app.post('/quotes', (req, res) => {
//   db.collection('animeQuotes').insertOne({
//     name: req.body.name, 
//     msg: req.body.msg, 
//     thumbUp: 0, thumbDown:0
//   }, (err, result) => {
//     if (err) return console.log(err)
//     console.log('saved to database')
//     res.redirect('/')
//   })
// })

// app.put('/messages', (req, res) => {
//   db.collection('animeQuotes')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbUp:req.body.thumbUp + 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

// //Newly Added copied codeblock from first put but added Thumb /DOWN in path put - Calvin //
// app.put('/down', (req, res) => {
//   db.collection('animeQuotes')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbUp:req.body.thumbUp - 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

app.delete('/quotes', (req, res) => {
  db.collection('animeQuotes').findOneAndDelete(
    {character: req.body.character, quote: req.body.quote}, 
    (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

//calvinUser
//1234
//mongodb+srv://calvinUser:1234@cluster-personal-expres.jnrqk19.mongodb.net/