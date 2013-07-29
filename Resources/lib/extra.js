
exports.createConnection = function() {

	var url = "http://web.887w.com/wp-content/themes/cisco/request.php";
	// var url = "http://www.cngulu.com/wp-content/themes/gulutech/test.php";
	var client = Ti.Network.createHTTPClient({

		onload : function(e) {
		    var data = eval(this.responseText);
		    advertLabel.text = '';
		    actInd.show();
		    for (var i = 0; i < data.length; i++) {
		    	Ti.App.fireEvent('graphic_download', {data:data[i]});
		    	if (i == data.length-1) {
		    		// scrollView.addEventListener('scroll', scrollFetch);	
		    		actInd.hide();
		    		advertLabel.text = '咕噜网@安徽木森网络科技有限公司';
		    	};
		    }
		    data = null;
		    this.responseText = null;
		},

		onerror : function(e) {
		        Ti.API.debug(e.error);
		},

		timeout : 5000

	});

	client.open("GET", url);
	client.send();

}