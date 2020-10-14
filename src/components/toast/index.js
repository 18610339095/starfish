import toastVue from 'components/toast/toast';
var Toast = {} // 定义插件对象
Toast.install = function (Vue, options) { // vue的install方法，用于定义vue插件
 // 如果toast还在，则不再执行
 if(document.getElementsByClassName('alertBox').length){ 
   return
 }
 let toastTpl = Vue.extend(toastVue) // 创建vue构造器
 // el：提供一个在页面上已存在的DOM元素作为Vue实例的挂载目标。可以是css选择器，也可以是HTMLElement实例。
 // 在实例挂载之后，可以通过$vm.$el访问。
 // 如果这个选项在实例化时有用到，实例将立即进入编译过程。否则，需要显示调用vm.$mount()手动开启编译(如下)
 // 提供的元素只能作为挂载点。所有的挂载元素会被vue生成的dom替换。因此不能挂载在顶级元素(html, body)上
 // let $vm = new toastTpl({
 //  el: document.createElement('div')
 // })
 let $vm = new toastTpl() // 实例化vue实例
 // 此处使用$mount来手动开启编译。用$el来访问元素，并插入到body中
 let tpl = $vm.$mount().$el
 document.body.appendChild(tpl)
 
 Vue.prototype.$toast = { // 在Vue的原型上添加实例方法，以全局调用
  show(options) { // 控制toast显示的方法
      if(!options.text){
          $vm.show = false;
          return false
      }else{
          if (typeof options === 'string') { // 对参数进行判断
              $vm.text = options // 传入props
          }
          else if (typeof options === 'object') {
              Object.assign($vm, options) // 合并参数与实例
          }
          $vm.show = true // 显示toast
      }

  },
  hide() { // 控制toast隐藏的方法
   $vm.show = false
  }
 }
}
export default Toast; // 导出Toast（注意：此处不能用module exports导出，在一个文件中，不能同时使用require方式引入，而用module exports导出，两种方式不能混用）
