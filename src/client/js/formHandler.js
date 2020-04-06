export const handleSubmit = (event) => {
    event.preventDefault()
        // check what text was put into the form field
    let formText = document.getElementById('hyperlink').value
    console.log(formText)
    if (Client.urlValidate(formText)) {
        const sendDataAylien = async(url, data = {}) => {
            const response = await fetch(url, {
                method: "POST",
                credentials: "same-origin",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
        };
        sendDataAylien("http://localhost:8081/sentiment", { url: formText })
            .then(
                function(res) {
                    res = '';
                    document.getElementById('polarity').innerHTML = res.polarity
                    document.getElementById('subjectivity').innerHTML = res.subjectivity
                }
            )
    } else {
        console.log('Not an URL');
    }
}