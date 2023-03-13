

<template>
    <view class="exampleContainer">
		<view class="card">
			<template v-for="(item, key) in list" :key="key">
				<template v-if="isShow(item.show)">
					<uni-card :title="item.key" :extra="item.name" :isFull="item.key === 'calendar'">
						<swiper
							v-if="item.key === 'swiper'"
							circular 
							:indicator-dots="swiper.indicatorDots" 
							:indicator-color="swiper.indicatorColor"
							:indicator-active-color="swiper.indicatorActiveColor"
							:autoplay="swiper.autoplay" 
							:interval="swiper.interval" 
							:duration="swiper.duration">
							<swiper-item v-for="(item, key) in swiper.bannerList" :key="key">
								<image :src="item.url" mode="aspectFill"></image>
							</swiper-item>
						</swiper>
						<view v-if="item.key === 'map'" @touchmove.stop="mapTouch">
							<map :longitude="map.longitude" :latitude="map.latitude" :scale="map.scale" :markers="map.markers"></map>
						</view>
						<view v-if="item.key === 'upload'">
							<uni-section title="只选择图片" type="line">
								<view class="example-body">
									<uni-file-picker limit="9" title="最多选择9张图片"></uni-file-picker>
								</view>
							</uni-section>
						</view>
						<view v-if="item.key === 'calendar'">
							<uni-calendar :selected="calendar.selected" :showMonth="false" />
						</view>
						<view v-if="item.key === 'phoneCall'" class="buttonCode">
							<button type="default" @click="phoneCall">打电话</button>
						</view>
						<view v-if="item.key === 'screenLight'">
							<uni-row class="screenRaw">
								<uni-col :span="9">
									设置屏幕亮度:
								</uni-col>
								<uni-col :span="15">
									<slider :value="screenInfo.value" @change="sliderChange" show-value />
								</uni-col>
							</uni-row>
						</view>
						<view v-if="item.key === 'getSystemInfo'" class="buttonCode">
							<uni-grid :column="3" :square="false">
								<uni-grid-item>
									<view class="message">
										<text>{{ info.deviceType }}</text>
										<text>设备类型</text>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="message">
										<text>{{ info.deviceModel }}</text>
										<text>设备型号</text>
									</view>
								</uni-grid-item>
								<uni-grid-item>
									<view class="message">
										<text>{{ info.uniPlatform }}</text>
										<text>运行平台</text>
									</view>
								</uni-grid-item>
							</uni-grid>
						</view>
						<view v-if="item.key === 'scanCode'" class="buttonCode">
							<!-- #ifdef APP -->
							<button type="default" @click="scanCode">扫码</button>
							<view v-if="scanInfo.scanType">
								<view>扫码类型: {{ scanInfo.scanType }}</view>
								<view>扫码结果: {{ scanInfo.result }}</view>
							</view>
							<!-- #endif -->
						</view>
						<!-- marked code -->
						<view v-for="(code, k) in code" :key="k">
							<template v-if="k === item.key">
								<rich-text class="code" :nodes="code"></rich-text>
							</template>
						</view>
					</uni-card>
				</template>
			</template>
		</view>
    </view>
</template>

<script>
	import { getCurrentInstance, toRaw } from 'vue'
	import { configList, phoneCall, getSystemInfo, scanCode, screenLight, appLifeCycle, pageLifeCycle, compile, request} from './config.js'
	
	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)

		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}
	
    export default {
		data() {
			return {
				key: 'components',
				list: [],
				proxy: {},
				swiper: {
					indicatorDots: true,
					indicatorColor: '#fff',
					indicatorActiveColor: '#00a12d',
					autoplay: true,
					interval: 2000,
					duration: 500,
					bannerList: []
				},
				map: {
					longitude: 113.727658,
					latitude: 25.027559,
					scale: 13,
					markers:[{
						id: 0,
						longitude: 113.727658,
						latitude: 25.027559,
						iconPath: '../../static/logo.png',
						width: 30,
						height: 30
					}]
				},
				calendar: {
					selected: [{
						date: getDate(new Date(),-3).fullDate,
						info: '打卡'
					},
					{
						date: getDate(new Date(),-2).fullDate,
						info: '签到',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: getDate(new Date(),-1).fullDate,
						info: '已打卡'
					}]
				},
				info: {},
				scanInfo: {},
				screenInfo: {
					value: 1
				},
				code: {}
			}
		},
		onLoad(options) {
			this.setTitle(options)
			this.init()
		},
		methods: {
			setTitle(options) {
				this.key = options.key
				uni.setNavigationBarTitle({
					title: this.key + ' example'
				})
			},
			isShow(key) {
				return key === this.key
			},
			init() {
				const { proxy } = getCurrentInstance()
				this.proxy = proxy
				this.list = configList
				switch (this.key){
					case 'components':
						this.getBannerList()
						this.getPosition()
						break;
					case 'device':
						this.getSystemMessage()
						// #ifdef !H5
						this.getScreenBrightness()
						// #endif
						break;
					default:
						break;
				}
				this.renderCode()
			},
			renderCode() {
				this.code = {
					phoneCall,
					getSystemInfo,
					scanCode,
					screenLight,
					appLifeCycle,
					pageLifeCycle,
					compile,
					request
				}
			},
			async getBannerList() {
				const res = await toRaw(this.proxy.$request({
					url: '/api/banner'
				}))
				this.swiper.bannerList = res.list
			},
			mapTouch(e) {
			},
			phoneCall() {
				uni.makePhoneCall({
					phoneNumber: '15819123567'
				})
			},
			async getSystemMessage() {
				this.info = await uni.getSystemInfo()
			},
			async scanCode() {
				this.scanInfo = await uni.scanCode()
			},
			sliderChange(res) {
				const value = Math.floor(res.detail.value) / 100
				this.setSreenLight(value)
			},
			async getScreenBrightness() {
				const res = await uni.getScreenBrightness()
				this.screenInfo.value = res.value.toFixed(2) * 100
			},
			async setSreenLight(value) {
				const res = await uni.setScreenBrightness({
					value: value ? value : 0.01
				})
			},
			getPosition() {
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						this.map.latitude = res.latitude
						this.map.longitude = res.longitude
						this.map.markers[0].latitude = res.latitude
						this.map.markers[0].longitude = res.longitude
					},
					fail: (err) => {
						uni.showModal({
							title: err.errMsg
						})
					}
				})
			}
		}
    }
</script>

<style lang="scss">
	/* #ifdef MP-WEIXIN */
	@import url("highlight.js/styles/kimbie-light.css");
	/* #endif */
	.exampleContainer{
		.buttonCode{
			button{
				font-size: 32rpx;
			}
		}
		.code{
			font-size: 24rpx;
		}
		.hljs{
			display: flex;
			padding: 20rpx 5rpx;
			code{
				width: 100%;
				word-break: break-all;
			}
			span{
				white-space: normal;
			}
		}
		.message{
			display: flex;
			padding: 15rpx 0;
			font-size: 28rpx;
			flex-direction: column;
			align-items: center;
		}
		.uni-grid{
			flex-wrap: nowrap;
		}
		.screenRaw,.uni-row{
			display: flex;
			align-items: center;
		}
	}
</style>