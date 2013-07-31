
Ti.App.addEventListener('graphic_download', function(e) {
	    var rowData = e.data;
		var table = Ti.UI.createTableViewRow({
			title:rowData[1],
			height:'70dp',
			top: '-3dp',
			reurl:rowData[4],
			backgroundImage:"/row.png"
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
			top:"2dp",
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
		e.tableView.appendRow(table);
		var height = parseInt(table.height) + parseInt(e.tableView.height);
		e.tableView.height = height + 'dp';
		tabel = null;
		img = null;
		label = null;
		date = null;
		rowData = null;
});




Ti.App.addEventListener('graphic_downloadddd', function(e) {
	
	var rowData = e.data;
	Ti.API.info(rowData[0]);
	var sections = [];
	var fruitSection = Ti.UI.createListSection({
		height:'70dp',
		top: '-3dp',
		reurl:rowData[4],
		backgroundImage:"/row.png"
	});
	var fruitDataSet = [
	    // the text property of info maps to the text property of the title label
	    // the text property of es_info maps to text property of the subtitle label
	    // the image property of pic maps to the image property of the image view
	    { info: {text: rowData[1]}, es_info: {text: rowData[3].substr(0,10)}, pic: {image:rowData[0]}},
	];
	fruitSection.setItems(fruitDataSet);
	sections.push(fruitSection);
	e.listView.appendSection(sections);

});







