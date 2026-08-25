import {
  MdWaterDamage,
  MdThunderstorm,
  MdWarning,
  MdLightbulb,
  MdCarCrash,
  MdReportProblem,
  MdLocationOn
} from 'react-icons/md'

const INCIDENT_ICONS = {
  'Alagamento': MdWaterDamage,
  'Chuva forte': MdThunderstorm,
  'Buraco': MdWarning,
  'Iluminação': MdLightbulb,
  'Acidente': MdCarCrash,
  'Outros': MdReportProblem,
  'default': MdLocationOn
}

export function getIncidentIcon(categoryName) {
  return INCIDENT_ICONS[categoryName] || INCIDENT_ICONS['default']
}

export { INCIDENT_ICONS }
