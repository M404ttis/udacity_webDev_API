// const dotenv = require('dotenv').config();
// require('dotenv').config();

// const apiKey = `${process.env.OPEN_WHEATHER_API_KEY}&units=imperial`;
// const apiKey = `${process.env.OPEN_WHEATHER_API_KEY}`;
const apiKey = ''
let city = '';
let limit = 1;
// let latitude = 0;
// let longitude = 0;
// let geoEncodingURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`;
// let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

// console.log(geoEncodingURL);

document.getElementById('fetchWeatherButton').addEventListener('click', performAction);

function performAction(e){
  // check if user input is empty, if so, use default city 
  let currentCity = document.getElementById('cityName').value !== '' ? city = document.getElementById('cityName').value : city = 'Tokyo';
  console.log(currentCity);
  getWeatherData()
  // .then(updateUI(weatherData)); 

  // getGeoEncoding()
  // .then(getWeatherDataWithGeoData())
  // .then(() => console.log('end'))
  // getGeoEncoding()
  // .then((longitude, latitude) => getWeatherDataWithGeoData(longitude, latitude))
  // .then(console.log('now we need to update the UI'))
}

const getWeatherData = async function() {
  const latAndLon = await getGeoEncoding();
  console.log(latAndLon);
  const weatherObject = await getWeatherDataWithGeoData(latAndLon);
  // .then(updateUI());
  };
  
  const getGeoEncoding = async () => {
    geoEncodingURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`;
  console.log(geoEncodingURL);
  const res = await fetch(geoEncodingURL)
  try {
    const dataGeoEncoding = await res.json();
    const {lat, lon} = dataGeoEncoding[0];
    // console.log(dataGeoEncoding);
    // console.log(name, lat, lon);
    // console.log(`inside function getgeoEncoding name: ${name}, lat: ${lat}, lon: ${lon}`);
    
    
    console.log(lat, lon);
    // latitude = lat, 
    // longitude = lon;
    // console.log(latitude, longitude);
    return latAndLon = [lat, lon];

  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

// let weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city='Tokyo'}&appid=${apiKey}`;


const getWeatherDataWithGeoData = async (latAndLon)=> {
  // console.log(latAndLon);
  const [lat, lon] = latAndLon;
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  console.log(weatherURL);
  
    const res = await fetch(weatherURL)
    try {
      const dataWeather = await res.json();
      console.log(dataWeather);
      return dataWeather;
    } catch (error) {
      console.log('error', error);
    }
  };
  
  // const updateUI = async (weatherObject) => {
  //   // console.log(weatherObject);
  //   // const request = await fetch('/weather');
  //   try{
  //     // const weatherObject = await request.json();
  //     // document.getElementById('date').innerHTML = weatherObject[0].animal;
  //     document.getElementById('temp').innerHTML = weatherObject.main.temp;
  //     // document.getElementById('userResponse').innerHTML = weatherObject[0].fav;
  
  //   }catch(error){
  //     console.log("error", error);
  //   }
  // }
  const updateUI = async (weatherObject) => {
    const request = await weatherObject;
    try{
      console.log(weatherObject);
      console.log('hi');
      console.log(weatherObject.main.temp);
      // const weatherObject = await request.json();
      // document.getElementById('date').innerHTML = weatherObject[0].animal;
      // document.getElementById('temp').innerHTML = weatherObject.main.temp;
      // document.getElementById('userResponse').innerHTML = weatherObject[0].fav;
  
    }catch(error){
      console.log("error", error);
    }
  }

  // const updateUI = (data) => { console.log('hi'); console.log(data) };