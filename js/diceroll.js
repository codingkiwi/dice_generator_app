// global variables to hold the sum of all dice, and a tally of the amount of dith each number.
var diceTally = [];
var diceTotal = 0;
    
// initialization function
function pageInit() {
    // Hook up the roll dice function to be triggered when a user clicks in an individual dice's div
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

// Randomly generates dice given three inputs: the amount of dice, whether the dice is d3 or d6, and if only the selected dice are being rerolled or all of the dice. Returns a sorted array of numbers.
function generateDice(numberOfDice, diceType, isReroll){
    
    var diceNumbers = [];
    
    // pre-fills the tally array and clears the total variable for the initial roll  
    if (isReroll !== true){
        for (var m = 0; m <= 6; m++){
            diceTally[m] = 0;
        }
        diceTotal = 0;
    }
    
    // generates numbers for a 3 sided dice        
    if (diceType == 3){
        for (var i = 0; i < numberOfDice; i++){
            diceNumbers[i] = Math.round(Math.floor(Math.random() * 3)) + 1; 
            if (diceNumbers[i] == 1){
                diceTally[1] += 1;
            }
            else if (diceNumbers[i] == 2){
                diceTally[2] += 1;
            }
            else if (diceNumbers[i] == 3){
                diceTally[3] += 1;
            }
        }
    }
    // generates numbers for a 6 sided dice
    else {
        for (var j = 0; j < numberOfDice; j++){
            diceNumbers[j] = Math.round(Math.floor(Math.random() * 6)) + 1; 
            if (diceNumbers[j] == 1){
                diceTally[1] += 1;
            }
            else if (diceNumbers[j] == 2){
                diceTally[2] += 1;
            }
            else if (diceNumbers[j] == 3){
                diceTally[3] += 1;
            }
            else if (diceNumbers[j] == 4){
                diceTally[4] += 1;
            }
            else if (diceNumbers[j] == 5){
                diceTally[5] += 1;
            }
            else if (diceNumbers[j] == 6){
                diceTally[6] += 1;
            }    
        }
    }
    // sort dice numerically highest to lowest
    diceNumbers.sort(function(a,b){return b-a});
    return diceNumbers;
}

// removes the current dice and calls generateDice, then adds the new dice to the page
function roll(numberOfDice, diceType){
    //remove the previous dice list
    $("#diceList").empty();
    $("#diceTotal").empty();
    $("#diceTally").empty();
    
    // roll new dice
    var diceData = generateDice(numberOfDice, diceType);
    
    // print HTML for new dice list
    for (var i = 0; i < numberOfDice; i++){
        $("#diceList").append("<li class=\"dice" + i + " d6_active d6_" + diceData[i] + "\"><a href=\"#6\"></a></li>");
        diceTotal = diceTotal + diceData[i];
    }
    // print HTML for dice total score
    $("#diceTotal").append("<h2>Total: " + diceTotal + "</h2>");
    
    //print HTML for dice tallies
    $("#diceTally").append("<ol>");
    for (var l = 1; l <= diceType; l++){
        $("#diceTally").append("<li>" + diceTally[l] + "</li>");
    }
    $("#diceTally").append("</ol>"); 
    
    return false;
}

// generate new numbers for deselected dice and change the CSS class accordingly
function reRoll(selectedDie, diceType){
    var diceData = generateDice(1,diceType, true);
    toggleDiceStatus(selectedDie);
    
    // find the value of the current Die and update the dice total and tallies accordingly
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

    // re-print HTML for dice tallies and totals
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


