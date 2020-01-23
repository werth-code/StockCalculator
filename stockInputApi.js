// Help using chrome to access the object returned from the API?
// Loop through the data? / Have it show on the chart
// Get the stock API data to show up on the chart
// How do I get everything to load in correct order/think about async data 
// Practice using GIT. I am failing.


//API Variables to create the URL string.
const initialApiCall = 'https://www.alphavantage.co/query?';
const initialTimeSeries = 'function=TIME_SERIES_DAILY_ADJUSTED&symbol=';
const initialTickerName = document.getElementById('ticker-name');
const initialInterval = '&interval=5min&outputsize=compact';
const apiKey = '&apikey=MY2KRNKBF3J5B7O4';

//Submit Button in HTML.
const submitTickerButton = document.getElementById("stock-submit-button");
submitTickerButton.addEventListener("click", getData)

//Arrays to push/access returned API object.
let nameTopChart = "Blank"; // Name of the chart
const xLabels = []; // chart years
const yLabels = []; // chart trade price
let dataArray = []; ////

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
    dataArray = arrayOfDateKeys.map(dateKey => timeData[dateKey]['4. close']);


// nameTopChart.splice(0,1,returnedData['Meta Data']['2. Symbol']);
// xLabels.splice(0,1, returnedData['Time Series (Daily)']);//price?
// yLabels.splice(0,1, returnedData['Time Series (Daily)']);
     chartIt();

}  // xLabels[0].for (const key in object) {
    //if (object.hasOwnProperty(key)) {
      //  const element = object[key];
        
   // }
// }
    
// });



function chartIt () {
    const ctx = document.getElementById('myChart').getContext('2d');
    console.log(nameTopChart, '\n', "Data: ", dataArray);
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            //This should show each day in 'Time Series (Daily)' but I'm missing something.
            labels: xLabels, 
            datasets: [{
                //Adds/Replaces text at top of the chart
                label: nameTopChart,
                //This should show the stock price in dollars.
                data: dataArray,
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