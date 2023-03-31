<template>
	<view>
		<web-view :style="{'height': winHeight}" :src="videourl"></web-view>
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
		}
	}
</script>

<style>

</style>