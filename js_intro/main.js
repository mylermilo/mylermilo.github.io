
var myStudioDebt = 800;
myStudioDebt = myStudioDebt - 100;

console.log('hello world');



var myLuckyNumbers = [4, 7, 8, 16];

console.log(myLuckyNumbers);
console.log(myLuckyNumbers[0]);

myLuckyNumbers[2];
console.log(myLuckyNumbers[2]);








var myAge = 25;

if (myAge < 21) {

    console.log("u cant party");} else { console.log("u can party");}


console.log(myAge);



function addFive(x) {
   
        return x + 5; 



} 


add(10, 10);

add("bryant","wells");


function add(x, y) { 

    console.log(x + y);



}


var hamburgers = 0; 

// loops
for (var i = 0; i < 10; i = i + 1) {

       
      hamburgers = hamburgers + 3;

      console.log(hamburgers);


}







function checkerboard(width, height) {

	var checkerboard = "";


	for (row = 0; row < height; row++){

	    if (row % 2) {
	        for (column = 0; column < width; column++) {
	            if ( column % 2 ){
	                checkerboard = checkerboard + "#"
	            } else {
	                checkerboard = checkerboard + " "
	            }
	        }

	    } else {
	        for (column = 0; column < width; column++) {
	            if ( column % 2 ){
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

checkerboard(10,10);

for (var licks = 1; licks <= 3; licks++) {  
   if (licks < 3) { console.log("ahhh" + licks); 
} else { console.log ("CRUNCH!!");
}

}









function askMrOwl(numOfLicks) {
     for  (var licks = 1; licks <= numOfLicks; licks++) { 

     if (licks < numOfLicks) { console.log("ahhh" + licks);
  

     } else { console.log("CRUNCH!!") 


 } 

}
}

askMrOwl(10);








