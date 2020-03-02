var http = require("http");
var fs = require("fs");
var axios = require("axios");
const PORT = process.env.PORT || 5000;

http
  .createServer(function(request, res) {
    res.writeHead(200, { "Content-Type": "text/html" });

    const promise = axios
      .get("http://omdbapi.com/?s=star+wars&apikey=cded8a70")
      .then(response => {
        const data = response.data;
        console.log(data);
        var html = parse(data);
        res.write(html);
      });
    console.log(promise);
  })
  .listen(PORT);
console.log("Server running at http://127.0.0.1:8081/");

function parse(data) {
  var html = "<table border='1'>";
  for (var i = 0; i < 10; i++) {
    html += "<tr>";
    html += "<td>" + data.Search[i].Title + "</td>";
    html += "<td>" + data.Search[i].Year + "</td>";
    html += "<td>" + data.Search[i].imdbID + "</td>";
    html += "<td>" + data.Search[i].Type + "</td>";
    html += "<td><img src='" + data.Search[i].Poster + "'></td>";
    html += "</tr>";
  }
  return html;
}
