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
    //db.execute("INSERT INTO favorites(title,url)VALUES(?,?)",'Prop-Zero','http://www.nbclosangeles.com/blogs/prop-zero/?rss=y&embedThumb=y&summary=y');
    var favorites = db.execute('SELECT * FROM favorites');
    
    //db.execute('DELETE TABLE favorites');
    //db.execute("INSERT INTO favorites(catid,catname,subcatname)VALUES(?,?,?)",2,'News','Celebrity');
    $.loadingView.show();
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
