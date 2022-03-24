<template>
	<view>
		<view style="display: flex;justify-content: center;align-items: center;">
			<!--单项选择器-->
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
					<view style="margin-top: 30rpx;">
						<image :src="item.path" style="width: 300rpx;height: 500rpx;"></image>
						<view style="display: flex;flex-flow: row nowrap;justify-content: space-between;">
							<view>
								<radio :value="item.value" :checked="index === current" />
							</view>
							<view>{{item.name}}</view>
						</view>
					</view>
				</label>
			</radio-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
						value: '0',
						path: '../../../static/image/2.jpg',
						name: '嗨多磨音频'
					},
					{
						value: '1',
						path: '../../../static/image/helloworld.jpg',
						name: 'Hello World开场'
					},
				],
				current: 0
			}
		},
		onLoad() {
			var val = uni.getStorageSync("firstpage")
			console.log(val)
			if (val == '0') {
				this.current = 0
			} else if (val == '1') {
				this.current = 1
			}
		},
		methods: {
			radioChange(evt) {
				uni.setStorageSync("firstpage", evt.detail.value)
			}
		}
	}
</script>

<style>

</style>
