const OPERATORS= ['+','-','/','x']
const NUMBER_KEYS=['1','2','3','4','5','6','7','8','9','0','.']

function validateExpresion(calcDisplay,value){
    let displayValue= calcDisplay.value;
    if (value=='.' && displayValue.charAt(displayValue.length-1)=='.')
        return false;
    return true;
}

function validateOperation(calcDisplay){
    if (calcDisplay.value.length==0)
        return false;
    return true;
}

function shouldReplace(calcDisplay, value){
    let lastCharInDisplay= calcDisplay.value.charAt(calcDisplay.value.length-1);
    if (OPERATORS.includes(lastCharInDisplay)){
        return true;
    }
    return false;
}

function evaluateOperation(calcDisplay){
    let originalDisplay=calcDisplay.value;
    let count = 0;
    for (const ch of originalDisplay) {
        if (OPERATORS.includes(ch)) count++;
    }
    if (count >= 2) {
        let result = runOperation(originalDisplay.slice(0,-1));
        calcDisplay.value=result+originalDisplay.charAt(originalDisplay.length-1);
    }
}

function formatNumber(num) {
    // Round to 3 decimals
    let rounded = Math.round(num * 1000) / 1000;
    // Convert to string and remove unnecessary trailing zeros
    return rounded.toString();
}

function runOperation(calcDisplayValue){
    for (const op of OPERATORS){
        const numbers = calcDisplayValue.split(op);
        if (numbers.length==2) {
            let number1 = Number(numbers.at(0));
            let number2 = Number(numbers.at(1));
            let numbericResult=0;
            switch(op){
                case '+':
                    numbericResult=number1+number2;
                    break;
                case '-':
                    numbericResult=number1-number2;
                    break;
                case '/':
                    if (number2==0){
                        alert("Impossible division by 0")
                        number2=1;
                    }
                    numbericResult=number1/number2;
                    break;
                case 'x':
                    numbericResult=number1*number2;
                    break;
            }
            return formatNumber(numbericResult);

        }
    }
    return calcDisplayValue;
}

function numberAdded(calcDisplay, value){
    if (validateExpresion(calcDisplay, value)){
        calcDisplay.value+=value;
    }
}

function operationAdded(calcDisplay, value){
    if (validateOperation(calcDisplay)){
        if (shouldReplace(calcDisplay, value)){
            calcDisplay.value = calcDisplay.value.slice(0, -1) + value;
        }else{
            calcDisplay.value+=value;
        }
        evaluateOperation(calcDisplay);
    }
}

const calcDisplay = document.getElementById("calcDisplay");

const calcBtns = new Map([
    ['0btn', '0'],['1btn', '1'],['2btn', '2'],
    ['3btn', '3'],['4btn', '4'],['5btn', '5'],
    ['6btn', '6'],['7btn', '7'],['8btn', '8'],
    ['9btn', '9'],['0btn', '0'],['pointBtn','.']
]);

const operationBtns = new Map([
    ['sumBtn','+'],['minusBtn','-'],['productBtn','x'],['divBtn','/']
]);

for (const [btnName, value] of calcBtns) {
    document.getElementById(btnName).addEventListener("click", () => {
        numberAdded(calcDisplay, value)    
    });
}

document.getElementById('clearBtn').addEventListener('click', () => {
        calcDisplay.value='';
    }
)

for (const [btnName, value] of operationBtns) {
    document.getElementById(btnName).addEventListener("click", () => {
        operationAdded(calcDisplay, value)   
    });
}

document.getElementById('equalBtn').addEventListener("click", () => {
    calcDisplay.value = runOperation(calcDisplay.value);
})

document.getElementById('eraseBtn').addEventListener("click", () => {
    if (calcDisplay.value.length > 0){
        calcDisplay.value = calcDisplay.value.slice(0,-1)
    }
})

document.addEventListener("keydown", function(event) {
    if (NUMBER_KEYS.includes(event.key)){ //number pressed
        numberAdded(calcDisplay, event.key);
    }else if (OPERATORS.includes(event.key)){
        operationAdded(calcDisplay, event.key);
    }else if (event.key=='=' || event.key=='Enter'){
        calcDisplay.value = runOperation(calcDisplay.value);
    }else if (event.key=='Escape'){
        calcDisplay.value='';      
    }else if (event.key=='Delete'){
        if (calcDisplay.value.length > 0){
            calcDisplay.value = calcDisplay.value.slice(0,-1)
        }
    }else if (event.key=='*'){
        operationAdded(calcDisplay, 'x');
    }
});