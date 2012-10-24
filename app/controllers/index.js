function getSubCategories(subCategories) {		
	if (subCategories) {
		
		Alloy.CFG.newsFeedCategories = subCategories;
	}	
	// create tabs based on category length
	createTabs();
};

$.nbc.getSubCategories(getSubCategories);

function createTabs() {
	var i, tabsFile = require('alloy/controllers/tabs'),tabs,tab,icon, title, tabsArray=[],
	favTab = require('alloy/controllers/favTab');
	tabs =new favTab();
	tab = tabs.getTab();
	tab.title = 'Favorites';
	tab.icon = 'favIcon.png';
	tabsArray.push(tab);
	$.categoryTabGroup.addTab(tab);
	
	for (i = 0, categoryLength = Alloy.CFG.newsFeedCategories.length; i < categoryLength; i+=1) {				
		tabs = new tabsFile();
		tab = tabs.getTab();
		switch(i) {
			case 0:
				title = 'News';
				icon = 'newsIcon.png';
				break;
			case 1:
				title = 'Entertainment';
				icon = 'entertainmentIcon.png';
				break;
			case 2:
				title = 'The Scene';
				icon = 'sceneIcon.png';
				break;
			case 3:
				title = 'Franchises';
				icon = 'franchisesIcon.png';
				break;
		}
		tab.title = title;
		tab.icon = icon;
		tabsArray.push(tab);
		$.categoryTabGroup.addTab(tab);		
	}
	Alloy.CFG.tabs = tabsArray;
	$.categoryTabGroup.open();
};



