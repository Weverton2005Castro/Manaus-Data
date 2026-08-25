import {
  MdWaterDamage,
  MdThunderstorm,
  MdWarning,
  MdLightbulb,
  MdCarCrash,
  MdReportProblem,
  MdLocationOn
} from 'react-icons/md'
import { divIcon } from 'leaflet'

const INCIDENT_ICONS = {
  'Alagamento': MdWaterDamage,
  'Chuva forte': MdThunderstorm,
  'Buraco': MdWarning,
  'Iluminação': MdLightbulb,
  'Acidente': MdCarCrash,
  'Outros': MdReportProblem,
  'default': MdLocationOn
}

// SVG strings para os ícones do mapa
const INCIDENT_MARKER_SVGS = {
  'Alagamento': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 4.12 13.38 3 12 3S9.5 4.12 9.5 5.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S10.5 7.83 10.5 7s.67-1.5 1.5-1.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z"/>
  </svg>`,
  'Chuva forte': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M4.01 13c-.63 0-1.15.49-1.23 1.11L2 17h2v5h2v-5h2l-.78-2.89C7.14 13.49 6.62 13 5.99 13H4.01zm10 0c-.63 0-1.15.49-1.23 1.11L12 17h2v5h2v-5h2l-.78-2.89C17.14 13.49 16.62 13 15.99 13h-1.98zM9 2c-2.66 0-4.97 1.65-5.87 4H3c-1.66 0-3 1.34-3 3v2h2v-2c0-.55.45-1 1-1h.55c.35-1.93 2.05-3.39 4.08-3.39 1.47 0 2.76.81 3.45 2.02.34-.05.69-.08 1.05-.08 2.33 0 4.31 1.63 4.86 3.82.37-.08.76-.13 1.16-.13 2.48 0 4.5 2.02 4.5 4.5S20.48 17.24 18 17.24h-1.55V19.1H18c3.45 0 6.24-2.67 6.24-5.96 0-3.15-2.42-5.75-5.51-5.96C17.54 4.1 14.1 2 10.12 2c-.72 0-1.42.08-2.09.23.63.53 1.18 1.16 1.62 1.87.15-.02.3-.03.46-.03z"/>
  </svg>`,
  'Buraco': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M18 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.82-2.47c.14-.33.23-.69.23-1.07 0-1.44-1.21-2.61-2.7-2.61-1.18 0-2.18.75-2.54 1.79-.18-.05-.36-.08-.55-.08-1.14 0-2.07.85-2.19 1.95-.24-.08-.5-.12-.77-.12-1.48 0-2.68 1.12-2.68 2.5s1.2 2.5 2.68 2.5h6.02c1.48 0 2.68-1.12 2.68-2.5 0-1.09-.72-2.01-1.68-2.36zM4 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>`,
  'Iluminação': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
  </svg>`,
  'Acidente': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
  </svg>`,
  'Outros': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>`,
  'default': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>`
}

export function getIncidentIcon(categoryName) {
  return INCIDENT_ICONS[categoryName] || INCIDENT_ICONS['default']
}

export function getIncidentMarkerIcon(categoryName) {
  const iconSvg = INCIDENT_MARKER_SVGS[categoryName] || INCIDENT_MARKER_SVGS['default']

  return divIcon({
    className: 'custom-incident-marker',
    html: `
      <div class="incident-marker-wrapper">
        <div class="incident-marker-icon">
          ${iconSvg}
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  })
}

export { INCIDENT_ICONS }
