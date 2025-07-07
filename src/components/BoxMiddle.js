import React from 'react'
import './style/meddleStyle.css'

const BoxMiddle = ({weather, cities}) => {
  console.log('박스중간',weather,cities)
  if (!weather || !weather.main) return <div>데이터 로딩중...</div>;
  return (
    <div className='infoWrap'>
      <div className="infoItem">
        <i class="bi bi-thermometer-half"></i>
        <h3 className='num'>{Math.round(weather.main.feels_like)}°</h3>
        <h6>체감온도</h6>
      </div>
      <div className="infoItem">
        <i class="bi bi-droplet-fill"></i>
        <h3 className='num'>{Math.round(weather.main.humidity)}%</h3>
        <h6>습도</h6>
      </div>
      <div className="infoItem">
        <i class="bi bi-wind"></i>
        <h3 className='num'>{Math.round(weather.wind.speed)}km/h</h3>
        <h6>풍속</h6>
      </div>
    </div>
  )
}

export default BoxMiddle
