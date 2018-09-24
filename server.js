const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const notes = require('./routes/api/notes');
const app = express();

//BodyParser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => console.log("MongooDB Connected...."))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/users',users);
app.use('/api/notes',notes);

const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`Server Started on port ${port}`));

