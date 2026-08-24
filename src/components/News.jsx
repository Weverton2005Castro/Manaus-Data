import { useState, useEffect } from 'react'
import { getNews } from '../services/news'

function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true)
        setError(null)
        const data = await getNews()
        setNews(data)
      } catch (err) {
        console.error('Erro ao carregar notícias:', err)
        setError('Não foi possível carregar as notícias.')
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  if (loading) {
    return (
      <section className="news-card">
        <div className="news-header">
          <h2 className="news-title">Notícias</h2>
          <p className="news-description">Carregando notícias...</p>
        </div>
        <div className="news-body">
          <div className="news-loading">Carregando...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="news-card">
        <div className="news-header">
          <h2 className="news-title">Notícias</h2>
          <p className="news-description">Erro ao carregar notícias</p>
        </div>
        <div className="news-body">
          <div className="news-error">{error}</div>
        </div>
      </section>
    )
  }

  if (!news || news.length === 0) {
    return (
      <section className="news-card">
        <div className="news-header">
          <h2 className="news-title">Notícias</h2>
          <p className="news-description">Nenhuma notícia disponível</p>
        </div>
        <div className="news-body">
          <div className="news-empty">Nenhuma notícia disponível no momento.</div>
        </div>
      </section>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    } catch {
      return ''
    }
  }

  return (
    <section className="news-card">
      <div className="news-header">
        <h2 className="news-title">Notícias</h2>
        <p className="news-description">Últimas notícias sobre Manaus</p>
      </div>
      <div className="news-body">
        <div className="news-grid">
          {news.slice(0, 6).map((article) => (
            <article key={article.article_id} className="news-item">
              {article.image_url && (
                <div className="news-image">
                  <img
                    src={article.image_url}
                    alt={article.title || 'Notícia'}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="news-content">
                <h3 className="news-item-title">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title || 'Sem título'}
                  </a>
                </h3>
                {article.description && (
                  <p className="news-item-description">
                    {article.description}
                  </p>
                )}
                <div className="news-item-meta">
                  {article.source_name && (
                    <span className="news-item-source">
                      {article.source_name}
                    </span>
                  )}
                  {article.pubDate && (
                    <span className="news-item-date">
                      {formatDate(article.pubDate)}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default News
