
exports.createConnection = function(e) {

	var url = "http://www.cngulu.com/wp-content/themes/gulutech/test.php";
	// var url = "http://www.cngulu.com/wp-content/themes/gulutech/test.php";
	var client = Ti.Network.createHTTPClient({

		onload : function(ee) {
		    var data = eval(this.responseText);
		    e.advertLabel.text = '';
		    e.actInd.show();
		    for (var i = 0; i < data.length; i++) {
		    	// if (e.tableView){
		    	Ti.App.fireEvent('graphic_download', {data:data[i],listView:e.listView,tableView:e.tableView});
		    	if (i == data.length-1) {
		    		e.scrollView.addEventListener('scroll', scrollFetch);	
		    		e.actInd.hide();
		    		timeout = 1;
		    		e.advertLabel.text = '咕噜网@安徽木森网络科技有限公司';
		    	};

		    	// }else {

			    // 	Ti.App.fireEvent('graphic_downloadddd', {data:data[i],listView:e.listView});
			    // 	if (i == data.length-1) {
			    // 		// scrollView.addEventListener('scroll', scrollFetch);	
			    // 		e.actInd.hide();
			    // 		advertLabel.text = '咕噜网@安徽木森网络科技有限公司';
			    // 	};

		    	// }

		    }
		    data = null;
		    this.responseText = null;
		},

		onerror : function(e) {
		        Ti.API.debug(e.error);
		},

		timeout : 5000

	});
	var params = {
        num : 10,
        n : e.n,
        subject : e.subjectId
    };
	client.open("POST", url);
	client.send(params);
}