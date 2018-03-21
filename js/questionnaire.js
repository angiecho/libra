var json ={
 pages: [
  {
   name: "page1",
   elements: [
    {
     type: "matrixdropdown",
     name: "What is your bra size?",
     //isRequired: true,
     columns: [
      {
       name: "Band Size",
       cellType: "dropdown",
       //isRequired: true,
       choices: [
        "30",
        "32",
        "34",
        "36",
        "38",
        "40"
       ]
      },
      {
       name: "Cup Size",
       cellType: "dropdown",
       //isRequired: true,
       choices: [
        "AA",
        "A",
        "B",
        "C",
        "D",
        "E"
       ]
      }
     ],
     rows: [
      "Row 1"
     ]
    }
   ]
  },
  {
   name: "page2",
   elements: [
    {
     type: "radiogroup",
     name: "choosesideview.",
     title: "Which shape are your breasts?",
     "choices": [
        {
            "value": "Standard",
            "text": " ![Standard](images/sideboob/standard.jpg =100x129)"
        }, {
            "value": "Swooping",
            "text": " ![Swooping](images/sideboob/swooping.jpg =100x129)"
        }, {
            "value": "Sagging",
            "text": " ![Sagging](images/sideboob/sagging.jpg =100x129)"
        }, {
            "value": "Petite",
            "text": " ![Petite](images/sideboob/petite.jpg =100x129)"
        }, {
            "value": "Tubular",
            "text": " ![Tubular](images/sideboob/tubular.jpg =100x129)"
        }, {
            "value": "Pigeon",
            "text": " ![Pigeon](images/sideboob/pigeon.jpg =100x129)"
        }
      ],
      colCount: 2
    }
   ]
  },
  {
   name: "page3",
   elements: [
    {
     type: "radiogroup",
     name: "chooseseparation.",
     title: "Which image best represents the separation of your breasts?",
     "choices": [
        {
            "value": "Separated",
            "text": " ![Separated](images/separation/separated.jpg =403x151)"
        }, {
            "value": "Splayed",
            "text": " ![Splayed](images/separation/splayed.jpg =403x151)"
        }, {
            "value": "Touching",
            "text": " ![Touching](images/separation/touching.jpg =403x151)"
        }, {
            "value": "Wideset",
            "text": " ![Wideset](images/separation/wideset.jpg =403x151)"
        }
      ]
    }
   ]
  }
 ],
 pagePrevText: "Back",
 pageNextText: "Next",
 completeText: "Done!"
};

Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-green";
Survey.Survey.cssType = "bootstrap";

var survey = new Survey.Model(json);

survey.onComplete.add(function(result) {
	document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});

var converter = new showdown.Converter();
survey
    .onTextMarkdown
    .add(function (survey, options) {
        //convert the mardown text to html
        var str = converter.makeHtml(options.text);
        //remove root paragraphs <p></p>
        str = str.substring(3);
        str = str.substring(0, str.length - 4);
        //set html
        options.html = str;
    });

$("#surveyElement").Survey({
  model: survey
});
