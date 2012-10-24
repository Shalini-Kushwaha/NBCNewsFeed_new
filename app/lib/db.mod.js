var dbName = 'nbcNews';

var db = Ti.Database.open(dbName);
db.execute('CREATE TABLE IF NOT EXISTS favorites(title TEXT, url TEXT); ');
db.close();

function selectFromFavorites() {
    console.log('Selecting Data from Favorites Table');
    var db = Ti.Database.open(dbName);
    var result = db.execute("SELECT * FROM favorites");
    db.close();

    return result;
};

function deleteFromFavorites(profiles, user) {
    console.log('Deleting Data from Favorites Table');
    var db = Ti.Database.open(dbName);
    db.close();
};

function insertIntoFavorites = function(args) {
    console.log('Inserting Data in Favorites Table');
    var db = Ti.Database.open(dbName);
    db.close();
};
