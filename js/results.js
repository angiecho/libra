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



function getBras(band, cup, isPregnant, isFeeding, side, front, pain){
  var ul = document.getElementById("results-list");
  console.log("GETTING BRAS FROM URLS")
  if (isPregnant, isFeeding){
    console.log("Maternity Bras")
    axios.get('http://localhost:5000/maternity', {
      params: {
        cup: cup
      }
    })
      .then(function(response){
        if(response.data.length == 0){
            axios.get('http://localhost:5000/bras', {
              params : {
                band: band,
                cup: cup
              }
            }).then(function(response){
              console.log(response.data);
              if(response.data.length == 0){
                window.alert("Sorry there are no bras for you :(");
              }
              else{
                for(var i = 0; i < response.data.length; i++){
                  var curBra = response.data[i];
                  addBra(curBra["BRA_STYLE"], curBra["BRAND"], curBra["BRA_NAME"],
                    curBra["MIN_PRICE"]);
                }
              }
            }).catch(function(error){
              console.log("ERROR:", error);
            });
        }
        console.log(response.data)
        for(var i = 0; i < response.data.length; i++){
          var curBra = response.data[i];
          addBra(curBra["BRA_STYLE"], curBra["BRAND"], curBra["BRA_NAME"],
            curBra["MIN_PRICE"]);
        }
    })
    .catch(function(error){
      console.log("ERROR: ", error);
    });
  }
  else{
      axios.get('http://localhost:5000/bras', {
        params : {
          band: band,
          cup: cup
        }
      }).then(function(response){
        if(response.data.length == 0){
          window.alert("Sorry there are no bras for you :(")
        }
        else{
          for(var i = 0; i < response.data.length; i++){
            var curBra = response.data[i];
            addBra(curBra["BRA_STYLE"], curBra["BRAND"], curBra["BRA_NAME"],
              curBra["MIN_PRICE"]);
          }
        }
      }).catch(function(error){
        console.log("ERROR:", error);
      });
  }
}

function addBra(style, brand, name, price){
  var ul = document.getElementById("results-list");
  var listStart = "<l1>";

  listStart = listStart + "<h2>" + style + "</h2>";
  listStart = listStart + "<h2>" + brand + "</h2>";
  listStart = listStart + "<h2>" + name + "</h2>";
  listStart = listStart + "<h2>" + price + "</h2>";
  listStart += "</l1>";

  $("#results-list").append(listStart);
}

$(document).ready(function(){
  axios.get('http://localhost:5000/test')
  .then(function(response){
    console.log(response)
  }).catch(function(error){
    console.log(error);
  })
  console.log("Getting your bras:")
  axios.get('http://localhost:5000/measurement', {
    params: {
      dbID: dbID
    }
  })
    .then(response=>{
      console.log("RESPONSE", response);
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

  })
  .catch(error => {
    console.log("ERROR", error);
  });

});
