var surveyjson = {
 completedHtml: "Redirecting",
 pages: [
  {
   name: "Intro",
   elements: [
    {
     type: "html",
     name: "question1",
     html: "<p style=\" text-align:center;\"> Thanks for your interest in Libra's sizing service!</p>\n<p style=\" text-align:center;\"> Please be advised that the current system is still undergoing major tests and improvements. </p>"
    }
   ]
  },
  {
   name: "General Info",
   elements: [
    {
     type: "dropdown",
     name: "age",
     title: "What is your age range?",
     isRequired: true,
     choices: [
      {
       value: "1",
       text: "18 ~29"
      },
      {
       value: "2",
       text: "30~40"
      },
      {
       value: "3",
       text: "40~50"
      },
      {
       value: "4",
       text: "50~60"
      },
      {
       value: "5",
       text: "60<"
      }
     ]
    },
    {
     type: "checkbox",
     name: "maternity",
     title: "Please choose all that apply",
     isRequired: false,
     choices: [
      {
       value: "isPregnant",
       text: "Pregnant"
      },
      {
       value: "isFeeding",
       text: "Currently Breast-Feeding"
      },
      {
       value: "wasPregnant",
       text: "Previously pregnant and/or have breast-fed"
      }
     ]
    },
    {
     type: "matrixdropdown",
     title: "What is your bra size?",
     name: "size",
     isRequired: false,
     columns: [
      {
        title: "Band Size",
        name: "band",
        cellType: "dropdown",
        isRequired: true,
       choices: [
        "30",
        "32",
        "34",
        "36",
        "38",
        "40",
        "42",
        "44",
        "46"
       ]
      },
      {
        title: "Cup Size",
        name: "cup",
        cellType: "dropdown",
        isRequired: true,
       choices: [
        "AA",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G"
       ]
      }
     ],
     rows: [
      "row1"
     ]
    },
    {
     type: "matrixdropdown",
     name: "Please measure the following in cm",
     columns: [
      {
       name: "chest",
       title: "Chest girth",
       cellType: "dropdown",
       isRequired: true,
       choices: [
        "68-72",
        "73-77",
        "73-77",
        "78-82",
        "83-87",
        "88-92",
        "93-97",
        "98-102",
        "103-107"
       ]
      },
      {
       name: "l_breast_rad",
       title: "Left breast radius",
       cellType: "dropdown",
       isRequired: true,
       choices: [
        "7.5",
        "8",
        "8.5",
        "9",
        "9.5",
        "10",
        "10.5",
        "11",
        "11.5",
        "12",
        "12.5",
        "13"
       ]
      },
      {
       name: "r_breast_rad",
       title: "Right breast radius",
       cellType: "dropdown",
       isRequired: true,
       choices: [
        "7.5",
        "8",
        "8.5",
        "9",
        "9.5",
        "10",
        "10.5",
        "11",
        "11.5",
        "12",
        "12.5",
        "13"
       ]
      }
     ],
     choices: [
      "item1"
     ],
     rows: [
      {
       value: "breast_size",
       text: "Please select:"
      }
     ]
    }
   ]
  },
  {
   name: "Side View",
   elements: [
    {
     type: "radiogroup",
     name: "choosesideview.",
     title: "Which shape are your breasts?",
     isRequired: true,
     choices: [
      {
       value: "Standard",
       text: " ![Standard](images/sideboob/standard.jpg =100x129)"
      },
      {
       value: "Swooping",
       text: " ![Swooping](images/sideboob/swooping.jpg =100x129)"
      },
      {
       value: "Sagging",
       text: " ![Sagging](images/sideboob/sagging.jpg =100x129)"
      },
      {
       value: "Petite",
       text: " ![Petite](images/sideboob/petite.jpg =100x129)"
      },
      {
       value: "Tubular",
       text: " ![Tubular](images/sideboob/tubular.jpg =100x129)"
      },
      {
       value: "Pigeon",
       text: " ![Pigeon](images/sideboob/pigeon.jpg =100x129)"
      }
     ],
     colCount: 2
    }
   ]
  },
  {
   name: "Front View",
   elements: [
    {
     type: "radiogroup",
     name: "chooseseparation.",
     title: "Which image best represents the separation of your breasts?",
     isRequired: true,
     choices: [
      {
       value: "Separated",
       text: " ![Separated](images/separation/separated.jpg =403x151)"
      },
      {
       value: "Splayed",
       text: " ![Splayed](images/separation/splayed.jpg =403x151)"
      },
      {
       value: "Touching",
       text: " ![Touching](images/separation/touching.jpg =403x151)"
      },
      {
       value: "Wideset",
       text: " ![Wideset](images/separation/wideset.jpg =403x151)"
      }
     ]
    }
   ]
  }
 ],
 pagePrevText: "Back",
 pageNextText: "Next",
 completeText: "Next",
 showQuestionNumbers: "off"
}

Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
Survey.defaultBootstrapCss.matrixdynamic.button = "btn btn-green";
Survey.Survey.cssType = "bootstrap";

var survey = new Survey.Model(surveyjson);
var measurementID;

survey.onComplete.add(function(result) {
  console.log(result.data);

  axios.post('/sizing2', result.data)
    .then(function(response){
      measurementID = response.data[0]["LAST_INSERT_ID()"];
      console.log(response.data[0]);
      window.location.href = "./sizing2.html?id=" + measurementID;
    });
	 //document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
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
