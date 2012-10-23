var categories =[];

// function to get current tab	
exports.getTab = function(){	
	return $.tab;
};

//tab event listner
function loadCategories(e){
	setCategories(e.index, e.source);
}

// function to get news data
function getNewsData(newsData){
	//Ti.API.info(newsData);
	$.categoryTable.visible = false; // set other settings
	var i, newsDataLength = newsData.length,row,imageView, titleLabel, result=[], detailView;
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
			left : 0,
			touchEnabled: false
		});
		titleLabel = Ti.UI.createLabel({
			height: Ti.UI.SIZE,
			width: '75%',
			text: news.title,		
			textAlign:'left',
			left:90,		
			font:{
				fontFamily:'arial', fontSize:'14'
			},
			touchEnabled: false			
		});
		
		row.add(imageView);
		row.add(titleLabel);
	
		// on row click event, get detail page
		row.addEventListener('click', function(e){
			$.newsDetailWebView.url = e.source.url;
			$.newsDetailScrollView.animate(animateView(0));	
		});
		
		result.push(row);
	}
	$.newsTable.setData(result);	
	$.newsTable.visible = true;
	
};

function animateView(leftValue){	
	var animation = Ti.UI.createAnimation();
		animation.left = leftValue;
		animation.duration = 500;
		return animation;
}

function hideNewsDetailView(e){
	if(e.direction === 'right'){
		$.newsDetailScrollView.animate(animateView('100%'));
	}
	
}

function setCategoryTable(categories){	
	var catLength = categories.length,category, row, label, result =[], i;
	Ti.API.info('catLength' + catLength);
	$.nbc.getNewsData(getNewsData, categories[0].url);	
	for(i=0; i< catLength; i+=1){	
		category = categories[i];	
		row = Ti.UI.createTableViewRow({
			height: 40,
			width: Ti.UI.SIZE,
			index: i,
			titleText : category.title,
			url: category.url
		});
		
		
		label = Ti.UI.createLabel({
			height: Ti.UI.SIZE,
			width: Ti.UI.SIZE,
			text: category.title,
			textAlign:'center',
			left:10,
			touchEnabled:false	
		});
		
		button = Ti.UI.createButton({
		    title:'+',
		    font:{
		        fontSize:24,
		        fontWeight:'bold'
		    },
		    right :10,
		    id:'addButton',
		    titleText:category.title,
		    url: category.url,
		    height:20,
		    width:20
		});
		
        row.add(label);
        row.add(button);
        
        // on row click event, get news table
        row.addEventListener('click', function(e) {
            //	Ti.App.fireEvent('getNewsData',{url: e.source.url});
            if (e.source.id === 'addButton') {
                var db = Ti.Database.open('nbcNews');
                var favorites = db.execute('SELECT * FROM favorites');
                while (favorites.isValidRow()) {
                    url = favorites.fieldByName('url');
                    if (e.source.url === url) {
                        alert('Already added');
                        return;
                    }
                    favorites.next();
                }
                db.execute("INSERT INTO favorites(title,url)VALUES(?,?)", e.source.titleText, e.source.url);
                db.close();
                return;
            }
            Ti.API.info(e.source.url);
            $.nbc.getNewsData(getNewsData, e.source.url);
            $.categoryTable.hideTable(e.source.titleText);
        });
		result.push(row);
	}
	$.categoryTable.setData(result);
	Alloy.CFG.categoryTable = $.categoryTable;
};



function setCategories(tabIndex){		
	var categories =[];
	var categoriesJson = {};	
	var text = Alloy.CFG.newsFeedCategories[tabIndex-1];
    text = text?text.replace(/&/g,'&amp;'):text;
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

