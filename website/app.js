// require('dotenv').config();

// const apiKey = `${process.env.OPEN_WHEATHER_API_KEY}&units=imperial`;
// const apiKey = `${process.env.OPEN_WHEATHER_API_KEY}`;
const apiKey = ''
let city = '';
let limit = 1;


function performAction(e){
  // check if user input is empty, if so, use default city 
  let currentCity = document.getElementById('cityName').value !== '' ? city = document.getElementById('cityName').value : city = 'Tokyo';
  // console.log(currentCity);

  const getGeoEncodingWeatherAndUpdateUI =  async () =>{
    const latAndLonArray = await getGeoEncoding();
    const dataWeather = await getWeatherDataWithGeoData(latAndLonArray);
    updateUI(dataWeather);
  };

  getGeoEncodingWeatherAndUpdateUI();
};


const getGeoEncoding = async () => {
  geoEncodingURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`;
  // console.log(geoEncodingURL);
  const res = await fetch(geoEncodingURL)
  try {
    const dataGeoEncoding = await res.json();
    const {lat, lon} = dataGeoEncoding[0];
    // console.log(lat, lon);
    return latAndLon = [lat, lon];

  } catch(error) {
    console.log("error", error);

  }
}


const getWeatherDataWithGeoData = async (latAndLon)=> {

  const [lat, lon] = latAndLon;
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  // console.log(weatherURL);
  
    const res = await fetch(weatherURL)
    try {
      const dataWeather = await res.json();
      // console.log(dataWeather);
      return dataWeather;
    } catch (error) {
      console.log('error', error);
    }
  };
  

  const updateUI =  (weatherObject) => {
    try{
      // document.getElementById('date').innerHTML = weatherObject[0].animal;
      document.getElementById('temp').innerHTML = `It is ${weatherObject.main.temp} Fahrenheit in ${city}`;
      // document.getElementById('userResponse').innerHTML = weatherObject[0].fav;
  
    }catch(error){
      console.log("error", error);
    }
  }

  // Add event listeners to buttons
  document.getElementById('fetchWeatherButton').addEventListener('click', performAction);
  // document.getElementById('postEntryButton').addEventListener('click', getInput);