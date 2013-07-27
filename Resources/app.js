// create a base window

var _ = require('/lib/underscore');
var functions = require('/lib/functions');
var slider = require('/lib/slider').createSlider();
var mainWindow = require("/lib/mainWindow");
var contentWindow = require("/lib/contentWindow");
var flurry = require('sg.flurry');

flurry.setContinueSessionMillis(10000);
flurry.setReportLocation(true);
flurry.setUseHttps(true);
flurry.setCaptureUncaughtExceptions(true);
flurry.onStartSession('Cngulu');
flurry.logEvent('started', {start: 'value'});
flurry.onError('someerror', 'no crash', 'eClass');
flurry.setUserID('tester');
flurry.setAge(10);
flurry.setGender(flurry.MALE); //or use flurry.FEMALE
flurry.onPageView();
flurry.onEndSession(); //make sure you call this or the events won't be set

var baseWindow = Ti.UI.createWindow({
	backgroundColor : 'white',
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
	title : '咕噜网',
	createWindowFunction : mainWindow.createMainWindow
}, {
	title : '资讯',
	createWindowFunction : contentWindow.createContentWindow
}, {
	title : 'Purple',
	createWindowFunction : functions.createPurpleWindow
}, {
	title : 'Yellow',
	createWindowFunction : functions.createYellowWindow
}, {
	title : 'Pink',
	createWindowFunction : functions.createPinkWindow
}];

var winData = [];

_.each(win, function(obj, i) {
	slider.addWindow({
		createFunction : obj.createWindowFunction
	});
	winData.push({
		title : obj.title
	});
});

var table = Ti.UI.createTableView({
	rowHeight : '44dp'
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
	activityEnterAnimation: Ti.Android.R.anim.fade_in,
    activityExitAnimation: Ti.Android.R.anim.fade_out
});
