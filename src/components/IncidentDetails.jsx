function IncidentDetails({
  incident,
  onClose,
}) {
  if (!incident) {
    return null
  }

  const data = new Date(
    incident.created_at
  ).toLocaleString('pt-BR')

  return (
    <div className="incident-overlay">

      <div className="incident-panel">

        <button
          className="incident-close"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="incident-category">
          {incident.categories?.icon}{' '}
          {incident.categories?.name}
        </div>

        <h2 className="incident-title">
          {incident.title}
        </h2>

        <div className="incident-status active">
          ● Ativo
        </div>

        <div className="incident-section">

          <h4>
            Descrição
          </h4>

          <p>
            {incident.description ||
              'Nenhuma descrição informada.'}
          </p>

        </div>

        <div className="incident-section">

          <h4>
            Localização
          </h4>

          <p>
            Latitude:{' '}
            {incident.latitude.toFixed(6)}
          </p>

          <p>
            Longitude:{' '}
            {incident.longitude.toFixed(6)}
          </p>

        </div>

        <div className="incident-footer">

          <span>
            Registrado em
          </span>

          <strong>
            {data}
          </strong>

        </div>

      </div>

    </div>
  )
}

export default IncidentDetails