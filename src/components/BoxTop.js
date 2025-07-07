import React from 'react'
import './style/topStyle.css'
import img01d from './images/01d.png';
import img01n from './images/01n.png';
import img02d from './images/02d.png';
import img02n from './images/02n.png';
import img03 from './images/03.png';
import img04 from './images/04.png';
import img09 from './images/09.png';
import img10d from './images/10d.png';
import img10n from './images/10n.png';
import img11d from './images/11d.png';
import img11n from './images/11n.png';
import img13 from './images/01n.png';
import img50 from './images/01n.png';

const BoxTop = ({weather, cities}) => {
  console.log('날씨',weather)
  const cityMapper = {
    Seoul: '서울',
    Daejeon: '대전',
    Incheon: '인천',
    Suwon: '수원',
    Gangneung: '강릉',
    Gwangju: '광주',
    Daegu: '대구',
    Busan: '부산',
    Jeju_City: '제주',
  };
  // weather.name이 존재하면 해당 이름 매핑
  let cityName = cityMapper[weather?.name] || weather?.name || '도시 정보 없음';
  const changeIcon= {
    '01d': img01d,
    '02d': img02d,
    '03d': img03,
    '04d': img04,
    '09d': img09,
    '10d': img10d,
    '11d': img11d,
    '13d': img13,
    '50d': img50,
    '01n': img01n,
    '02n': img02n,
    '03n': img03,
    '04n': img04,
    '09n': img09,
    '10n': img10n,
    '11n': img11n,
    '13n': img13,
    '50n': img50,
  };
  let weatherIcon = changeIcon[weather?.weather[0]?.icon] || null;
  if (!weather || !weather.main) return <div>데이터 로딩중...</div>;
  return (
    <div className='boxTop'>
      <h2>
        <i class="bi bi-geo-alt-fill"></i>
        {cityName}
      </h2>
      <div className="topTemp">
        <h1 className='num'>{Math.round(weather.main.temp)}°</h1>
        <div className="topImg">
          <img src={weatherIcon} alt="img" />
        </div>
        <div className='maxMinTemp'>
          <h3 className='num'>↑{Math.round(weather.main.temp_max)}°</h3>
          <h3 className='num'>/</h3>
          <h3 className='num'>↓{Math.round(weather.main.temp_min)}°</h3>
        </div>
      </div>
    </div>
  )
}

export default BoxTop
