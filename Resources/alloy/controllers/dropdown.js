function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.parentView = A$(Ti.UI.createView({
        top: 5,
        height: 40,
        width: Ti.UI.FILL,
        backgroundColor: "transparent",
        left: 0,
        id: "parentView"
    }), "View", null);
    $.addTopLevelView($.__views.parentView);
    $.__views.categoryTextField = A$(Ti.UI.createTextField({
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        value: "-- Select Category --",
        index: -1,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        rightButtonMode: Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
        font: {
            fontFamily: "Arial",
            fontWeight: "normal",
            fontSize: "14"
        },
        color: "black",
        id: "categoryTextField"
    }), "TextField", $.__views.parentView);
    $.__views.parentView.add($.__views.categoryTextField);
    $.__views.dropDownBtn = A$(Ti.UI.createButton({
        backgroundImage: "arrowDrop.png",
        height: 13,
        width: 9,
        top: 15,
        right: 5,
        id: "dropDownBtn"
    }), "Button", $.__views.categoryTextField);
    $.__views.categoryTextField.add($.__views.dropDownBtn);
    _.extend($, $.__views);
    var isClicked = !1;
    $.dropDownBtn.addEventListener("click", function(e) {
        Ti.API.info("dropdown");
        Alloy.CFG.categoryTable.visible = !1;
        e.source.backgroundImage = "arrowDrop.png";
        if (!isClicked) {
            isClicked = !0;
            Alloy.CFG.categoryTable.visible = !0;
            e.source.backgroundImage = "arrowDown.png";
        } else isClicked = !1;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;