import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import BoxTop from './components/BoxTop';
import BoxMiddle from './components/BoxMiddle';
import BoxBottom from './components/BoxBottom';

function App() {
  console.log('🚀 App 컴포넌트 렌더링 됨');
  let [weather, setWeather]=useState(null);
  let [isLoading, setIsLoading] = useState(true); //로딩용
  let [city, setCity] = useState("");
  let [allWeather, setAllWeather] = useState([]);
  let apiKey = 'b759f620bccb71b6422c30364c1a6460';
  let cities = ['Seoul', 'Busan', 'Jeju City','Yeosu','Gapyeong'];
  let [isDay, setIsDay] = useState(true);
  const cityMapper = {
    Seoul: '서울',
    Incheon: '인천',
    Suwon: '수원',
    Gangneung: '강릉',
    Gwangju: '광주',
    Daegu: '대구',
    Busan: '부산',
    'Jeju City': '제주',
  };
  //초기값
  useEffect(()=>{
    getCurrentLocation();
    getAllCitiesWeather();
  },[])

  //버튼 핸들링
  let handleCityChange = (city) => {
    if(city === 'current'){
      getCurrentLocation()
    } else {
      getWeatherByCity(city)
    }
  }
  //도시 날씨 불러오는 함수
  let getWeatherByCity = async(city) =>{
    setIsLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setCity(city);
    setIsLoading(false);
    if (data.sys) {
      updateTimeOfDay(data.sys.sunrise, data.sys.sunset);
    }
  }
  //현재 위치만 가져오는 함수
  let getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeatherByCurrentLocation(lat, lon);
      },
      (error) => {
        console.error("위치 정보를 가져오지 못했습니다:", error);
        // fallback으로 기본 도시 날씨 로드
        getWeatherByCity("Seoul");
      }
    );
  };
  //현재 위치 기반 날씨를 가져오는 함수
  let getWeatherByCurrentLocation = async (lat, lon) => {
    setIsLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setCity(data.name);
    setIsLoading(false);
    if (data.sys) {
      updateTimeOfDay(data.sys.sunrise, data.sys.sunset);
    }
  }
  //주요 지역 날씨 불러오는 함수
  let getAllCitiesWeather = async () => {
    let cityKeys = Object.keys(cityMapper);
    let weatherData = [];
    for (const city of cityKeys) {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        weatherData.push({ city, data });
        if (response.ok) {
        console.log(`✅ ${city} 날씨 성공`, data);
        weatherData.push({ city, data });
        } else {
          console.error(`❌ ${city} 날씨 실패:`, data);
        }
      } catch (error) {
        console.error(`❌ ${city} 날씨 불러오기 실패:`, error);
      }
    }
    setAllWeather(weatherData);
  };

  //밤, 낮구분 함수
  let checkTimeOfDay = () => {
    let hour = new Date().getHours();
    setIsDay(hour >= 6 && hour < 18); // 오전 6시 ~ 오후 6시까지는 낮
  };

  let updateTimeOfDay = (sunriseUnix, sunsetUnix) => {
    const currentTime = Date.now() / 1000; // 초 단위
    if (currentTime >= sunriseUnix && currentTime < sunsetUnix) {
      setIsDay(true); // 낮
    } else {
      setIsDay(false); // 밤
    }
  };

  return (
    <div className={`weatherWrap ${isDay ? 'day' : 'night'}`}>
      <div className="main-bg"></div>
      <div className="wearherBoxWrap">
      {weather && (
        <>
          <BoxTop weather={weather} cities={cities} />
          <BoxMiddle weather={weather} cities={cities} />
        </>
      )}
      <BoxBottom allWeather={allWeather}/>
      </div>
    </div>
  );
}

export default App;