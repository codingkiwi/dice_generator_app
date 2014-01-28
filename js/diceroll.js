
// initialization function
function pageInit() {
    // Hook up the roll dice function to be triggered when a user clicks in the dice div area
    $("#rollButton").click(function(){
        var numberOfDice = $("#numberOfDice").val();
        var diceType = $("#diceType").val();
        roll(numberOfDice, diceType);
    });
    
    // Toggle the state of an individual die via css when it is clicked
    $(document).on('click', '#dicelist li', function(){
        $(this).addClass("d6_inactive").removeClass("d6_active");
    });
}
pageInit();

//Randomly generates numbers for the dice and returns an array of their values
function rollDice(numberOfDice, diceType){
    var diceNumber = [];
    var diceTally = [];
        
    for (var m = 0; m <= 6; m++){
        diceTally[m] = 0;
    }
            
    if (diceType == 3){
        for (var i = 0; i < numberOfDice; i++){
            diceNumber[i] = Math.round(Math.floor(Math.random() * 3)) + 1; 
            if (diceNumber[i] == 1){
                diceTally[1] += 1;
            }
            else if (diceNumber[i] == 2){
                diceTally[2] += 1;
            }
            else if (diceNumber[i] == 3){
                diceTally[3] += 1;
            }
        }
    }
    else {
        for (var j = 0; j < numberOfDice; j++){
            diceNumber[j] = Math.round(Math.floor(Math.random() * 6)) + 1; 
            if (diceNumber[j] == 1){
                diceTally[1] += 1;
            }
            else if (diceNumber[j] == 2){
                diceTally[2] += 1;
            }
            else if (diceNumber[j] == 3){
                diceTally[3] += 1;
            }
            else if (diceNumber[j] == 4){
                diceTally[4] += 1;
            }
            else if (diceNumber[j] == 5){
                diceTally[5] += 1;
            }
            else if (diceNumber[j] == 6){
                diceTally[6] += 1;
            }    
        }
    }
    //sort dice numerically highest to lowest
    diceNumber.sort(function(a,b){return b-a});
    return [diceNumber, diceTally];
}

// removes the current dice and calls rollDice, then adds the new dice to the page
function roll(numberOfDice, diceType){
    //remove the previous dice list
    $("#dicelist").empty();
    $("#diceTotal").empty();
    $("#diceTally").empty();
    
    //re-roll and re-insert new dice
    var diceData = rollDice(numberOfDice, diceType);
    var diceTotal = 0;
    
    //print HTML for new dice list
    for (var i = 0; i < numberOfDice; i++){
        $("#dicelist").append("<li class=\"dice" + i + " d6_active d6_" + diceData[0][i] + "\"><a href=\"#6\"></a></li>");
        diceTotal = diceTotal + diceData[0][i];
    }
    //print HTML for dice total score
    $("#diceTotal").append("<h2>Total: " + diceTotal + "</h2>");
    
    //print HTML for dice tallies
    $("#diceTally").append("<ol>");
    for (var l = 1; l <= diceType; l++){
        $("#diceTally").append("<li>" + diceData[1][l] + "</li>");
    }
    $("#diceTally").append("</ol>"); 
    
    return false;
}
    
