// create a base window

var _ = require('/lib/underscore');
var functions = require('/lib/functions');
var slider = require('/ui/slider').createSlider();
var mainWindow = require("/ui/mainWindow");
var contentWindow = require("/ui/contentWindow");
Ti.include("/lib/event.js");

var baseWindow = Ti.UI.createWindow({
	backgroundColor : 'black',
	navBarHidden : true,
	exitOnClose : true,
	fullscreen: false,
	activity : {
			onCreateOptionsMenu : function(e) {
				var menu = e.menu;
				var m1 = menu.add({ title : 'Close Window' });
				m1.setIcon(Titanium.Android.R.drawable.ic_menu_close_clear_cancel);
				m1.addEventListener('click', function(e) {
					baseWindow.close();
				});
			}
	}
});

var win = [{
	title : '首页',
	createWindowFunction : mainWindow.createMainWindow
}, {
	title : '我说你听',
	createWindowFunction : contentWindow.createContentWindow
}, {
	title : '人物访谈',
	createWindowFunction : functions.createPurpleWindow
}, {
	title : '互联网',
	createWindowFunction : functions.createYellowWindow
}, 	{title : 'IT业界',
	createWindowFunction : functions.createYellowWindow
},	{title : '手机数码',
	createWindowFunction : functions.createYellowWindow
},	{title : '掌上应用',
	createWindowFunction : functions.createYellowWindow
},	{title : '创业投资',
	createWindowFunction : functions.createYellowWindow
},	{title : '游戏',
	createWindowFunction : functions.createYellowWindow
},	{title : '观点评论',
	createWindowFunction : functions.createYellowWindow
},	{title : '电子商务',
	createWindowFunction : functions.createYellowWindow
},];

var winData = [];

_.each(win, function(obj, i) {
	slider.addWindow({
		createFunction : obj.createWindowFunction
	});
	winData.push({
		title : obj.title,
		height : "40dp",
		font:{fontSize:"13dp", fontWeight:'bold'}
	});
});

var table = Ti.UI.createTableView({
	rowHeight : '80dp'
});
table.setData(winData);

table.addEventListener('click', function(e) {
	Ti.API.debug('table heard click');
	slider.selectAndClose(e.index);
});

baseWindow.add(table);
baseWindow.add(slider);

// You can preload windows as well
// slider.preLoadWindow(0);

slider.close();

// UN REM if you want it to start closed
//slider.close();

var started = false;

baseWindow.addEventListener('open', function() {
	/* Wierd - open event on baseWindow gets fired
	 every time slider fires event 'open'. Using
	 started variabled to make sure this only gets
	 run once */
	require("/lib/extra").createConnection();
	if (!started) {
		slider.showWindow(0);
		started = true;
	}

});

function listenForBackButton() {
	slider.back();
}

slider.addEventListener('open', function() {
	Ti.API.debug('baseWindow heard open');
	baseWindow.removeEventListener('android:back', listenForBackButton);
});

slider.addEventListener('close', function() {
	Ti.API.debug('baseWindow heard close');
	baseWindow.addEventListener('android:back', listenForBackButton);
});

baseWindow.open({
	animated : true,
	fullscreen : true,
	activityEnterAnimation : Ti.Android.R.anim.fade_in,
    activityExitAnimation : Ti.Android.R.anim.fade_out
});
