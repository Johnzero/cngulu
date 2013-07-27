
exports.createConnection = function() {

	var url = "http://web.887w.com/wp-content/themes/cisco/request.php";
	// var url = "http://www.cngulu.com/wp-content/themes/gulutech/test.php";
	var client = Ti.Network.createHTTPClient({

		onload : function(e) {
		    var data = eval(this.responseText);
		    for (var i = 0; i < data.length; i++) {
		    	Ti.App.fireEvent('graphic_download', {data:data[i]});
		    }
		},

		onerror : function(e) {
		        Ti.API.debug(e.error);
		},

		timeout : 5000

	});

	client.open("GET", url);
	client.send();

	Ti.App.addEventListener('graphic_download', function(e) {
	    var data = e.data;

		var table = Ti.UI.createTableViewRow({
			title:data[1],
			height:'100'
			// backgroundSelectedColor:'blue'
		});
		var img = Ti.UI.createImageView({
			title: 'news_image',
			className:'image',
			height: '42dp',
			width: '68dp',
			left: '5dp',
			top: '3dp',
	   		touchEnabled: false,
	   		// url:imageURL,
	        defaultImage:"/img.png",
			image:data[0]
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

	});

}