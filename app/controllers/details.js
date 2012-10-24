var args = arguments[0] || null;

$.newsDetailWebView.url = args.url;

function hideNewsDetailView(){
    $.win.close({transition: Ti.UI.iPhone.AnimationStyle.CURL_UP});
}
