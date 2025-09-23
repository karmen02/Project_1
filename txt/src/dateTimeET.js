const dateFormattedET = function(){
	let timeNow = new Date();
	let dateNow = timeNow.getDate();
	let monthNow = timeNow.getMonth();
	let yearNow = timeNow.getFullYear();
	const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsemer"];
	//console.log("Täna on " + dateNow + "." + (monthNow + 1) + "." + yearNow);
	return dateNow + "." + monthNamesET[monthNow] + " " + yearNow;
}

const dayOfWeekFormattedET = function(){
	let timeNow = new Date();
	const weekDays =  ["pühapäev", "esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev"];
	const dayOfWeek = weekDays[timeNow.getDay()]
	return dayOfWeek;
}

const timeFormattedET = function(){
		let timeNow = new Date();
		//const hours = timeNow.getHours();
		//const minutes = timeNow.getMinutes();
		//const seconds = timeNow.getSeconds();
		//console.log("Kell on ", + hours + ":" + minutes + ":" + seconds);
		return timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds();
}

module.exports = {longDate: dateFormattedET, weekDay: dayOfWeekFormattedET, time: timeFormattedET};