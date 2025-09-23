const http = require("http");
const dateET = require("./src/dateTimeET");
const textRef = "txt/vanasonad.txt";
const pageBegin = '<!DOCTYPE html>\n<html lang="et">\n<head>\n<meta charset="utf-8">\n<title>Kaia Runthal, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '<h1>Kaia Runthal, veebiprogrammeerimine</h1>\n<p>See leht on tehtud <a href="https://www.tlu.ee">Tallinna Ülikooli</a> veebiprogrammeerimise kursusel ja ei sisalda mõistlikku sisu.</p>\n<p>Mulle meeldib väga käia <a href="https://tallinnzoo.ee/">Loomaaias</a> ja loodan sinna varsti jälle minna.</p>\n<hr>'
const pageEnd = '</body></html>'

const fs = require("fs"); //native moodul "raamatukogus", nüüd fs mooduli fun.-d meie kasutada

function pickOneWisdom(rawText){
	let oldWisdomList = rawText.split(";");
	let wisdom = oldWisdomList[Math.round(Math.random()* (oldWisdomList.length -1))];
	return wisdom;
}

function showAllWisdom(rawText){
	let oldWisdomList = rawText.split(";");
	let htmlList = "<ol>\n";
	for (let i = 0; i < oldWisdomList.length; i++) {
		htmlList += "\t<li>" + oldWisdomList[i] + "</li>\n";
	}
	htmlList += "</ol>\n";
	return htmlList;
}

function readTextFile(fileRef){  //fileRef - selle fun-i lokaalne muutuja
	fs.readFile(fileRef, "utf8", (err, data)=>{ 
		if(err){
			console.log(err);
		} else {
			console.log(data);
			if(Math.round(Math.random()) == 0) {
				(pickOneWisdom(data));
			} else {
				(showAllWisdom(data));
			}
		}
	});
}

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageBegin);
	res.write(pageBody);
	res.write("<p>Täna on " + dateET.longDate() + ".</p>\n");

	fs.readFile(textRef, "utf8", (err, data) => {
		if(err){
			// kui faili lugemine ebaõnnestub
			res.write("<p>Kahjuks ühtki vanasõna pakkuda ei ole!</p>\n");
		} else {
			if(Math.round(Math.random()) === 0){
				res.write("<p>Tänane vanasõna on: " + pickOneWisdom(data) + "</p>\n");
			} else {
				res.write("<h3>Kõik vanasõnad:</h3>\n");
				res.write(showAllWisdom(data));
			}
		}
		res.write(pageEnd);
		res.end();
	});

}).listen(5205);