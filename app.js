var dogs = ["Poodle","Beagle","Husky","Pitbull"]

$(document).ready(function() {
  function renderButtons() {
    // (this is necessary otherwise we will have repeat buttons)

    $("#buttons-view").empty();
    //loop through array of dogs:
    for (var i = 0; i < dogs.length; i++) {
      // Deleting the gif buttons prior to adding new movie buttons
      // (this is necessary otherwise we will have repeat buttons)  // this generates buttons for each dog in the array:
      var button = $("<button>");
      // Adding a class
      button.addClass("btn btn-success");
      // // Adding a data-attribute with a value of the topic at index i:
      // button.attr("data-name", dogs[i]);
      // Adding the button's text with a value of topics at index i:
      button.text(dogs[i]);
      // Adding button to html:
      $("#buttons-view").append(button);
    }
  }

  $("#add-gif").on("click", function(event) {
    event.preventDefault();

    // Here we grab the text from the input box
    var gif = $("#gif-input")
      .val()
      .trim();
    // Add dog from textbox into our array
    dogs.push(gif);

    //call renderButton function:
    renderButtons();
  });
  renderButtons();

  //When page loads you can't apply event handler to an element that doesn't exist yet (jQuery).  So must use this method to attach it to an element that exists when page loads.   Use closest parent element***
  $("#buttons-view").on("click", ".btn", function() {
    // console.log("AM I CLICKING??");

  