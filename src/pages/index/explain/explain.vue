<template>
	<view>
		<view>
			<view class="font">添加标签：</view>
			<view class="text">1、点击主页面右下角加号 - 标签</view>
			<view class="text">2、在弹窗中选择日期、输入标签名，备注可选择是否输入</view>
			<view class="font">删除标签：</view>
			<view class="text">1、选择要删除的标签日期</view>
			<view class="text">2、点击主页面右下角加号 - 删除</view>
			<view class="font">刷新：</view>
			<view class="text">修改生日、删除所有过期标签时刷新页面</view>
			<view class="font">播放早安视频：</view>
			<view class="text">1、点击日历日期</view>
			<view class="text">2、再点击主页面右下角加号 - 视频</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>
<style>
	.font {
		font-size: 35rpx;
		padding: 25rpx 20rpx;
	}

	.text {
		padding-left: 80rpx;
	}
</style>