// API Variables
var coffeeWord;
var queryURL;

// DOM Variables
var $gifImg;
var $favoritesDiv = $("#favorites");
var $buttonsDiv = $("#dump-btns");
var $gifsDiv = $("#dump-gifs");
var $userInput = $("#user-input");
var $submitBtn = $("#submit-btn");

// Array Variables
var topics = [
  "cappuccino",
  "latte",
  "coffee mugs",
  "starbucks",
  "frappuccino",
  "latte art",
  "pumpkin spice",
  "coffee beans",
  "cafe",
  "caffeine"
];
var favTopics = [];

// This function creates the initial set of buttons on the page
function makeButtons() {
  $buttonsDiv.empty();
  for (var i = 0; i < topics.length; i++) {
    var $button = $("<button>")
      .attr({
        class: "topic-buttons",
        id: topics[i],
        "data-name": topics[i],
        draggable: "true",
        ondragstart: "drag(event)"
      })
      .text(topics[i]);
    $button.click(function() {
      coffeeWord = $(this).attr("data-name");
      queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        coffeeWord +
        "&limit=10&api_key=b9zNodUCVLZxeqWrmUupgRDDfjhFoh0x";
      displayGifs();
    });
    $buttonsDiv.append($button);
  }
}

// This function is used for displaying the GIFS onto the page
function displayGifs() {
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $gifsDiv.empty(); // Prevent Duplicate Creations
    for (var i = 0; i < 10; i++) {
      let count = i; // Closure Variable
      var results = response.data;
      var animateUrl = results[i].images.fixed_height.url;
      var stillUrl = results[i].images.fixed_height_still.url;
      let myurl = results[i].images.fixed_height.url; // Closure Variable

      // Creating a new <div>
      var $newDiv = $("<div>")
        .css("position", "relative")
        .addClass("gif-formatting");

      // Creating the images for the gifs
      $gifImg = $("<img>");
      $gifImg.attr({
        src: stillUrl,
        alt: "Animated Gif of Coffee",
        class: "gif-resizing",
        id: "giffeeNumber_" + count
      });

      // Creating the download icons for the gifs
      var $downloadIcon = $("<a>")
        .attr("id", "download-formatting")
        .click(function() {
          downloadResource(myurl);
        });

      // Creating the playback icons for the gifs
      var $playbackBtn = $("<i>")
        .attr({
          class: "far fa-play-circle",
          "data-state": "still",
          "data-still": stillUrl,
          "data-animate": animateUrl,
          id: "playback-formatting"
        })
        // Function for animating the gifs on click
        .click(function() {
          var $state = $(this).attr("data-state");
          var $animate = $(this).attr("data-animate");
          var $still = $(this).attr("data-still");
          var $designatedGif = $("#giffeeNumber_" + count);

          if ($state === "still") {
            $designatedGif.attr("src", $animate);
            $(this).attr("data-state", "animated");
            $(this)
              .removeClass("fa-play-circle")
              .addClass("fa-pause-circle");
          } else {
            $designatedGif.attr("src", $still);
            $(this).attr("data-state", "still");
            $(this)
              .removeClass("fa-pause-circle")
              .addClass("fa-play-circle");
          }
        });

      $newDiv.append($gifImg);
      $downloadIcon.append($("<i>").addClass("fas fa-download"));
      $newDiv.append($downloadIcon).append($playbackBtn);
      $gifsDiv.append($newDiv);
    }
  });
}

// This function cleans up the user input.
function formatUserInput() {
  var userInput = $userInput
    .val()
    .toLowerCase()
    .trim();
  return userInput;
}

// This function allows the user to create a new button.
function userCreatesButton() {
  $submitBtn.click(function(e) {
    e.preventDefault();
    if (
      formatUserInput() !== "" &&
      !topics.includes(formatUserInput()) &&
      !favTopics.includes(formatUserInput())
    ) {
      var topic = formatUserInput();
      topics.push(topic);
      makeButtons();
    }
  });
}

// Drag & Drop Functions
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.currentTarget.appendChild(document.getElementById(data));
  // Everytime an item is dropped into the favorites section, this for loop
  // checks the button ids in that section and removes it from the topics array
  // if there is a match.
  for (
    var i = 0;
    i < document.getElementById("favorites").childNodes.length;
    i++
  ) {
    if (
      topics.includes(document.getElementById("favorites").childNodes[i].id)
    ) {
      topics.splice(
        topics.indexOf(document.getElementById("favorites").childNodes[i].id),
        1
      );
      favTopics.push(document.getElementById("favorites").childNodes[i].id);
    }
  }
}

// These workaround functions below force the download on the gifs
function forceDownload(blob, filename) {
  var a = document.createElement("a");
  a.download = filename;
  a.href = blob;
  a.click();
}

// Current blob size limit is around 500MB for browsers
function downloadResource(url, filename) {
  if (!filename)
    filename = url
      .split("\\")
      .pop()
      .split("/")
      .pop();
  fetch(url, {
    headers: new Headers({
      Origin: location.origin
    }),
    mode: "cors"
  })
    .then(response => response.blob())
    .then(blob => {
      let blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, filename);
    })
    .catch(e => console.error(e));
}

// Function Calls
makeButtons();
userCreatesButton();
