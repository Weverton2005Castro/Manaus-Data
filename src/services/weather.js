const MANAUS_LAT = -3.1019
const MANAUS_LON = -60.025

export async function getWeather() {
  const url = new URL(
    'https://api.open-meteo.com/v1/forecast'
  )

  url.searchParams.set(
    'latitude',
    MANAUS_LAT
  )

  url.searchParams.set(
    'longitude',
    MANAUS_LON
  )

  url.searchParams.set(
    'current',
    [
      'temperature_2m',
      'relative_humidity_2m',
      'precipitation',
      'rain',
      'weather_code',
    ].join(',')
  )

  url.searchParams.set(
    'hourly',
    [
      'temperature_2m',
      'precipitation_probability',
      'precipitation',
      'weather_code',
    ].join(',')
  )

  url.searchParams.set(
    'forecast_days',
    '1'
  )

  url.searchParams.set(
    'timezone',
    'America/Manaus'
  )

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      'Erro ao buscar dados meteorológicos'
    )
  }

  return response.json()
}

export function getWeatherDescription(code) {
  const descriptions = {
    0: 'Céu limpo',

    1: 'Principalmente limpo',

    2: 'Parcialmente nublado',

    3: 'Nublado',

    45: 'Neblina',

    48: 'Neblina com geada',

    51: 'Garoa leve',

    53: 'Garoa moderada',

    55: 'Garoa intensa',

    56: 'Garoa congelante leve',

    57: 'Garoa congelante intensa',

    61: 'Chuva leve',

    63: 'Chuva moderada',

    65: 'Chuva forte',

    66: 'Chuva congelante leve',

    67: 'Chuva congelante forte',

    71: 'Neve leve',

    73: 'Neve moderada',

    75: 'Neve forte',

    77: 'Granizo',

    80: 'Pancadas de chuva leves',

    81: 'Pancadas de chuva moderadas',

    82: 'Pancadas de chuva fortes',

    85: 'Pancadas de neve leves',

    86: 'Pancadas de neve fortes',

    95: 'Trovoada',

    96: 'Trovoada com granizo',

    99: 'Trovoada forte com granizo',
  }

  return (
    descriptions[code] ||
    'Condição desconhecida'
  )
}