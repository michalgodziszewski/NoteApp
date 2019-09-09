const express = require('express');
const app = express();
const dbConnect = require('./config/dbConnect');

dbConnect();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/note', require('./routes/note'));

const PORT = process.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
