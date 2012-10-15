var categories = [];

// function to get current tab
exports.getTab = function() {
    return $.tab;
};

function rowClick(url){
    $.newsDetailWebView.url = url;
    $.newsDetailScrollView.animate(animateView(0)); 
}

//tab event listner
function loadCategories(e) {
    clearChildrens();
    var db = Ti.Database.open('nbcNews');
    db.execute('CREATE TABLE IF NOT EXISTS favorites(title TEXT, url TEXT); ');
    var favorites = db.execute('SELECT * FROM favorites');
    
    //db.execute('DELETE TABLE favorites');
    //db.execute("INSERT INTO favorites(catid,catname,subcatname)VALUES(?,?,?)",2,'News','Celebrity');
    
    while (favorites.isValidRow()) {
        var widgetView = Alloy.createController('widgetView', {
            titleText : favorites.fieldByName('title'),
            url : favorites.fieldByName('url'),
            rowClick : rowClick
        });
        $.scrollview.add(widgetView.getView());
        favorites.next();
    }
    db.close();
}

function clearChildrens() {
    var length = $.scrollview.children.length;
    for (var i = 0; i < length; i++) {
        $.scrollview.remove($.scrollview.children[i]);
    }
}

function animateView(leftValue) {
    var animation = Ti.UI.createAnimation();
    animation.left = leftValue;
    animation.duration = 500;
    return animation;
}

function hideNewsDetailView(e) {
    if (e.direction === 'right') {
        $.newsDetailScrollView.animate(animateView('100%'));
    }
}
