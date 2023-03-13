import marked from '../../util/marked.js'
export const configList = [{
	key: 'swiper',
	name: '轮播图',
	show: 'components'
},{
	key: 'map',
	name: '地图',
	show: 'components'
},{
	key: 'upload',
	name: '文件上传',
	show: 'uni-ui'
},{
	key: 'calendar',
	name: '日历',
	show: 'uni-ui'
},{
	key: 'phoneCall',
	name: '打电话',
	show: 'device'
},{
	key: 'screenLight',
	name: '设置屏幕亮度',
	show: 'device'
},{
	key: 'getSystemInfo',
	name: '获取系统信息',
	show: 'device'
},{
	key: 'scanCode',
	name: '扫码',
	show: 'device'
},{
	key: 'appLifeCycle',
	name: '应用生命周期',
	show: 'life-cycle'
},{
	key: 'pageLifeCycle',
	name: '页面生命周期',
	show: 'life-cycle'
},{
	key: 'compile',
	name: '条件编译',
	show: 'function'
},{
	key: 'request',
	name: '请求',
	show: 'request'
}]

export const phoneCall = marked(`
	uni.makePhoneCall({
		phoneNumber: '15819123567'
	})
`, 'javascript')
export const screenLight = marked(`
	// 获取屏幕亮度
	uni.getScreenBrightness()
	
	// 设置屏幕亮度
	uni.setScreenBrightness()
`, 'javascript')
export const getSystemInfo = marked(`
	uni.getSystemInfo()
`, 'javascript')
export const scanCode = marked(`
	uni.scanCode()
`, 'javascript')
export const appLifeCycle = marked(`
	// uni-app初始化完成时触发
	onLaunch() {}
	// uni-app启动,或从后台进入前台显示时触发
	onShow() {}
	// uni-app从前台进入后台时触发
	onHide() {}
	// uni-app报错时触发
	onError() {}
`, 'javascript')
export const pageLifeCycle = marked(`
	// 页面加载,参数为上个页面传递的参数
	onLoad() {}
	// 页面显示
	onShow() {}
	// 页面初次渲染完成
	onReady() {}
	// 页面隐藏
	onHide() {}
	// 页面卸载
	onUnload() {}
`, 'javascript')
export const request = marked(`
	// 内置api
	uni.request({
		url,
		method,
		data,
		success: () => {},
		fail: () => {}
	})

	// 封装
	// main.js
	import { ques } from './util/api.js'
	app.config.globalProperties.$req = ques
	
	// page
	import {getCurrentInstance,toRaw} from 'vue'
	
	const { proxy } = getCurrentInstance()
	// toRaw()获取await proxy.$req()
	// 得到的proxy对象里面的数据
	await toRaw(proxy.$req({
		url
	}))
`, 'javascript')
export const compile = marked(`
	#ifdef H5 || MP-WEIXIN
	code...
	#endif
	
	H5		H5
	MP-WEIXIN	微信小程序
	MP-ALIPAY	支付宝小程序
`, 'javascript')
