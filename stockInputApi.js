// Each new chart needs to replace the old one - not just layer on top!
// The numbers across the bottom (0 - 100) need to be dates like 9/1-11/4


const initialApiCall = 'https://www.alphavantage.co/query?';
const initialTimeSeries = 'function=TIME_SERIES_DAILY_ADJUSTED&symbol=';
const initialTickerName = document.getElementById('ticker-name');
const initialInterval = '&interval=5min&outputsize=compact';
const apiKey = '&apikey=MY2KRNKBF3J5B7O4';

//Submit Button in HTML.
const submitTickerButton = document.getElementById("stock-submit-button");
submitTickerButton.addEventListener("click", getData)

//Arrays to push/access returned API object.
let nameTopChart = "Stock"; // Name of the chart
const xLabels = ['Dates']; // chart years
const yLabels = []; // chart trade price
let dataArray = ['Price']; ////

//Called immediately so that a chart is visible upon loading the page.
chartIt();

//Calling the API / Creating the URL string / Sending Object data to Arrays / Re-Call chartIt()
async function getData() {
    const returnedObj = await fetch(initialApiCall + initialTimeSeries + initialTickerName.value + initialInterval + apiKey);
    const returnedData = await returnedObj.json();
    const newLabel = returnedData['Meta Data']['2. Symbol'];
    const timeData = returnedData['Time Series (Daily)'];
    const arrayOfDateKeys = Object.keys(timeData);
    nameTopChart = newLabel;

    console.log("ARRAY OF DATE KEYS: ", arrayOfDateKeys, timeData);

   for(let i = 0; i <= arrayOfDateKeys.length; i++) {
        xLabels.push([i])
   }
    
    console.log('THIS ' + xLabels)

    dataArray = arrayOfDateKeys.map(dateKey => timeData[dateKey]['4. close']);

    chartIt();

} 

function chartIt () {
    const ctx = document.getElementById('myChart').getContext('2d');
    console.log(nameTopChart, '\n', "Data: ", dataArray);
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            //This should show each day in 'Time Series (Daily)' but I'm missing something.
            labels: xLabels.reverse(), 
            datasets: [{
                //Adds/Replaces text at top of the chart
                label: nameTopChart,
                //This should show the stock price in dollars.
                data: dataArray.reverse(),
                //Colors and chart styling.
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
    });
};