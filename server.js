// boilerplate code for server
const { response } = require('express');
const express = require('express');
const mysql = require('mysql2');
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//
app.use((req, res) => {
    res.status(404).end();
  });

  //spinning up server on port 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }); 