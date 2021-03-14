const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const appId = '5d85fbd93215e152da931c148ccfb995'
let units = 'metric'
let searchMethod // so we can enter a zip code -- this is be dynamic -- just use zip to set it and see results

// function getSearchMethod(searchTerm) {
//     if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
//         searchMethod = 'zip' 
//     else 
//         // alert('Please Enter a vaild US zip code')
//         searchMethod = 'q'
// }

document.getElementById('generate').addEventListener('click', searchWeather)

function searchWeather(e) {
    e.preventDefault()
 const zipCode = documemt.getElementById("searchInput")
 getSearchWeather(baseURL + zipCode + appid).then(function (resultFromServer){
    let weatherDescription = resultFromServer.weather[0].description
    let temperatureElement = resultFromServer.main.temp
    let humidityElement = resultFromServer.main.humidity
    let windSpeedElement = resultFromServer.wind.speed
    let cityHeader =  resultFromServer.name
    // let weatherIcon = resultFromServer.weather[0].icon + '.png'
    // Post weather details to the server
			postData("/add", {
				temperatureElement,
                humidityElement,
                windSpeedElement,
				cityHeader, 
                weatherIcon,

			}).then(() => {
                updateUI()
            })
})

// function init(resultFromServer) {
//     console.log(resultFromServer)
    // console.log(resultFromServer) this logs the data we get back from the openweather api
    //Here we will parse the JSON data we get back from resultFromServer. We want to grab all of the elements by their id and then set the text inside of it appropriately based on the information we get from the server

    // let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader')
    // let temperatureElement = document.getElementById('temperature')
    // let humidityElement = document.getElementById('humidity')
    // let windSpeedElement = document.getElementById('windSpeed')
    // let cityHeader = document.getElementById('cityHeader')
    // let weatherIcon = document.getElementById('documentIconImg')

    // Post weather details to the server
// 			postData("/add", {
// 				temperatureElement,
//                 humidityElement,
//                 windSpeedElement,
// 				cityHeader	
// 			}).then(() => {
//                 updateUI();
//             });
// }  

/* Function to GET Web API Data*/

const getSearchWeather = async (baseURL, zipCode, appId) => {
	const response = await fetch(baseURL + zipCode + appId);
	try {
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log("error", error);
	}
};

/* Function to POST data */
async function postData(url = "", data = {}) {
	await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
}

async function updateUI() {
	// GET function that takes the info from the server
	const response = await fetch("/all");
	try {
		const lastEntry = await response.json();
		console.log(lastEntry);
        document.getElementById('temperature').innerHTML =  Math.floor(lastEntry.temperatureElement) + ' &#0176' + 'C'
        document.getElementById('humidity').innerHTML = 'Humidity ' + lastEntry.humidityElement + '%'
        document.getElementById('windSpeed').innerHTML = 'Wind Speed ' + Math.floor(lastEntry.windSpeed) + ' m/s'
        document.getElementById('cityHeader').innerHTML = 'City' + lastEntry.city
        document.getElementById('weatherDescription') = lastEntry. weatherDescription
        // weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png'
            let resultDescription = weatherInfoFromApi.weather[0].description
            weatherDesciptionHeader.innerText = resultDescription
           
            cityHeader.innerHTML = resultFromServer.name
            humidityElement
            windSpeedElement.innerHTML = 'Wind Speed ' + Math.floor(resultFromServer.wind.speed) + ' m/s'
		
	} catch (error) {
		console.log("Error", error);
	}
}

     
	

//     weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png'

//     let resultDescription = resultFromServer.weather[0].description
//     weatherDesciptionHeader.innerText = resultDescription
//     temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + ' &#0176' + 'C'
//     cityHeader.innerHTML = resultFromServer.name
//     humidityElement.innerHTML = 'Humidity ' + resultFromServer.main.humidity + '%'
//     windSpeedElement.innerHTML = 'Wind Speed ' + Math.floor(resultFromServer.wind.speed) + ' m/s'
// }

//Set up the search button add event listener for when the search button is click
// document.getElementById('generate').addEventListener('click', () => {
//     let searchTerm = document.getElementById('searchInput').value
//     if(searchTerm) {
//         searchWeather(searchTerm)
//     }
// }