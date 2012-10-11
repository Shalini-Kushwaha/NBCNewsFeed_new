function Controller() {
    function getNewsData(newsData) {
        Ti.API.info(newsData);
        $.categoryTable.visible = !1;
        var i, newsDataLength = newsData.length, row, imageView, titleLabel, publishDateLabel, result = [];
        for (i = 0; i < newsDataLength; i += 1) {
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
                left: 0
            });
            titleLabel = Ti.UI.createLabel({
                height: Ti.UI.SIZE,
                width: "75%",
                text: news.title,
                textAlign: "left",
                left: 90,
                font: {
                    fontFamily: "arial",
                    fontSize: "14"
                }
            });
            row.add(imageView);
            row.add(titleLabel);
            row.addEventListener("click", function(e) {});
            result.push(row);
        }
        $.newsTable.setData(result);
        $.newsTable.visible = !0;
    }
    function setCategoryTable(categories) {
        var catLength = categories.length, category, row, label, result = [], i;
        Ti.API.info("catLength" + catLength);
        for (i = 0; i < catLength; i += 1) {
            category = categories[i];
            row = Ti.UI.createTableViewRow({
                height: 40,
                width: Ti.UI.SIZE,
                index: i,
                url: category.url
            });
            label = Ti.UI.createLabel({
                height: Ti.UI.SIZE,
                width: Ti.UI.SIZE,
                text: category.title,
                textAlign: "center",
                left: 10
            });
            row.add(label);
            row.addEventListener("click", function(e) {
                $.nbc.getNewsData(getNewsData, e.source.url);
            });
            result.push(row);
        }
        $.categoryTable.setData(result);
        Alloy.CFG.categoryTable = $.categoryTable;
    }
    function setCategories(tabIndex) {
        var categories = [], categoriesJson = {}, text = Alloy.CFG.newsFeedCategories[tabIndex];
        if (text) {
            var xmlDoc = Ti.XML.parseString(text), categoriesLength = xmlDoc.getElementsByTagName("a").length, parentNode = xmlDoc.getElementsByTagName("a");
            for (var i = 0; i < categoriesLength; i++) {
                categoriesJson = {
                    title: parentNode.item(i).text,
                    url: parentNode.item(i).getAttribute("href")
                };
                categories.push(categoriesJson);
            }
            setCategoryTable(categories);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    exports.getTab = function() {
        return $.tab;
    };
    $.__views.__alloyId1 = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        navBarHidden: "true",
        id: "__alloyId1"
    }), "Window", null);
    $.__views.nbc = Alloy.createWidget("com.default.NBCNewsFeed", "widget", {
        id: "nbc"
    });
    $.__views.nbc.setParent($.__views.__alloyId1);
    $.__views.dropDown = Alloy.createController("dropdown", {
        id: "dropDown"
    });
    $.__views.dropDown.setParent($.__views.__alloyId1);
    var __alloyId2 = [];
    $.__views.categoryTable = A$(Ti.UI.createTableView({
        top: 45,
        borderColor: "red",
        visible: !1,
        width: "95%",
        left: 0,
        zIndex: 100,
        data: __alloyId2,
        id: "categoryTable"
    }), "TableView", $.__views.__alloyId1);
    $.__views.__alloyId1.add($.__views.categoryTable);
    var __alloyId3 = [];
    $.__views.newsTable = A$(Ti.UI.createTableView({
        top: 48,
        visible: !1,
        width: "100%",
        height: "100%",
        data: __alloyId3,
        id: "newsTable"
    }), "TableView", $.__views.__alloyId1);
    $.__views.__alloyId1.add($.__views.newsTable);
    $.__views.tab = A$(Ti.UI.createTab({
        window: $.__views.__alloyId1,
        id: "tab"
    }), "Tab", null);
    $.addTopLevelView($.__views.tab);
    _.extend($, $.__views);
    var categories = [];
    $.tab.addEventListener("focus", function(e) {
        setCategories(e.index, e.source);
    });
    Ti.App.addEventListener("showCategory", function() {
        alert("clicked");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;