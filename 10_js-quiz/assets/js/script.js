
//debt button



var myButton = document.getElementById("myButton");

myButton.addEventListener("click", function() { 

	function checkerboard(width, height) {

  var checkerboard = "";


  for (row = 0; row < height; row++){

      if (row % 6) {
          for (column = 0; column < width; column++) {
              if ( column % 6 ){
                  checkerboard = checkerboard + "#"
              } else {
                  checkerboard = checkerboard + " "
              }
          }

      } else {
          for (column = 0; column < width; column++) {
              if ( column % 6 ){
                  checkerboard = checkerboard + " "
              } else {
                  checkerboard = checkerboard + "#"
              }
          }
      }

      checkerboard = checkerboard + "\n"
  }

  console.log(checkerboard);
}

checkerboard(6,6);

     event.stopPropagation();

});


//BG button
//-----------------------------

var myButton = document.getElementById("bgButton");

bgButton.addEventListener("click", function() { 

  function checkerboard(width, height) {

  var checkerboard = "";


  for (row = 0; row < height; row++){

      if (row % 1) {
          for (column = 0; column < width; column++) {
              if ( column % 1 ){
                  checkerboard = checkerboard + "#"
              } else {
                  checkerboard = checkerboard + " "
              }
          }

      } else {
          for (column = 0; column < width; column++) {
              if ( column % 6 ){
                  checkerboard = checkerboard + " "
              } else {
                  checkerboard = checkerboard + "#"
              }
          }
      }

      checkerboard = checkerboard + "\n"
  }

  console.log(checkerboard);
}

checkerboard(1,6);

    

});






