import { useMapEvents } from 'react-leaflet'

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng

      onMapClick({
        latitude: lat,
        longitude: lng,
      })
    },
  })

  return null
}

export default MapClickHandler