<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			var fp = uni.getStorageSync("firstpage")
			if (fp == 0) {
				//进入主页面
				setTimeout(() => {
					uni.redirectTo({
						url: "../login/loading"
					})
				}, 1000)
			} else if (fp == 1) {
				//进入主页面
				setTimeout(() => {
					uni.redirectTo({
						url: "../login/loadingtwo"
					})
				}, 1000)
			}
		},
		methods: {}
	}
</script>

<style>
	.first_view {
		width: 100%;
	}

	.title {
		padding: 50rpx 0;
		;
		font-size: 50rpx;
		color: #8F939C;
	}

	.picker_date {
		width: 60%;
		font-size: 40rpx;
		color: #909399;
		border-bottom: 1rpx solid #909399;
	}

	.buto {
		margin: 50rpx 20rpx;
		width: 80%;
	}

	.view_center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.now_choose {
		font-size: 40rpx;
		color: #909399;
	}
</style>