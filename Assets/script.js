// FUNCTION LIST //
// formSubmitHandler - Combines user city and state  into one variable for use in API when submit button is clicked //
// useStored - Checks to see if location already exists in local storage--if so, does not duplicate //
// saveToLocalStorage - Adds search locations to local storage array //
// getLocations - Searches stored in local storage array are added as recent search buttons when page is loaded or refreshed //
// getUserRepos - Fetches apiUrl and apiUrlUv to get forcasts.  Populates daily and 5-day forecast cards //
// clearLocalStorage - Clears local storage when button is selected //


// VARIABLES //
var locationarray = [];
var searchlocation = "";
var savedlocations = [];
var wasbuttonclicked = 0;

// User Input Form //
var usercityEl = document.querySelector("#city");
var userstateEl = document.querySelector("#state");
var submitButtonEl = document.querySelector("#fetch-button");
var clearButtonEl = document.querySelector("#clear-button");
var searchheading1el = document.querySelector("#recent1") // used to hide heading if not in use //
var searchheading2el = document.querySelector("#recent2") // used to hide heading if not in use //

// Daily Forecast //
var forecastcardEl = document.querySelector(".forecastcard"); // used to hide daily forecast card //
var citynameEl = document.querySelector(".forecast");
var currentdateEl = document.querySelector("#currentdate");
var temperatureEl = document.querySelector("#temperature");
var humidityEl = document.querySelector("#humidity");
var windspeedEl = document.querySelector("#windspeed");
var uvindexEl = document.querySelector("#uvindex");

// 5-Day Forecast Cards
var fivedayforecastcardEl = document.querySelector(".fivedayforecastcard"); // used to hide 5-day forecast cards //
var currentdate1El = document.querySelector("#currentdate1");
var currentdate2El = document.querySelector("#currentdate2");
var currentdate3El = document.querySelector("#currentdate3");
var currentdate4El = document.querySelector("#currentdate4");
var currentdate5El = document.querySelector("#currentdate5");

var weathericon1el = document.querySelector("#weathericon1");
var weathericon2el = document.querySelector("#weathericon2");
var weathericon3el = document.querySelector("#weathericon3");
var weathericon4el = document.querySelector("#weathericon4");
var weathericon5el = document.querySelector("#weathericon5");

var temperature1El = document.querySelector("#temperature1");
var temperature2El = document.querySelector("#temperature2");
var temperature3El = document.querySelector("#temperature3");
var temperature4El = document.querySelector("#temperature4");
var temperature5El = document.querySelector("#temperature5");

var windspeed1El = document.querySelector("#windspeed1");
var windspeed2El = document.querySelector("#windspeed2");
var windspeed3El = document.querySelector("#windspeed3");
var windspeed4El = document.querySelector("#windspeed4");
var windspeed5El = document.querySelector("#windspeed5");

var humidity1el = document.querySelector("#humidity1");
var humidity2el = document.querySelector("#humidity2");
var humidity3el = document.querySelector("#humidity3");
var humidity4el = document.querySelector("#humidity4");
var humidity5el = document.querySelector("#humidity5");


// FUNCTIONS //

// Creates searchlocation string from user input //
var formSubmitHandler = function (event) {
  event.preventDefault();
  
  searchlocation = usercityEl.value.trim().toUpperCase() + "," + userstateEl.value.trim().toUpperCase();

  if (searchlocation !==",") { // checks to make sure the city isn't blank //
  
    getUserRepos(searchlocation);

  } else {
      alert('Please try again');
  };
};
// end of formSubmitHandler //

// Searches for a recently searched location when button is clicked //
var useStored = function(event) {
  searchlocation = event.target.getAttribute("value");
  wasbuttonclicked = 1;
  getUserRepos(searchlocation);
}
// end of useStored //

// Saves searchlocations to local storage //
function saveToLocalStorage(searchlocation) {

  if (searchlocation !==",") { // Check to see if user entered data //
  
    for (i = 0; i < locationarray.length; i++) { // Check to see if data entry matches any savedlocations //
      if (searchlocation === locationarray[i]){
        locationarray.splice(i,1);
      };
    };

    locationarray.push(searchlocation); // Save input to local storage locationarray //
    localStorage.setItem("locations", JSON.stringify(locationarray));
  };
};
// end of saveToLocalStorage //
 
// Loads cities from local storage //
// This function significantly influenced by Mila Decker's code located at https://github.com/deckiedevs/weather-dashboard/blob/main/assets/js/script.js //
var getLocations = function() {
  locationarray = JSON.parse(localStorage.getItem("locations"));

  if (!locationarray) {
    locationarray = [];
      return false;
  }

  searchheading1el.classList.remove("hide");
  searchheading2el.classList.remove("hide");
  clearButtonEl.classList.remove("hide");

  var savedlocations = document.querySelector("#savedsearchlist");
  var locationslistUl = document.createElement("ul");
  locationslistUl.className = "list-group savedbutton";
  savedlocations.appendChild(locationslistUl);

  for (var i = 0; i < locationarray.length; i++) {
      var recentcitystate = document.createElement("button");
      recentcitystate.setAttribute("type", "button");
      recentcitystate.className = "list-group-item locbutton";
      recentcitystate.setAttribute("value", locationarray[i]);

      var sep = locationarray[i].split(",");
      recentcitystate.textContent = sep[0] + ", " + sep[1];
      locationslistUl.prepend(recentcitystate);
  }

  var searchedcities = document.querySelector(".savedbutton");
  searchedcities.addEventListener('click', useStored);
};
// end of getLocations //

//Fetch the API that contains today's forecast for the city and state submitted //
var getUserRepos = function (searchlocation) {

  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchlocation + ",US&units=imperial&appid=a35a92d1b4df3733dc350ab5111e30d1"

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          console.log(data.name);

          forecastcardEl.classList.remove("hide");
          fivedayforecastcardEl.classList.remove("hide");

          // Look up Url for appropriate weather icon.png //
          var icon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

          // Add weather icon after city, state then add to card //
          if (wasbuttonclicked==1){
            var searchagain = "";
            var sep1 = searchlocation.split(",");
            searchagain = sep1[0] + ", " + sep1[1];
            citynameEl.innerHTML = searchagain + " <img src=\"" + icon + "\">";

          } else {      
                    
          citynameEl.innerHTML = usercityEl.value.toUpperCase() + ", " + userstateEl.value.toUpperCase() + " <img src=\"" + icon + "\">";
          wasbuttonclicked==0;
          };

          // Add temperature, humidity, and windspeed to card //
          temperatureEl.innerHTML = "Temperature:  " + data.main.temp + " \u00B0F";
          humidityEl.innerHTML = "Humidity:  " + data.main.humidity + "%";
          windspeedEl.innerHTML = "Windspeed:  " + data.wind.speed + " MPH";

          // UV data and badge added below from apiUrlUV //

          // Format date and time of data pull and add to card //
          var timestamp = moment.unix(data.dt);
          currentdateEl.innerHTML = "Last Updated:  " + timestamp.format("MMMM Do YYYY, h:mm:ss a");
          
          // Fetch the apiUrlUV using coordinates from the apiUrl to get the UV and 5-day forcast data //
          var apiUrlUV = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly&units=imperial&appid=a35a92d1b4df3733dc350ab5111e30d1"
          fetch(apiUrlUV)
            .then(function (response) {

              if (response.ok) {
                response.json().then(function (dataUV) {

                  var uvindexnumber = dataUV.current.uvi;
                  uvindexEl.innerHTML = uvindexnumber;
                  

                  // Add and format UV data badge according to severity //
                    switch (true) {

                      case uvindexnumber >= 11:
                        uvindexEl.className = "badge rounded-pill bg-extreme text-light";
                      break;

                      case uvindexnumber >= 8:
                        uvindexEl.className = "badge rounded-pill bg-danger text-light";
                      break;

                      case uvindexnumber >= 6:
                        uvindexEl.className = "badge rounded-pill bg-high text-light";
                      break;

                      case uvindexnumber >= 3:
                        uvindexEl.className = "badge rounded-pill bg-moderate text-dark";
                      break;

                      default:
                        uvindexEl.className = "badge rounded-pill bg-success text-light";
                      break;
                    }

                    console.log(dataUV);

                    var timestamp1 = moment.unix(dataUV.daily[1].dt);
                    currentdate1El.innerHTML =  timestamp1.format("MMMM Do YYYY");
                    var timestamp2 = moment.unix(dataUV.daily[2].dt);
                    currentdate2El.innerHTML =  timestamp2.format("MMMM Do YYYY");
                    var timestamp3 = moment.unix(dataUV.daily[3].dt);
                    currentdate3El.innerHTML =  timestamp3.format("MMMM Do YYYY");
                    var timestamp4 = moment.unix(dataUV.daily[4].dt);
                    currentdate4El.innerHTML =  timestamp4.format("MMMM Do YYYY");
                    var timestamp5 = moment.unix(dataUV.daily[5].dt);
                    currentdate5El.innerHTML =  timestamp5.format("MMMM Do YYYY");

                    // Look up Url for appropriate weather icon.png //
                    var icon1 = "https://openweathermap.org/img/wn/" + dataUV.daily[1].weather[0].icon + "@2x.png";
                    // Add weather icon after city, state then add to card //
                    weathericon1el.innerHTML = "<img src=\"" + icon1 + "\">";

                    // Add temperature, humidity, and windspeed to card //
                    temperature1El.innerHTML = "Temp:  " + dataUV.daily[1].temp.day + " \u00B0F";
                    windspeed1El.innerHTML = "Wind:  " + dataUV.daily[1].wind_speed + " MPH";
                    humidity1el.innerHTML = "Humidity:  " + dataUV.daily[1].humidity + "%";


                    var icon2 = "https://openweathermap.org/img/wn/" + dataUV.daily[2].weather[0].icon + "@2x.png";
                    // Add weather icon after city, state then add to card //
                    weathericon2el.innerHTML = "<img src=\"" + icon2 + "\">";

                    // Add temperature, humidity, and windspeed to card //
                    temperature2El.innerHTML = "Temp:  " + dataUV.daily[2].temp.day + " \u00B0F";
                    windspeed2El.innerHTML = "Wind:  " + dataUV.daily[2].wind_speed + " MPH";
                    humidity2el.innerHTML = "Humidity:  " + dataUV.daily[2].humidity + "%";

                    var icon3 = "https://openweathermap.org/img/wn/" + dataUV.daily[3].weather[0].icon + "@2x.png";
                    // Add weather icon after city, state then add to card //
                    weathericon3el.innerHTML = "<img src=\"" + icon3 + "\">";

                    // Add temperature, humidity, and windspeed to card //
                    temperature3El.innerHTML = "Temp:  " + dataUV.daily[3].temp.day + " \u00B0F";
                    windspeed3El.innerHTML = "Wind:  " + dataUV.daily[3].wind_speed + " MPH";
                    humidity3el.innerHTML = "Humidity:  " + dataUV.daily[3].humidity + "%";

                    var icon4 = "https://openweathermap.org/img/wn/" + dataUV.daily[4].weather[0].icon + "@2x.png";
                    // Add weather icon after city, state then add to card //
                    weathericon4el.innerHTML = "<img src=\"" + icon4 + "\">";

                    // Add temperature, humidity, and windspeed to card //
                    temperature4El.innerHTML = "Temp:  " + dataUV.daily[4].temp.day + " \u00B0F";
                    windspeed4El.innerHTML = "Wind:  " + dataUV.daily[4].wind_speed + " MPH";
                    humidity4el.innerHTML = "Humidity:  " + dataUV.daily[4].humidity + "%";

                    var icon5 = "https://openweathermap.org/img/wn/" + dataUV.daily[5].weather[0].icon + "@2x.png";
                    // Add weather icon after city, state then add to card //
                    weathericon5el.innerHTML = "<img src=\"" + icon5 + "\">";

                    // Add temperature, humidity, and windspeed to card //
                    temperature5El.innerHTML = "Temp.:  " + dataUV.daily[5].temp.day + " \u00B0F";
                    windspeed5El.innerHTML = "Wind:  " + dataUV.daily[5].wind_speed + " MPH";
                    humidity5el.innerHTML = "Humidity:  " + dataUV.daily[5].humidity + "%";

                    saveToLocalStorage(searchlocation);
                });
              } 
            });
        })
      } else {
        alert("Error: " + response.statusText);
      };
    });
};
// end of getUserRepos //

function clearLocalStorage() {
  window.localStorage.clear();
  location.reload();
  clearButtonEl.classList.add("hide")
}


     // EXECUTION //
      getLocations();
      submitButtonEl.addEventListener("click", formSubmitHandler);
      clearButtonEl.addEventListener("click", clearLocalStorage);

// Last Revised 6/08/21 //
// Raemarie Oatman raemarie.oatman@gmail.com //
// Homework Week 6 - 06 Server-Side APIs: Weather Dashboard //