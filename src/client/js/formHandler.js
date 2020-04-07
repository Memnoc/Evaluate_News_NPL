const postData = async(url = "", data = {}) => {
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

async function sentimentApi(e) {
    e.preventDefault();
    const userInput = document.getElementById("submitText").value;
    const data = await postData("http://localhost:8081/sentiment", { userInput });
    console.log("Data from sentiment API in Front end: ", data);
    updateUI(data);
}

async function classifyApi(e) {
    e.preventDefault();
    const userInput = document.getElementById("submitUrl").value;
    const data = await postData("http://localhost:8081/classify", { userInput });
    console.log("Data from classify API in Front end: ", data);
    // updateUI(data);
}


const updateUI = async data => {
    try {
        const {
            polarity,
            subjectivity,
            polarity_confidence,
            subjectivity_confidence,
            text
        } = data;
        const pol = document.getElementById("polarity");
        const sub = document.getElementById("subjectivity");
        const polCon = document.getElementById("polarity_confidence");
        const subCon = document.getElementById("subjectivity_confidence");
        const polarityCapitalized =
            polarity.charAt(0).toUpperCase() + polarity.slice(1);
        const polarityConfidenceRounded = polarity_confidence.toFixed(3);
        pol.innerHTML = ` ${polarityCapitalized}, `;
        // sub.innerHTML = `Subjectivity: ${subjectivity}.`;
        polCon.innerHTML = `&nbsp with a confidence level of ${polarityConfidenceRounded}.`;
        // subCon.innerHTML = `Subjectivity confidence: ${subjectivity_confidence}.`;
        // userText.innerHMTL = `Your text: ${text}`;
    } catch (error) {
        console.log("error", error);
    }
};


export { sentimentApi, classifyApi };