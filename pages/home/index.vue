<template>
	<view class="homeContainer">
		<view class="useItem" v-for="(item, key) in list" :key="key" @click="navigate(item)">
			<uni-row class="row">
				<uni-col :span="4">
					<image class="icons" :src="`../../static/icons/${item.icon}.png`" mode="aspectFit"></image>
				</uni-col>
				<uni-col :span="18">
					<view>{{ item.name }}</view>
				</uni-col>
				<uni-col :span="2">
					<uni-icons type="right"></uni-icons>
				</uni-col>
			</uni-row>
		</view>
	</view>
</template>

<script>
	import { getCurrentInstance, toRaw } from 'vue'
	export default {
		data() {
			return {
				proxy: {},
				list: []
			}
		},
		onLoad() {
			const { proxy } = getCurrentInstance()
			this.proxy = proxy
			this.getList()
		},
		methods: {
			async getList() {
				const res = await toRaw(this.proxy.$request.call(this, {
					url: '/api/useList'
				}))
				this.list = res.list || []
				
			},
			navigate(item) {
				uni.navigateTo({
					url: `./example?key=${item.name}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.homeContainer{
		.useItem{
			box-shadow: $uni-shadow-base;
			border-radius: $uni-border-radius-lg;
			padding: 50rpx;
			margin: 25rpx;
			/* #ifdef H5 */
			&:hover{
				box-shadow: $uni-shadow-lg;
			}
			/* #endif */
			.icons{
				width: 100%;
				height: 60rpx;
			}
			.row{
				display: flex;
				align-items: center;
			}
		}
	}
</style>