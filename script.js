let input = document.querySelector("input");

let h1 = document.querySelector("#location");

let btn = document.querySelector("#search-btn");

let icon = document.querySelector("#icon");

let wther_type = document.querySelector("#weather-type");

let temp = document.querySelector("#tempreture");

let max_temp = document.querySelector("#max-temp");

let min_temp = document.querySelector("#min-temp");

let humidity = document.querySelector("#humidity");

let wind_speed = document.querySelector("#wind-speed");

let wind_deg = document.querySelector("#w-deg");

let feels_like = document.getElementById("feels-like");

let pressure = document.getElementById("pressure");

let grnd_level = document.getElementById("ground-level");

let sea_level = document.getElementById("sea-level");

let sunrise = document.getElementById("sunrise");

let sunset = document.getElementById("sunset");

let wind_degrees = document.getElementById("wind-degrees");

let zero = document.getElementsByClassName("information");



const getTime = (seconds) => {
    let milliseconds = seconds * 1000;
    let Date_ojt = new Date(milliseconds);
    let indiaDate = Date_ojt.toLocaleString("en-IN");
    return indiaDate;
}

let url = "https://api.openweathermap.org/data/2.5/weather?q=";

const app_key = "&appid=dab055fc7d66c0732a70e1bd9d41d5b7";

const getweatherdata = async (city) => {

    let response = await fetch(url + city + app_key);

    let data = await response.json();

    console.log(data);

    if (data.cod === "404") {

        h1.innerText = data.message.toUpperCase();
        h1.style.color = 'red';

        feels_like.innerText = '0';
        pressure.innerText = '0';
        sea_level.innerText = '0';
        grnd_level.innerText = '0';
        sunrise.innerText = '0';
        sunset.innerText = '0';
        wind_degrees.innerText = '0';

        wther_type.setAttribute('class', 'hidden');
        icon.setAttribute('class', 'hidden');

        temp.innerText = '0';
        humidity.innerText = '0';
        wind_speed.innerText = '0';
        max_temp.innerText = 'max temp';
        min_temp.innerText = 'min temp';
        wind_deg.innerText = '';

    }

    else {

        h1.innerText = `Weather for ${data.name.toUpperCase()}`;
        h1.style.color = 'white';


        let image = data.weather[0].icon;

        icon.src = `https://openweathermap.org/payload/api/media/file/${image}.png`;

        wther_type.innerText = data.weather[0].description;

        temp.innerText = Math.round(data.main.temp - 273.15);

        max_temp.innerText = `Max temp: ${Math.round(data.main.temp_max - 273.15)}`;
        min_temp.innerText = `Min temp: ${Math.round(data.main.temp_min - 273.15)}`;

        humidity.innerText = Math.round(data.main.humidity);

        wind_speed.innerHTML = Math.round(data.wind.speed);

        wind_deg.removeAttribute('class');

        wnd_direction = data.wind.deg;

        if (wnd_direction >= 348.75 || wnd_direction <= 11.25) {
            wind_deg.innerText = "North";
        }
        else if (wnd_direction >= 11.25 && wnd_direction <= 33.75) {
            wind_deg.innerText = "North to North-East";
        }
        else if (wnd_direction >= 33.75 && wnd_direction <= 56.25) {
            wind_deg.innerText = "North-East";
        }
        else if (wnd_direction >= 56.25 && wnd_direction <= 78.75) {
            wind_deg.innerText = "North-East to East";
        }
        else if (wnd_direction >= 78.75 && wnd_direction <= 101.25) {
            wind_deg.innerText = "East";
        }
        else if (wnd_direction >= 101.25 && wnd_direction <= 123.75) {
            wind_deg.innerText = "East to South-East";
        }
        else if (wnd_direction >= 123.75 && wnd_direction <= 146.25) {
            wind_deg.innerText = "South-East";
        }
        else if (wnd_direction >= 146.25 && wnd_direction <= 168.75) {
            wind_deg.innerText = "South-East to South";
        }
        else if (wnd_direction >= 168.75 && wnd_direction <= 191.25) {
            wind_deg.innerText = "South";
        }
        else if (wnd_direction >= 191.25 && wnd_direction <= 213.75) {
            wind_deg.innerText = "South to South-West";
        }
        else if (wnd_direction >= 213.75 && wnd_direction <= 236.25) {
            wind_deg.innerText = "South-West";
        }
        else if (wnd_direction >= 236.25 && wnd_direction <= 258.75) {
            wind_deg.innerText = "South-West to West";
        }
        else if (wnd_direction >= 258.75 && wnd_direction <= 281.25) {
            wind_deg.innerText = "West";
        }
        else if (wnd_direction >= 281.25 && wnd_direction <= 303.75) {
            wind_deg.innerText = "West to North-West";
        }
        else if (wnd_direction >= 303.75 && wnd_direction <= 326.25) {
            wind_deg.innerText = " North-West";
        }
        else if (wnd_direction >= 326.25 && wnd_direction <= 348.75) {
            wind_deg.innerText = "North West to North";
        }

        feels_like.innerText = `${Math.round(data.main.feels_like - 273.15)}°C`;

        pressure.innerText = `${Math.round(data.main.pressure * 0.0145038)} PSI`;

        grnd_level.innerText = `${data.main.grnd_level} hPa`;

        sea_level.innerText = `${data.main.sea_level} hPa`;

        rise_time = data.sys.sunrise;
        set_time = data.sys.sunset;

        sunrise.innerText = `${getTime(rise_time)}`;

        sunset.innerText = `${getTime(set_time)}`;

        wind_degrees.innerText = `${data.wind.deg}°`;

    }
}

btn.addEventListener("click", () => {


    let name = input.value;

    if (name) {

        getweatherdata(name);

        icon.removeAttribute("class");
        wther_type.removeAttribute("class");

    }
    else {
        alert('Please enter a city name');
    }
})


// Enter key event listener
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        let name = input.value;

        if (name) {

            icon.removeAttribute("class");

            h1.innerText = `Weather for ${name.toUpperCase()}`;

            wther_type.removeAttribute("class");


            getweatherdata(name);
        } else {
            alert("Please enter a city name");
        }
    }
})