const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".city-inp");
const card = document.querySelector(".card");

const apikey = "6ccea3cca1ce920caa465abf439b3d51";

weatherForm.addEventListener("click", async event => {
    event.preventDefault ();
    const city = cityInput.value;

    if (city){
        try {
            const weatherData = await getWeatherData (city)
            displayWeatherInfo (weatherData);

        }catch (err){
            console.error ("err");
            displayError("Typing Error");
        }

    }else {
        displayError("Please Enter a City");
    }
});

async function getWeatherData (city){ 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const res = await fetch (apiUrl);
   // console.log (res);  

    if (!res) {
        throw new error ("Could not fetch weather data");
    }

    return await res.json ();

}

function displayWeatherInfo (data){
   // console.log (data);
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement ("h1");
    const tempDisplay = document.createElement ("p");
    const humidityDisplay = document.createElement ("p");
    const descDisplay = document.createElement ("p");
    const weatherEmoji = document.createElement ("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C `;
    humidityDisplay.textContent = `Humidity : ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji (id);

    cityDisplay.classList.add ("cityDisplay");
    tempDisplay.classList.add ("tempDisplay");
    humidityDisplay.classList.add ("humidityDisplay");
    descDisplay.classList.add ("desDisplay");
    weatherEmoji.classList.add ("weatherEmoji");


    card.appendChild (cityDisplay);
    card.append (tempDisplay);
    card.appendChild (tempDisplay);
    card.appendChild (humidityDisplay);
    card.appendChild (descDisplay);
    card.appendChild (weatherEmoji);

};

function getWeatherEmoji (weatherId){
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌦️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "☁️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 800 && weatherId < 810):
            return "🌤️";
        default:
            return "❓"   
    }

};

function displayError (message){
    const displayError = document.createElement ("p");
    displayError.textContent = message;
    displayError.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild (displayError);
};