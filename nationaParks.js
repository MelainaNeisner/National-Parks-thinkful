'use strict';


// const apiKey = 'e1gKVhHFHex2oU33xUMUqR2ToBe0lOZ9xAWYCIdJ'; 
// const searchURL = 'https://developer.nps.gov/api/v1/parks';
// `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${key}=${params[key]}`);
  return queryItems.join('&');    
}
function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    // Clearing previous results
    $('#js-error-message').empty();
    $('#results-list').empty();
    // Looping through the response and formatting results
    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('#results-list').append(`
              <li>
                <h3>
                  <a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a>
                </h3>
                <p>${responseJson.data[i].description}</p>
              </li>`
         );
    }
    $('.results').removeClass('hidden');
}

function getParks(searchUrl, stateAbrv, maxResults, apiKey) {
    // Setting up parameters
    const params = {
        stateCode: stateAbrv,
        limit: maxResults
    }
    // Creating url string
    const queryString = formatQueryParams(params);
    const url = searchUrl + '?' + queryString + '&api_key=' + apiKey;
    // Fetch information, if there's an error display a message
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('#js-form').on('submit', function(event) { 
    event.preventDefault();
    let stateAbrv = $('#js-search-term').val().split(",");
    let maxResults = $('#js-max-results').val();
    let apiKey = 'e1gKVhHFHex2oU33xUMUqR2ToBe0lOZ9xAWYCIdJ';
    let searchURL = 'https://developer.nps.gov/api/v1/parks';
    getParks(searchURL, stateAbrv, maxResults, apiKey);
  })  
}


$(watchForm);