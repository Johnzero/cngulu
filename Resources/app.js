// create a base window

var _ = require('/lib/underscore');
var functions = require('/lib/functions');
var slider = require('/ui/slider').createSlider();
var mainWindow = require("/ui/mainWindow");
var contentWindow = require("/ui/contentWindow");
Ti.include("/lib/event.js");

osname = Ti.Platform.osname;
isIos = (osname === 'iphone' || osname === 'ipad');
isAndroid = (osname === 'android');
sdkVersion = parseFloat(Ti.version);
if (isIos) {
	ActivityIndicatorStyle = Titanium.UI.iPhone.ActivityIndicatorStyle;
} else if (sdkVersion >= 3.0){
	ActivityIndicatorStyle = Titanium.UI.ActivityIndicatorStyle;
}

advertLabel = Ti.UI.createLabel
({
	backgroundColor:'darkgray',
	text: '咕噜网@安徽木森网络科技有限公司',
	textAlign: 'center',
	bottom:0,
	width: Titanium.UI.FILL, 
	backgroundImage:"/grad.png",
	height:"30dp"
});


goTop = Titanium.UI.createButton({
	height:"40dp",
	width: "40dp",
	right:0,
	bottom:"30dp",
	zIndex : 100,
	// backgroundDisabledImage: '/images/BUTT_drk_off.png'
	backgroundImage : "/top1.png",
	backgroundSelectedImage:'/top2.png'
});


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
	title : '咕噜网',
	actInd : "actInd_main",
	scrollView : "scrollView_main",
	tableView : "tableView_main",
	listView : "listView_main",
	createWindowFunction : mainWindow.createMainWindow
}, {
	title : '我说你听',
	actInd : "actInd_speak",
	scrollView : "scrollView_speak",
	tableView : "tableView_speak",
	listView : "listView_speak",
	createWindowFunction : contentWindow.createMainWindow
}, {
	title : '人物访谈',
	actInd : "actInd_man",
	scrollView : "scrollView_man",
	tableView : "tableView_man",
	createWindowFunction :  mainWindow.createMainWindow
}, {
	title : '互联网',
	actInd : "actInd_web",
	scrollView : "scrollView_web",
	tableView : "tableView_web",
	createWindowFunction :  mainWindow.createMainWindow
}, 	{
	title : 'IT业界',
	actInd : "actInd_it",
	scrollView : "scrollView_it",
	tableView : "tableView_it",
	createWindowFunction :  mainWindow.createMainWindow
},	{
	title : '手机数码',
	actInd : "actInd_phone",
	scrollView : "scrollView_phone",
	tableView : "tableView_phone",
	createWindowFunction :  mainWindow.createMainWindow
},	{
	title : '掌上应用',
	actInd : "actInd_app",
	scrollView : "scrollView_app",
	tableView : "tableView_app",
	createWindowFunction :  mainWindow.createMainWindow
},	{
	title : '创业投资',
	actInd : "actInd_invest",
	scrollView : "scrollView_invest",
	tableView : "tableView_invest",
	createWindowFunction :  mainWindow.createMainWindow
},	{
	title : '游戏',
	actInd : "actInd_game",
	scrollView : "scrollView_game",
	tableView : "tableView_game",
	createWindowFunction :  mainWindow.createMainWindow
},	{
	title : '观点评论',
	actInd : "actInd_point",
	scrollView : "scrollView_point",
	tableView : "tableView_point",
	createWindowFunction :  mainWindow.createMainWindow
},	{
	title : '电子商务',
	actInd : "actInd_taobao",
	scrollView : "scrollView_taobao",
	tableView : "tableView_taobao",
	createWindowFunction :  mainWindow.createMainWindow
},];

var winData = [];

_.each(win, function(obj, i) {
	slider.addWindow({
		title : obj.title,
		actInd : obj.actInd,
		scrollView : obj.scrollView,
		tableView : obj.tableView,
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
	// require("/lib/extra").createConnection();
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
