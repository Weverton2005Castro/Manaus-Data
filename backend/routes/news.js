const express = require('express')

const {
  buscarNoticias
} = require('../services/newsService')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const data = await buscarNoticias()

    res.json({
      status: 'success',
      totalResults: data.totalResults,
      results: data.results
    })
  } catch (error) {
    console.error('Erro ao buscar notícias:', error)

    res.status(500).json({
      status: 'error',
      message: 'Não foi possível buscar as notícias'
    })
  }
})

module.exports = router