import { API_BASE_URL } from '../lib/config'

export async function getNews() {
  const url = `${API_BASE_URL}/api/news`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Erro ao buscar notícias')
  }

  const data = await response.json()

  if (data.status === 'success' && data.results) {
    return data.results
  }

  return []
}
