const express = require('express');

const app = express();

const PORT = 6000;

app.get('/', (req, res) => {
  setTimeout( () => 
    res.json({rand:Math.random().toString()})
    , 20)
})

app.listen(PORT, () => {
  console.log("listening on port ", PORT);
})
