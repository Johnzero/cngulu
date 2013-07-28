
Ti.App.addEventListener('graphic_download', function(e) {
	    var rowData = e.data;

		var table = Ti.UI.createTableViewRow({
			title:rowData[1],
			height:'70dp'
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
			image:rowData[0]
		});
		var label = Ti.UI.createLabel({
			text:rowData[1],
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
			text:rowData[3].substr(0,10),
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
		Ti.API.info('+++++++++++++++++++++++++++');
		tableView.appendRow(table);
		var height = parseInt(table.height) + parseInt(tableView.height);
		tableView.height = height + 'dp';
		tabel = null;
		img = null;
		label = null;
		date = null;
		rowData = null;
});

Ti.App.addEventListener("loading",function (e) {

});