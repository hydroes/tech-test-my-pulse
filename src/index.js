const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use(express.json());
app.use(express.static('public'))

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// routes
app.get('/', (req, res) => {
  // res.sendFile('public/schedule-form.html')
  res.sendFile(path.join(__dirname, './public', 'schedule-form.html'));
})
// app.post('/players', players.addPlayer)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})