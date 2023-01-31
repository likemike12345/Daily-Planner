$(document).ready(function () {
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

  /* This object stores tasks as strings so they can be retrieved them from local storage */
  var tasksObj = JSON.parse(localStorage.getItem("tasksObj")) || {
      "9": "",
      "10": "",
      "11": "",
      "12": "",
      "13": "",
      "14": "",
      "15": "",
      "16": "",
      "17": ""
  };

  /* This forloop retrives the tasks (taskObj) from the object and returns them to "textarea" on refresh of the page */
  for (var i = 0; i < 9; i++) {
      console.log(tasksObj[i + 9]);
      console.log($(`#${i + 9}`).find(".description").text(loadTxt));
      var loadTxt = tasksObj[i + 9];
      $(`#${i + 9}`).find(".description").text(loadTxt);
  };

  /* The realtime time and day gathered from moment.js so that the app knows what day it is*/
  var currentDay = $("#currentDay");

  /* Gives the format in which the date should be shown */
  currentDay.text(moment().format('dddd, MMMM Do YYYY'));

  var currentHour = parseInt(moment().format('H'));

  console.log(currentHour);

  /* Stores tasks to local storage */
  function storeTasks() {
      localStorage.setItem("tasksObj", JSON.stringify(tasksObj));
  };

  /* This function styles the rows according to the time. This allows the app to figure out which tense the information is being entered relative to what time of the day it is from the moment.js */
  function styleTasks() {

      $(".row-info").each(function () {
          var elementHour = parseInt(($(this).attr("id")));
          
          if (elementHour < currentHour) {
              $(this).addClass("past");
          }
          else if (elementHour === currentHour) {
              $(this).addClass("present");
          }
          else {
              $(this).addClass("future");

          };
      });
  };


  console.log(tasksObj);

  /* Click event to populate the tasksObj with text input from the textarea */ 
  $("button").on("click", function () {
      // get id
      console.log($(this).parent().attr("id"));
      var taskId = $(this).parent().attr("id");

      // get textarea input
      var textInput = $(this).parent().find("textarea");
      textInput.val();
      console.log(textInput.val());

      // populate the obj in the background
      console.log("my tasks: ", tasksObj);

      tasksObj[taskId] = textInput.val();

      // trigger a save function 
      storeTasks();
  });

  styleTasks();

});