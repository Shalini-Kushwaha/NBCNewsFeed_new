var params = arguments[0]||{};

$.label.setText(params.titleText);
$.button.id = params.titleText;
// 
// $.tblFavorites
$.button.addEventListener('click',function(e){
    var db = Ti.Database.open('nbcNews'); //)
    db.execute('DELETE FROM favorites where title=?',e.source.id);
    $.view.visible=false;
    $.view.height=0;
    db.close();
});
