var longEl = "";
var latEl = "";
var longitude ="";
var latitude = ""


var fetchButton = document.getElementById("fetch-button");
console.log("hello");
clicked();

 function clicked(){
  console.log("clicked");
  getApi();
  
/*   getApi1(); */
}

function getApi() {
  console.log("getApi()");
  var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?q=43019&units=imperial&appid=a35a92d1b4df3733dc350ab5111e30d1'
  var requestUrlUV = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latEl+'&lon=${longitude}&appid=a35a92d1b4df3733dc350ab5111e30d1'


  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      response.json().then(function(data){
        console.log(data);
        console.log(data.main.temp + "*F");
        console.log(data.wind.speed + " MPH");
        console.log(data.main.humidity + "%");
        console.log(data.coord.lon+": Longitude");
        console.log(data.coord.lat+": Latitude");
        var longitude = data.coord.lon;
        var latitude = data.coord.lat;
        console.log(latitude);
/*         console.log (requestUrlUV); */
 

    })



/*         console.log(data.temp);
        console.log(data.description);  
 */
  /*      for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = data[i].html_url;
        repoList.appendChild(listItem);
      }
  }); */
  });
}

function getApi1(){
  var requestUrlUV = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude +'&lon='+ longitude +'&appid=a35a92d1b4df3733dc350ab5111e30d1'

    fetch(requestUrl)
      .then(function (response) {
        console.log(response);
        response.json().then(function(data1){
          console.log(data1);

      });
      });
}

/*fetchButton.addEventListener('click', clicked) */