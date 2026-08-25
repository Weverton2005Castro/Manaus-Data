import { getIncidentIcon } from '../lib/incidentIcons'

function IncidentFilters({
  incidents,
  selectedCategory,
  onCategoryChange,
}) {
  const categories = incidents.reduce(
    (acc, incident) => {
      const category =
        incident.categories?.name

      if (!category) {
        return acc
      }

      if (!acc[category]) {
        acc[category] = 0
      }

      acc[category] += 1

      return acc
    },
    {}
  )

  return (
    <div className="incident-filters">

      <div className="incident-filters-header">
        <div>
          <h3>
            Ocorrências
          </h3>

          <p>
            Filtre os problemas exibidos
            no mapa.
          </p>
        </div>

        <span className="incident-total">
          {incidents.length}
        </span>
      </div>

      <div className="incident-filter-list">

        <button
          className={
            selectedCategory === 'all'
              ? 'incident-filter active'
              : 'incident-filter'
          }
          onClick={() =>
            onCategoryChange('all')
          }
        >
          <span>
            Todas
          </span>

          <strong>
            {incidents.length}
          </strong>
        </button>

        {Object.entries(categories).map(
          ([category, count]) => {
            const IconComponent = getIncidentIcon(category)
            return (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? 'incident-filter active'
                    : 'incident-filter'
                }
                onClick={() =>
                  onCategoryChange(category)
                }
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {IconComponent && <IconComponent size={16} />}
                  {category}
                </span>

                <strong>
                  {count}
                </strong>
              </button>
            )
          }
        )}

      </div>

    </div>
  )
}

export default IncidentFilters