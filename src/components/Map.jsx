import { useState } from 'react'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'

import MapClickHandler from './MapClickHandler'
import IncidentForm from './IncidentForm'
import IncidentDetails from './IncidentDetails'
import { getIncidentIcon, getIncidentMarkerIcon } from '../lib/incidentIcons'

function Map({
  incidents,
  onIncidentCreated,
}) {
  const manaus = [
    -3.1019,
    -60.025,
  ]

  const [
    selectedLocation,
    setSelectedLocation,
  ] = useState(null)

  const [
    reporting,
    setReporting,
  ] = useState(false)

  const [
    selectedIncident,
    setSelectedIncident,
  ] = useState(null)

  function handleMapClick(location) {
    if (!reporting) {
      return
    }

    setSelectedLocation(location)

    setReporting(false)
  }

  function iniciarRelato() {
    setSelectedLocation(null)

    setReporting(true)
  }

  function fecharFormulario() {
    setSelectedLocation(null)

    setReporting(false)
  }

  async function handleIncidentCreated() {
    if (onIncidentCreated) {
      await onIncidentCreated()
    }
  }

  return (
    <div className="map-container">

      <button
        onClick={iniciarRelato}
        className="map-report-button"
      >
        + Relatar problema
      </button>

      {reporting && (
        <div className="map-selection-message">
          Clique no mapa para indicar o
          local do problema.
        </div>
      )}

      <MapContainer
        center={manaus}
        zoom={12}
        style={{
          height: '620px',
          width: '100%',
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler
          onMapClick={handleMapClick}
        />

        {selectedLocation && (
          <Marker
            position={[
              selectedLocation.latitude,
              selectedLocation.longitude,
            ]}
          >
            <Popup>
              Local selecionado
            </Popup>
          </Marker>
        )}

        {incidents.map((incident) => {
          const IconComponent = getIncidentIcon(incident.categories?.name)
          const markerIcon = getIncidentMarkerIcon(incident.categories?.name)

          return (
            <Marker
              key={incident.id}
              position={[
                incident.latitude,
                incident.longitude,
              ]}
              icon={markerIcon}
            >
              <Popup>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {IconComponent && <IconComponent size={20} />}
                  <strong>
                    {incident.categories?.name}
                  </strong>
                </div>

                <br />

                <strong>
                  {incident.title}
                </strong>

                <br />

                {incident.description}

                <br />
                <br />

                <button
                  className="popup-button"
                  onClick={() =>
                    setSelectedIncident(
                      incident
                    )
                  }
                >
                  Ver detalhes
                </button>

              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      {selectedLocation && (
        <IncidentForm
          location={selectedLocation}
          onClose={fecharFormulario}
          onCreated={
            handleIncidentCreated
          }
        />
      )}

      <IncidentDetails
        incident={selectedIncident}
        onClose={() =>
          setSelectedIncident(null)
        }
      />

    </div>
  )
}

export default Map