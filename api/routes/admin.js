const path = require('path');
const CSVToJSON = require('csvtojson');

const express = require('express');

const router = express.Router();

router.get('/csv', (req, res) => {
  CSVToJSON().fromFile('public/Relatorio_cadop.csv')
    .then(data => {
        res.json(data)
    });
});

exports.routes = router;