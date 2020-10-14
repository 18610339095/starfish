
/**
 * 加密
 */
function encrypt(str,key,iv) {
    var key = CryptoJS.enc.Utf8.parse(key) ;// 秘钥
    var iv=  CryptoJS.enc.Utf8.parse(iv) ;
    var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}
/**
 * 解密
 * @param str
 */
function decrypt(str,key,iv) {
    var key = CryptoJS.enc.Utf8.parse(key) ;// 秘钥
    var iv=  CryptoJS.enc.Utf8.parse(iv) ;
    var decrypted = CryptoJS.AES.decrypt(str,key,{iv:iv,padding:CryptoJS.pad.Pkcs7});
    return decrypted.toString(CryptoJS.enc.Utf8);
}