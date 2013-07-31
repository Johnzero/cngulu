
exports.createMainWindow = function(e) {


	e.num = 0;

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
		  top:"20dp",
		  left:0,
		  width: '100%',
		  layout: 'vertical'
	});
	var tolerance = 150;
	var scrollListener = function (ee) {
	    var bottom = (e.tableView.getRect().height - ee.y) <= (e.scrollView.getRect().height + tolerance);
	    if (bottom) {
		    // scrollView.removeEventListener('scroll',scrollListener);
		    // require("/lib/extra").createConnection();
		    goTop.show();
	    }else {goTop.hide();}
	
	}
	scrollFetch = function (ee) {
	    var bottom = (e.tableView.getRect().height - ee.y) <= (e.scrollView.getRect().height + tolerance);
	    if (bottom) {
		    e.scrollView.removeEventListener('scroll',scrollFetch);
		    // require("/lib/extra").createConnection();
	    }
	
	}
	e.scrollView.addEventListener('scroll', scrollListener);
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

	var slide_it_left = Titanium.UI.createAnimation();
    slide_it_left.left = 0; // to put it back to the left side of the window
    slide_it_left.duration = 300;
	e.tableView.addEventListener('click', function (click_tableview){
	  if (click_tableview.source && click_tableview.source.objName !== 'table'){
	    var webview = Titanium.UI.createWebView({url:click_tableview.rowData.reurl});
	    var window = Titanium.UI.createWindow();
	    window.add(webview);
	    window.open({animated : slide_it_left,fullscreen : true,modal:true});
	  }
	});
	e.scrollView.add(e.tableView);

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
	advertLabel.addEventListener('click', function(){
		require("/lib/extra").createConnection({
			actInd : e.actInd,
			tableView : e.tableView,
			n : e.num
		});
		e.num++;
	});
	win.add(advertLabel);

	var goTop = Titanium.UI.createButton({
		height:"40dp",
		width: "40dp",
		right:0,
		bottom:"30dp",
		// backgroundDisabledImage: '/images/BUTT_drk_off.png'
		backgroundImage : "/top1.png",
		backgroundSelectedImage:'/top2.png'
	});
	goTop.addEventListener('click', function()
	{

		// listView.scrollToItem(sectionIndex,itemIndex);
		e.scrollView.scrollTo(0, 0);
		goTop.hide();
	});
	goTop.hide();
	win.add(goTop);	
	win.add(e.actInd);
	win.addEventListener('open', function() {

		// setTimeout(function(){
		//     require("/lib/extra").createConnection({
		// 		tableView : e.tableView
		// 	});
		// }, 9500);
		require("/lib/extra").createConnection({
			actInd : e.actInd,
			tableView : e.tableView,
			n : e.num
		});
		e.num++;
	});

	return win;

};


