<template>
	<view>
		<web-view :style="{'height': winHeight}" :src="videourl" :sandbox="sandbox" :allow="allow"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				day: '',
				videourl: ''
			}
		},
		onLoad(option) {
			let wH = uni.getSystemInfoSync().windowHeight //获取屏幕高度
			this.winHeight = `${wH}px`
			var conf = JSON.parse(decodeURIComponent(option.conf));
			console.log(conf)
			this.day = conf.date
			this.videourl = conf.vu
			this.sandbox = "allow-top-navigation allow-same-origin allow-forms allow-scripts" //禁止弹出网页，这么写可能会warning
			this.allow = "allowfullscreen" //允许iframe全屏，好像没用
		}
	}
</script>

<style>

</style>