exports.as = function() {
	alert("adfsasdfasdfasdf");		
}

exports.createGreenWindow =  function () {
	return createGenericWindow('blue');
}

exports.createBlueWindow = function () {
	return createGenericWindow('blue');
}

exports.createPurpleWindow = function () {
	return createGenericWindow('purple');
}

exports.createYellowWindow = function () {
	return createGenericWindow('yellow');
}

exports.createPinkWindow = function () {
	return createGenericWindow('pink');
}

function createGenericWindow(color) {
	var win = Ti.UI.createWindow({
		title : color,
		backgroundColor : color,
		exitOnClose : false
	});

	// var button = Ti.UI.createButton({
	// 	height : '44dp',
	// 	width : '80%',
	// 	title : 'open next window'
	// });
	// button.addEventListener('click', function(e) {
	// 	var newWin = createGenericWindow(get_random_color());
	// 	newWin.nav = win.nav;
	// 	win.nav.openNextWindow(newWin);
	// });
	// win.add(button);
	return win;
}

Date.prototype.format = function(format)
{
	 var o = {
	 "M+" : this.getMonth()+1, //month
	 "d+" : this.getDate(),    //day
	 "h+" : this.getHours(),   //hour
	 "m+" : this.getMinutes(), //minute
	 "s+" : this.getSeconds(), //second
	 "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
	 "S" : this.getMilliseconds() //millisecond
	 }
	 if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
	 (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	 for(var k in o)if(new RegExp("("+ k +")").test(format))
	 format = format.replace(RegExp.$1,
	 RegExp.$1.length==1 ? o[k] :
	 ("00"+ o[k]).substr((""+ o[k]).length));
	 return format;
}

function get_random_color() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}
// exports.OpenEvent = OpenEvent;
