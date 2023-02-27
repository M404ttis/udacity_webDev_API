// require('dotenv').config();

// const apiKey = `${process.env.OPEN_WHEATHER_API_KEY}&units=imperial`;
// const apiKey = process.env.OPEN_WHEATHER_API_KEY;
// console.log(apiKey);
const apiKey = '75f585b70ff23db9d3c8d4f79efbd4ac'
let city = '';
let limit = 1;


function performAction(e){
  let currentCity = document.getElementById('cityName').value;

  const getGeoEncodingWeatherAndUpdateUI =  async () =>{
    if (currentCity === ''){
      document.getElementById('temp').innerHTML = `We need a city name to get the weather`
      document.getElementById('date').innerHTML = `Date is: ${getCurrentDate()}`;
      postData('http://localhost:8080/add', {date: getCurrentDate(), temp: '', content: document.getElementById('entry').value});
    } else{
      const latAndLonArray = await getGeoEncoding(currentCity);
      const dataWeather = await getWeatherDataWithGeoData(latAndLonArray);
      postData('http://localhost:8080/add', {date: getCurrentDate(), temp: dataWeather, content: document.getElementById('entry').value});
      updateUI(dataWeather);
    }
  };

  getGeoEncodingWeatherAndUpdateUI();
};


const getGeoEncoding = async (currentCity) => {
  // let currentCity = document.getElementById('cityName').value;
  geoEncodingURL = `https://api.openweathermap.org/geo/1.0/direct?q=${currentCity}&limit=${limit}&appid=${apiKey}`;
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
      temp = dataWeather.main.temp
      // return dataWeather;
      return temp;
    } catch (error) {
      console.log('error', error);
    }
  };
  

// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// TODO-Call Function
// postData('/add', {animal:'lion'})



const updateUI =  (temp) => {
    let currentCity = document.getElementById('cityName').value;

  try{
    document.getElementById('date').innerHTML = `Date is: ${getCurrentDate()}`;
    document.getElementById('temp').innerHTML = `It is ${temp} Fahrenheit in ${currentCity}`;
    
  }catch(error){
    console.log("error", error);
  }
}

// Helper functions
const getCurrentDate = () => {
  let d = new Date();
  let newDate = d.getDate()+'/'+ d.getMonth()+'/'+ d.getFullYear();
  return newDate;
}

const updateUserInput = () => {
  let entry = document.getElementById('entry').value;
  if (entry === '') {
    document.getElementById('userResponse').innerHTML = `You didn't enter anything`;
  } else {
    document.getElementById('userResponse').innerHTML = `It seems you feel ${entry}`;
  }
}


  // Add event listeners to buttons
  document.getElementById('fetchWeatherButton').addEventListener('click', performAction);
  document.getElementById('postEntryButton').addEventListener('click', performAction);