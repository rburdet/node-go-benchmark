const express = require('express');
const fetch = require('node-fetch');

const app = express();

const URL = "http://localhost:6000";
const PORT = 7000;

const buildPromise = () => fetch(URL).then(data => data.json())

const executeBench = () => {
  const promises = []
  for (i = 0; i < 10 ; i++) {
    promises.push(buildPromise())
  } 
  return Promise.all(promises)
}

app.get('/bench', (req, res) => {
  executeBench()
  .then(data => res.send(data))
})

app.listen(PORT, () => {
  console.log("listening on port ", PORT);
})
