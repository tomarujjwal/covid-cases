const api_url = "https://api.covid19api.com/summary";
var selectId = document.getElementById("country");

function getApiData(URL) {
  fetch(URL)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      displayData(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function displayData(APIdata) {
  const propertyNames = Object.entries(APIdata);

  // Array of Global cases
  var globalCasesArray = Object.entries(propertyNames[2][1]);
  var countriesArray = Object.entries(propertyNames[3][1]);

  // reference
  var globalTotalCases = document.querySelector(".global-totalCases");
  var globalTotalRecovered = document.querySelector(".global-totalRecovered");
  var globalTotalDeaths = document.querySelector(".global-totalDeaths");
  var globalNewCases = document.querySelector(".global-newCases");
  var globalNewRecovered = document.querySelector(".global-newRecovered");
  var globalNewDeaths = document.querySelector(".global-newDeaths");

  globalTotalCases.innerHTML = `${globalCasesArray[1][1]}`;
  globalTotalRecovered.innerHTML = `${globalCasesArray[5][1]}`;
  globalTotalDeaths.innerHTML = `${globalCasesArray[3][1]}`;

  globalNewCases.innerHTML = `${globalCasesArray[0][1]}`;
  globalNewRecovered.innerHTML = `${globalCasesArray[4][1]}`;
  globalNewDeaths.innerHTML = `${globalCasesArray[2][1]}`;

  var singleCountryArray;
  var newIdArray = [];
  for (let i = 0; i < countriesArray.length; i++) {
    singleCountryArray = Object.entries(propertyNames[3][1][i]);
    let opt = document.createElement("option");
    opt.textContent = `${singleCountryArray[1][1]}`;
    opt.setAttribute("value", `${singleCountryArray[0][1]}`);
    opt.setAttribute("id", `${singleCountryArray[0][1]}`);
    selectId.appendChild(opt);
    newIdArray[i] = `${singleCountryArray[0][1]}`;
  }

  const fetchValue = (e) => {
    // displaying table
    var idd = selectId.value;
    if (idd != 0) {
      var table2 = document.getElementById("table-2");
      table2.style.display = "block";

      // loop to find corresponding index
      var correspondingIndex;
      for (let i = 0; i <= newIdArray.length; i++) {
        if (newIdArray[i] == idd) {
          correspondingIndex = i;
          break;
        }
      }

      var found = Object.entries(propertyNames[3][1][correspondingIndex]);

      // reference
      var countryTitle = document.querySelector(".country-name");
      var countryTotalCases = document.querySelector(".country-totalCases");
      var countryTotalRecovered = document.querySelector(
        ".country-totalRecovered"
      );
      var countryTotalDeaths = document.querySelector(".country-totalDeaths");
      var countryNewCases = document.querySelector(".country-newCases");
      var countryNewRecovered = document.querySelector(".country-newRecovered");
      var countryNewDeaths = document.querySelector(".country-newDeaths");

      countryTitle.innerHTML = `${found[1][1]}`;
      countryTotalCases.innerHTML = `${found[5][1]}`;
      countryTotalRecovered.innerHTML = `${found[9][1]}`;
      countryTotalDeaths.innerHTML = `${found[7][1]}`;

      countryNewCases.innerHTML = `${found[4][1]}`;
      countryNewRecovered.innerHTML = `${found[8][1]}`;
      countryNewDeaths.innerHTML = `${found[6][1]}`;
    }
  };
  document
    .querySelector(".changeSelected")
    .addEventListener("click", fetchValue);

  var displaydate = document.querySelector(".displaydate");
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "-" + mm + "-" + yyyy;
  displaydate.innerHTML = formattedToday;
}

getApiData(api_url);
