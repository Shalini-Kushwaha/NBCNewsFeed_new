var isClicked = false;
$.parentView.addEventListener('singletap', function() {

    //Ti.App.fireEvent('showCategory');
    Alloy.CFG.categoryTable.visible = false;
    resetArrowImage();

    if (!isClicked) {
        isClicked = true;
        Alloy.CFG.categoryTable.visible = true;
        resetArrowImage();

    } else {
        isClicked = false;
    }

    Alloy.CFG.categoryTable.hideTable = function(titleText) {
        Alloy.CFG.categoryTable.visible = false;
        $.categoryTextField.value = titleText;
        resetArrowImage();
    }
});

function resetArrowImage(){
    $.dropDownBtn.backgroundImage = 'arrowDrop.png';
    $.dropDownBtn.height = 13;
    $.dropDownBtn.width = 9;
}