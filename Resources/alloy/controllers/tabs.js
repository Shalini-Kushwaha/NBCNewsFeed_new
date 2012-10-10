function Controller() {
    function getNewsData(newsData) {
        Ti.API.info(newsData);
    }
    function setCategoryTable(categories, tab) {
        var catLength = categories.length, category, row, label, result = [], i;
        Ti.API.info("catLength" + catLength);
        Ti.API.info(tab);
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
                text: category.title
            });
            row.add(label);
            result.push(row);
        }
        $.categoryTable.setData(result);
        Alloy.CFG.categoryTable = $.categoryTable;
    }
    function setCategories(tabIndex, tab) {
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
            setCategoryTable(categories, tab);
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
    $.__views.dropDown = Alloy.createController("dropdown", {
        id: "dropDown"
    });
    $.__views.dropDown.setParent($.__views.__alloyId1);
    var __alloyId2 = [];
    $.__views.categoryTable = A$(Ti.UI.createTableView({
        top: 40,
        borderColor: "red",
        visible: !1,
        data: __alloyId2,
        id: "categoryTable"
    }), "TableView", $.__views.__alloyId1);
    $.__views.__alloyId1.add($.__views.categoryTable);
    $.__views.tab = A$(Ti.UI.createTab({
        window: $.__views.__alloyId1,
        id: "tab"
    }), "Tab", null);
    $.addTopLevelView($.__views.tab);
    _.extend($, $.__views);
    var categories = [], tab;
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