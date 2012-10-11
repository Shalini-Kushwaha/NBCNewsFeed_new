var categories =[];
	
exports.getTab = function(){	
	return $.tab;
};

$.tab.addEventListener('focus', function(e){
	setCategories(e.index, e.source);
	
});


function getNewsData(newsData){
	Ti.API.info(newsData);
	$.categoryTable.visible = false; // set other settings
	var i, newsDataLength = newsData.length,row,imageView, titleLabel, result=[];
	for(i=0; i< newsDataLength; i+=1){
		news = newsData[i];
		row = Ti.UI.createTableViewRow({
			height: 60,
			width: Ti.UI.SIZE,
			index: i,
			url: news.url
		});
		
		imageView = Ti.UI.createImageView({
			height: 80,
			width: 80,
			image: news.image,
			left : 0
		});
		titleLabel = Ti.UI.createLabel({
			height: Ti.UI.SIZE,
			width: '75%',
			text: news.title,		
			textAlign:'left',
			left:90,		
			font:{
				fontFamily:'arial', fontSize:'14'
			}			
		});
		
		row.add(imageView);
		row.add(titleLabel);
	
		// on row click event, get detail page
		row.addEventListener('click', function(e){	
			
		});
		
		result.push(row);
	}
	$.newsTable.setData(result);	
	$.newsTable.visible = true;
	
};


Ti.App.addEventListener('showCategory', function(){
//	$.categoryTable.visible = true;
   	alert('clicked');
});

function setCategoryTable(categories){	
	var catLength = categories.length,category, row, label, result =[], i;
	Ti.API.info('catLength' + catLength);	
	for(i=0; i< catLength; i+=1){	
		category = categories[i];	
		row = Ti.UI.createTableViewRow({
			height: 40,
			width: Ti.UI.SIZE,
			index: i,
			url: category.url
		});
		
		
		label = Ti.UI.createLabel({
			height: Ti.UI.SIZE,
			width: Ti.UI.SIZE,
			text: category.title,
			textAlign:'center',
			left:10			
		});
		
		row.add(label);
		// on row click event, get news table
		row.addEventListener('click', function(e){			
		//	Ti.App.fireEvent('getNewsData',{url: e.source.url});
			$.nbc.getNewsData(getNewsData, e.source.url);			
		});
		
		result.push(row);
	}
	$.categoryTable.setData(result);
	Alloy.CFG.categoryTable = $.categoryTable; 
	
};



function setCategories(tabIndex){		
	var categories =[];
	var categoriesJson = {};	
	var text = Alloy.CFG.newsFeedCategories[tabIndex];	
	// if text present, parse into xml document
	if (text) {
		var xmlDoc = Ti.XML.parseString(text);
		var categoriesLength = xmlDoc.getElementsByTagName('a').length;
		var parentNode = xmlDoc.getElementsByTagName('a');
		 for(var i=0; i< categoriesLength; i++){		
		 	categoriesJson = {
		 		title: parentNode.item(i).text,
		 		url : parentNode.item(i).getAttribute("href")
		 	}
		 	categories.push(categoriesJson);		 
		 }		 
		 setCategoryTable(categories);
		
		 // remove from here
		// $.nbc.getNewsData(getNewsData, categories[0].url);
	}
	
};

