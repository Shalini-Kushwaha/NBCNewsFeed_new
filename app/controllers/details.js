var args = arguments[0] || null, shareView,isShareViewVisible = false;

$.newsDetailWebView.url = args.url;

function hideNewsDetailView(){
    $.win.close({transition: Ti.UI.iPhone.AnimationStyle.CURL_UP});
}


shareView = Alloy.createController('socialShare',{
        url : args.url
    }).getView();

$.win.add(shareView);
shareView.hide();  
    
$.shareButton.addEventListener('click',function() {		
	shareView.hide();
	if (!isShareViewVisible) {
		isShareViewVisible = true;
		shareView.show();
	} else {
		isShareViewVisible = false;
	}
});