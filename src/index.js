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
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
app.post('/query', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})