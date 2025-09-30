//function dateFormattedET(){
exports.dateFormattedET = function(){
	let timeNow = new Date();
	let dateNow = timeNow.getDate();
	let monthNow = timeNow.getMonth();
	let yearNow = timeNow.getFullYear();
	const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsemer"];
	//console.log("Täna on " + dateNow + "." + (monthNow + 1) + "." + yearNow);
	return dateNow + "." + monthNamesET[monthNow] + " " + yearNow;
}