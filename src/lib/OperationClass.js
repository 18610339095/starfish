

export default  {

     addClass (obj, cls){
        var obj_class = obj.className,
        blank = (obj_class != '') ? ' ' : '';
        var added = obj_class + blank + cls;
        if(!this.hasClass(obj,cls)){
            var added = obj_class + blank + cls;
            obj.className = added;
        }
      },
         
       removeClass (obj, cls){
        var obj_class = ' '+obj.className+' ';
        obj_class = obj_class.replace(/(\s+)/gi, ' ');
        var removed = obj_class.replace(' '+cls+' ', ' ');
        removed = removed.replace(/(^\s+)|(\s+$)/g, '');
        obj.className = removed;
      },
         
       hasClass (obj, cls){
        var obj_class = obj.className,
        obj_class_lst = obj_class.split(/\s+/);
        var x = 0;
        for(x in obj_class_lst) {
          if(obj_class_lst[x] == cls) {
            return true;
          }
        }
        return false;
      }
}
