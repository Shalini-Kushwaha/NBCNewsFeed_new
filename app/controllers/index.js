function getSubCategories(subCategories) {		
	if (subCategories) {
		
		Alloy.CFG.newsFeedCategories = subCategories;
	}	
	// create tabs based on category length
	createTabs();
};

$.nbc.getSubCategories(getSubCategories);


function createTabs() {			
	var i, tabsFile = require('alloy/controllers/tabs'),tabs,tab, title, tabsArray=[];	
	for (i = 0, categoryLength = Alloy.CFG.newsFeedCategories.length; i < categoryLength; i+=1) {				
		tabs = new tabsFile();
		tab = tabs.getTab();
		switch(i) {
			case 0:
				title = 'News';
				break;
			case 1:
				title = 'Entertainment';
				break;
			case 2:
				title = 'The Scene';
				break;
			case 3:
				title = 'Franchises';
				break;
		}
		tab.title = title;
		tabsArray.push(tab);
		$.categoryTabGroup.addTab(tab);
		// tabs[i].id  = i;
		// tabs[i].addEventListener('focus', function(e) {			
			// //getSubCategories();	
			// alert(subCategoriesArray.length);
			// setTimeout(function(){
				// $.tabs.setCategories(e.index, subCategoriesArray,e.source);	
			// }, 200);
			// //$.dropDown.setTabIndex(tabIndex);
		// });
	}
	Alloy.CFG.tabs = tabsArray;
	$.categoryTabGroup.open();
};



