// API KEY b9zNodUCVLZxeqWrmUupgRDDfjhFoh0x
// http://api.giphy.com/v1/gifs/search?q=caramel%20macchiato&api_key=b9zNodUCVLZxeqWrmUupgRDDfjhFoh0x

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

function makeButtons() {
  $buttonsDiv.empty();
  for (var i = 0; i < topics.length; i++) {
    var $button = $("<button>")
      .addClass("topic-buttons")
      .attr("data-name", topics[i])
      .text(topics[i]);
    $button.click(function() {
      var coffeeType = $(this).attr("data-name");
      var queryURL =
        "https:api.giphy.com/v1/gifs/search?q=" +
        coffeeType +
        "&limit=10&api_key=b9zNodUCVLZxeqWrmUupgRDDfjhFoh0x";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        for (var i = 0; i < topics.length; i++) {
          var results = response.data;
          var $gifImg = $("<img>");
          $gifsDiv.append(
            $gifImg
              .attr("src", results[i].images.fixed_height.url)
              .attr("alt", "Animated Gif of Coffee")
              .addClass("gif-formatting")
          );
        }
      });
    });
    $buttonsDiv.append($button);
  }
}

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {
//   var results = response.data;
//   topics[i];
// });

// $button.on("click", ".topic-buttons", function() {});

function formatUserInput() {
  var userInput = $userInput
    .val()
    .toLowerCase()
    .trim();
  return userInput;
}

$submitBtn.click(function(e) {
  e.preventDefault();
  if (formatUserInput() !== "" && !topics.includes(formatUserInput())) {
    var topic = formatUserInput();
    topics.push(topic);
    makeButtons();
  }
});

makeButtons();
