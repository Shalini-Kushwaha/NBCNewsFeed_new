var categories =[];

// function to get current tab  
exports.getTab = function(){    
    return $.tab;
};

//tab event listner
function loadCategories(e){
    clearChildrens();
    var db = Ti.Database.open('nbcNews'); //)
    //db.execute('DROP TABLE favorites');
    db.execute('CREATE TABLE IF NOT EXISTS favorites(title TEXT, url TEXT); ');
    //db.execute('DELETE TABLE favorites');
    var favorites = db.execute('SELECT * FROM favorites');
    //db.execute("INSERT INTO favorites(catid,catname,subcatname)VALUES(?,?,?)",2,'News','Celebrity');
    while(favorites.isValidRow()){
        var widgetView = Alloy.createController('widgetView', {
            titleText : favorites.fieldByName('title'),
            url : favorites.fieldByName('url')
        });
        $.scrollview.add(widgetView.getView());
        favorites.next();
    }
    db.close();
}

function clearChildrens(){
    var length = $.scrollview.children.length;
    for(var i=0;i<length;i++){
        $.scrollview.remove($.scrollview.children[i]);
    }
}

/*
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
            
        });
        
        result.push(row);
    }
    $.newsTable.setData(result);    
    $.newsTable.visible = true;
};*/
