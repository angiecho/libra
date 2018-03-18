/** Survey JSON **/
var surveyjson ={
    elements: [
      {
       type: "dropdown",
       name: "question1",
       title: "Describe your pain",
       choices: [

       ]
      },
      {
       type: "rating",
       name: "question2",
       visibleIf: "{question1} notempty",
       title: "Rate your pain"
      }
    ],
 showNavigationButtons: false,
 showPrevButton: false,
 showCompletedPage: false,
 pagePrevText: "Back",
 pageNextText: "Next",
 completeText: "Done!",
 isSinglePage: true
}

Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-green";
Survey.Survey.cssType = "bootstrap";

window.survey = new Survey.Model(surveyjson);

survey.onComplete.add(function(result) {
	document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});

survey.loadingHtml = "Loading...";
survey.showQuestionNumbers = "off";
console.log(survey.loadingHtml);

$("#surveyElement").Survey({
  model: survey
});

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
          lastSaved = false;
          survey.loadSurveyFromService ("8d8cf707-1e87-4512-9a81-10881b937c3a");
          break;
        case 'underboob':
          lastSaved = false;
          survey.loadSurveyFromService ("756949ad-c882-4439-a930-325cd2f62e68");
          break;
        default:
          vals = ['Please select an area of pain on the image above'];
          break;
        }
    }

  });

});
