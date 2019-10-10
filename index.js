var path = require("path");
var express = require("express");

var DIST_DIR = path.join(__dirname, "build");
var PORT = 80;
var app = express();

//Serving the files on the dist folder
//app.use(express.static(DIST_DIR));

app.get("*.js", function (req, res) {
  var url = req.originalUrl.split('/');
  if (url.length > 1) {
     url = url[url.length-1];
  }
  res.sendFile(path.join(DIST_DIR, 'js/'+url));
});

app.get("*/popup.html", function (req, res) {
  res.sendFile(path.join(DIST_DIR, 'popup.html'));
});

app.get("*.css", function (req, res) {
  var url = req.originalUrl.split('/');
  if (url.length > 1) {
     url = url[url.length-1];
  }
  res.sendFile(path.join(DIST_DIR, 'css/'+url));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, ()=>{
   console.log('listening at', PORT);
});
