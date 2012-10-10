function WPATH(s) {
    var index = s.lastIndexOf("/"), path = index === -1 ? "com.default.NBCNewsFeed/" + s : s.substring(0, index) + "/com.default.NBCNewsFeed/" + s.substring(index + 1);
    return path;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    exports.getNewsData = function(callback, url) {
        this.xhr = Titanium.Network.createHTTPClient();
        this.xhr.onload = function() {
            var title, image, url, pubDate, description, c = 0, newsData = [];
            this.doc = this.responseXML.documentElement;
            this.items = this.doc.getElementsByTagName("item");
            for (c = 0; c < this.items.length; c += 1) {
                this.items.item(c).getElementsByTagName("title").item(0) && (title = this.items.item(c).getElementsByTagName("title").item(0).text);
                this.items.item(c).getElementsByTagName("media:thumbnail").item(0) && (image = this.items.item(c).getElementsByTagName("media:thumbnail").item(0).getAttribute("url"));
                this.items.item(c).getElementsByTagName("pheedo:origLink").item(0) && (url = this.items.item(c).getElementsByTagName("pheedo:origLink").item(0).text);
                this.items.item(c).getElementsByTagName("description").item(0) && (description = this.items.item(c).getElementsByTagName("description").item(0).text);
                this.items.item(c).getElementsByTagName("pubDate").item(0) && (pubDate = this.items.item(c).getElementsByTagName("pubDate").item(0).text);
                this.news = {
                    title: title,
                    image: image,
                    url: url,
                    description: description,
                    pubDate: pubDate
                };
                newsData.push(this.news);
                Ti.API.info(this.news);
            }
            callback && callback(newsData);
        };
        this.xhr.open("GET", url);
        this.xhr.send();
    };
    exports.getSubCategories = function(callback) {
        var xhr, startIndex, endIndex, str, response, subCategory = [], i, splittedcategoryText, splittedcategory = [];
        xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                response = this.responseText;
                startIndex = response.indexOf("class=\"rss_steps\"");
                endIndex = response.indexOf("id=\"footer\"");
                str = response.slice(startIndex, endIndex);
                subCategory = str.split("<h3>");
                for (i = 1, len = subCategory.length; i < len; i++) {
                    splittedcategoryText = subCategory[i];
                    var start, end;
                    start = splittedcategoryText.indexOf("<ul>");
                    end = splittedcategoryText.indexOf("</div>");
                    splittedcategoryText = splittedcategoryText.slice(start, end);
                    splittedcategory.push(splittedcategoryText);
                }
                callback && callback(splittedcategory);
            },
            onerror: function(e) {
                alert("failure" + e);
            },
            timeout: 5000
        });
        xhr.open("GET", "http://www.nbclosangeles.com/rss/");
        xhr.send();
    };
    $.__views.widget = A$(Ti.UI.createView({
        backgroundColor: "white",
        id: "widget"
    }), "View", null);
    $.addTopLevelView($.__views.widget);
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;