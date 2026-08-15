function CitySummary({
  weather,
  incidents,
}) {
  if (!weather) {
    return null
  }

  const current =
    weather.current

  const floodIncidents =
    incidents.filter(
      (incident) => {
        const categoryName =
          incident.categories?.name
            ?.toLowerCase()

        return (
          categoryName?.includes(
            'alagamento'
          ) ||
          categoryName?.includes(
            'enchente'
          )
        )
      }
    )

  const rainProbability =
    weather.hourly
      ?.precipitation_probability?.[0] ??
    0

  const hasRainWarning =
    rainProbability >= 60 ||
    current.rain > 0 ||
    current.precipitation > 0

  const hasFloodIncidents =
    floodIncidents.length > 0

  return (
    <div className="summary">

      <div className="summary-stat">

        <span className="summary-label">
          Ocorrências
        </span>

        <strong className="summary-value">
          {incidents.length}
        </strong>

      </div>

      <div className="summary-stat">

        <span className="summary-label">
          Alagamentos
        </span>

        <strong className="summary-value">
          {floodIncidents.length}
        </strong>

      </div>

      <div className="summary-stat">

        <span className="summary-label">
          Temperatura
        </span>

        <strong className="summary-value">
          {current.temperature_2m}°C
        </strong>

      </div>

      <div className="summary-status">

        <span
          className={
            hasRainWarning ||
            hasFloodIncidents
              ? 'summary-status-dot warning'
              : 'summary-status-dot'
          }
        />

        <div>

          <strong>
            {hasRainWarning ||
            hasFloodIncidents
              ? 'Atenção'
              : 'Situação normal'}
          </strong>

          <p>
            {hasRainWarning
              ? 'Há possibilidade de chuva nas próximas horas.'
              : 'Sem alertas meteorológicos no momento.'}
          </p>

        </div>

      </div>

    </div>
  )
}

export default CitySummary