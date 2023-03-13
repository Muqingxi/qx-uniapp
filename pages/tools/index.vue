<template>
	<view class="toolsContainer">
		<uni-section title="工具" type="line">
			<uni-card class="card" :is-shadow="false">
				<text class="code">HBuilderX</text>
			</uni-card>
		</uni-section>
		<uni-section title="打包配置" type="line">
			<uni-card title="android" :is-shadow="false">
				<text class="code">Geolocation / maps</text>
				<uni-list :border="false">
					<uni-list-item title="1. DCLOUD开发者中心 -> 我的应用" />
					<uni-list-item :border="false" title="2. 生成Android云端证书 -> 证书详情 -> 拿到SHA1" />
					<uni-list-item :border="false" title="3. 高德开放平台 -> 我的应用 -> 添加key" note="填写SHA1, PackageName为应用包名" />
					<uni-list-item :border="false" title="4. 将key配置到manifest.json -> 高德地图: appkey_android" />
				</uni-list>
				<text class="code">打电话[makePhoneCall]</text>
				<uni-list :border="false">
					<uni-list-item title="勾选android.permission.CALL_PHONE" />
				</uni-list>
			</uni-card>
			<uni-card title="ios" :is-shadow="false">
				<text class="code">Geolocation / maps</text>
				<uni-list :border="false">
					<uni-list-item title="1. HBuilderX -> 发行 -> 原生app云打包" />
					<uni-list-item :border="false" title="2. 选择ios设置 -> 拿到Bundle ID(APPID)" />
					<uni-list-item :border="false" title="3. 高德开放平台 -> 我的应用 -> 添加key" note="填写Bundle ID" />
					<uni-list-item :border="false" title="4. 将key配置到manifest.json -> 高德地图: appkey_ios" />
				</uni-list>
			</uni-card>
			<uni-card title="mp-weixin" :is-shadow="false">
				<text class="code">appid</text>
				<uni-list :border="false">
					<uni-list-item title="微信公众平台 -> 开发设置 -> AppID" />
				</uni-list>
				<text class="code">位置接口</text>
				<uni-list :border="false">
					<uni-list-item title="勾选 -> 填写描述" note="确认微信开发者工具中的main.js有没有permission, requiredPrivateInfos字段"/>
				</uni-list>
			</uni-card>
			<uni-card title="H5" :is-shadow="false">
				<text class="code">定位和地图</text>
				<uni-list :border="false">
					<uni-list-item title="勾选腾讯地图 -> 腾讯位置服务 -> 我的应用 -> 添加key" />
				</uni-list>
			</uni-card>
		</uni-section>
		<uni-section title="打包" type="line">
			<uni-card title="android" :is-shadow="false">
				<uni-list :border="false">
					<uni-list-item title="1. HBuilderX -> 发行 -> 原生app云打包" />
					<uni-list-item :border="false" title="2. 选择Android -> 选择自有证书" />
					<uni-list-item :border="false" title="3. 输入证书别名, 证书私钥密码, 证书文件" note="可在DCLOUD证书详情拿到, 下载证书到指定目录, 证书文件可在指定目录拿到" />
				</uni-list>
			</uni-card>
		</uni-section>
		<uni-section title="usage" type="line">
			<uni-card class="card" :is-shadow="false">
				<uni-list :border="false">
					<uni-list-item>
						<template v-slot:body>
							<text class="code">VUE3</text>
						</template>
					</uni-list-item>
					<uni-list-item :border="false">
						<template v-slot:body>
							<text class="code">marked</text>
						</template>
					</uni-list-item>
					<uni-list-item :border="false">
						<template v-slot:body>
							<text class="code">highlight</text>
						</template>
					</uni-list-item>
					<uni-list-item :border="false">
						<template v-slot:body>
							<text>接口服务: </text>
							<text class="code">apifox</text>
						</template>
					</uni-list-item>
				</uni-list>
			</uni-card>
		</uni-section>
	</view>
</template>

<script>
	export default{
		data() {
			return {
			}
		}
	}
</script>

<style lang="scss">
	.toolsContainer{
		.code {
			font-size: 32rpx;
			color: #e96900;
			background-color: $uni-bg-color-grey;
		}
		.padding{
			padding-left: 30rpx;
		}
	}
</style>