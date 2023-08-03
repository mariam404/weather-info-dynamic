
let form = document.getElementById('form1')
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const errorF = document.getElementById("error");
const locationF = document.getElementById("location");
const forecastF = document.getElementById("forcast");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    weatherFunction();
    console.log(document.getElementById("address").value);
    form.reset();
  });
  // async --> function return promise
  const weatherFunction = async () => {
    try {
      const address = document.getElementById("address").value;
      const res = await fetch("http://localhost:3000/Weather?address=" + address);
      const data = await res.json();
      console.log(data);
      if (data.error) {
        error.innerText = data.error;
        locationF.innerText = "";
        latitude.innerText = "";
        forecastF.innerText = "";
        } else {
            setTimeout(() => {
                locationF.innerText = `Location: ${data.location}`;
            }, 500);
            setTimeout(() => {
                latitude.innerText = `Latitude: ${data.latitude}` ;
            }, 1000);
            setTimeout(() => {
                longitude.innerText = `Longitude: ${data.longtitude}`;
            }, 1500);
            setTimeout(() => {
                forecastF.innerText = `Forecast: ${data.forecast}`;
            }, 2000);          
        error.innerText = "";
        }
    } catch (error) {
        error.innerText = error;
    }
};
