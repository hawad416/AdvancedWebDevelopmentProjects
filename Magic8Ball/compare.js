/* This program will work kind of like a Magic 8 Ball when we are done*/


var userTrigger=document.getElementById("btn");


userTrigger.addEventListener("click", provideAnswer);

function provideAnswer(){


    
var randomNumber=Math.floor(Math.random()*6)+1;
    
	if(randomNumber===1){
        document.write("YES");
    }
    else if (randomNumber>4){
        document.write("Try Again");
    }
    else if (randomNumber===2){document.write("NO");}
    
    else if (randomNumber>3){
        document.write("For Sure");
    }
    else if (randomNumber>2){
        document.write("Never");
    }
    else if (randomNumber>5){
        document.write("you thought");
    }
    
}
