//creates an object to keep track of values
const Calculator={
    //thos displays 0 on the screen
    Display_Value: '0',
    //this holds the operand for any expressions, we will set it to null for now
    First_Operand: null,
    //this checks weather or not the second operand had been input
    Wait_Second_Operand: false,
    //this will hold the operator, we will set it to null for now
    operator: null,
};
//this modifies values each time a button is clicked
function Input_Digit(digit) {
    const { Display_Value, Wait_Second_Operand } = Calculator;
    //we are checking to see if wait second operand is true and set
    //display value to the key that was clicked
    if (Wait_Second_Operand===true) {
        Calculator.Display_Value=digit;
        Calculator.Wait_Second_Operand=false;
    }else {
        //this overwrites display value if the current value is 0
        //otherwise it adds onto it
        Calculator.Display_Value=Display_Value==='0' ?digit : Display_Value+digit;
    }
}
//this section handles decimal points
function Input_Decimal(dot) {
    //this ensures that accedental clicking of the decimal point
    //wont cause bugs
    if (Calculator.Wait_Second_Operand===true) return;
    if (!Calculator.Display_Value.includes(dot)) {
       // we are saying if display value dont contain a decimal
       //we want to add a decimal
       Calculator.Display_Value+=dot;
    }
}

//this handles operators
function Handle_Operator(Next_Operator) {
    const {First_Operand, Display_Value, operator } = Calculator
    //when a opp key is pressed we convert the current number
    //displayed to a number and then store the result in
    //calculator.first_operand if it dosent exsist already
    const Value_of_Input = parseFloat(Display_Value);
    //checks if a opp already exsist and if WSO is true
    //then updates the opp and exits from the function
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = Next_Operator;
        return;
    }
    if (First_Operand==null) {
        Calculator.First_Operand = Value_of_Input;
    }else if (operator) {//checks if one already exsit
    const Value_Now = First_Operand || 0;
    //if exsit property lookup is performed for the opp
    //in the perform calculation object and the function that matches the
    //opp is executed
    const result = Perform_Calculation[operator] (Value_Now, Value_of_Input);

    Calculator.Display_Value = String(result);
    Calculator.First_Operand = result;
    }

    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}

const Perform_Calculation= {
    '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,

    '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,

    '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,

    '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,

    '=': (First_Operand, Second_Operand) => First_Operand = Second_Operand
};
function Calculator_Reset() {
    Calculator.Display_Value='0';
    Calculator.First_Operand=null;
    Calculator.Wait_Second_Operand=false;
    Calculator,operator=null;
}
//this updates the screen with the contents of display value
function Update_Display() {
    const display = document.querySelector('.calculator-screen');
    display.value = Calculator.Display_Value;
}

Update_Display();
//this section monitors button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    //the target is an object that reps the element that was clicked
    const {target}= event;
    //if the element that was clicked is not a button, exit the function
    if (!target.matches('button')) {
        return;
    }
    if ( target.classList.contains('operator')) {
        Handle_Operator(target.value);
        Update_Display();
        return;
    }
    if (target.classList.contains('decimal')){
        Input_Decimal(target.value);
        Update_Display();
        return;
    }
    // ensures that AC clears the numbers from the calculator
    if (target.classList.contains('all-clear')) {
        Calculator_Reset();
        Update_Display();
        return;
    }
    Input_Digit(target.value);
    Update_Display();
})