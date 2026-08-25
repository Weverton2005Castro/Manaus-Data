import { getIncidentIcon } from '../lib/incidentIcons'

function IncidentDetails({
  incident,
  onClose,
}) {
  if (!incident) {
    return null
  }

  const category =
    incident.categories?.name ||
    'Ocorrência'

  const IconComponent = getIncidentIcon(incident.categories?.name)

  const title =
    incident.title ||
    'Ocorrência sem título'

  const description =
    incident.description ||
    'Nenhuma descrição informada.'

  const latitude =
    Number(incident.latitude)

  const longitude =
    Number(incident.longitude)

  const status =
    incident.status || 'active'

  const statusConfig = {
    active: {
      label: 'Ativo',
      className: 'active',
    },

    resolved: {
      label: 'Resolvido',
      className: 'resolved',
    },

    pending: {
      label: 'Pendente',
      className: 'pending',
    },
  }

  const currentStatus =
    statusConfig[status] ||
    statusConfig.active

  const data = incident.created_at
    ? new Date(
        incident.created_at
      ).toLocaleString('pt-BR')
    : 'Data não informada'

  return (
    <div className="incident-overlay">

      <div
        className="incident-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Detalhes da ocorrência"
      >

        <button
          className="incident-close"
          onClick={onClose}
          aria-label="Fechar detalhes"
        >
          ×
        </button>

        <div className="incident-category">

          {IconComponent && <IconComponent size={24} />}

          <span>
            {category}
          </span>

        </div>

        <h2 className="incident-title">
          {title}
        </h2>

        <div
          className={`incident-status ${currentStatus.className}`}
        >
          <span>
            ●
          </span>

          {currentStatus.label}
        </div>

        <div className="incident-section">

          <h4>
            Descrição
          </h4>

          <p>
            {description}
          </p>

        </div>

        <div className="incident-section">

          <h4>
            Localização
          </h4>

          <div className="incident-location">

            <div>
              <span>
                Latitude
              </span>

              <strong>
                {Number.isFinite(latitude)
                  ? latitude.toFixed(6)
                  : 'Não informada'}
              </strong>
            </div>

            <div>
              <span>
                Longitude
              </span>

              <strong>
                {Number.isFinite(longitude)
                  ? longitude.toFixed(6)
                  : 'Não informada'}
              </strong>
            </div>

          </div>

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