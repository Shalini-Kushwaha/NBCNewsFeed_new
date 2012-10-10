exports.getNewsData = function(callback, url) {

	// this.url = 'http://feeds.nbclosangeles.com/nbclosangeles/news/top-stories.xml';
	// if (category != null) {
		// this.url = 'http://feeds.nbclosangeles.com/nbclosangeles/' + category + '/' + subcategory + '.xml';
	// }
	
	this.xhr = Titanium.Network.createHTTPClient();

	this.xhr.onload = function() {
		var title, image, url, pubDate, description, c = 0, newsData = [];
		this.doc = this.responseXML.documentElement;
		this.items = this.doc.getElementsByTagName('item');
		//alert(this.items.length);
		for ( c = 0; c < this.items.length; c += 1) {
			if (this.items.item(c).getElementsByTagName('title').item(0)) {
				title = this.items.item(c).getElementsByTagName('title').item(0).text;
			}
			if (this.items.item(c).getElementsByTagName('media:thumbnail').item(0)) {
				image = this.items.item(c).getElementsByTagName('media:thumbnail').item(0).getAttribute('url');
			}
			if (this.items.item(c).getElementsByTagName('pheedo:origLink').item(0)) {
				url = this.items.item(c).getElementsByTagName('pheedo:origLink').item(0).text;
			}
			if (this.items.item(c).getElementsByTagName('description').item(0)) {
				description = this.items.item(c).getElementsByTagName('description').item(0).text;
			}
			if (this.items.item(c).getElementsByTagName('pubDate').item(0)) {
				pubDate = this.items.item(c).getElementsByTagName('pubDate').item(0).text;
			}			
		
			this.news = {
				title : title,
				image : image,
				url : url,
				description: description,
				pubDate: pubDate
				
			};
			newsData.push(this.news);
			Ti.API.info(this.news);
		}
		

		if (callback) {
			callback(newsData);
		}
	};

	this.xhr.open('GET', url);
	// Open the URL we entered at the top of this file.
	this.xhr.send();
};

exports.getSubCategories = function(callback) {
	var xhr, startIndex, endIndex, str, response, subCategory = [], i, splittedcategoryText, splittedcategory = [];
	xhr = Ti.Network.createHTTPClient({
		onload : function(e) {

			response = this.responseText;
			//Ti.API.info(this.responseText);
			startIndex = response.indexOf('class="rss_steps"');
			endIndex = response.indexOf('id="footer"');
			str = response.slice(startIndex, endIndex);
			subCategory = str.split('<h3>');

			for ( i = 1, len = subCategory.length; i < len; i++) {
				splittedcategoryText = subCategory[i];
				var start, end;
				start = splittedcategoryText.indexOf('<ul>');
				end = splittedcategoryText.indexOf('</div>');
				splittedcategoryText = splittedcategoryText.slice(start, end);
				splittedcategory.push(splittedcategoryText);
			}
			if (callback) {
				callback(splittedcategory);
			}
		},
		onerror : function(e) {
			alert('failure' + e);
		},
		timeout : 5000
	});
	xhr.open("GET", 'http://www.nbclosangeles.com/rss/');
	xhr.send();

	// var url = 'http://www.nbclosangeles.com/rss/';
	// var webView, newsDetailWindow;
	// webView = Ti.UI.createWebView({
	// url : url
	// });
	// var flag=true;
	// webView.addEventListener('load', function() {
	// if(flag){
	// var html=webView.getHtml();
	// Ti.API.info('subCategories html'+ html);
	// index=html.indexOf('class="rss_steps"');
	// // alert(index);
	// // html=html.split('id="footer"')[0];
	// // html=html.split('<ul>');
	// // //html=html[1].split('</div>')[0];
	// // alert(html[1]);
	// // flag=false;
	// }
	// });
	// newsDetailWindow = Ti.UI.createWindow({
	// visible:false
	// });
	// newsDetailWindow.add(webView);
	// newsDetailWindow.open();
};
