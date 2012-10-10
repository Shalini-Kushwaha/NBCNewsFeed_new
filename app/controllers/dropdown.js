var isClicked = false;
$.dropDownBtn.addEventListener('click', function(e){
	
	//Ti.App.fireEvent('showCategory');	
	Alloy.CFG.categoryTable.visible = false;
	e.source.backgroundImage = 'arrowDrop.png';
		
	if(!isClicked){
		isClicked = true;
		Alloy.CFG.categoryTable.visible = true;
		e.source.backgroundImage = 'arrowDown.png';
	}else{
		isClicked = false;
	}
	
	
});


