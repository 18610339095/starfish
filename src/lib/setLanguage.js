function setLanguage(name,defaultValue) {

    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)){
        return decodeURI(arr[2]);
    }
    else{
        return defaultValue;
    }

}
export {
    setLanguage
}