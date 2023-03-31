<template>
	<view style="height: 100vh;">
		<view style="width: 100%;height: 100%;">
			<image mode="aspectFill" src="../../static/image/2.jpg" style=" width: 100%;height: 100%;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		created() {
			try {
				var value = uni.getStorageSync('FirstRun')
				console.log(value)
				if (value == "one") {
					this.startTime()
				}
				//第一次进入应用
				else {
					uni.setStorageSync("FirstRun", "one")
					console.log(value)
					this.firstRun()
				}
			} catch (e) {
				// error
				console.log(e)
			}

		},
		onShow() {
			//播放音频
			const innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			innerAudioContext.src = '../../static/music/Hi, Duomo.mp3';
			innerAudioContext.onPlay(() => {
				console.log('开始播放');
			});
			innerAudioContext.onError((res) => {
				console.log(res.errMsg);
				console.log(res.errCode);
			});
		},
		methods: {
			//进入主页面
			startTime() {
				setTimeout(() => {
					uni.redirectTo({
						url: "../index/index"
					})
				}, 3000)
			},
			//进入初次页面
			firstRun() {
				setTimeout(() => {
					uni.redirectTo({
						url: "../first/first"
					})
				}, 3000)
			}
		}
	}
</script>

<style>
</style>