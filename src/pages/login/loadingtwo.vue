<template>
	<view>
		<view>
			<!--导航栏-->
			<uni-nav-bar backgroundColor="#F586A4" shadow="true" rightIcon="arrow-right" @clickRight="skip"
				color="#FFFFFF" title="Hello World" />
		</view>
		<view>
			<video id="myVideo" src="" :style="{'width': winWidth, 'height': winHeight}" autoplay="true"
				@ended="end"></video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			let wW = uni.getSystemInfoSync().windowWidth
			let wH = uni.getSystemInfoSync().windowHeight
			this.winWidth = `${wW}px`
			this.winHeight = `${wH}px`
		},
		methods: {
			skip() {
				uni.redirectTo({
					url: '../index/index'
				})
			},
			end() {
				uni.redirectTo({
					url: '../index/index'
				})
			}
		}
	}
</script>

<style>

</style>
