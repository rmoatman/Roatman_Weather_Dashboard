var usercityEl = document.querySelector("#city");
var userstateEl = document.querySelector("#state");
var submitButtonEl = document.querySelector("#fetch-button");
var weathericonEl = document.querySelector("#weathericon");


/*  */
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');




var formSubmitHandler = function (event) {
  event.preventDefault();

  console.log("formSubmitHandler");
  var searchlocation = usercityEl.value.trim() + "," + userstateEl.value.trim();

  if (searchlocation) {
    getUserRepos(searchlocation);

    /*     repoContainerEl.textContent = '';
        userzip.value = ''; */
  } else {
    alert('Please try again');
  }
};







/* var buttonClickHandler = function (event) {
  var language = event.target.getAttribute('data-language');

  if (language) {
    getFeaturedRepos(language);

    repoContainerEl.textContent = '';
  }
}; */











var getUserRepos = function (searchlocation) {

  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + searchlocation + ",US&units=imperial&appid=a35a92d1b4df3733dc350ab5111e30d1"

  //Fetch the API that contains today's forecast for the city and state submitted //
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          console.log(data.name);

          var timestamp = moment.unix(1622924403);
          console.log(timestamp.format("MM/DD/YY"));

          var icon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
          weathericonEl.innerHTML = "<img src=\"" + icon + "\">";
          console.log(icon);

          console.log(data.main.temp + "*F");
          console.log(data.main.humidity + "%");
          console.log(data.wind.speed + " MPH");

          console.log(data.coord.lon + ": Longitude");
          console.log(data.coord.lat + ": Latitude");

          // Fetch the API using coordinates that contains the UV data //
          var apiUrlUV = "http://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=minutely,hourly&units=imperial&appid=a35a92d1b4df3733dc350ab5111e30d1"
          fetch(apiUrlUV)
            .then(function (response) {

              if (response.ok) {
                response.json().then(function (dataUV) {
                  console.log(dataUV);
                  console.log(dataUV.current.uvi + ": UV Index");
                });
              } 
            });
        })
      } else {
        alert("Error: " + response.statusText);
      };
    });
  };

    
    








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
    

     
      submitButtonEl.addEventListener('click', formSubmitHandler);



//don't forget to add to favorites//



/*   var apiUrl = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",US&units=imperial&appid=a35a92d1b4df3733dc350ab5111e30d1" */
/* var nameInputEl = document.querySelector('#username'); */
/* zipButtonEl.addEventListener('click', buttonClickHandler); */
          /* //Fetch the API for the 5-Day Forecast //
          var apiUrl5D = "https://api.openweathermap.org/data/2.5/onecall?" + searchlocation + ",US&exclude=minutely,hourly&cnt=5&units=imperial&appid=a35a92d1b4df3733dc350ab5111e30d1"
          fetch(apiUrl5D)
            .then(function (response) {
        
              if (response.ok) {
                response.json().then(function (data5D) {
                  console.log(data5D);
                });
              };
            }); */

