import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js'

Vue.use(Vuex);

/* 项目全局State */
const state = {
	isHome:false,
	isLogin:false,
	footer:'',
	userInfo:{},
	userCenterInfo:{},
	myAssets:'',
	userCenterSelected:"",
	propertySelected:"",
	orderListSelected:{},
    token:'',
	user_google:'',
	phone:'',
    zone_num:'',
	umail:'',
	socketFn:'',
    iv : 'ycdMOf!gxqA6IpuC',
	key : 'nn-#IcoTW:[k&5gg'
}

/* Store实例 */
export default new Vuex.Store({
	state,
	mutations
})