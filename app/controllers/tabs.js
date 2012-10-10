var categories =[], tab;

exports.getTab = function(){	
	return $.tab;
};

$.tab.addEventListener('focus', function(e){
	alert(e.index);
});

function getNewsData(newsData){
	Ti.API.info(newsData);
};


function setCategoryTable(categories){	
	var catLength = categories.length,category, row, label, result =[], i;
	Ti.API.info('catLength' + catLength);
	for(i=0; i< catLength; i+=1){	
		category = categories[i];	
		row = Ti.UI.createTableViewRow({
			height: Ti.UI.SIZE,
			width: Ti.UI.SIZE,
			index: i,
			url: category.url
		});
		
		label = Ti.UI.createLabel({
			height: Ti.UI.SIZE,
			width: Ti.UI.SIZE,
			text: category.title
		});
		
		row.add(label);
		result.push(row);
	}	
	tab.window.children[1].setData(result);	
	tab.window.children[1].visible = true;
};



function setCategories(tabIndex){		
	var categories =[];
	var categoriesJson = {};	
	var text = subCategoriesArray[tabIndex];	
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
		 setCategoryTable(categories, tab);
		
		 // remove from here
		// $.nbc.getNewsData(getNewsData, categories[0].url);
	}
	
};

