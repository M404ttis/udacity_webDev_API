// const dotenv = require('dotenv').config();
// require('dotenv').config();

// const apiKey = `${process.env.OPEN_WHEATHER_API_KEY}&units=imperial`;
// const apiKey = `${process.env.OPEN_WHEATHER_API_KEY}`;
const apiKey = '75f585b70ff23db9d3c8d4f79efbd4ac'
let city = '';
let limit = 1;
let geoEncodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city='Tokyo'}&limit=${limit}&appid=${apiKey}`;

// console.log(geoEncodingURL);

document.getElementById('fetchWheatherButton').addEventListener('click', performAction);

function performAction(e){
  // check if user input is empty, if so, use default city 
  document.getElementById('cityName').value !== '' ? city = document.getElementById('cityName').value : city = 'Tokyo';
  // getGeoEncoding(geoEncodingURL);
  getWheatherData();
}

function getWheatherData(){
  getGeoEncoding()
  .then(
    getWheatherDataWithGeoData()
  )
};

const getGeoEncoding = async (geoEncodingURL)=> {
  const res = await fetch(geoEncodingURL)
  try {
    const dataGeoEncoding = await res.json();
    const {name, lat, lon} = dataGeoEncoding[0];
    // console.log(dataGeoEncoding);
    console.log(`name: ${name}, lat: ${lat}, lon: ${lon}`);
    return name, lat, lon;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

// let wheatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city='Tokyo'}&appid=${apiKey}`;


const getWheatherDataWithGeoData = async (lat, lon)=> {
  let wheatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}`;
  
    const res = await fetch(wheatherURL)
    try {
      const dataWheather = await res.json();
      console.log(dataWheather);
      return dataWheather;
    } catch (error) {
      console.log('error', error);
    }
  };
  
  // const updateUI = async () => {
  //   const request = await fetch('/wheather');
  //   try{
  //     const allData = await request.json();
  //     document.getElementById('date').innerHTML = allData[0].animal;
  //     document.getElementById('temp').innerHTML = allData[0].facts;
  //     document.getElementById('userResponse').innerHTML = allData[0].fav;
  
  //   }catch(error){
  //     console.log("error", error);
  //   }
  // }
