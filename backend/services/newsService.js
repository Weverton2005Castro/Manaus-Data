const NEWS_API_URL = 'https://newsdata.io/api/1/latest'
const supabase = require('../config/supabase')

async function buscarNoticias() {
  const params = new URLSearchParams({
    apikey: process.env.NEWSDATA_API_KEY,
    q: 'Manaus OR Amazonas',
    country: 'br',
    language: 'pt'
  })

  const response = await fetch(
    `${NEWS_API_URL}?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error(
      `NewsData retornou HTTP ${response.status}`
    )
  }

  const data = await response.json()

  if (data.status !== 'success') {
    throw new Error(
      data.message || 'Erro ao consultar NewsData'
    )
  }

  await persistirNoticias(data.results || [])

  return data
}

async function persistirNoticias(articles) {
  if (!articles || articles.length === 0) {
    return
  }

  const noticiasNormalizadas = articles.map(article => ({
    external_id: article.article_id || null,
    title: article.title || null,
    description: article.description || null,
    url: article.link || null,
    image_url: article.image_url || null,
    source: article.source_name || null,
    category: article.category || null,
    published_at: article.pubDate || null,
    language: article.language || null,
    country: article.country || null
  }))

  const { error } = await supabase
    .from('news')
    .upsert(noticiasNormalizadas, {
      onConflict: 'external_id'
    })

  if (error) {
    console.error('Erro ao persistir notícias no Supabase:', error)
  }
}

module.exports = {
  buscarNoticias
}