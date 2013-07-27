Ti.App.addEventListener('graphic_download', function(e) {
    // you don't have to fire an event like this, but perhaps multiple components will
    // want to know when the image has been downloaded and saved
    	var data = e.data;
    	var xmlHttpObj = Ti.Network.createHTTPClient();
    	xmlHttpObj.onload = onSuccess;
    	function onSuccess() {
			var pos = xmlHttpObj.location.lastIndexOf("/");
			var localimg = xmlHttpObj.location.substr(pos + 1 );
			var imageDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'downloaded_images');
			if (! imageDir.exists()) {
			    imageDir.createDirectory();
			}
			var imageFile  = Ti.Filesystem.getFile(imageDir.resolve(), localimg);
			if (imageFile.write(this.responseData) === false) {
			}
			else {
				var table = Ti.UI.createTableViewRow({
							title:data[1],
							height:'110',
							backgroundSelectedColor:'blue'
						});
				var img = Ti.UI.createImageView({
							title: 'news_image',
							className:'image',
							height: '42dp',
						    width: '68dp',
						    left: '5dp',
						    top: '3dp',
   						 	touchEnabled: false,
							// image: imageFile.nativePath
							image:"/appicon.png"
						});
				var label = Ti.UI.createLabel({
							text:data[1],
							height: '70dp',
						    font: {
						        fontSize: '16dp'
						    },
						    left: '83dp',
						    right: '3dp',
						    touchEnabled: false,
							color:"black"
				});
				var date = Ti.UI.createLabel({
							text:data[3].substr(0,10),
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
				});
				table.add(img);
				table.add(label);
				table.add(date);
				tableView.appendRow(table);
				var height = parseInt(table.height) + parseInt(tableView.height);
				tableView.height = height + '';
			}
    	}
    	xmlHttpObj.open('GET',data[0]);
		xmlHttpObj.send();
});

		var flurry = require('sg.flurry');
		  flurry.onStartSession('Cngulu');
		  flurry.logEvent('started2', {start: 'value'});
		  flurry.onError('someerror2', 'no crash', 'eClass');
		  flurry.setUserID('tester');
		  flurry.setAge(20);
		  flurry.setGender(flurry.MALE);
		  flurry.onPageView();
		  flurry.onEndSession();

		  	function createRow(i) {
		  var row = Ti.UI.createView({
		    backgroundColor: 'white',
		    borderColor: '#bbb',
		    borderWidth: 1,
		    width:'100%', 
		    height: 70,
		    top: 0, left: 0
		  });
		  return row;
	}


	function makeRow() {
		// generate random string of digits and capital English letters
		// see http://en.wikipedia.org/wiki/Base_36
		return Ti.UI.createTableViewRow({
			title: Math.random().toString(36).substring(7)
		});
	}

	for (var i = 0; i <= 20; i++)
	{
		var row = createRow(i);
		  scrollView.add(row);
	}



		var button = Titanium.UI.createButton({
		title:'Scroll to Top',
		height:40,
		width:200,
		bottom:10
	});
	view.add(button);
	button.addEventListener('click', function()
	{
		scrollView.scrollTo(0,0);
	});
<<<<<<< HEAD


	
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
=======
>>>>>>> 37221e682835435553b63eecccd1450bd16ae5ec
