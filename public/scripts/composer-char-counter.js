let count = 140;

$(document).ready(function() {

  console.log("composer-char-counter.js ready");

  const $counter = $(".counter");
  
  $("#tweet-text").keyup(function(event) {

    count = 140 - $("#tweet-text").val().length;
    
    if (count < 0) { 
      $counter.css('color', 'red');
      $counter.text(count);
    } else {
      $counter.css('color', 'black');
      $counter.text(count);
    }

  });

});












