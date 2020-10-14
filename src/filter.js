
import {GET_OFF_SET,SET_OFF_SET} from 'lib/Constant'
var dateFilter = (value)=>{
    return moment(value).add((SET_OFF_SET-GET_OFF_SET),'h').format(format);
}
var numberFilter =(value) =>{
    return  Math.floor(value*100)/100;
}
var phoneFilter =(value) =>{
     if(value!='' && value!='undefined' && value!=undefined){
         return value.replace(/(\d{3})(\d{4})/,"$1 **** ");
     }
     return '';
}
export { dateFilter ,numberFilter,phoneFilter}