/**
 * 存入cookice以及SessionStore
 */

const setLocalStorage = (itemName,itemValue) =>{
    localStorage.setItem(itemName, itemValue);
}
const getStorage = (key) =>{
  var value_ = sessionStorage.getItem(key);
  if(value_!=='' ||value_!==undefined){
    return value_;
  }
  else{
    return null;
  }
}
const setStorage = (key,value) =>{
  sessionStorage.setItem(key,value);
}
const removeStore = (key) =>{
  if(key ==='all'){
    sessionStorage.clear();
  }
  else{
    sessionStorage.removeItem(key);
  }
}

const getCookie =(c_name)=>{
if (document.cookie.length>0)
  {
  var c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    var c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}

const removeCookie = (name) =>{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
const setCookie = (c_name,value) =>{
    var expiredays = null;
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

export {setLocalStorage,getStorage,setStorage,removeStore,getCookie,setCookie,removeCookie}