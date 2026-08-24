import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import Weather from './components/Weather'
import Map from './components/Map'
import CitySummary from './components/CitySummary'
import IncidentFilters from './components/IncidentFilters'
import News from './components/News'

import { getWeather } from './services/weather'
import {
  getIncidents,
} from './services/incidents'

import './styles/index.css'
import './styles/layout.css'
import './styles/map.css'
import './styles/weather.css'
import './styles/filters.css'
import './styles/news.css'

function App() {
  const [
    weather,
    setWeather,
  ] = useState(null)

  const [
    incidents,
    setIncidents,
  ] = useState([])

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState('all')

  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    error,
    setError,
  ] = useState(null)

  async function carregarDados() {
    try {
      setLoading(true)
      setError(null)

      const [
        weatherData,
        incidentsData,
      ] = await Promise.all([
        getWeather(),
        getIncidents(),
      ])

      setWeather(weatherData)

      setIncidents(incidentsData)
    } catch (error) {
      console.error(
        'Erro ao carregar dados:',
        error
      )

      setError(
        'Não foi possível carregar os dados do Manaus Data.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  async function atualizarOcorrencias() {
    try {
      const data =
        await getIncidents()

      setIncidents(data)
    } catch (error) {
      console.error(
        'Erro ao atualizar ocorrências:',
        error
      )
    }
  }

  const filteredIncidents =
    useMemo(() => {
      if (
        selectedCategory === 'all'
      ) {
        return incidents
      }

      return incidents.filter(
        (incident) =>
          incident.categories?.name ===
          selectedCategory
      )
    }, [
      incidents,
      selectedCategory,
    ])

  function handleCategoryChange(
    category
  ) {
    setSelectedCategory(category)
  }

  if (loading) {
    return (
      <div className="loading-screen">

        <div className="loading-content">

          <div className="loading-logo">
            MD
          </div>

          <strong>
            Manaus Data
          </strong>

          <span>
            Carregando dados...
          </span>

        </div>

      </div>
    )
  }

  if (error) {
    return (
      <div className="error-screen">

        <div className="error-card">

          <h1>
            Manaus Data
          </h1>

          <p>
            {error}
          </p>

          <button
            onClick={carregarDados}
          >
            Tentar novamente
          </button>

        </div>

      </div>
    )
  }

  return (
    <div className="app">

      <header className="app-header">

        <div className="app-brand">

          <div className="app-brand-mark">
            MD
          </div>

          <div className="app-brand-text">

            <span className="app-brand-title">
              Manaus Data
            </span>

            <span className="app-brand-subtitle">
              Dados urbanos de Manaus
            </span>

          </div>

        </div>

        <div className="app-status">

          <span className="app-status-dot" />

          Dados atualizados

        </div>

      </header>

      <main className="app-content">

        <div className="dashboard-grid">

          <aside className="sidebar-panel">

            <div className="card">

              <div className="card-header">

                <h2 className="card-title">
                  Visão geral
                </h2>

                <p className="card-description">
                  Situação atual da cidade
                </p>

              </div>

              <div className="card-body">

                <CitySummary
                  weather={weather}
                  incidents={incidents}
                />

              </div>

            </div>

            <div className="card">

              <div className="card-body">

                <IncidentFilters
                  incidents={incidents}
                  selectedCategory={
                    selectedCategory
                  }
                  onCategoryChange={
                    handleCategoryChange
                  }
                />

              </div>

            </div>

          </aside>

          <section className="main-panel">

            <div className="card map-card">

              <div className="card-header">

                <div className="map-header">

                  <div>

                    <h2 className="card-title">
                      Mapa de Manaus
                    </h2>

                    <p className="card-description">
                      {selectedCategory ===
                      'all'
                        ? 'Todas as ocorrências registradas'
                        : `Exibindo: ${selectedCategory}`}
                    </p>

                  </div>

                  <div className="map-result-count">
                    {filteredIncidents.length}
                  </div>

                </div>

              </div>

              <div className="map-wrapper">

                <Map
                  incidents={
                    filteredIncidents
                  }
                  onIncidentCreated={
                    atualizarOcorrencias
                  }
                />

              </div>

            </div>

            <Weather
              weather={weather}
            />

            <News />

          </section>

        </div>

      </main>

    </div>
  )
}

export default App