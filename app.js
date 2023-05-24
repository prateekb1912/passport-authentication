const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 3000;

// DB configuration
const db = require('./config/keys').MongoURI;

mongoose.connect(db, {useNewURLParser: true})
    .then(() => console.log('Database connection success'))
    .catch(err => console.log(err));

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`))