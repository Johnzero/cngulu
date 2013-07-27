
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

	var actInd = Titanium.UI.createActivityIndicator({
		bottom : "15dp",
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	if (ActivityIndicatorStyle) {
		actInd.style = ActivityIndicatorStyle.PLAIN;
	}

	var win = Ti.UI.createWindow({
		title : "咕噜网",
		backgroundColor : "white",
		// font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
		exitOnClose : false	
	});

	var searchbar = Ti.UI.createSearchBar({
		barColor: '#385292',
		showCancel: false
	});

	var scrollView = Ti.UI.createScrollView({
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

	tableView = Ti.UI.createTableView({
	  	contentWidth: 'auto',
		contentHeight: 'auto',
		width: '100%',
		height:'200',
		// height:Ti.UI.FILL,
		// style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		layout: 'vertical',
		search: searchbar
	});

	var label = Ti.UI.createLabel
	({
		  backgroundColor:'darkgray',
		  text: 'Your advert here',
		  textAlign: 'center',
		  bottom:0,
		  width: Titanium.UI.FILL, 
		  backgroundImage:"/grad.png",
		  height:"30dp"
	});
	label.addEventListener('click', function(){
		var test = require("/lib/extra").createConnection();
		Ti.API.info(test+'------------------');
	});

	var button = Titanium.UI.createButton({
		title:'T',
		height:"35dp",
		width:60,
		right:0,
		bottom:"-4dp"
	});
	button.addEventListener('click', function()
	{
		scrollView.scrollTo(0,0);
	});

	var loadingButton = Titanium.UI.createButton({
		title : 'Show',
		height : "10dp",
		width : "10dp",
		top : 55
	});

	var indicatorAdded = false

	loadingButton.addEventListener('click', function() {
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
		if(!indicatorAdded)
		{
			win.add(actInd);
			actInd.show();
			indicatorAdded = true;
		}
	});

	scrollListener = function (e) {

	    var tolerance = 50;
	    var bottom = (tableView.getRect().height - e.y) <= (scrollView.getRect().height + tolerance);
	    if (bottom) {
		    // scrollView.removeEventListener('scroll',scrollListener);
		    // require("/lib/extra").createConnection();
		    button.show();
	    }else {button.hide();}
	
	}

	scrollView.addEventListener('scroll', scrollListener);

	scrollView.add(tableView);
	button.hide();
	win.add(scrollView);
	win.add(label);
	win.add(button);	
	win.add(loadingButton);

	return win;

};


