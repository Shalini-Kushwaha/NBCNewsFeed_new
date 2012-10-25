/*************************/
/* Global Variables */
/*************************/

var categories =[], isCategoryListViewVisible = false, currentCategoryUrl;


/*************************/
/* Private and Public functions */
/*************************/


// function to get current tab	
exports.getTab = function(){	
	//Alloy.CFG.loadingView = $.loadingView;
	return $.tab;
};


function convertUTCTimeToLocal(date){	
	var d=new Date(date);
	d = d.toLocaleString();
	d = d.replace('GMT+05:30','');	
	return d;
}

// function to get news data
function getNewsData(newsData){
	//Ti.API.info(newsData);
	var i, newsDataLength = newsData.length,row,imageView,rightView, titleLabel, result=[], detailView, publishDateLabel;
	$.errorMessageLabel.hide();
	$.newsTable.hide();

	if(newsDataLength === 0){
		$.errorMessageLabel.show();
		$.loadingView.hide();
		return;
	}
	for(i=0; i< newsDataLength; i+=1){
		news = newsData[i];
		row = Ti.UI.createTableViewRow({
			height: 70,
			width: Ti.UI.SIZE,
			index: i,
			url: news.url,
			backgroundColor: 'black',
			selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.GRAY			
		});
		
		imageView = Ti.UI.createImageView({
			height: 85,
			width: 80,
			image: news.image,
			left : 5,
			touchEnabled: false			
		});
		
		rightView = Ti.UI.createView({
			height: Ti.UI.FILL,
			width: '70%',
			layout:'vertical',
			left : 95, 
			top: 5,			
			touchEnabled: false
		});
		
		titleLabel = Ti.UI.createLabel({			
			height: 35,
			width: '90%',
			text: news.title,		
			textAlign:'left',
			left:2,		
			font:{
				fontFamily:'arial', fontSize:'14', fontWeight: 'bold'
			},
			touchEnabled: false,
			color: 'white',
			top : 2		
		});
		
		publishDateLabel = Ti.UI.createLabel({
			height: Ti.UI.SIZE,
			width: '95%',
			text: convertUTCTimeToLocal(news.pubDate) ,  	
			textAlign:'left',
			left:2,		
			font:{
				fontFamily:'arial', fontSize:'12'
			},
			touchEnabled: false,
			color: 'gray' , 
			top: 2			
		});
		
		rightView.add(titleLabel);
		rightView.add(publishDateLabel);
		
		row.add(imageView);
		row.add(rightView);
		
	
		// on row click event, get detail page
		row.addEventListener('click', function(e){
			isCategoryListViewVisible = true;
			showCategories();
			var newsDetailWindow = Alloy.createController('details',{
                url : e.source.url,
            }).getView();
            newsDetailWindow.open({transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
		});
		
		result.push(row);
	}
	$.newsTable.setData(result);	
	$.newsTable.visible = true;
	$.loadingView.hide();
	
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

/*
 * show category list or hide
 */
function showCategories(){	
	$.categoryListView.hide();
	if(!isCategoryListViewVisible){
		isCategoryListViewVisible = true;
		$.categoryListView.show();		
	}else{
		isCategoryListViewVisible = false;
	}
	
}



/*
 Function to set data on category table and in news 
 table for the default page 
 * */
function setCategoryTable(categories){	
	var catLength = categories.length,category, row, label, result =[], i;
	Ti.API.info('catLength' + catLength);
	
	// call API to get default data and set category Label text
	$.nbc.getNewsData(getNewsData, categories[0].url);
	currentCategoryUrl=categories[0].url;
	isFavorite();
	$.categoryLabel.text = categories[0].title;
	
	// bind category table
	for(i=0; i< catLength; i+=1){	
		category = categories[i];	
		row = Ti.UI.createTableViewRow({
			height: 35,
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
      //  row.add(button);
        
        // on row click event, get news table
        row.addEventListener('click', function(e) {
        	$.loadingView.show();
            $.categoryLabel.text = e.source.titleText;        
            showCategories();
            Ti.API.info(e.source.url);
            currentCategoryUrl=e.source.url;
            isFavorite();
            $.nbc.getNewsData(getNewsData, e.source.url);
          //  $.categoryTable.hideTable(e.source.titleText);
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

function isFavorite() {
    var db = Ti.Database.open('nbcNews');
    var favorites = db.execute('SELECT * FROM favorites');
    while (favorites.isValidRow()) {
        url = favorites.fieldByName('url');
        if (currentCategoryUrl === url) {
            $.favoritesButton.image='favorite.png';
            db.close();
            return true;
        }
        favorites.next();
    }
    $.favoritesButton.image='unFavorite.png';
    db.close();
}

/*************************/
/* Event Handlers */
/*************************/


/*
 * Focus event of Tab 
 */
function loadCategories(e){
	$.loadingView.show();
	setCategories(e.index, e.source);
}

/*
 * Click event of change label
 */
function showCategoriesList(e){	
	showCategories();
}

/*
 * Click event of favorites button
 */
function addToFavorites(e){
    var db = Ti.Database.open('nbcNews');
    if(!isFavorite()){
        db.execute("INSERT INTO favorites(title,url)VALUES(?,?)", $.categoryLabel.text, currentCategoryUrl);
        $.favoritesButton.image='favorite.png';
        db.close();
        return;
    }
    db.execute('DELETE FROM favorites where url=?', currentCategoryUrl);
    $.favoritesButton.image='unFavorite.png';
    db.close();
}

