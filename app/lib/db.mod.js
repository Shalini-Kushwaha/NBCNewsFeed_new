var dbName = 'nbcNews';

var db = Ti.Database.open(dbName);
db.execute('CREATE TABLE IF NOT EXISTS favorites(title TEXT, url TEXT); ');
db.close();

exports.selectFromFavorites = function() {
    console.log('Selecting Data from Favorites Table');
    var db = Ti.Database.open(dbName);
    var result = db.execute("SELECT * FROM favorites");
    db.close();

    return result;
};

exports.deleteFromFavorites = function() {
    console.log('Deleting Data from Favorites Table');
    var db = Ti.Database.open(dbName);
    db.close();
};

exports.insertIntoFavorites = function() {
    console.log('Inserting Data in Favorites Table');
    var db = Ti.Database.open(dbName);
    db.close();
};
