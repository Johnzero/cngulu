
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

	// Create a custom template that displays an image on the left, 
	// then a title next to it with a subtitle below it.
	mylistViewTemplate = {
	    childTemplates: [
	        {                            // Image justified left
	            type: 'Ti.UI.ImageView', // Use an image view for the image
	            bindId: 'pic',           // Maps to a custom pic property of the item data
	            properties: {            // Sets the image view  properties
	                height: '42dp',
					width: '68dp',
					left: '5dp',
					top: '3dp',
			   		touchEnabled: false,
			   		// url:imageURL,
			        defaultImage:"/img.png"
	            }
	        },
	        {                            // Title 
	            type: 'Ti.UI.Label',     // Use a label for the title 
	            bindId: 'info',          // Maps to a custom info property of the item data
	            properties: {            // Sets the label properties
	                height: '70dp',
					font: {
						fontSize: '16dp'
					},
					left: '83dp',
					top:"2dp",
					right: '3dp',
					touchEnabled: false,
					color:"black"
	            }
	        },
	        {                            // Subtitle
	            type: 'Ti.UI.Label',     // Use a label for the subtitle
	            bindId: 'es_info',       // Maps to a custom es_info property of the item data
	            properties: {            // Sets the label properties
	                height: Ti.UI.SIZE,
				    width: '68dp',
				    left: '5dp',
				    bottom: '3dp',
				    color: '#444',
				    font: {
				        fontSize: '12dp'
				    },
				    textAlign: 'center',
				    touchEnabled: false
			    }
	        }
	    ]
	};

	e.listView = Ti.UI.createListView({
	    // Maps myTemplate dictionary to 'template' string
	    contentWidth: 'auto',
		contentHeight: 'auto',
		width: '100%',
		height: '86%',
		top:"45dp",
		left:0,
		// backgroundImage:"/back2.jpg",
		// height:Ti.UI.FILL,
		// style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		layout: 'vertical',
		// search: searchbar,
	    templates: { 'template': mylistViewTemplate },
	    // Use 'template', that is, the myTemplate dict created earlier
	    // for all items as long as the template property is not defined for an item.
	    defaultItemTemplate: 'template'
	});

	goTop.addEventListener('click', function(){

		// listView.scrollToItem(sectionIndex,itemIndex);
		// e.scrollView.scrollTo(0, 0);
		// goTop.hide();
		var sectionIndex = 1;
		var itemIndex = 0;
		e.listView.scrollToItem(sectionIndex,itemIndex);
	});
	// goTop.hide();

	var tolerance = 150;
	var scrollListener = function (event) {
	    var bottom = (e.listView.getRect().height - ee.y) <= (e.listView.getRect().height + tolerance);
	    Ti.API.info(bottom+"-----------------------------------------------");
	    if (bottom) {
		    // scrollView.removeEventListener('scroll',scrollListener);
		    // require("/lib/extra").createConnection();
		    goTop.show();
	    }else {goTop.hide();}
	
	}

	e.listView.addEventListener('click', scrollListener);

	advertLabel.addEventListener('click', function(){
		require("/lib/extra").createConnection({
			actInd : e.actInd,
			listView : e.listView,
			tableView : '',
			n : e.num
		});
		e.num++;
	});

	win.add(advertLabel);	
	win.add(e.actInd);
	win.add(goTop);
	win.add(e.listView);

	return win;

};


