
exports.createMainWindow = function(e) {

	var win = Ti.UI.createWindow({
		title : e.title,
		backgroundColor : "white",
		// font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
		exitOnClose : false	
	});

	e.actInd = Titanium.UI.createActivityIndicator({
		bottom : "6dp",
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});
	if (ActivityIndicatorStyle) {
		e.actInd.style = ActivityIndicatorStyle.PLAIN;
	}
	e.actInd.font = {
		fontFamily : 'Helvetica Neue',
		fontSize : 15,
		fontWeight : 'bold'
	};
	e.actInd.color = 'white';
	e.actInd.message = 'Loading...';
	e.actInd.width = 210;

	var searchbar = Ti.UI.createSearchBar({
		barColor: '#385292',
		showCancel: false,
		rowIndex:1
	});

	e.scrollView = Ti.UI.createScrollView({
		  contentWidth: 'auto',
		  contentHeight: 'auto',
		  showVerticalScrollIndicator: true,
		  showHorizontalScrollIndicator: false,
		  height: '100%',
		  // top:"50dp",
		  top:"-5dp",
		  left:0,
		  width: '100%',
		  layout: 'vertical'
	});
	var tolerance = 150;

	timeout = 1;
	scrollFetch = function (ee) {
		e.goTop.show();
	    var bottom = (e.tableView.getRect().height - ee.y) <= (e.scrollView.getRect().height + tolerance);
	    if (bottom) {
		    e.scrollView.removeEventListener('scroll',scrollFetch);
		    if ( timeout > 0 ) {
		    	win.fireEvent("fetch",{});
		    	timeout--;
		    };
	    }
	
	}
	e.scrollView.addEventListener('scroll', scrollFetch);
	win.add(e.scrollView);

	e.tableView = Ti.UI.createTableView({
	  	contentWidth: 'auto',
		contentHeight: 'auto',
		width: '100%',
		height:'160dp',
		// backgroundImage:"/back2.jpg",
		// height:Ti.UI.FILL,
		// style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		layout: 'vertical',
		search: searchbar
	});
	// e.tableView.addEventListener('click', function (event){
	// 	Ti.API.info(event.rowData.reurl + event.rowData.reid + event.rowData.reimg);
	// })

	e.tableView.addEventListener('click', function (event){
		Ti.API.info(event.rowData.reurl);
	    var webview = Titanium.UI.createWebView({url:event.rowData.reurl});
	    var window = Titanium.UI.createWindow();
	    window.add(webview);
	    window.open({fullscreen : true,modal:true});
	
	});

	e.scrollView.add(e.tableView);

	e.advertLabel = Ti.UI.createLabel
	({
		backgroundColor:'darkgray',
		text: '咕噜网@安徽木森网络科技有限公司',
		textAlign: 'center',
		bottom:0,
		width: Titanium.UI.FILL, 
		backgroundImage:"/grad.png",
		height:"30dp"
	});
	e.advertLabel.addEventListener('click', function(){
		win.fireEvent("fetch",{});
	});
	win.add(e.advertLabel);

	e.goTop = Titanium.UI.createButton({
		height:"40dp",
		width: "40dp",
		right:"5dp",
		bottom:"50dp",
		zIndex : 100,
		// backgroundDisabledImage: '/images/BUTT_drk_off.png'
		backgroundImage : "/top1.png",
		backgroundSelectedImage:'/top2.png'
	});
	e.goTop.addEventListener('click', function()
	{
		// listView.scrollToItem(sectionIndex,itemIndex);
		e.scrollView.scrollTo(0, 0);
		e.goTop.hide();
	});
	e.goTop.hide();
	win.add(e.goTop);	
	win.add(e.actInd);

	var winOpenFunc = function() {
		win.fireEvent("fetch",{});
		win.removeEventListener('open',winOpenFunc);
	}
	win.addEventListener('open', winOpenFunc);

	win.num = 0;
	win.addEventListener('fetch', function(event) {
		require("/lib/extra").createConnection({
			actInd : e.actInd,
			scrollView : e.scrollView,
			tableView : e.tableView,
			n : win.num,
			advertLabel : e.advertLabel,
			subjectId : e.subjectId
		});
		win.num++;
	})
	var swipe = function(event) {
		if (event.direction == "right") {
			Ti.App.fireEvent('slide_open', {});
		}else {
			Ti.App.fireEvent('slide_close', {});
		}
	}
	win.addEventListener("swipe",swipe);
	Ti.App.addEventListener('search', function(event) {

		if (e.scrollView.top == "50dp") {
			e.scrollView.top = "-5dp";
		}
		else {
			e.scrollView.top = "50dp";
		}
		
	})

	return win;

};


