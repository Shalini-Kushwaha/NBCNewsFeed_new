function Controller() {
    function getSubCategories(subCategories) {
        subCategories && (Alloy.CFG.newsFeedCategories = subCategories);
        createTabs();
    }
    function createTabs() {
        var i, tabsFile = require("alloy/controllers/tabs"), tabs, tab, title, tabsArray = [];
        for (i = 0, categoryLength = Alloy.CFG.newsFeedCategories.length; i < categoryLength; i += 1) {
            tabs = new tabsFile;
            tab = tabs.getTab();
            switch (i) {
              case 0:
                title = "News";
                break;
              case 1:
                title = "Entertainment";
                break;
              case 2:
                title = "The Scene";
                break;
              case 3:
                title = "Franchises";
            }
            tab.title = title;
            tabsArray.push(tab);
            $.categoryTabGroup.addTab(tab);
        }
        Alloy.CFG.tabs = tabsArray;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.index = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    }), "Window", null);
    $.addTopLevelView($.__views.index);
    $.__views.nbc = Alloy.createWidget("com.default.NBCNewsFeed", "widget", {
        id: "nbc"
    });
    $.__views.nbc.setParent($.__views.index);
    $.__views.categoryTabGroup = A$(Ti.UI.createTabGroup({
        id: "categoryTabGroup"
    }), "TabGroup", null);
    $.addTopLevelView($.__views.categoryTabGroup);
    _.extend($, $.__views);
    $.nbc.getSubCategories(getSubCategories);
    $.categoryTabGroup.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;