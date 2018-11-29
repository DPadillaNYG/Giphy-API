// API KEY b9zNodUCVLZxeqWrmUupgRDDfjhFoh0x
// http://api.giphy.com/v1/gifs/search?q=coffee&limit=1&api_key=b9zNodUCVLZxeqWrmUupgRDDfjhFoh0x

var coffeeWord;
var queryURL;
var $gifImg;

var $favoritesDiv = $("#favorites");
var $buttonsDiv = $("#dump-btns");
var $gifsDiv = $("#dump-gifs");
var $userInput = $("#user-input");
var $submitBtn = $("#submit-btn");
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
      .addClass("topic-buttons")
      .attr("data-name", topics[i])
      .attr("draggable", "true")
      .attr("ondragstart", "drag(event)")
      .attr("id", topics[i])
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
    $gifsDiv.empty();
    for (var i = 0; i < 10; i++) {
      let count = i;
      var results = response.data;
      var animateUrl = results[i].images.fixed_height.url;
      var stillUrl = results[i].images.fixed_height_still.url;
      let myurl = results[i].images.fixed_height.url;
      $gifImg = $("<img>");
      $gifImg.attr({
        src: stillUrl,
        alt: "Animated Gif of Coffee",
        class: "gif-resizing",
        id: "giffeeNumber_" + count
      });

      // Creating Download Icon
      var $newDiv = $("<div>")
        .css("position", "relative")
        .addClass("gif-formatting");
      $newDiv.append($gifImg);
      var $downloadIcon = $("<a>")
        .attr("id", "download-formatting")
        .click(function() {
          downloadResource(myurl);
        });
      var $playbackBtn = $("<i>")
        .addClass("far fa-play-circle")
        .attr({
          "data-state": "still",
          "data-still": stillUrl,
          "data-animate": animateUrl,
          id: "playback-formatting"
        })
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

// These functions below force the download on the gifs
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
