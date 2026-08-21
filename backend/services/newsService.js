const NEWS_API_URL = 'https://newsdata.io/api/1/latest'

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

  return data
}

module.exports = {
  buscarNoticias
}