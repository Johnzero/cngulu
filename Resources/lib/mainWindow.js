
exports.createMainWindow = function() {

	var osname = Ti.Platform.osname;
	var isIos = (osname === 'iphone' || osname === 'ipad');
	var isAndroid = (osname === 'android');
	var sdkVersion = parseFloat(Ti.version);

	var ActivityIndicatorStyle;
		if (isIos) {
			ActivityIndicatorStyle = Titanium.UI.iPhone.ActivityIndicatorStyle;
		} else if (sdkVersion >= 3.0){
			ActivityIndicatorStyle = Titanium.UI.ActivityIndicatorStyle;
	}
	actInd = Titanium.UI.createActivityIndicator({
		bottom : "6dp",
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	if (ActivityIndicatorStyle) {
		actInd.style = ActivityIndicatorStyle.PLAIN;
	}
	actInd.font = {
		fontFamily : 'Helvetica Neue',
		fontSize : 15,
		fontWeight : 'bold'
	};
	actInd.color = 'white';
	actInd.message = 'Loading...';
	actInd.width = 210;

	var win = Ti.UI.createWindow({
		title : "咕噜网",
		backgroundColor : "white",
		// font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
		exitOnClose : false	
	});

	var searchbar = Ti.UI.createSearchBar({
		barColor: '#385292',
		showCancel: false,
		rowIndex:1
	});

	scrollView = Ti.UI.createScrollView({
		  contentWidth: 'auto',
		  contentHeight: 'auto',
		  showVerticalScrollIndicator: true,
		  showHorizontalScrollIndicator: false,
		  height: '90%',
		  top:"60dp",
		  left:0,
		  width: '100%',
		  layout: 'vertical'
	});
	var tolerance = 150;

	var scrollListener = function (e) {
	    var bottom = (tableView.getRect().height - e.y) <= (scrollView.getRect().height + tolerance);
	    if (bottom) {
		    // scrollView.removeEventListener('scroll',scrollListener);
		    // require("/lib/extra").createConnection();
		    goTop.show();
	    }else {goTop.hide();}
	
	}
	scrollFetch = function (e) {
	    var bottom = (tableView.getRect().height - e.y) <= (scrollView.getRect().height + tolerance);
	    if (bottom) {
		    scrollView.removeEventListener('scroll',scrollFetch);
		    // require("/lib/extra").createConnection();
	    }
	
	}
	scrollView.addEventListener('scroll', scrollListener);
	scrollView.addEventListener('scroll', scrollFetch);
	win.add(scrollView);

	tableView = Ti.UI.createTableView({
	  	contentWidth: 'auto',
		contentHeight: 'auto',
		width: '100%',
		height:'130dp',
		// height:Ti.UI.FILL,
		// style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		layout: 'vertical',
		search: searchbar
	});
	scrollView.add(tableView);

	advertLabel = Ti.UI.createLabel
	({
		  backgroundColor:'darkgray',
		  text: 'Your advert here',
		  textAlign: 'center',
		  bottom:0,
		  width: Titanium.UI.FILL, 
		  backgroundImage:"/grad.png",
		  height:"30dp"
	});
	advertLabel.addEventListener('click', function(){
		require("/lib/extra").createConnection();
	});
	win.add(advertLabel);

	var goTop = Titanium.UI.createButton({
		height:"40dp",
		width: "40dp",
		right:0,
		bottom:"30dp",
		backgroundImage : "/top.png"
	});
	goTop.addEventListener('click', function()
	{
		tableView.scrollToIndex(1, {animation:Titanium.UI.ANIMATION_CURVE_EASE_OUT});
	});
	goTop.hide();
	win.add(goTop);	
	win.add(actInd);

	return win;

};


