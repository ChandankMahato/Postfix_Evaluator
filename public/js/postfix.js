
var clickCount = 0;

function evaluatePostfix(){
    expression = document.getElementById("postfixvalue").value;
    var postfix = expression.split(" ");
    var postfixStack = [];
    var valCount=0;
    var opCount=0;

    for(var i = 0; i< postfix.length; i++){
        var current = postfix[i];
        if(isOperator(current) ) {
            postfixStack.push( 
                compute( postfixStack.pop(), symbolToOperator(current), postfixStack.pop())
            );
            opCount++;
        }else {
            valCount++;
            postfixStack.push(current);
        }
    }
    if(valCount > opCount+1){
        document.getElementById("text").innerHTML = "To Many Operands!";
    }else if(opCount >= valCount){
        document.getElementById("text").innerHTML = "Not Enough Operand!";
    }else if(!isNaN(postfixStack[0])){
        document.getElementById("text").innerHTML = postfixStack[0];
    }else{
        document.getElementById("text").innerHTML = "Invalid Expression";
    }
    clickCount = 0;
}

function isOperator(toCheck) {
    switch (toCheck) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            return true;
        default:
            return false;
    }
}

function compute(a, operator, b) {
    var val1, val2;
    val1 = Number(a);
    val2 = Number(b);
    return operator(val1,val2); 
}

function symbolToOperator(symbol) {
    switch (symbol) {
        case '+': return plus;
        case '-': return minus;
        case '*': return multiply;
        case '/': return divide;
        case '%': return modulo;
    }
}

function plus(val1,val2) { return val2 + val1; } 
function minus(val1,val2) { return val2 - val1; }
function multiply(val1,val2) {return val2 * val1; }
function divide(val1,val2) {return val2 / val1; }
function modulo(val1,val2) {return (((val2 % val1) + val1) % val1);}


function showSteps(){ 
    clickCount ++;
    if(clickCount > 0){
        document.getElementById('stepBtn').innerHTML= "Reset";
    }
    if(clickCount > 1){
        location.reload();
    }

    var myObj = document.getElementById('footerId');
    myObj.remove();

    expression = document.getElementById("postfixvalue").value;
    var postfix = expression.split(" ");
    console.log(postfix);
    console.log(postfix.length);
    var postfixStack = [];

    var errorMessage = document.getElementById("text").innerHTML;
    console.log(errorMessage);

    if(postfix[0] == "" || errorMessage == "Not Enough Operand!" || errorMessage == "Invalid Expression" || errorMessage == "To Many Operands!"){
        let emptyText = document.createElement('p');
        emptyText.className = "emptyText";
        emptyText.id = "emptyTextId";
        emptyTextElement = document.createTextNode("Either Postfix Expression is Missing Or Expression is Invalid! Enter Valid Expression!");
        emptyText.appendChild(emptyTextElement);
        document.body.appendChild(emptyText);
    }else{

        let initialText = document.createElement('p');
        initialText.className = "initialText";
        initialText.id = "initialTextId";
        initialTextElement = document.createTextNode("Steps of Postfix Evalution is Shown Below!");
        initialText.appendChild(initialTextElement);
        document.body.appendChild(initialText);


        for(var i = 0; i<postfix.length; i++){
            let current = postfix[i];

            let lineElement = document.createElement('p');
            lineElement.className = "line";
            lineElement.id="lineId";
            document.body.appendChild(lineElement);

            /////////////////
            let expressionElement = document.createElement('p');
            expressionElement.className="expression";
            expressionElement.id="expressionId";

            for(var l=0; l<postfix.length; l++){

                if(l == i){
                    let ScannedExpression = document.createElement('span');
                    ScannedExpression.className = "ScannedExpression";
                    var ScannedExpressionElement = document.createTextNode(postfix[l]);
                    ScannedExpression.appendChild(ScannedExpressionElement);
                    expressionElement.appendChild(ScannedExpression);   
                }else{
                    let nonScannedExpression = document.createElement('span');
                    nonScannedExpression.className = "nonScannedExpression";
                    var nonScannedExpressionElement = document.createTextNode(postfix[l]);
                    nonScannedExpression.appendChild(nonScannedExpressionElement);
                    expressionElement.appendChild(nonScannedExpression);    
                } 
            }
            document.body.appendChild(expressionElement);
            ///////////////

            if(isOperator(current)){
                var operandRight = postfixStack.pop();
                var operandLeft = postfixStack.pop();

                ///////////////////////////
                
                let secondTextDiv = document.createElement('div');
                secondTextDiv.className = "secondTextDiv";
                secondTextDiv.id="secondTextDivId";

                let showSecondTextFirstPart = document.createElement('span');
                showSecondTextFirstPart.className="secondTextFirstPart";
                let showSecondTextFirstPartElement = document.createTextNode("The character scanned is (");

                let showSecondTextCurrentNumber = document.createElement('span');
                showSecondTextCurrentNumber.className="secondTextOperator";
                let showSecondTextCurrentNumberElement = document.createTextNode(postfix[i]);

                let showSecondTextSecondPart = document.createElement('span');
                showSecondTextSecondPart.className="secondTextSecondPart";
                let showSecondTextSecondPartElement = document.createTextNode(" ), which is an operator, so pop its two operands from the stack.");
                
                showSecondTextFirstPart.appendChild(showSecondTextFirstPartElement);
                showSecondTextCurrentNumber.appendChild(showSecondTextCurrentNumberElement);
                showSecondTextSecondPart.appendChild(showSecondTextSecondPartElement);

                let showSecondTextFirstParagraph = document.createElement('p');
                showSecondTextFirstParagraph.className="secondTextFirstParagraph";
                showSecondTextFirstParagraph.appendChild(showSecondTextFirstPart);
                showSecondTextFirstParagraph.appendChild(showSecondTextCurrentNumber);
                showSecondTextFirstParagraph.appendChild(showSecondTextSecondPart);

                secondTextDiv.appendChild(showSecondTextFirstParagraph);
        
                let thirdTextDiv = document.createElement('div');
                thirdTextDiv.className = "thirdTextDiv";
                thirdTextDiv.id="thirdTextDivId";

                let showSecondTextSecondLine = document.createElement('span');
                showSecondTextSecondLine.className = "secondTextSecondLine";
                let showSecondTextSecondLineElement = document.createTextNode("Pop (");

                let showSecondTextFirstOperand = document.createElement('span');
                showSecondTextFirstOperand.className = "secondTextOperand";
                let showSecondTextFirstOperandElement = document.createTextNode(operandRight);

                let showSecondTextThirdPart = document.createElement('span');
                showSecondTextThirdPart.className="secondTextThirdPart";
                let showSecondTextThirdPartElement = document.createTextNode(" ) from the stack for the right operand and then pop (");

                let showSecondTextSecondOperand = document.createElement('span');
                showSecondTextSecondOperand.className = "secondTextOperand";
                let showSecondTextSecondOperandElement = document.createTextNode(operandLeft);

                let showSecondTextFourthPart = document.createElement('span');
                showSecondTextFourthPart.className="secondTextFourthPart";
                let showSecondTextFourthPartElement = document.createTextNode(") from the stack to make the left operand");

                showSecondTextSecondLine.append(showSecondTextSecondLineElement);
                showSecondTextFirstOperand.appendChild(showSecondTextFirstOperandElement);
                showSecondTextThirdPart.appendChild(showSecondTextThirdPartElement);
                showSecondTextSecondOperand.appendChild(showSecondTextSecondOperandElement);
                showSecondTextFourthPart.appendChild(showSecondTextFourthPartElement);

                let showSecondTextSecondParagraph = document.createElement('p');
                showSecondTextSecondParagraph.className="showSecondTextSecondParagraph";
                showSecondTextSecondParagraph.appendChild(showSecondTextSecondLine);
                showSecondTextSecondParagraph.appendChild(showSecondTextFirstOperand);
                showSecondTextSecondParagraph.appendChild(showSecondTextThirdPart);
                showSecondTextSecondParagraph.appendChild(showSecondTextSecondOperand);
                showSecondTextSecondParagraph.appendChild(showSecondTextFourthPart);

                thirdTextDiv.appendChild(showSecondTextSecondParagraph);

                document.body.appendChild(secondTextDiv);
                document.body.appendChild(thirdTextDiv);


                /////////////////////////
                var currentResult = compute( operandRight, symbolToOperator(current), operandLeft)
                
                let firstOperand = document.createElement('span');
                firstOperand.className = "firstOperand";
                var firstOperandText = document.createTextNode(operandLeft);
                firstOperand.appendChild(firstOperandText);

                let operatingOperator = document.createElement('span');
                operatingOperator.className = "operatingOperator";
                var operatingOperatorText = document.createTextNode(current);
                operatingOperator.appendChild(operatingOperatorText);

                let secondOperand = document.createElement('span');
                secondOperand.className = "secondOperand";
                var secondOperandText = document.createTextNode(operandRight);
                secondOperand.appendChild(secondOperandText);

                let equalsTo = document.createElement('span');
                equalsTo.className = "equalsTo";
                var equalsToText = document.createTextNode("=");
                equalsTo.appendChild(equalsToText);

                let currentOuput = document.createElement('span');
                currentOuput.className = "currentOutput";
                var currentOuputText = document.createTextNode(currentResult);
                currentOuput.appendChild(currentOuputText);

                let expressionParagraph = document.createElement('p');
                expressionParagraph.className = "expressionParagraph"
                expressionParagraph.appendChild(firstOperand);
                expressionParagraph.appendChild(operatingOperator);
                expressionParagraph.appendChild(secondOperand);
                expressionParagraph.appendChild(equalsTo);
                expressionParagraph.appendChild(currentOuput)


                /////////////////////////

                let InitialcalculationDiv = document.createElement('div');
                InitialcalculationDiv.id = "InitialcalculationDivId";
                InitialcalculationDiv.className="InitialcalculationDiv";

                let InitialshowStackContentDiv = document.createElement('div');
                let InitialshowStackContentTable = document.createElement('table');
                InitialshowStackContentDiv.className = "InitialshowStackContentDiv";
                InitialshowStackContentDiv.id = "InitialshowStackContentDivId";
                InitialshowStackContentTable.className = "InitialshowStackContentTable";


                    if(postfixStack.length == 0){
                        var Initialrow = document.createElement('tr');
                        var Initialcell = document.createElement('td');
                        Initialcell.className = "Initialcell";
                        Initialrow.className = "Initialrow";
                        var InitialcellText = document.createTextNode("Empty");
                        Initialcell.appendChild(InitialcellText);
                        Initialrow.appendChild(Initialcell);
                        InitialshowStackContentTable.appendChild(Initialrow);
                        InitialshowStackContentDiv.appendChild(InitialshowStackContentTable);
                    }else{
                        for(var m = postfixStack.length-1; m >= 0; m--){
                            var Initialrow = document.createElement('tr');
                            var Initialcell = document.createElement('td');
                            Initialcell.className = "Initialcell";
                            Initialrow.className = "Initialrow";
                            var InitialcellText = document.createTextNode(postfixStack[m]);
                            Initialcell.appendChild(InitialcellText);
                            Initialrow.appendChild(Initialcell);
                            InitialshowStackContentTable.appendChild(Initialrow);
                            InitialshowStackContentDiv.appendChild(InitialshowStackContentTable);
                        }
                    }
                    

                let InitialtextStack = document.createElement('span');
                InitialtextStack.className = "InitialtextStack";
                var InitialwrtingText = document.createTextNode("Stack");
                InitialtextStack.appendChild(InitialwrtingText);
                InitialshowStackContentDiv.appendChild(InitialtextStack);

                let InitialshowOperationDiv = document.createElement('div');
                InitialshowOperationDiv.id = "InitialshowOperationDivId";
                InitialshowOperationDiv.className = "InitialshowOperationDiv";

                /////////
                InitialshowOperationDiv.appendChild(expressionParagraph);
                ///////

                let InitialtextExpression = document.createElement('p');
                InitialtextExpression.className = "InitialtextExpression";
                var InitialwritingTextExpression = document.createTextNode("Expression...");
                InitialtextExpression.appendChild(InitialwritingTextExpression);
                InitialshowOperationDiv.appendChild(InitialtextExpression);

                InitialcalculationDiv.appendChild(InitialshowStackContentDiv);
                InitialcalculationDiv.appendChild(InitialshowOperationDiv);
                document.body.appendChild(InitialcalculationDiv);

                ///////////////////////
                let conclusionText = document.createElement('span');
                conclusionText.className = "conclusionText";
                var conclusionTextElement = document.createTextNode("Next, push the result (");
                conclusionText.appendChild(conclusionTextElement);

                let conclusionTextEndPart = document.createElement('span');
                conclusionTextEndPart.className = "conclusionTextEndPart";
                var conclusionTextEndPartElement = document.createTextNode(" ) to the stack.");
                conclusionTextEndPart.appendChild(conclusionTextEndPartElement);

                //////
                let firstOperandConclusion = document.createElement('span');
                firstOperandConclusion.className = "firstOperand";
                var firstOperandTextConclusion = document.createTextNode(operandLeft);
                firstOperandConclusion.appendChild(firstOperandTextConclusion);

                let operatingOperatorConclusion = document.createElement('span');
                operatingOperatorConclusion.className = "operatingOperator";
                var operatingOperatorTextConclusion = document.createTextNode(current);
                operatingOperatorConclusion.appendChild(operatingOperatorTextConclusion);

                let secondOperandConclusion = document.createElement('span');
                secondOperandConclusion.className = "secondOperand";
                var secondOperandTextConclusion = document.createTextNode(operandRight);
                secondOperandConclusion.appendChild(secondOperandTextConclusion);

                let equalsToConclusion = document.createElement('span');
                equalsToConclusion.className = "equalsTo";
                var equalsToTextConclusion = document.createTextNode("=");
                equalsToConclusion.appendChild(equalsToTextConclusion);

                let currentOuputConclusion = document.createElement('span');
                currentOuputConclusion.className = "currentOutput";
                var currentOuputTextConclusion= document.createTextNode(currentResult);
                currentOuputConclusion.appendChild(currentOuputTextConclusion);

                /////

                let conclusionParagraph = document.createElement('p');
                conclusionParagraph.className = "conclusionParagraph";
                conclusionParagraph.appendChild(conclusionText);
                conclusionParagraph.appendChild(firstOperandConclusion);
                conclusionParagraph.appendChild(operatingOperatorConclusion);
                conclusionParagraph.appendChild(secondOperandConclusion);
                conclusionParagraph.appendChild(equalsToConclusion);
                conclusionParagraph.appendChild(currentOuputConclusion);
                conclusionParagraph.appendChild(conclusionTextEndPart);
                document.body.appendChild(conclusionParagraph);

                ///////////////////////


                postfixStack.push(
                    compute( operandRight, symbolToOperator(current), operandLeft)
                );

                let calculationDiv = document.createElement('div');
                calculationDiv.id = "calculationDivId";
                calculationDiv.className="calculationDiv";

                let showStackContentDiv = document.createElement('div');
                let showStackContentTable = document.createElement('table');
                showStackContentDiv.className = "showStackContentDiv";
                showStackContentDiv.id = "showStackContentDivId";
                showStackContentTable.className = "showStackContentTable";

                for(var j = postfixStack.length-1; j >= 0; j--){
                    var row = document.createElement('tr');
                    var cell = document.createElement('td');
                    cell.className = "cell";
                    row.className = "row";
                    var cellText = document.createTextNode(postfixStack[j]);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    showStackContentTable.appendChild(row);
                    showStackContentDiv.appendChild(showStackContentTable);
                }

                let textStack = document.createElement('span');
                textStack.className = "textStack";
                var wrtingText = document.createTextNode("Stack");
                textStack.appendChild(wrtingText);
                showStackContentDiv.appendChild(textStack);

                let showOperationDiv = document.createElement('div');
                showOperationDiv.id = "showOperationDivId";
                showOperationDiv.className = "showOperationDiv";


                let textExpression = document.createElement('p');
                textExpression.className = "textExpression";
                var writingTextExpression = document.createTextNode("Expression...");
                textExpression.appendChild(writingTextExpression);
                showOperationDiv.appendChild(textExpression);

                calculationDiv.appendChild(showStackContentDiv);
                calculationDiv.appendChild(showOperationDiv);
                document.body.appendChild(calculationDiv);

            
            }else{
                postfixStack.push(current);

                let firstTextDiv = document.createElement('div');
                firstTextDiv.className = "firstTextDiv";
                firstTextDiv.id="firstTextDivId";

                let showFirstTextFirstPart = document.createElement('span');
                showFirstTextFirstPart.className="firstTextFirstPart";
                let showFirstTextFirstPartElement = document.createTextNode("The character scanned is (");

                let showFirstTextCurrentNumber = document.createElement('span');
                showFirstTextCurrentNumber.className="firstTextCurrentNumber";
                let showFirstTextCurrentNumberElement = document.createTextNode(postfix[i]);

                
                let showFirstTextSecondPart = document.createElement('span');
                showFirstTextSecondPart.className="firstTextSecondPart";
                let showFirstTextSecondPartElement = document.createTextNode("), which is an operand, so push it to the stack.")

                showFirstTextFirstPart.appendChild(showFirstTextFirstPartElement);
                showFirstTextCurrentNumber.appendChild(showFirstTextCurrentNumberElement);
                showFirstTextSecondPart.appendChild(showFirstTextSecondPartElement);

                let showFirstTextParagraph = document.createElement('p');
                showFirstTextParagraph.className="firstTextParagraph";
                showFirstTextParagraph.appendChild(showFirstTextFirstPart);
                showFirstTextParagraph.appendChild(showFirstTextCurrentNumber);
                showFirstTextParagraph.appendChild(showFirstTextSecondPart);

                firstTextDiv.appendChild(showFirstTextParagraph);
                document.body.appendChild(firstTextDiv);

                let calculationDiv = document.createElement('div');
                calculationDiv.id = "calculationDivId";
                calculationDiv.className="calculationDiv";

                let showStackContentDiv = document.createElement('div');
                let showStackContentTable = document.createElement('table');
                showStackContentDiv.className = "showStackContentDiv";
                showStackContentDiv.id = "showStackContentDivId";
                showStackContentTable.className = "showStackContentTable";

                for(var j = postfixStack.length-1; j >= 0; j--){
                    var row = document.createElement('tr');
                    var cell = document.createElement('td');
                    cell.className = "cell";
                    row.className = "row";
                    var cellText = document.createTextNode(postfixStack[j]);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    showStackContentTable.appendChild(row);
                    showStackContentDiv.appendChild(showStackContentTable);
                }

                let textStack = document.createElement('span');
                textStack.className = "textStack";
                var wrtingText = document.createTextNode("Stack");
                textStack.appendChild(wrtingText);
                showStackContentDiv.appendChild(textStack);

                let showOperationDiv = document.createElement('div');
                showOperationDiv.id = "showOperationDivId";
                showOperationDiv.className = "showOperationDiv";


                let textExpression = document.createElement('p');
                textExpression.className = "textExpression";
                var writingTextExpression = document.createTextNode("Expression...");
                textExpression.appendChild(writingTextExpression);
                showOperationDiv.appendChild(textExpression);

                calculationDiv.appendChild(showStackContentDiv);
                calculationDiv.appendChild(showOperationDiv);
                document.body.appendChild(calculationDiv);
            }
        } 
        let finalMessage = document.createElement('p');
        finalMessage.className = "finalMessage";
        finalMessage.id = "finalMessageId";
        finalMessageText = document.createTextNode("Hence, After Scanning all the characters in the give postfix expression. The final element in the stack is our result.")
        finalMessage.appendChild(finalMessageText);
        document.body.appendChild(finalMessage);

        let dynamicFooter = document.createElement('div');
        dynamicFooter.className = "dynamicFooter";
        dynamicFooterText = document.createTextNode("Thank You for visiting our site. Have a nice day!");
        dynamicFooter.appendChild(dynamicFooterText);
        document.body.appendChild(dynamicFooter);
    }
}