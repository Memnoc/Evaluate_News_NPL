function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('article').value
    Client.checkForName(formText)
    let requestBody = {
        url: formText
    };

    console.log("::: Form Submitted :::")
    fetch("http://localhost:8081/sentiment", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    });

    console.log(requestBody)
        .then(res => res.json())
        .then(function(res) {
            document.getElementById('polarity').innerHTML = res.polarity
            document.getElementById('subjectivity').innerHTML = res.subjectivity

        })
}

export { handleSubmit }