var params = arguments[0] || {};

$.label.setText(params.titleText);
$.button.id = params.titleText;
$.nbc.getNewsData(getNewsData, params.url);

$.button.addEventListener('click', function(e) {
    var db = Ti.Database.open('nbcNews');
    db.execute('DELETE FROM favorites where title=?', e.source.id);
    $.view.visible = false;
    $.view.height = 0;
    db.close();
});

// function to get news data
function getNewsData(newsData) {
    var i, newsDataLength = newsData.length, row, imageView, titleLabel, result = [], detailView;
    for ( i = 0; i < 2; i += 1) {
        news = newsData[i];
        row = Ti.UI.createTableViewRow({
            height : 45,
            width : Ti.UI.SIZE,
            index : i,
            url : news.url
        });

        imageView = Ti.UI.createImageView({
            height : 70,
            width : 70,
            image : news.image,
            left : 0,
            touchEnabled : false
        });
        titleLabel = Ti.UI.createLabel({
            height : Ti.UI.SIZE,
            width : '75%',
            text : news.title,
            textAlign : 'left',
            left : 90,
            font : {
                fontFamily : 'arial',
                fontSize : '14'
            },
            touchEnabled : false
        });

        row.add(imageView);
        row.add(titleLabel);

        // on row click event, get detail page
        row.addEventListener('click', function(e) {
            params.rowClick(e.source.url);
        });

        result.push(row);
    }
    $.tblFavorites.setData(result);
};