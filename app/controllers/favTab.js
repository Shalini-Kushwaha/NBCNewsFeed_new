var categories = [];

// function to get current tab
exports.getTab = function() {
    return $.tab;
};

function rowClick(url) {
    var newsDetailWindow = Alloy.createController('details', {
        url : url,
    }).getView();
    newsDetailWindow.open({
        transition : Ti.UI.iPhone.AnimationStyle.CURL_DOWN
    });
}

//tab event listner
function loadCategories(e) {
	// show loading indicator and hide error message
	$.loadingView.show();
	$.errorMessageLabel.hide();
    clearChildrens();
    var db = Ti.Database.open('nbcNews');
    db.execute('CREATE TABLE IF NOT EXISTS favorites(title TEXT, url TEXT); '); 
    var favorites = db.execute('SELECT * FROM favorites');
    var rowsCount = favorites.getRowCount();
    
    // if no favorites found, hide loading indicator and show error message
    if(rowsCount === 0){
	 $.loadingView.hide();
	 $.errorMessageLabel.show();    	 
    }
   
   
    while (favorites.isValidRow()) {
        var widgetView = Alloy.createController('widgetView', {
            titleText : favorites.fieldByName('title'),
            url : favorites.fieldByName('url'),
            rowClick : rowClick,
            loadingView : $.loadingView
        });
        $.scrollview.add(widgetView.getView());
        favorites.next();
    }
    db.close();
}

function clearChildrens() {
    var length = $.scrollview.children.length;
    Ti.API.info(length);
    for (var i = 0; i < length; i++) {
        $.scrollview.remove($.scrollview.children[i]);
    }
}