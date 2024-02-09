let pdfId = "";
onmessage = function (event) {
  pdfId = event.data;
  timer();
};

// start the timer to retrieve the document
function timer() {
  let headers = new Headers();
  headers.append("Authorization", "Bearer eRddESYbNQvRbsAaMStq");
  headers.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers
  };

  fetch(`https://api.pdfmonkey.io/api/v1/documents/${pdfId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("result", result);
      if (result?.document?.status == 'success') {
        postMessage(result.document.download_url);
      } else {
        setTimeout("timer()", 3000);
      }
    })
}
