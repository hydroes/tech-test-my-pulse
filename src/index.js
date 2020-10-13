const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.json());

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// routes
app.get('/', (req, res) => {
  // res.sendFile('public/schedule-form.html')
  // res.sendFile(path.join(__dirname, './public', 'schedule-form.html'));
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
// app.post('/players', players.addPlayer)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})