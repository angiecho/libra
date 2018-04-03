var pains = {};
var painsCount = 0;
var area = "";

var url_string = window.location.href;
var url = new URL(url_string);
var dbID = url.searchParams.get("id");
console.log(dbID);

/** Survey JSON **/
var surveyjson ={
    elements: [
      {
       type: "dropdown",
       name: "question1",
       title: "Describe your pain",
       choices: []
      }
    ],
 showNavigationButtons: false,
 showPrevButton: false,
 showCompletedPage: false,
 pagePrevText: "Back",
 pageNextText: "Next",
 completeText: "Done!",
 isSinglePage: true
};

Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-green";
Survey.Survey.cssType = "bootstrap";

window.survey = new Survey.Model(surveyjson);

survey.onComplete.add(function(result) {
	//document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
  pains[painsCount]= {};
  pains[painsCount].id = painsCount;
  pains[painsCount].area = area;
  pains[painsCount].pain = result.data.question1;
  pains[painsCount].rate = result.data.question2;
  //addPain(pains[painsCount]);
  var ul = document.getElementById("dynamic-list");
  var newPain = document.getElementById("painsTemplate").content.cloneNode(true);
  var listElem = newPain.querySelector('.painsList');
  newPain.querySelector('.painArea').innerText = pains[painsCount].area;
  newPain.querySelector('.painName').innerText = pains[painsCount].pain;
  newPain.querySelector('.painRate').innerText = pains[painsCount].rate;
  $(newPain.querySelector('.removePain')).click(function(e){
    $(listElem).remove();
  });
  //newPain.querySelector('.removePain').onClick = function() {removePain()};
  //console.log(newPain.querySelector('.removePain').onClick);
  ul.appendChild(newPain);
  painsCount++;

  survey.clear();
  survey.render();


});

survey.loadingHtml = "Loading...";
survey.showQuestionNumbers = "off";

$("#surveyElement").Survey({
  model: survey
});

$('#completeSizing').click(function(e){
  console.log("Generate Results");
  axios.post('/completeSizing', {pains: pains, dbID: dbID})
    .then(function(response){
      console.log(response.data);
      window.location.href = '/sizingresult.html?dbID=' + dbID;
    });

})

/*******************************/
var lastClicked;
var lastSaved = false;
$('.painpoint').each(function () {

  $(this).click(function () {
    if ($(this).attr('clicked') == 'true'){
      //$(this).removeClass('no-hover');
      //$(this).attr('clicked', 'false');
    }

    else {
      $(this).addClass('no-hover');
      $(this).attr('clicked','true');
      if (lastSaved == false){
        $(lastClicked).removeClass('no-hover');
        $(lastClicked).attr('clicked', 'false');
        $('#'+ $(lastClicked).attr('id') + 'Point').hide();

      }
      lastClicked = this;
      $('#'+ $(this).attr('id') + 'Point').show();

      var $painselector = $("#pain-selector");
      var key = $(this).attr('id');

      switch(key){
        case 'shoulder':
        case 'shoulder2':
        case 'shoulder3':
        case 'shoulder4':
          lastSaved = false;
          survey.loadSurveyFromService ("8d8cf707-1e87-4512-9a81-10881b937c3a");
          survey.showNavigationButtons = "true";
          area = "Shoulders:";
          break;
        case 'underboob':
          lastSaved = false;
          survey.loadSurveyFromService ("756949ad-c882-4439-a930-325cd2f62e68");
          survey.showNavigationButtons = "true";
          area = "Underboob:";
          break;
        case 'neck':
          lastSaved = false;
          survey.loadSurveyFromService ("339815d1-5a86-4ee0-8eb4-3189d4304498");
          survey.showNavigationButtons = "true";
          area = "Neck:";
          break;
        case 'back':
          lastSaved = false;
          survey.loadSurveyFromService ("97e9fe64-344d-49a2-ac23-26f413ead714");
          survey.showNavigationButtons = "true";
          area = "Back:";
          break;
        case 'collar':
          lastSaved = false;
          survey.loadSurveyFromService ("9694c7a6-80f8-414d-a84a-5cb1cacf0733");
          survey.showNavigationButtons = "true";
          area = "Collar:";
          break;
        default:
          vals = ['Please select an area of pain on the image above'];
          break;
        }
    }
  });
});
