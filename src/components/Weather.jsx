import {
  getWeatherDescription,
} from '../services/weather'

function Weather({ weather }) {
  if (!weather) {
    return null
  }

  const current =
    weather.current

  const hourly =
    weather.hourly

  const currentHour =
    new Date().getHours()

  const nextHours = []

  for (
    let i = 0;
    i < hourly.time.length;
    i++
  ) {
    const hour =
      new Date(
        hourly.time[i]
      ).getHours()

    if (hour >= currentHour) {
      nextHours.push({
        time: hourly.time[i],

        temperature:
          hourly.temperature_2m[i],

        precipitation:
          hourly.precipitation[i],

        precipitationProbability:
          hourly
            .precipitation_probability[i],

        weatherCode:
          hourly.weather_code[i],
      })
    }

    if (nextHours.length === 6) {
      break
    }
  }

  return (
    <section className="weather-card">

      <div className="weather-header">

        <h2 className="weather-title">
          Clima em Manaus
        </h2>

        <p className="weather-description">
          Condições meteorológicas
          atuais e previsão
        </p>

      </div>

      <div className="weather-content">

        <div className="weather-current">

          <div>

            <div className="weather-temperature">
              {current.temperature_2m}°C
            </div>

            <div className="weather-condition">
              {getWeatherDescription(
                current.weather_code
              )}
            </div>

          </div>

        </div>

        <div className="weather-metrics">

          <div className="weather-metric">

            <span className="weather-metric-label">
              Umidade
            </span>

            <strong className="weather-metric-value">
              {current.relative_humidity_2m}%
            </strong>

          </div>

          <div className="weather-metric">

            <span className="weather-metric-label">
              Precipitação
            </span>

            <strong className="weather-metric-value">
              {current.precipitation} mm
            </strong>

          </div>

          <div className="weather-metric">

            <span className="weather-metric-label">
              Chuva
            </span>

            <strong className="weather-metric-value">
              {current.rain} mm
            </strong>

          </div>

        </div>

        <div className="weather-forecast">

          <h3 className="weather-forecast-title">
            Próximas horas
          </h3>

          <div className="weather-hours">

            {nextHours.map(
              (hour) => (
                <div
                  key={hour.time}
                  className="weather-hour"
                >

                  <span className="weather-hour-time">
                    {new Date(
                      hour.time
                    ).toLocaleTimeString(
                      'pt-BR',
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    )}
                  </span>

                  <div className="weather-hour-temperature">
                    {hour.temperature}°C
                  </div>

                  <div className="weather-hour-condition">
                    {getWeatherDescription(
                      hour.weatherCode
                    )}
                  </div>

                  <div className="weather-hour-rain">
                    Chuva:{' '}
                    {
                      hour.precipitationProbability
                    }%
                  </div>

                </div>
              )
            )}

          </div>

        </div>

      </div>

    </section>
  )
}

export default Weather