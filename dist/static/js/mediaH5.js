/* 修正viewport */
var web_width = 750;
var inner_width = window.innerWidth;
var scale = inner_width / web_width;
var viewportMate = document.getElementById("viewport");
var mate_value;

if (/ipad|iphone|mac/i.test(navigator.userAgent) || navigator.userAgent.indexOf('UCBrowser') > -1 || navigator.userAgent.indexOf('mqqbrowser') > -1) {

    /* 苹果和UC浏览器走这个分支 */
    mate_value = 'width=' + web_width + ',user-scalable=no,target-densitydpi=device-dpi';
    viewportMate.setAttribute('content', mate_value);
    if (window.innerWidth < web_width) {
        mate_value = 'width=' + web_width + ', minimum-scale = ' + scale + ', maximum-scale = ' + scale + ',user-scalable=no,target-densitydpi=device-dpi';
        viewportMate.setAttribute('content', mate_value);
    }
}
else if (/android/i.test(navigator.userAgent)) {

    var userAgent = navigator.userAgent;
    var index = userAgent.indexOf("AppleWebKit");
    if (index >= 0) {
        var androidAppleWebKitVersionAll = parseFloat(userAgent.slice(index + 11, index + 17)).toFixed(2);
    }
    else {
    }
    var androidAppleWebKitVersion = navigator.userAgent.match(/Android[\S\s]+AppleWebkit\/?(\d{3})/i);


    if (androidAppleWebKitVersionAll <= 534.30 || androidAppleWebKitVersion[1] <= 534.40) {

        try {
            var isWeibo = (navigator.userAgent.toLowerCase().match(/weibo/i) == "weibo") ? true : false;
            if (isWeibo) {
                var weiBoWidth = localStorage.getItem('weiBoWidth');
                if (weiBoWidth > 979) {
                    weiBoWidth = false;
                }
                if (weiBoWidth) {
                    scale = weiBoWidth / web_width;
                } else {
                    localStorage.setItem('weiBoWidth', inner_width)
                }
            }
        } catch (e) {
        }

        mate_value = 'width=' + web_width + ', minimum-scale = ' + scale + ', initial-scale=' + scale + ', maximum-scale = ' + scale + '';
        viewportMate.setAttribute('content', mate_value);
    }
    else {
        mate_value = 'width=' + web_width + ',user-scalable=no,target-densitydpi=device-dpi';
        viewportMate.setAttribute('content', mate_value);
    }
}
else {
    mate_value = 'width=' + web_width + ',user-scalable=no,target-densitydpi=device-dpi';
    viewportMate.setAttribute('content', mate_value);
}