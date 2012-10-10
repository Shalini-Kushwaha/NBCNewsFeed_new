var isClicked = false;
$.dropDownBtn.addEventListener('click', function(e){
	
	//Ti.App.fireEvent('showCategory');	
	Alloy.CFG.categoryTable.visible = false;
	e.source.backgroundImage = 'arrowDrop.png';
	e.source.height = 13;
	e.source.width = 9;
	
	if(!isClicked){
		isClicked = true;
		Alloy.CFG.categoryTable.visible = true;
		e.source.backgroundImage = 'arrowDown.png';
		e.source.width = 13;
		e.source.height = 9;
		
	}else{
		isClicked = false;
	}
	
	
});





