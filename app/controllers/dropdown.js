var isClicked = false;
$.parentView.addEventListener('singletap', function() {

    //Ti.App.fireEvent('showCategory');
    Alloy.CFG.categoryTable.visible = false;
    $.dropDownBtn.backgroundImage = 'arrowDrop.png';
    $.dropDownBtn.height = 13;
    $.dropDownBtn.width = 9;

    if (!isClicked) {
        isClicked = true;
        Alloy.CFG.categoryTable.visible = true;
        $.dropDownBtn.backgroundImage = 'arrowDown.png';
        $.dropDownBtn.width = 13;
        $.dropDownBtn.height = 9;

    } else {
        isClicked = false;
    }

    Alloy.CFG.categoryTable.hideTable = function(titleText) {
        Alloy.CFG.categoryTable.visible = false;
        $.categoryTextField.value = titleText;
        $.dropDownBtn.backgroundImage = 'arrowDrop.png';
        $.dropDownBtn.height = 13;
        $.dropDownBtn.width = 9;
    }
});

