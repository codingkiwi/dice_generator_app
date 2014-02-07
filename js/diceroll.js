var diceTally = [];
var diceTotal = 0;
    
// initialization function
function pageInit() {
    // Hook up the roll dice function to be triggered when a user clicks in the dice div area
    $(document).on("click", "#rollButton", function(){
        roll($("#numberOfDice").val(), $("#diceType").val());
    });
        
    // Toggle the state of an individual die via css when it is clicked
    $(document).on("click", "#diceList li", function(){
        toggleDiceStatus($(this));
    });
    
    // re-rolls selected dice when the re-roll button is clicked
    $(document).on("click", "#reRollButton", function(){
        $("#diceList li").each(function() {
            if($(this).hasClass("d6_inactive")){
                reRoll($(this), $("#diceType").val());
            }
        });
    });
}
pageInit();

//Randomly generates numbers for the dice and returns an array of their values
function generateDice(numberOfDice, diceType){
    
    var diceNumber = [];
    // pre-fills array except in case of rerolling individual die    
    if (numberOfDice > 1){
        for (var m = 0; m <= 6; m++){
            diceTally[m] = 0;
        }
        diceTotal = 0;
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
    return diceNumber;
}

// removes the current dice and calls generateDice, then adds the new dice to the page
function roll(numberOfDice, diceType){
    //remove the previous dice list
    $("#diceList").empty();
    $("#diceTotal").empty();
    $("#diceTally").empty();
    
    //re-roll and re-insert new dice
    var diceData = generateDice(numberOfDice, diceType);
    
    //print HTML for new dice list
    for (var i = 0; i < numberOfDice; i++){
        $("#diceList").append("<li class=\"dice" + i + " d6_active d6_" + diceData[i] + "\"><a href=\"#6\"></a></li>");
        diceTotal = diceTotal + diceData[i];
    }
    //print HTML for dice total score
    $("#diceTotal").append("<h2>Total: " + diceTotal + "</h2>");
    
    //print HTML for dice tallies
    $("#diceTally").append("<ol>");
    for (var l = 1; l <= diceType; l++){
        $("#diceTally").append("<li>" + diceTally[l] + "</li>");
    }
    $("#diceTally").append("</ol>"); 
    
    return false;
}

// toggle the dice sprite when selected between active and inactive
function toggleDiceStatus(selectedDie){
    if (selectedDie.hasClass("d6_active")){
        selectedDie.addClass("d6_inactive").removeClass("d6_active");
    }
    else if (selectedDie.hasClass("d6_inactive")){
        selectedDie.addClass("d6_active").removeClass("d6_inactive");
    }
    else {
        console.error("toggleDiceStatus function failed to select a status class");
    }
}

// generate new numbers for deselected dice and change the CSS class accordingly
function reRoll(selectedDie, diceType){
    var diceData = generateDice(1,diceType);
    toggleDiceStatus(selectedDie);
    
    // find the value of the current Die
    if (selectedDie.hasClass("d6_1")){
        diceTally[1] -= 1;
        diceTotal -= 1;
    }
    else if (selectedDie.hasClass("d6_2")){
        diceTally[2] -= 1;   
        diceTotal -= 2;
    }
    else if (selectedDie.hasClass("d6_3")){
        diceTally[3] -= 1;
        diceTotal -= 3;
    }
    else if (selectedDie.hasClass("d6_4")){
        diceTally[4] -= 1;
        diceTotal -= 4;
    }
    else if (selectedDie.hasClass("d6_5")){
        diceTally[5] -= 1;        
        diceTotal -= 5;
    }
    else if (selectedDie.hasClass("d6_6")){
        diceTally[6] -= 1;        
        diceTotal -= 6;
    }
    
    diceTotal += diceData[0];

    //re-print HTML for dice tallies and totals
    $("#diceTally").empty();
    $("#diceTotal").empty();
    
    $("#diceTotal").append("<h2>Total: " + diceTotal + "</h2>");
    
    $("#diceTally").append("<ol>");
    for (var l = 1; l <= diceType; l++){
        $("#diceTally").append("<li>" + diceTally[l] + "</li>");
    }
    $("#diceTally").append("</ol>"); 
    
    selectedDie.removeClass("d6_1 d6_2 d6_3 d6_4 d6_5 d6_6").addClass("d6_" + diceData[0]);
}


