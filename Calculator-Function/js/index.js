// clear function
document.getElementById("clear").onclick=function(){
    document.getElementById("userInput").value = "";
}

// functio nlike keyboard
function numaric(pass){
    document.getElementById("userInput").value += pass;
}



// Function to perform calculations
function calculateResult() {
    const userInput = document.getElementById("userInput");
    try {
        userInput.value = eval(userInput.value);
    } catch (error) {
        userInput.value = "Error";
    }
}

// remove the last digit number 
document.getElementById("del").onclick=function(){
    let userValue = document.getElementById("userInput").value;
}


// Function to remove the last digit
function removeLastDigit() {
    const userInput = document.getElementById("userInput");
    userInput.value = userInput.value.slice(0, -1);
}
