const express = require('express')
const cors = require('cors')
require('dotenv').config()

const newsRoutes = require('./routes/news')

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Manaus Data API funcionando'
  })
})

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok'
  })
})

app.use('/api/news', newsRoutes)

app.listen(PORT, () => {
  console.log(
    `🚀 Manaus Data API rodando em http://localhost:${PORT}`
  )
})