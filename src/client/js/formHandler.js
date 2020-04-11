/**
 * SCOPE: performs a post request to fect the Alyen API response
 * @param {the API post route in src/server/index.js} url 
 * @param {the user input in frontend via a field} data 
 */
const getRequest = async(url = "", data = {}) => {
    console.log("Get request...");
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    console.log(response);
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

/**
 * SCOPE: 
 * capture the value in the usertext field
 * make an API call via getRequest() to the Alyen sentiment API
 * update frontend via updateSentimentUI()
 * @param {anchor parameter to leverage the preventDefault() function} event 
 * https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
 */
async function sentimentApi(event) {
    try {
        event.preventDefault();
        const userText = document.getElementById("submitText").value;
        const data = await getRequest("http://localhost:8081/sentiment", { userText });
        console.log("Data from sentiment API in Front end: ", data.polarity);
        updateSentimentUI(data);
    } catch (error) {
        let please = "Please use a valid URL format\n"
        let example = 'Example: http://www.google.com'
        alert(please.concat(example));
    }
}

/**
 * SCOPE: 
 * capture the value in the usertext field
 * make an API call via getRequest() to the Alyen sentiment API
 * update frontend via updateClassifyUI()
 * @param {anchor parameter to leverage the preventDefault() function} event 
 * https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
 */
async function classifyApi(event) {
    event.preventDefault();
    const userUrl = document.getElementById("submitUrl").value;
    if (Client.urlValidate(userUrl)) {
        const data = await getRequest("http://localhost:8081/classify", { userUrl });
        // console.log("Data from classify API in Front end: ", data);
        updateClassifyUI(data);
    } else {
        let please = "Please use a valid URL format\n"
        let example = 'Example: http://www.google.com'
        alert(please.concat(example));
    }
}

/**
 * SCOPE: update the frontend with the data gathered from sentimentApi() call
 * @param {the API response data} data 
 */
const updateSentimentUI = async data => {
    try {
        const {
            polarity,
            polarity_confidence
        } = data;
        const textPolarity = document.getElementById("polarity");
        const textPolarityConfidence = document.getElementById("polarity_confidence");
        const polarityConfidenceFormat = polarity_confidence.toFixed(3);
        const capitalisePolarity =
            polarity.charAt(0).toUpperCase() + polarity.slice(1);

        textPolarity.innerHTML = `Text sentiment: ${capitalisePolarity}, `;
        textPolarityConfidence.innerHTML = `Text confidence ${polarityConfidenceFormat}.`;
    } catch (error) {
        let unsupportedText = "The text doesn't have the necessary attributes!\n"
        let sentimentTryAgain = 'Read why at https://docs.aylien.com/textapi/endpoints/?javascript#sentiment-analysis'
        alert(unsupportedText.concat(sentimentTryAgain));
    }
};

/**
 * SCOPE: update the frontend with the data gathered from classifyApi() call
 * @param {the API response data} data 
 */
const updateClassifyUI = async data => {
    try {
        const {
            label,
            confidence
        } = data.categories[0];
        const classifyLabel = document.getElementById("label");
        const classifyConfidence = document.getElementById("classify_confidence");

        classifyLabel.innerHTML = `Article Label ${label}, `;
        classifyConfidence.innerHTML = `Article Confidence ${confidence}.`;
    } catch (error) {
        let unsupportedUrl = "The URL doesn't have the necessary attributes!\n"
        let classifyTryAgain = 'Read why at https://docs.aylien.com/textapi/endpoints/?javascript#classification'
        alert(unsupportedUrl.concat(classifyTryAgain));
    }
};

export { sentimentApi, classifyApi };