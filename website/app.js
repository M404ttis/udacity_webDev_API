const baseUrlZip = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiValue = "&appid=";
const apiKey = "75f585b70ff23db9d3c8d4f79efbd4ac";
// let city = "";
// let limit = 1;

function performAction(e) {
  let zip = document.getElementById("zipName").value;
  let entry = document.getElementById("entry").value;
  console.log(zip);

  const getWeatherAndUpdateUI = async () => {
    if (zip === "") {
      document.getElementById(
        "temp"
      ).innerHTML = `We need a ZIP to get the weather`;
      document.getElementById(
        "date"
      ).innerHTML = `Date is: ${getCurrentDate()}`;
      postData("add", {
        date: getCurrentDate(),
        temp: "",
        content: entry,
      });
      updateUserInput();
    } else {
      // const latAndLonArray = await getGeoEncoding(currentCity);
      // const dataWeather = await getWeatherDataWithGeoData(latAndLonArray);
      const dataZipWeather = await getZipWeather(zip);
      postData("add", {
        date: getCurrentDate(),
        temp: dataZipWeather,
        content: entry,
      });
      updateUI(dataZipWeather);
    }
  };
  getWeatherAndUpdateUI();
  // getGeoEncodingWeatherAndUpdateUI();
}

const getZipWeather = async (zip) => {
  const res = await fetch(baseUrlZip + zip + apiValue + apiKey);
  try {
    const data = await res.json();
    console.log(data);
    temp = data.main.temp;
    return temp;
  } catch (error) {
    console.log("error", error);
  }
};
// const getGeoEncoding = async (currentCity) => {
//   geoEncodingURL = `https://api.openweathermap.org/geo/1.0/direct?q=${currentCity}&limit=${limit}&appid=${apiKey}`;
//   const res = await fetch(geoEncodingURL);
//   try {
//     const dataGeoEncoding = await res.json();
//     const { lat, lon } = dataGeoEncoding[0];
//     return (latAndLon = [lat, lon]);
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// const getWeatherDataWithGeoData = async (latAndLon) => {
//   const [lat, lon] = latAndLon;
//   let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

//   const res = await fetch(weatherURL);
//   try {
//     const dataWeather = await res.json();
//     temp = dataWeather.main.temp;
//     return temp;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const updateUI = (temp) => {
  let zip = document.getElementById("zipName").value;

  try {
    document.getElementById("date").innerHTML = `Date is: ${getCurrentDate()}`;
    document.getElementById(
      "temp"
    ).innerHTML = `It is ${temp} Fahrenheit at ZIP ${zip}`;
    updateUserInput();
  } catch (error) {
    console.log("error", error);
  }
};

// Helper functions
const getCurrentDate = () => {
  let d = new Date();
  let newDate = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
  return newDate;
};

const updateUserInput = () => {
  let entry = document.getElementById("entry").value;
  if (entry === "") {
    document.getElementById(
      "userResponse"
    ).innerHTML = `You didn't enter anything`;
  } else {
    document.getElementById(
      "userResponse"
    ).innerHTML = `It seems you feel ${entry}`;
  }
};

// Add event listeners to buttons
document
  .getElementById("fetchWeatherButton")
  .addEventListener("click", performAction);
document
  .getElementById("postEntryButton")
  .addEventListener("click", performAction);
