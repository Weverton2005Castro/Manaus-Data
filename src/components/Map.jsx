import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'

import L from 'leaflet'

import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = defaultIcon

function Map() {
  const manaus = [-3.1019, -60.025]

  const [incidents, setIncidents] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)

  async function carregarOcorrencias() {
    const { data, error } = await supabase
      .from('incidents')
      .select(`
        id,
        title,
        description,
        latitude,
        longitude,
        status,
        created_at,
        categories (
          name,
          icon
        )
      `)
      .eq('status', 'active')

    if (error) {
      console.error(
        'Erro ao carregar ocorrências:',
        error
      )

      return
    }

    setIncidents(data)
  }

  useEffect(() => {
    carregarOcorrencias()
  }, [])

  function handleMapClick(location) {
    setSelectedLocation(location)
  }

  function fecharFormulario() {
    setSelectedLocation(null)
  }

  async function handleIncidentCreated() {
    await carregarOcorrencias()
  }

  return (
    <>
      <MapContainer
        center={manaus}
        zoom={12}
        style={{
          height: '600px',
          width: '100%',
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler
          onMapClick={handleMapClick}
        />

        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={[
              incident.latitude,
              incident.longitude,
            ]}
          >
            <Popup>
              <strong>
                {incident.categories?.icon}{' '}
                {incident.categories?.name}
              </strong>

              <br />

              <strong>
                {incident.title}
              </strong>

              <br />

              {incident.description}

              <br />

              <small>
                Status: {incident.status}
              </small>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedLocation && (
        <IncidentForm
          location={selectedLocation}
          onClose={fecharFormulario}
          onCreated={handleIncidentCreated}
        />
      )}
    </>
  )
}

export default Map