const http = require("http");
const url = require("url");
//lisame mooduli failitee kasutamiseks
const path = require("path");
const fs = require("fs");
const dateEt = require("./src/dateTimeET");
const textRef = "txt/vanasonad.txt";
const pageBegin = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Andrus Rinde, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Karmen Kõiv, veebiprogrammeerimine</h1>\n\t<p>See leht on tehtud <a href="https://www.tlu.ee/dt">Tallinna أœlikooli</a> veebiprogrammeerimise kursusel ja ei sisalda mأµistlikku sisu.</p><p>Kأ¤sitleme HTML keelt ja siis Node.Js programmeerimiskeelt.</p>\n\t<hr>';
const pageBanner = '<img src="vp_banner_2025_ID.jpg" alt="kursuse bänner">';
const pageEnd = '\n</body>\n</html>';

http.createServer(function(req, res){
	console.log("Päring: " + req.url);
	
		let currentUrl = url.parse(req.url, true);
		console.log("Parsituna: " + currentUrl.pathname);
		
		if(currentUrl.pathname === "/"){
			res.writeHead(200, {"Content-type": "text/html"});
			res.write(pageBegin);
			res.write(pageBanner);
			res.write(pageBody);
			res.write("\n\t<p>Tأ¤na on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p><p>Kahjuks tأ¤naseks أ¼htki vanasأµna vأ¤lja pakkuda pole!</p>");
			res.write(pageEnd);
			return res.end();
		} 
		else if(currentUrl.pathname ==="/vanasonad"){
			res.writeHead(200, {"Content-type": "text/html"});
			fs.readFile(textRef, "utf8", (err, data)=>{
				if(err){
					res.write(pageBegin);
					res.write(pageBanner);
					res.write(pageBody);
					res.write("\n\t<p>Tأ¤na on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p><p>Kahjuks tأ¤naseks أ¼htki vanasأµna vأ¤lja pakkuda pole!</p>");
					res.write(pageEnd);
			return res.end();
		} else {
			let oldWisdomList = data.split(";");
			let folkWisdomOutput = "\n\t<ol>";
			for (let i = 0; i < oldWisdomList.length; i ++){
				folkWisdomOutput += "\n\t\t<li>" + oldWisdomList[i] + "</li>";
			}
			folkWisdomOutput += "\n\t</ol>";
			res.write(pageBegin);
			res.write(pageBanner);
			res.write(pageBody);
			res.write("\n\t<p>Tأ¤na on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
			res.write("\n\t<h2>Valik Eesti vanasأµnu</h2>")
			res.write(folkWisdomOutput);
			res.write(pageEnd);
			return res.end();
		}
	});
}
else if (currentUrl.pathname === "/vp_banner_2025_ID.jpg"){
	//liidame muidu veebiserverile kätte saamatu kataloogi"pildid" meie veebifailiteega
	let bannerPath = path.join(__dirname, "pildid");
	fs.readFile(bannerPath + currentUrl.pathname, (err, data)=>{
		if (err) {
			throw(err);
		} 
		else {
			res.writeHead(200, {"Content-type": "image/jpeg"});
			res.end(data);
		}
	});
	
}

else { 
	res.end ("Viga 404, veebisaiti ei eksisteeri");
}
	
}).listen(5222);