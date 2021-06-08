// FUNCTION LIST //
// formSubmitHandler - when submit button is clicked, gets user city and state and combines into one variable for use in API //
// getUserRepos - Fetches apiUrl and apiUrlUv to get forcasts.  Populates forecast cards.
// addlocationbutton - //


// VARIABLES //
var locationarray = [];
var usercityEl = document.querySelector("#city");
var userstateEl = document.querySelector("#state");
var submitButtonEl = document.querySelector("#fetch-button");
var citynameEl = document.querySelector(".forecast"); // used to add city name and weather icon to daily forecast card //
var currentdateEl = document.querySelector("#currentdate");
var temperatureEl = document.querySelector("#temperature");
var humidityEl = document.querySelector("#humidity");
var windspeedEl = document.querySelector("#windspeed");
var uvindexEl = document.querySelector("#uvindex");
var forecastcardEl = document.querySelector(".forecastcard"); // used to hide daily forecast card //
var fivedayforecastcardEl = document.querySelector(".fivedayforecastcard");
var currentdate1El = document.querySelector("#currentdate1");
var currentdate2El = document.querySelector("#currentdate2");
var currentdate3El = document.querySelector("#currentdate3");
var currentdate4El = document.querySelector("#currentdate4");
var currentdate5El = document.querySelector("#currentdate5");
var weathericon1EL = document.querySelector("#weathericon1");
var weathericon2EL = document.querySelector("#weathericon2");
var weathericon3EL = document.querySelector("#weathericon3");
var weathericon4EL = document.querySelector("#weathericon4");
var weathericon5EL = document.querySelector("#weathericon5");
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
var humidity1EL = document.querySelector("#humidity1");
var humidity2EL = document.querySelector("#humidity2");
var humidity3EL = document.querySelector("#humidity3");
var humidity4EL = document.querySelector("#humidity4");
var humidity5EL = document.querySelector("#humidity5");
var searchlocation = "";
/*  */
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');


// FUNCTIONS //

// Creates searchlocation string from user input //
var formSubmitHandler = function (event) {
  event.preventDefault();

  searchlocation = usercityEl.value.trim() + "," + userstateEl.value.trim();

  if (searchlocation !==",") { // checks to make sure the city isn't blank //
  
/*     for (i = 0; i < locationarray.length; i++) {
      if (searchlocation === locationarray[i]){
        locationarray.splice(i,1);
      };
    }; */

    getUserRepos(searchlocation);

/*     locationarray.push(searchlocation);
    localStorage.setItem("locations", JSON.stringify(locationarray)); */
  

  } else {
      alert('Please try again');
  };
};
// end of formSubmitHandler //



// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function savetolocalstorage(searchlocation) {

  if (searchlocation !==",") { // checks to make sure the city isn't blank //
  
    for (i = 0; i < locationarray.length; i++) {
      if (searchlocation === locationarray[i]){
        locationarray.splice(i,1);
      };
    };

    locationarray.push(searchlocation);
    localStorage.setItem("locations", JSON.stringify(locationarray));
  };
};
 



/* var savedsearchedlocation = function(searchlocation){
console.log(savedsearchlocation);
  for (i = 0; i < locationarray.length; i++) {
    if (searchlocation === locationarray[i]){
      locationarray.splice(i,1);
    } else {
      locationarray.push(searchlocation);
      localStorage.setItem("locations", JSON.stringify(locationarray));
    }
  }
} */




/* // Saves locations into local storage //
var savelocation = function(searchlocation) {

   // Prevents duplicate city from being saved and moves it to end of array
  for (var i = 0; i < locationarray.length; i++) {
      if (searchlocation === locationarray[i]) {
          locationarray.splice(i, 1);
      }
  }
  locationarray.push(searchlocation);
  localStorage.setItem("locations", JSON.stringify(locationarray));
}


// loads cities from local storage
var getlocations = function() {
  locationarray = JSON.parse(localStorage.getItem("searchlocation"));

  if (!locationarray) {
    locationarray = [];
      return false;
/*   } else if (locationarray.length > 5) {
      // saves only the five most recent cities
      locationarray.shift();
  }
}

  var savedlocations = document.querySelector("#savedsearchlist");
  var locationslistUl = document.createElement("li");
  locationslistUl.className = "list-group savedlocations";
  savedlocations.appendChild(locationslistUl);

  for (var i = 0; i < locationarray.length; i++) {
      var recentcitystate = document.createElement("button");
      recentcitystate.setAttribute("type", "button");
      recentcitystate.className = "list-group-item";
      recentcitystate.setAttribute("value", locationarray[i]);
      recentcitystate.textContent = toUpperCase(locationarray[i]);
      locationlistUl.appendChild(recentcitystate);
  } */







var getUserRepos = function (searchlocation) {

  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + searchlocation + ",US&units=imperial&appid=a35a92d1b4df3733dc350ab5111e30d1"

  //Fetch the API that contains today's forecast for the city and state submitted //
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
          citynameEl.innerHTML = usercityEl.value.toUpperCase() + ", " + userstateEl.value.toUpperCase() + " <img src=\"" + icon + "\">";

          // Add temperature, humidity, and windspeed to card //
          temperatureEl.innerHTML = "Temperature:  " + data.main.temp + " \u00B0F";
          humidityEl.innerHTML = "Humidity:  " + data.main.humidity + "%";
          windspeedEl.innerHTML = "Windspeed:  " + data.wind.speed + " MPH";

          // UV data and badge added below from apiUrlUV //

          // Format date and time of data pull and add to card //
          var timestamp = moment.unix(data.dt);
          currentdateEl.innerHTML = "Last Updated:  " + timestamp.format("MMMM Do YYYY, h:mm:ss a");
          
          // Fetch the apiUrlUV using coordinates from the apiUrl to get the UV and 5-day forcast data //
          var apiUrlUV = "http://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly&units=imperial&appid=a35a92d1b4df3733dc350ab5111e30d1"
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
                    weathericon1EL.innerHTML = "<img src=\"" + icon1 + "\">";

                    // Add temperature, humidity, and windspeed to card //
                    temperature1El.innerHTML = "Temp.:  " + dataUV.daily[1].temp.day + " \u00B0F";
                    windspeed1El.innerHTML = "Wind:  " + dataUV.daily[1].wind_speed + " MPH";
                    humidity1EL.innerHTML = "Humidity:  " + dataUV.daily[1].humidity + "%";


                    var icon2 = "https://openweathermap.org/img/wn/" + dataUV.daily[2].weather[0].icon + "@2x.png";
                    // Add weather icon after city, state then add to card //
                    weathericon2EL.innerHTML = "<img src=\"" + icon2 + "\">";

                    // Add temperature, humidity, and windspeed to card //
                    temperature2El.innerHTML = "Temp.:  " + dataUV.daily[2].temp.day + " \u00B0F";
                    windspeed2El.innerHTML = "Wind:  " + dataUV.daily[2].wind_speed + " MPH";
                    humidity2EL.innerHTML = "Humidity:  " + dataUV.daily[2].humidity + "%";

                    var icon3 = "https://openweathermap.org/img/wn/" + dataUV.daily[3].weather[0].icon + "@2x.png";
                    // Add weather icon after city, state then add to card //
                    weathericon3EL.innerHTML = "<img src=\"" + icon3 + "\">";

                    // Add temperature, humidity, and windspeed to card //
                    temperature3El.innerHTML = "Temp.:  " + dataUV.daily[3].temp.day + " \u00B0F";
                    windspeed3El.innerHTML = "Wind:  " + dataUV.daily[3].wind_speed + " MPH";
                    humidity3EL.innerHTML = "Humidity:  " + dataUV.daily[3].humidity + "%";

                    var icon4 = "https://openweathermap.org/img/wn/" + dataUV.daily[4].weather[0].icon + "@2x.png";
                    // Add weather icon after city, state then add to card //
                    weathericon4EL.innerHTML = "<img src=\"" + icon4 + "\">";

                    // Add temperature, humidity, and windspeed to card //
                    temperature4El.innerHTML = "Temp.:  " + dataUV.daily[4].temp.day + " \u00B0F";
                    windspeed4El.innerHTML = "Wind:  " + dataUV.daily[4].wind_speed + " MPH";
                    humidity4EL.innerHTML = "Humidity:  " + dataUV.daily[4].humidity + "%";

                    var icon5 = "https://openweathermap.org/img/wn/" + dataUV.daily[5].weather[0].icon + "@2x.png";
                    // Add weather icon after city, state then add to card //
                    weathericon5EL.innerHTML = "<img src=\"" + icon5 + "\">";

                    // Add temperature, humidity, and windspeed to card //
                    temperature5El.innerHTML = "Temp.:  " + dataUV.daily[5].temp.day + " \u00B0F";
                    windspeed5El.innerHTML = "Wind:  " + dataUV.daily[5].wind_speed + " MPH";
                    humidity5EL.innerHTML = "Humidity:  " + dataUV.daily[5].humidity + "%";

                    savetolocalstorage(searchlocation);
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



      var displayRepos = function (repos, searchTerm) {
        if (repos.length === 0) {
          repoContainerEl.textContent = 'No repositories found.';
          return;
        }

        repoSearchTerm.textContent = searchTerm;

        for (var i = 0; i < repos.length; i++) {
          var repoName = repos[i].owner.login + '/' + repos[i].name;

          var repoEl = document.createElement('div');
          repoEl.classList = 'list-item flex-row justify-space-between align-center';

          var titleEl = document.createElement('span');
          titleEl.textContent = repoName;

          repoEl.appendChild(titleEl);

          var statusEl = document.createElement('span');
          statusEl.classList = 'flex-row align-center';

          if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
              "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
          } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
          }

          repoEl.appendChild(statusEl);

          repoContainerEl.appendChild(repoEl);
        }
      };
    

     // EXECUTION //

      submitButtonEl.addEventListener('click', formSubmitHandler);