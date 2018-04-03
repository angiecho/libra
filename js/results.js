var url_string = window.location.href;
var url = new URL(url_string);
var dbID = url.searchParams.get("dbID");

var age;
var isPregnant;
var isFeeding;
var wasPregnant;
var band;
var cup;
var side;
var front;
var pain;

var resultsCount = 0;

var ul = document.getElementById("dynamic-list");

function getBras(band, cup, isPregnant, isFeeding, side, front, pain){
  if (isPregnant, isFeeding){
    console.log("Maternity Bras")
    axios.get('/maternity', {
      params: {
        cup: cup
      }
    })
      .then(function(response){
        console.log(response.data)
        resultsCount = resultsCount + response.data.length;
    });
  }
  axios.get('/bras', {
    params: {
      band: band,
      cup: cup
    }
  })
    .then(function(response){
      console.log(response.data);
      resultsCount = resultsCount + response.data.length;
    });
    if (resultsCount = 0)
      console.log ("Sorry, doesn't seem like we have anything in our database for you yet! Leave your email and we'll let you know when something comes up.")
}


$(document).ready(function(){
  console.log("Getting your bras:")
  axios.get('/measurement', {
    params: {
      dbID: dbID
    }
  })
    .then(response=>{
      age = response.data[0].age_range;
      isPregnant = response.data[0].isPregnant;
      isFeeding = response.data[0].isFeeding;
      wasPregnant = response.data[0].wasPregnant;
      band = response.data[0].band;
      cup = response.data[0].cup;
      side = response.data[0].side;
      front = response.data[0].front;
      pain = response.data[0].pain;

      getBras(band, cup, isPregnant, isFeeding, side, front, pain);

  });

});
