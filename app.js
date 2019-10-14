const express = require('express')
const app = express()

require('dotenv').config()
const port = process.env.PORT

app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.get('/api/timestamp/:date_string', (req, res) => {
  const dateString = req.params['date_string']
  const timestamp = parseInt(dateString)
  const date =
    isNaN(timestamp) == false ? new Date(timestamp) : new Date(dateString)
  if (isNaN(date) == false) {
    res.json({ unix: date.getTime(), utc: date.toUTCString() })
  } else {
    res.json({ error: 'Invalid Date' })
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
