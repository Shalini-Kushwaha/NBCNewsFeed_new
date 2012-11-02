var args = arguments[0] || {},
social = require('alloy/social');

function hideShareView(){
    $.socialShare.visible=false;
};

function shareOnFB(){
    if (Titanium.Facebook.loggedIn) {
        send_facebook_stream();
    } else {
        Titanium.Facebook.authorize();
        Titanium.Facebook.addEventListener('login', function(f) {
            Titanium.API.info('FACEBOOK LOGIN DATA' + f.data);
            send_facebook_stream();
        });
    }

    // get the app ID in facebook developpers
    Titanium.Facebook.appid = "196433887040946";
    // set the request permissions
    Titanium.Facebook.permissions = ['publish_stream'];

    /**
     * GENERATE THE FACEBOOK SHARE DIALOG
     * SEND THE FACEBOOK STREAM TO FACEBOOK
     */
    function send_facebook_stream() {
        // CREATE THE FACEBOOK MESSAGE
        var data = {
            name : args.url,
            // set the link if necessary
            link : args.url,
            caption : args.url,
            // now you add your text
            description : args.url
        };
        if (!facebook_dialog) {
            var facebook_dialog = Titanium.Facebook.dialog("feed", data, showRequestResult);
        }

        /**
         * HANDLE THE REQUEST RESULT FROM FACEBOOK
         */
        function showRequestResult(r) {
            if (r.result) {
                facebook_response = Ti.UI.createAlertDialog({
                    title : 'Facebook Shared!',
                    message : 'Your stream was published'
                });
            } else {
                facebook_response = Ti.UI.createAlertDialog({
                    title : 'Facebook Stream was cancelled',
                    message : 'Nothing was published.'
                });
            }
            facebook_response.show();
            var fb_resp_timeout = setTimeout(function() {
                facebook_response.hide();
            }, 2000);
        }
    }
}

function tweetOnTwitter(){
    var twitter = social.create({
        site : 'twitter',
        consumerKey : 'IK3jErBcTyDOzX55XekFxw',
        consumerSecret : 'CRJj8fKU1PeCofHjCCtaCwE5B0dV4vFyyUUgd8kTKs'
    });
    twitter.share({
        message : args.url,
        success : function() {
            alert('Tweeted!');
        },
        error : function(error) {
            alert('Oh no! ' + error);
        }
    });
}

function mailSomeone(){
    var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "NBC News Share";
        emailDialog.toRecipients = [''];
        emailDialog.messageBody = args.url;
        emailDialog.open();
}
