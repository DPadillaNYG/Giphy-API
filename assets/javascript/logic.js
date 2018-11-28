// API KEY b9zNodUCVLZxeqWrmUupgRDDfjhFoh0x
// http://api.giphy.com/v1/gifs/search?q=[search+word]&api_key=b9zNodUCVLZxeqWrmUupgRDDfjhFoh0x

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
    for (var i = 0; i < topics.length; i++) {
      var results = response.data;
      var animateUrl = results[i].images.fixed_height.url;
      var stillUrl = results[i].images.fixed_height_still.url;
      $gifImg = $("<img>");
      $gifImg.attr({
        src: stillUrl,
        alt: "Animated Gif of Coffee",
        "data-state": "still",
        "data-still": stillUrl,
        "data-animate": animateUrl,
        class: "gif-resizing"
      });

      // Creating Download Icon
      var $newDiv = $("<div>")
        .css("position", "relative")
        .addClass("gif-formatting");
      $newDiv.append($gifImg);
      var $downloadIcon = $("<a>").attr({
        href: results[i].images.fixed_height.url,
        id: "download-formatting",
        download: "coffee gif"
      });
      $downloadIcon.append($("<i>").addClass("fas fa-download"));
      $newDiv.append($downloadIcon);
      $gifsDiv.append($newDiv);

      animateGif();
    }
  });
}

// This function allows the user to animate and freeze the GIF
function animateGif() {
  $gifImg.on("click", function() {
    var $state = $(this).attr("data-state");
    var $animate = $(this).attr("data-animate");
    var $still = $(this).attr("data-still");

    if ($state === "still") {
      $(this).attr("src", $animate);
      $(this).attr("data-state", "animated");
    } else {
      $(this).attr("src", $still);
      $(this).attr("data-state", "still");
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
    if (formatUserInput() !== "" && !topics.includes(formatUserInput())) {
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
}

// Function Calls
makeButtons();
userCreatesButton();
