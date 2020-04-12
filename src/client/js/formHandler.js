// ***********************************************************  FETCHING API  *********************************************************** //

/**
 * SCOPE: 
 * performs a post request to fect the Alyen API response
 * extracts JSON from the response and returns it 
 * @param {the API post route in src/server/index.js} url 
 * @param {the user input in frontend via a field} data 
 */
const postRequest = async(url = "", data = {}) => {
    console.log("Post request called...");
    const response = await alyenApiCall(url, data);
    console.log('receiving the response from the API', response);
    try {
        const newData = await response.json();
        console.log('Extracting and returning JSON from response', newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

/**
 * SCOPE:
 * Fetch Alyen API for every endpoint
 * @param {API route defined in server/index.js} url 
 * @param {data captured from frontend field} data 
 */
async function alyenApiCall(url, data) {
    return await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

// ***********************************************************  FETCHING API  *********************************************************** //

// ***********************************************************  API CALLS  *********************************************************** //

/**
 * SCOPE: 
 * capture the value in the usertext field
 * call to postRequest() with the frontend data and the server route
 * call to updateSentimentUI()
 * @param {anchor parameter to leverage the preventDefault() function} event 
 * https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
 */
async function sentimentApi(event) {
    console.log("sentiment API called...");
    try {
        event.preventDefault();
        const userText = document.getElementById("submitText").value;
        const data = await postRequest("http://localhost:8081/sentiment", { userText });
        console.log("Data from sentiment API in Front end: ", data);
        updateSentimentUI(data);
    } catch (error) {
        alert("Please use a valid text format");
    }
}


/**
 * SCOPE: 
 * capture the value in the usertext field
 * call to postRequest() with the frontend data and the server route
 * call to updateClassifyUI()
 * @param {anchor parameter to leverage the preventDefault() function} event 
 * https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
 */
async function classifyApi(event) {
    event.preventDefault();
    const userUrl = document.getElementById("submitUrl").value;
    if (Client.urlValidate(userUrl)) {
        const data = await postRequest("http://localhost:8081/classify", { userUrl });
        // console.log("Data from classify API in Front end: ", data);
        updateClassifyUI(data);
    } else {
        let please = "Please use a valid URL format\n"
        let example = 'Example: http://www.google.com'
        alert(please.concat(example));
    }
}

/**
 * SCOPE: 
 * capture the value in the usertext field
 * call to postRequest() with the frontend data and the server route
 * call to updateSentimentUI()
 * @param {anchor parameter to leverage the preventDefault() function} event 
 * https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
 */
async function entityApi(event) {
    console.log("entity API called...");
    try {
        event.preventDefault();
        const userEntityText = document.getElementById("submitEntityText").value;
        const data = await postRequest("http://localhost:8081/entity", { userEntityText });
        // Microsoft
        // console.log("Data from entity API in Front end: ", data.entities.organization[0]);
        // console.log("Data from entity API in Front end: ", data.entities);
        updateEntityUI(data);
    } catch (error) {
        alert("Please use a valid text format");
    }
}

// ***********************************************************  API CALLS  *********************************************************** //

// ***********************************************************  COLLECT UI DATA  *********************************************************** //

/**
 * SCOPE:
 * captures user-input data
 * returns the resulting variables to be used in updateEntityUI()
 * @param {Variable to contain the API data} data 
 */
function captureEntityFrontendData(data) {
    const organization = data.entities.organization[0];
    const date = data.entities.date[0];

    const textOrganization = document.getElementById("organization");
    const textDate = document.getElementById("date");

    textOrganization.innerHTML = `Organization: ${organization}, `;
    textDate.innerHTML = `Date: ${date}.`;
}

/**
 * SCOPE:
 * captures user-input data
 * formats user-input data
 * returns the resulting variables to be used in updateSentimentUI()
 * @param {variable} polarity_confidence 
 * @param {variable} polarity 
 */
function sentimentFrontendData(polarity_confidence, polarity) {
    console.log("sentimentFrontendData called...");
    const textPolarity = document.getElementById("polarity");
    const textPolarityConfidence = document.getElementById("polarity_confidence");
    // variables formatting
    const polarityConfidenceFormat = polarity_confidence.toFixed(3);
    const capitalisePolarity = polarity.charAt(0).toUpperCase() + polarity.slice(1);

    console.log(textPolarity, capitalisePolarity, textPolarityConfidence, polarityConfidenceFormat);
    return { textPolarity, capitalisePolarity, textPolarityConfidence, polarityConfidenceFormat };
}

/**
 * SCOPE:
 * captures user-input data
 * formats user-input data
 * returns the resulting variables to be used in updateClassifyUI()
 * @param {variable} polarity_confidence 
 * @param {variable} polarity 
 */
function classifyFrontendData() {
    const classifyLabel = document.getElementById("label");
    const classifyConfidence = document.getElementById("classify_confidence");
    return { classifyLabel, classifyConfidence };
}
// ***********************************************************  COLLECT UI DATA  *********************************************************** //

// ***********************************************************  UPDATE FRONTEND UI  *********************************************************** //

/**
 * SCOPE: updates the frontend with the data gathered from sentimentFrontendData()
 * @param {the API response data} data 
 */
const updateSentimentUI = async data => {
    console.log("updateSentimentUI called...");
    try {
        // ES6 Destructuring assignment
        const {
            polarity,
            polarity_confidence
        } = data;
        const {
            textPolarity,
            capitalisePolarity,
            textPolarityConfidence,
            polarityConfidenceFormat
        } = sentimentFrontendData(polarity_confidence, polarity);
        textPolarity.innerHTML = `Text sentiment: ${capitalisePolarity}, `;
        textPolarityConfidence.innerHTML = `Text confidence ${polarityConfidenceFormat}.`;
    } catch (error) {
        const unsupportedText = "The text doesn't have the necessary attributes!\n"
        const sentimentTryAgain = 'Read why at https://docs.aylien.com/textapi/endpoints/?javascript#sentiment-analysis'
        alert(unsupportedText.concat(sentimentTryAgain));
    }
};


/**
 * SCOPE: 
 * updates the frontend with the data gathered from classifyFrontendData()
 * @param {the API response data} data 
 */
const updateClassifyUI = async data => {
    try {
        // ES6 Destructuring assignment
        const {
            label,
            confidence
        } = data.categories[0];
        const {
            classifyLabel,
            classifyConfidence
        } = classifyFrontendData();
        classifyLabel.innerHTML = `Article Label ${label}, `;
        classifyConfidence.innerHTML = `Article Confidence ${confidence}.`;
    } catch (error) {
        let unsupportedUrl = "The URL doesn't have the necessary attributes!\n"
        let classifyTryAgain = 'Read why at https://docs.aylien.com/textapi/endpoints/?javascript#classification'
        alert(unsupportedUrl.concat(classifyTryAgain));
    }
};

/**
 * SCOPE: updates the frontend with the data gathered from sentimentFrontendData()
 * @param {the API response data} data 
 */
const updateEntityUI = async data => {
    console.log("updateSentimentUI called...");
    try {
        captureEntityFrontendData(data);
    } catch (error) {
        const unsupportedText = "The text doesn't have the necessary attributes!\n"
        const sentimentTryAgain = 'Read why at https://docs.aylien.com/textapi/endpoints/#entity-extraction'
        alert(unsupportedText.concat(sentimentTryAgain));
    }
};

// ***********************************************************  UPDATE FRONTEND UI  *********************************************************** //


export { sentimentApi, classifyApi, entityApi };