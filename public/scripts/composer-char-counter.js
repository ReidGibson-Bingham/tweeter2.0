// const { tweets } = require("../../server/lib/in-memory-db");
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
    
    console.log("event.originalEvent.key: ", event.originalEvent.key);
    console.log("value of count: ", count);
    console.log("type of counter.text: ", typeof $counter.text());
    console.log("counter.text: ", $counter.text());
    console.log("parseInt(counter.text): ", parseInt($counter.text()));
    console.log("typeof parseInt(counter.text): ", typeof parseInt($counter.text()));
    if (count < 0) { 
      $counter.css('color', 'red');
      $counter.text(count);
    } else {
      $counter.css('color', 'black');
      $counter.text(count);
      //console.log(count);
    }

  });

  $("#interaction-icon1").mouseover(function(event) {
    console.log(event.clientX);
    $(".fa-solid fa-flag").css('color', 'blue');
  });

});












