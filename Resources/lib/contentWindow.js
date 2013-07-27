var isAndroid = (Ti.Platform.osname === 'android');

exports.createContentWindow = function() {

	var tableData = [ {title: 'Apples'}, {title: 'Bananas'}, {title: 'Carrots'}, {title: 'Potatoes'} ];

	var budgetTable = Titanium.UI.createTableView({
	        data: [],
	        editable: true,
	        moveable:false,
	        moving:false,
	        height:'auto',
	        backgroundColor: 'transparent',
	        separatorColor: 'transparent',
	        borderRadius:10,
	        borderColor: 'transparent',
	        backgroundImage:'http://isdcloud.s3.amazonaws.com/titanium/grad.png', //change this to your gradient and make you row size the same mines on s3fileshare
	        backgroundRepeat:true,
	        footerTitle:''//removes the empty rows ...
	});

	for (var i = 0; i < tableData.length; i++) {

	        var row = Ti.UI.createTableViewRow({
	            title: tableData[i],
	            touchEnabled: true,
	            height: 57
	        });
	    
	    
	}
	var win = Ti.UI.createWindow({
		title : "咕噜网",
		backgroundColor : "white",
		// font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
		exitOnClose : false,
		
	});

	var scrollView = Ti.UI.createScrollView({
		  contentWidth: 'auto',
		  contentHeight: 'auto',
		  showVerticalScrollIndicator: true,
		  showHorizontalScrollIndicator: true,
		  height: '90%',
		  top:"60dp",
		  left:0,
		  width: '100%',
		  layout: 'vertical'
	});
	
	var label = Ti.UI.createLabel
	({
		backgroundColor:'darkgray',
		text: 'Your advert here',
		textAlign: 'center',
		bottom:0,
		width: Titanium.UI.FILL,
		shadowColor: '#aaa',
  		shadowOffset: {x:5, y:5},
  		backgroundImage:"/grad.png",
		height:"30dp"
	});

	scrollView.add(budgetTable);

	win.add(scrollView);
	win.add(label);		

	return win;

};
