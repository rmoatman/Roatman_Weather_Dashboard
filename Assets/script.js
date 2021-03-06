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

  if (searchlocation !== ",") { // checks to make sure the city isn't blank //

    getUserRepos(searchlocation);

  } else {
    alert('Please try again');
  };
};
// end of formSubmitHandler //

// Searches for a recently searched location when button is clicked //
var useStored = function (event) {
  searchlocation = event.target.getAttribute("value");
  wasbuttonclicked = 1;
  getUserRepos(searchlocation);
}
// end of useStored //

// Saves searchlocations to local storage //
function saveToLocalStorage(searchlocation) {

  if (searchlocation !== ",") { // Check to see if user entered data //

    for (i = 0; i < locationarray.length; i++) { // Check to see if data entry matches any savedlocations //
      if (searchlocation === locationarray[i]) {
        locationarray.splice(i, 1);
      };
    };

    locationarray.push(searchlocation); // Save input to local storage locationarray //
    localStorage.setItem("locations", JSON.stringify(locationarray));
  };
};
// end of saveToLocalStorage //

// Loads cities from local storage //
// This function significantly influenced by Mila Decker's code located at https://github.com/deckiedevs/weather-dashboard/blob/main/assets/js/script.js //
var getLocations = function () {
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

          var locationslistUl = document.querySelector("#savedsearchlist");
          locationslistUl.className = "list-group savedbutton";

          var recentcitystate = document.createElement("button");
          recentcitystate.setAttribute("type", "button");
          recentcitystate.className = "list-group-item locbutton";
          recentcitystate.setAttribute("value", searchlocation);

          var sep = searchlocation.split(",");
          recentcitystate.textContent = sep[0] + ", " + sep[1];

          // Check to see if local storage exists, if not add current search location to local storage //
          if(localStorage.getItem("locations") === null) {
            locationslistUl.prepend(recentcitystate);
            var newlocation = [];
            newlocation.push(searchlocation);
            localStorage.setItem("locations", JSON.stringify(newlocation));
          } else {
            var locationsa = JSON.parse(localStorage.getItem("locations"))
            if(locationsa.indexOf(searchlocation) === -1) {
                locationslistUl.prepend(recentcitystate);
                locationsa.push(searchlocation);
                localStorage.setItem("locations", JSON.stringify(locationsa));
              }
          };

          var recentlysearchedcity = document.querySelector(".savedbutton");
          recentlysearchedcity.addEventListener('click', useStored);

          forecastcardEl.classList.remove("hide");
          fivedayforecastcardEl.classList.remove("hide");

          // Look up Url for appropriate weather icon.png //
          var icon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

          // Add weather icon after city, state then add to card //
          if (wasbuttonclicked == 1) {
            var searchagain = "";
            var sep1 = searchlocation.split(",");
            searchagain = sep1[0] + ", " + sep1[1];
            citynameEl.innerHTML = searchagain + " <img src=\"" + icon + "\">";
          } else {
            citynameEl.innerHTML = usercityEl.value.toUpperCase() + ", " + userstateEl.value.toUpperCase() + " <img src=\"" + icon + "\">";
            wasbuttonclicked == 0;
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

                  // Look up Url for appropriate weather icon.png //
                  // Add weather icon after city, state then add to card //
                  // Add temperature, humidity, and windspeed to card //

                  var elementobj = {
                    1: [weathericon1el, temperature1El, windspeed1El, humidity1el, currentdate1El],
                    2: [weathericon2el, temperature2El, windspeed2El, humidity2el, currentdate2El],
                    3: [weathericon3el, temperature3El, windspeed3El, humidity3el, currentdate3El],
                    4: [weathericon4el, temperature4El, windspeed4El, humidity4el, currentdate4El],
                    5: [weathericon5el, temperature5El, windspeed5El, humidity5el, currentdate5El]
                  }

                  for(var i = 1; i < 6; i++) {
                    var timestamp = moment.unix(dataUV.daily[i].dt);
                    elementobj[i][4].innerHTML = timestamp.format("MMMM Do YYYY");
                    var icon = "https://openweathermap.org/img/wn/" + dataUV.daily[i].weather[0].icon + "@2x.png";                    
                    elementobj[i][0].innerHTML = "<img src=\"" + icon + "\">";
                    elementobj[i][1].innerHTML = "Temp:  " + dataUV.daily[i].temp.day + " \u00B0F";
                    elementobj[i][2].innerHTML = "Wind:  " + dataUV.daily[i].wind_speed + " MPH";
                    elementobj[i][3].innerHTML = "Humidity:  " + dataUV.daily[i].humidity + "%";
                  }
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
};


// EXECUTION //
getLocations();
submitButtonEl.addEventListener("click", formSubmitHandler);
clearButtonEl.addEventListener("click", clearLocalStorage);

// Last Revised 6/08/21 //
// Raemarie Oatman raemarie.oatman@gmail.com //
// Homework Week 6 - 06 Server-Side APIs: Weather Dashboard //