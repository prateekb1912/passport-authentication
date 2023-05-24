const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`))