let count = 140;

$(document).ready(function() {

  console.log("composer-char-counter.js ready");

  const $counter = $(".counter");
  
  $("#tweet-text").keydown(function(event) {
    
    if (event.originalEvent.key === 'Backspace' && count < 140) {
      count++;
    } else {
      count--;
    }
    
    if (count < 0) { 
      $counter.css('color', 'red');
      $counter.text(count);
    } else {
      $counter.css('color', 'black');
      $counter.text(count);

    }

  });

});












