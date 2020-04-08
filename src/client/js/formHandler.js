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
    const userText = document.getElementById("submitText").value;
    const data = await postData("http://localhost:8081/sentiment", { userText });
    console.log("Data from sentiment API in Front end: ", data);
    updateSentimentUI(data);
}

async function classifyApi(e) {
    e.preventDefault();
    const userUrl = document.getElementById("submitUrl").value;
    const data = await postData("http://localhost:8081/classify", { userUrl });
    console.log("Data from classify API in Front end: ", data);
    updateClassifyUI(data);
}


const updateSentimentUI = async data => {
    try {
        const {
            polarity,
            polarity_confidence,
            text
        } = data;
        const pol = document.getElementById("polarity");
        const sub = document.getElementById("subjectivity");
        const polCon = document.getElementById("polarity_confidence");
        const subCon = document.getElementById("subjectivity_confidence");

        const polarityConfidenceRounded = polarity_confidence.toFixed(3);
        const polarityCapitalized =
            polarity.charAt(0).toUpperCase() + polarity.slice(1);

        pol.innerHTML = ` ${polarityCapitalized}, `;
        polCon.innerHTML = `Confidence ${polarityConfidenceRounded}.`;
    } catch (error) {
        console.log("error", error);
    }
};

const updateClassifyUI = async data => {
    try {
        const {
            label,
            confidence,
            text
        } = data.categories[0];
        const classifyLabel = document.getElementById("label");
        const classifyConfidence = document.getElementById("classify_confidence");

        classifyLabel.innerHTML = `Article Label ${label}, `;
        classifyConfidence.innerHTML = `Confidence ${confidence}.`;
    } catch (error) {
        console.log("error", error);
    }
};


export { sentimentApi, classifyApi };