/* 1.
We want to take a user generated budget.
somehow loop/multiply it by pctPortfolio for all 8 variables.
return the ticker & amount calculated on the website.

2.
Allow a user to input their own stocks.
Recalculate amount of portfolio each time a user inputs a new value.

3.
Fetch real time data from an API to update data.


*/
 
const budgetInput = document.getElementById('budget-input'); /* this */
// console.dir("BUDGET INPUT OBJECT: ", budgetInput);
const buttonsArray = document.getElementsByClassName('budget-button'); 
// console.log("BUTTON OBJECT", buttonsArray);
const resultDiv = document.getElementById('return-values');


function appendStocksToHTML(name, investmentAmount) {
    // Create <p></p> tags to store investment update
    const stockNode = document.createElement("p");
    // Create InvestmentNamne: [someNumber] string to put in P tag
    const stockStringNode = document.createTextNode(`${name}: ${investmentAmount}`);
    // Put string in p tags <p>[string]</p>
    stockNode.appendChild(stockStringNode);
    // Put p tag with string in result div <div><p>[string]</p></div>
    resultDiv.appendChild(stockNode);  
}

function Stocks(name, ticker, price, pctPortfolio) {
    this.name = name;
    this.ticker = ticker;
    this.price = price;
    this.pctPortfolio = pctPortfolio;

    this.calculateInvetsAmt = function multiplierFn(budget) {
        let investAmt = this.pctPortfolio * budget;
        // console.log(`${this.name}: ${investAmt}`);  
        appendStocksToHTML(this.name, investAmt);
        return investAmt;
    };


    /* declare a function to apply each time user creates another obj/stock? */
};

// Look up setInterval and fetch for api work

let stockSPY  = new Stocks('S&P500 ETF', 'SPY', 322.41, .15)
let stockSPEM = new Stocks('Emerging Market ETF','SPEM', 37.66, .15)
let stockTLT  = new Stocks('Long Term US Bond ETF', 'TLT', 137.90, .20)
let stockIEF  = new Stocks('Intermediate Term US Bond ETF', 'IEF', 111.26, .15)
let stockGLD  = new Stocks('Gold ETF', 'GLD', 148.12, .075)
let stockSLV  = new Stocks('Silver ETF', 'SLV', 17.20, .075)
let stockDBC  = new Stocks('Commodities ETF', 'DBC', 16.21, .10)
let stockUSD  = new Stocks('Cash', '', '', .10) /* I want this to be user generated */



function buttonClickHandler(event) {
    while (resultDiv.firstChild) { // Equivalent to saying.. as long as there is a child..
        // Remove it - This keeps only one result div visible.
        resultDiv.removeChild(resultDiv.firstChild);
    }
    // console.log("EVENT OBJECT: ", event);
    const budget = budgetInput.value;
    // console.log("THE BUDGET FOR THIS IS: ", budget);
    stockSPY.calculateInvetsAmt(budget);
    stockSPEM.calculateInvetsAmt(budget);
    stockTLT.calculateInvetsAmt(budget);
    stockIEF.calculateInvetsAmt(budget);
    stockGLD.calculateInvetsAmt(budget);
    stockSLV.calculateInvetsAmt(budget);
    stockDBC.calculateInvetsAmt(budget);
    stockUSD.calculateInvetsAmt(budget);   
}


for (let i = 0; i < buttonsArray.length; i ++) {
    buttonsArray[i].addEventListener("click", buttonClickHandler);
}
   
// multiplier(stockSPY);