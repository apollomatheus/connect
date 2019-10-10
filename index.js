var fs = require('fs');
var path = require("path");
var express = require("express");

var DIST_DIR = path.join(__dirname, "build");
var PORT = 80;
var app = express();

const existsFile = function(reqpath) {
 try {
  console.log(reqpath);
  const exist = fs.statSync(reqpath);
  return exist;
 } catch (e) { }
 return false;
}
//Serving the files on the dist folder
//app.use(express.static(DIST_DIR));

const sendFile = function(req,res) {
  var filepath = path.join(DIST_DIR, req.originalUrl);
  console.log(filepath);
  if (!existsFile(filepath)) res.send('Cannot find '+req.originalUrl);
  else res.sendFile(filepath);
}

app.get("/js/*.js", sendFile);

app.get("*.html", sendFile);

app.get("/css/*.css", sendFile);

app.get("/data/*", sendFile);


app.listen(PORT, ()=>{
   console.log('listening at', PORT);
});
