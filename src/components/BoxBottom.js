import React from 'react'
import './style/bottomStyle.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
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

const BoxBottom = ({allWeather}) => {
  console.log('박스하단',allWeather)
  const cityMapper = {
    Seoul: '서울',
    Incheon: '인천',
    'Suwon-si': '수원',
    Gangneung: '강릉',
    Gwangju: '광주',
    Daegu: '대구',
    Busan: '부산',
    'Jeju City': '제주',
  };
  const changeIcon = {
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
    const removeDuplicates = (arr) => {
      const seen = new Set();
      return arr.filter(item => {
      const cityName = item.data.name;
      if (seen.has(cityName)) return false;
      seen.add(cityName);
      return true;
      });
    };
  const uniqueWeather = React.useMemo(() => removeDuplicates(allWeather), [allWeather]);
  return (
    <div className='bottomWarp'>
      <h2>주요 지역 날씨</h2>
      <Swiper
  className="localWeather"
  spaceBetween={30}
  slidesPerView={3}
>
  {uniqueWeather.map(({ data }, index) => {
          if (!data || !data.main || !data.weather || !data.weather[0]) return null;

          const cityName = cityMapper[data.name] || data.name;
          const temp = Math.round(data.main.temp);
          const tempfeel = Math.round(data.main.feels_like);
          const iconCode = data.weather[0].icon;
          const weatherIcon = changeIcon[iconCode] || null;

          return (
            <SwiperSlide key={index} className="localItem">
              <h5>
                <i className="bi bi-geo-alt-fill"></i> {cityName}
              </h5>
              <div className="itemImg">
                {weatherIcon && <img src={weatherIcon} alt="weather_icon" />}
              </div>
              <div className="tempWrap">
                <h4 className='num temp'>{temp}°</h4>
                <h4 className='num'>{tempfeel}°</h4>
              </div>
            </SwiperSlide>
          );
        })}
</Swiper>

    </div>
  )
}

export default BoxBottom
