var isAndroid = (Ti.Platform.osname === 'android');

exports.createMainWindow = function() {

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
		require("/lib/extra").createConnection();
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

	return win;

};


