var params = arguments[0] || {};

$.label.setText(params.titleText);
$.button.id = params.titleText;
$.nbc.getNewsData(getNewsData, params.url);

function deleteFav(e){
	 var db = Ti.Database.open('nbcNews');
    db.execute('DELETE FROM favorites where title=?', e.source.id);
    $.view.visible = false;
    $.view.height = 0;
    $.view.top = 0;
    db.close();
};

function collapseView(e){
	 if(e.source.isCollapse){
        $.view.height = 140;
        e.source.isCollapse = false;
        return;
    }
    $.view.height = 30;
    e.source.isCollapse = true;
};
// function to get news data
function getNewsData(newsData, updateTime) {
    var i, newsDataLength = newsData.length, row, imageView, titleLabel, result = [], detailView;
    // if updateTime is present
    if(updateTime){
    	 $.updateTime.setText('Updated: '+updateTime);
    }
   
    // if no data found, hide loading indicatoe and show error message label 
    // (if database rows found, dont show error message label)
    if(newsDataLength === 0){
    	if(params.dataCount === 0){
    		params.errorMessageLabel.show();
    	}		 
		 params.loadingView.hide();
		return;
	}
	
    for ( i = 0; i < newsDataLength; i += 1) {
        news = newsData[i];
        row = Ti.UI.createView({
            left:10,
            top:0,
            height : 100,
            width : 120,
            index : i,
            url : news.url,
            layout: 'vertical',
            backgroundColor:'black'
        });

        imageView = Ti.UI.createImageView({
            top:0,
            height : 70,
            width : 120,
            backgroundImage : news.image,
            left : 0,
            touchEnabled : false
        });
        titleLabel = Ti.UI.createLabel({
            top:0,
            height : Ti.UI.SIZE,
            width : 100,
            text : news.title,
            textAlign : 'left',
            color:'white',
            left : 0,
            font : {
                fontFamily : 'arial',
                fontSize : '12'
            },
            touchEnabled : false
        });

        row.add(imageView);
        row.add(titleLabel);

        // on row click event, get detail page
        row.addEventListener('click', function(e) {
            params.rowClick(e.source.url);
        });

        $.favView.add(row);
        $.favView.contentWidth += row.width + row.left;
    }
    params.loadingView.hide();
};