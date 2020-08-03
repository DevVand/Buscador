const port = process.env.PORT || 5000;
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminData = require('./routes/admin');

const app = express();

app.use(cors({
    credentials: true,
    origin: true
  }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', adminData.routes);

app.listen(port, () => {
    console.log('API aberto em: localhost:' + port )
});

