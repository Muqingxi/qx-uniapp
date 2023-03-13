<template>
	<view class="cdContainer">
		<uni-section :titleFontSize="16" title="enablePullDownRefresh" subTitle="@event.stop在H5中可阻止下拉刷新效果,在weixin和app中无效" type="line"></uni-section>
		<uni-section :titleFontSize="16" title="highlight" subTitle="封装的marked.js中引入了highlight css,但在小程序中无效,要在.vue中的style引入" type="line"></uni-section>
		<uni-section :titleFontSize="16" title="uni-calendar" subTitle="父盒子有margin, padding,组件宽度溢出" type="line"></uni-section>
		<uni-section :titleFontSize="16" title="getlocation" subTitle="手机自身要开启自动定位服务,否则会getlocation:fail" type="line"></uni-section>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.cdContainer{
	}
</style>