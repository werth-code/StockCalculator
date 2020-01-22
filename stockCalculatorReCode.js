const stockName = document.getElementById('stock-name');
const tickerName = document.getElementById('ticker-name');
const currentPrice = document.getElementById('current-price');
const percentOfPortfolio = document.getElementById('pct-portfolio');

const stockInputButton = document.getElementById('stock-button');
const resultsDiv = document.getElementById('return-values');

stockInputButton.addEventListener("click", AddUserStocks); 

function AddUserStocks() {
    
    const userNameInput = stockName.value;
    const userTickerInput = tickerName.value;
    const userPriceInput = currentPrice.value;
    const userPctInput = percentOfPortfolio.value;

    const stockNode = document.createElement("p");
    const stockStringNode = document.createTextNode(`Stock Name: ${userNameInput} Ticker: ${userTickerInput} Current Price: ${userPriceInput} Percent Of Portfolio: ${userPctInput}`);
    stockNode.appendChild(stockStringNode);
    // Put p tag with string in result div <div><p>[string]</p></div>
    resultsDiv.appendChild(stockNode); 
    };


AddUserStocks();


function CreateStockObject(name, ticker, price, pctPortfolio) {
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

};


let userStock  = new CreateStockObject(stockName.value, tickerName.value, currentPrice.value, percentOfPortfolio.value);

