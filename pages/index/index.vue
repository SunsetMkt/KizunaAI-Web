<template>
	<view style="width: 100%;height: 100%;">
		<view v-show="Vshow1" style="width: 100%;height: 100%;">
			<view>
				<!--导航栏-->
				<uni-nav-bar backgroundColor="#F586A4" shadow="true" rightIcon="bars" @clickRight="open" color="#FFFFFF"
					title="Kizuna AI" />
			</view>
			<view class="box">
				<!--日历-->
				<lunc-calendar :showLunar="true" :showMonthBg="false" :shouChangeBtn="true" firstDayOfWeek="sunday"
					:weekend="true" :signList="signList" @dayChange="dayChange">
				</lunc-calendar>
			</view>
			<view class="tit">
				<!--背景图片-->
				<view class="backimg">
					<image class="imgs" src="../../static/image/44a3a71f285c439e852b5fa3bb34f573.jpg" mode="aspectFit">
					</image>
					<view style="color: #8F939C;">{{info}}</view>
					<view>
						<!--悬浮按键-->
						<uni-fab horizontal='right' vertical="bottom" :pattern="pattren" :content="content"
							@trigger="note"></uni-fab>
					</view>
				</view>
			</view>

		</view>
		<!--弹出层-->
		<uni-popup type="right" ref="pop" backgroundColor="#FFFFFF">
			<div>
				<uni-list>
					<uni-list-item title="播放过去日期视频" showSwitch :switchChecked="old_video_chencked"
						@switchChange="switchchange"></uni-list-item>
					<!--
					<uni-list-item title="设置应用开始页面" showArrow link to="setfirstpage/setfirstpage"></uni-list-item>
					-->
					<uni-list-item title="修改生日" showArrow link to="mbirthday/mbirthday"></uni-list-item>
					<uni-list-item title="清除过期标签" clickable @click="del"></uni-list-item>
					<uni-list-item title="使用说明" showArrow link to="explain/explain"></uni-list-item>
					<uni-list-item title="关于" clickable @click="about"></uni-list-item>
				</uni-list>
			</div>
		</uni-popup>
		<!--添加标签-->
		<view>
			<uni-popup type="center" ref='poptime' backgroundColor="#FFFFFF">
				<view
					style="margin: 25px 0;font-size: 50rpx;display: flex;align-items: center;justify-content: center;">
					创建标签
				</view>
				<view style="margin: 25px 0;">
					<uni-datetime-picker type="datet" hideSecond @change="change_time"></uni-datetime-picker>
				</view>
				<view
					style="margin: 25rpx 0;color: #808080;display: flex;align-items: center;justify-content: center;font-size: 40rpx;">
					<view>标签名:</view>
					<view>
						<input style="min-height: 40px; height: 40px;border-bottom:1rpx solid #909399;"
							@input="okinput" />
					</view>
				</view>
				<view
					style="margin: 25rpx 0;color: #808080;display: flex;align-items: center;justify-content: center;font-size: 40rpx;">
					<view style="border: 1px solid #909399;">
						<textarea placeholder='备注' @input='oktext'></textarea>
					</view>
				</view>
				<view style="margin: 25rpx 0;">
					<button style="width: 30%;" @click="save_note">确定</button>
				</view>
			</uni-popup>
		</view>
		<!--结束视频-->
		<view v-show="Vshow2" style="width: 100%;height: 100%;">
			<view class="quitView">
				<video id="myVideo" :src="endVideoUrl" @ended="videoEnd" autoplay="true"></video>
			</view>
		</view>
	</view>
</template>

<script>
	import videoUrl from "../../data/data.js"
	export default {
		data() {
			return {
				styles: {},
				date: '',
				Vshow1: true,
				Vshow2: false,
				endVideoUrl: '',
				old_video: false,
				old_video_chencked: false,
				signList: '',
				info: '',
				content: [{
						iconPath: '../../static/image/note.png',
						text: '标签',
						active: false
					},
					{
						iconPath: '../../static/image/del.png',
						text: '删除',
						active: false
					},
					{
						iconPath: '../../static/image/renovate.png',
						text: '刷新',
						active: false
					},
					{
						iconPath: '../../static/image/video.png',
						text: '视频',
						active: false
					}
				],
				pattren: {
					'buttonColor': '#F586A4'
				},
				mark_show: false,
				datetimerange: [],
				datetime: '',
				markname: '',
				markmsg: '',
				calendar: ''
			}
		},
		onLoad() {
			this.renovate()
		},
		//监听页面返回videoList
		onBackPress(options) {
			var endVideo = ["../../static/videos/202203011833.mp4", "../../static/videos/202203011859.mp4"]
			var endVideoUrl = endVideo[Math.floor(Math.random() * 2)]
			this.endVideoUrl = endVideoUrl
			this.Vshow1 = false
			this.Vshow2 = true
			return true;
		},
		methods: {
			renovate() {
				var date_mark = [{
						date: '2017-12-18',
						title: '100w',
						info: '给大家看看这一瞬间！「订阅数100w人突破！」'
					},
					{
						date: '2016-02-01',
						title: '自我介绍',
						info: '初次见面！我叫绊爱！'
					},
					{
						date: '2022-02-26',
						title: 'HelloWorld',
						info: 'Kizuna AI The Last Live “hello, world 2022”'
					},
					{
						date: '2017-11-14',
						title: '花Q',
						info: '【生化危机7】#19 愉快的视频鉴赏会！ Party前夜！【A.I.Games】'
					}
				]
				var oldvideo = uni.getStorageSync("oldvideo")
				var birthday = uni.getStorageSync("birthday") //生日缓存
				console.log(birthday)
				var mark_day = uni.getStorageSync("markList") //标签缓存
				if (oldvideo != '') {
					this.old_video_chencked = oldvideo
				}
				//添加固定标签
				if (mark_day) {
					var lock1 = mark_day.find(e => e.title == "100w")
					var lock2 = mark_day.find(e => e.title == "自我介绍")
					var lock3 = mark_day.find(e => e.title == "HelloWorld")
					switch (undefined) {
						case lock1:
							mark_day.push(date_mark[0])
						case lock2:
							mark_day.push(date_mark[1])
						case lock3:
							mark_day.push(date_mark[2])
					}
					this.signList = mark_day
				} else {
					this.signList = date_mark
				}
				console.log(mark_day)
				var markday = this.signList
				var today_load = this.today()
				//修改追加生日
				if (birthday) {
					var msg = {}
					msg['date'] = today_load[0] + '-' + birthday
					msg['title'] = '生日'
					msg['mark'] = 'myself'
					var mark = markday.find(e => e.mark == "myself")
					if (mark == undefined) {
						markday.push(msg)
					} else if (mark.date != msg.date) {
						mark.date = msg.date
					}
					this.signList = markday
				}
				//遍历数组显示标签信息
				var ymd = today_load[0] + '-' + today_load[1] + '-' + today_load[2]
				markday.forEach((e) => {
					if (e.date == ymd) {
						if (e.info) {
							this.info = e.info
						}
					}
				})
				var nowhourmin = ymd + ' ' + today_load[3] + ':' + today_load[4]
				this.datetimerange = [nowhourmin, nowhourmin]
				var now_time = today_load[1] + "-" + today_load[2]
				var now_time3 = today_load[0] + today_load[1] + today_load[2]
				var now_time4 = today_load[0] + "-" + today_load[1] + "-" + today_load[2]
				this.calendar = [now_time, now_time, now_time3, now_time3, now_time4]
				// #ifdef APP-NVUE
				this.styles = {
					justifyContent: 'center',
					alignItems: 'center',
					width: '100px',
					height: '100px',
					borderRadius: '5px',
					textAlign: 'center',
					backgroundColor: '#4cd964',
					boxShadow: '0 0 5px 1px rgba(0,0,0,0.2)'
				}
				// #endif
			},
			dayChange(dayInfo) {
				this.info = ""
				//日历时间
				this.date = dayInfo["date"]
				var date = dayInfo["date"].slice(5)
				//手机日期
				var today_list = this.today()
				var now_time = today_list[1] + "-" + today_list[2]
				var now_time2 = dayInfo["date"].replace(/-/g, "") //正则表达式搜索替换
				var now_time3 = today_list[0] + today_list[1] + today_list[2]
				this.calendar = [date, now_time, now_time2, now_time3, dayInfo["date"]]
				var markday = this.signList
				var today_load = this.today()
				var ymd = today_load[0] + '-' + today_load[1] + '-' + today_load[2]
				markday.forEach((e) => {
					if (e.date == dayInfo["date"]) {
						if (e.info) {
							this.info = e.info
						}
					}
				})
			},
			//播放条进度改变
			videoEnd() {
				// 退出当前应用，改方法只在App中生效
				plus.runtime.quit()
			},
			//弹出层
			open() {
				this.$refs.pop.open()
			},
			//switch切换
			switchchange(e) {
				uni.setStorageSync("oldvideo", e.value)
				this.old_video_chencked = e.value
			},
			//获取当前日期
			today() {
				//当前时间
				var now_date = new Date()
				var year = now_date.getFullYear() //获取四位数年
				//月份
				if (now_date.getMonth() < 10) {
					var month = "0" + String(now_date.getMonth() + 1)
				} else {
					var month = String(now_date.getMonth())
				}
				//日
				if (now_date.getDate() < 10) {
					var day = "0" + String(now_date.getDate())
				} else {
					var day = String(now_date.getDate())
				}
				//时
				if (now_date.getHours() < 10) {
					var hour = "0" + String(now_date.getHours())
				} else {
					var hour = String(now_date.getHours())
				}
				//分
				if (now_date.getMinutes() < 10) {
					var minute = "0" + String(now_date.getMinutes())
				} else {
					var minute = String(now_date.getMinutes())
				}
				return [year, month, day, hour, minute]
			},
			del() {
				var that = this
				//模态弹窗
				uni.showModal({
					title: '提示',
					content: '清除过期标签',
					success(res) {
						if (res.confirm) {
							var today_load = that.today()
							var ymd = today_load[0] + '-' + today_load[1] + '-' + today_load[2]
							var markday = that.signList
							var new_markday = []
							markday.forEach((e) => {
								if (e.date >= ymd) {
									new_markday.push(e)
								}
							})
							uni.setStorageSync("markList", new_markday)
							this.signList = new_markday
							//uni.getSubNVueById('bili').close()//关闭原子窗口
							uni.showToast({
								icon: "success",
								title: "已清除",
								duration: 2000
							})
							uni.navigateTo({
								url: "../index/index"
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//打开标签弹窗
			note(e) {
				var that = this
				switch (e.index) {
					//标签
					case 0:
						this.$refs.poptime.open()
						break
						//删除标签
					case 1:
						if (this.date) {
							console.log("删除警告modal")
							uni.showModal({
								title: '提示',
								content: '删除' + this.date + "的标签",
								success(res) {
									if (res.confirm) {
										var markday = that.signList
										markday.forEach((e) => {
											if (e.date == that.date) {
												markday.splice(markday.indexOf(e), 1) //删除过期标签
											}
										})
										uni.setStorageSync("markList", markday)
										that.signList = markday
										//uni.getSubNVueById('bili').close()//关闭原子窗口
										uni.showToast({
											icon: "success",
											title: "已删除",
											duration: 2000
										})
										uni.navigateTo({
											url: "../index/index"
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						} else {
							console.log("未选定日期modal")
							uni.showModal({
								title: '提醒',
								content: "请先点击要删除的标签日期",
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						}
						break
						//刷新页面
					case 2:
						console.log("刷新")
						uni.navigateTo({
							url: "../index/index"
						})
						break
						//播放视频
					case 3:
						if (this.calendar) {
							console.log(this.calendar)
							that.get_video(this.calendar)
						} else {
							uni.showToast({
								icon: "error",
								title: "请先选择日期",
								duration: 2000
							})
						}
				}
			},
			//保存标签
			save_note() {
				if (this.markname && this.datetime) {
					var markday = this.signList
					var add_mark = {}
					add_mark['date'] = this.datetime
					add_mark['title'] = this.markname
					add_mark['info'] = this.markmsg
					markday.push(add_mark)
					uni.setStorageSync("markList", markday)
					this.signList = markday
					uni.showToast({
						icon: "success",
						title: "设置成功",
						duration: 2000
					})
					//uni.getSubNVueById('bili').close()//关闭原子窗口
					uni.navigateTo({
						url: "../index/index"
					})
				} else {
					uni.showToast({
						icon: "error",
						title: "日期未选定或内部错误",
						duration: 2000
					})
					console.log(0)
				}
			},
			//获取时间组件的值
			change_time(e) {
				this.datetime = e
			},
			//获取标签名
			okinput(e) {
				this.markname = e.target.value
			},
			oktext(e) {
				this.markmsg = e.target.value
			},
			get_video(value) {
				var videourl = videoUrl.data
				var birthday = uni.getStorageSync("birthday")
				//播放过去日期的视频
				if (this.old_video_chencked) {
					console.log("播放过去视频")
					//当日期小于等于现在的日期时
					if (value[2] <= value[3]) {
						console.log("日期小于等于现在的日期")
						//日期匹配打开弹窗
						//生日时播放
						if (birthday == value[0] && birthday == value[1]) {
							console.log("生日")
							//播放视频
							//解释一下这个操作
							//把date和vu放到字典里然后json化然后url编码传参到vid
							uni.navigateTo({
								url: "../index/video/vid?conf=" + encodeURIComponent(JSON.stringify({
									'date': value[0],
									'vu': "https://player.bilibili.com/player.html?aid=14031615&bvid=BV1zx411t7Pb&cid=22914934&page=1"
								}))
							})
						} else {
							console.log("不是生日")
							switch (value[4]) {
								//初次见面
								case '2016-02-01':
									uni.navigateTo({
										url: "../index/video/vid?conf=" + encodeURIComponent(JSON.stringify({
											'date': value[0],
											'vu': "https://player.bilibili.com/player.html?aid=9800170&bvid=BV1ox411S7Q7&cid=16201929&page=1"
										}))
									})
									break
									//一百万订阅
								case '2017-12-18':
									uni.navigateTo({
										url: "../index/video/vid?conf=" + encodeURIComponent(JSON.stringify({
											'date': value[0],
											'vu': "https://player.bilibili.com/player.html?aid=17398095&bvid=BV1PW41187pj&cid=28420987&page=1"
										}))
									})
									break
									//Hello World 2022
								case '2022-02-26':
									uni.navigateTo({
										url: "../index/video/vid?conf=" + encodeURIComponent(JSON.stringify({
											'date': value[0],
											'vu': "https://player.bilibili.com/player.html?aid=724474890&bvid=BV1mS4y167M7&cid=700067873&page=1"
										}))
									})
									break
									//花Q最初视频
								case '2017-11-14':
									uni.navigateTo({
										url: "../index/video/vid?conf=" + encodeURIComponent(JSON.stringify({
											'date': value[0],
											'vu': "https://player.bilibili.com/player.html?aid=17483397&bvid=BV1hW41187E4&cid=28553647&page=1"
										}))
									})
									break
								default:
									var videoList = videourl[value[0]]
									if (videoList != undefined) {
										uni.navigateTo({
											url: "../index/video/vid?conf=" + encodeURIComponent(JSON.stringify({
												'date': value[0],
												'vu': "https:" + videoList[Math.floor(Math.random() *
													videoList.length)]
											}))
										})
									} else {
										uni.showToast({
											icon: "error",
											title: value[0] + "没有视频",
											duration: 2000
										})
									}
							}
						}
					}
				}
				//不播放过去日期的视频
				else {
					//点击日期与实际日期相同时打开子窗体
					if (value[0] == value[1]) {
						//生日时播放
						switch (birthday) {
							case value[0]:
								uni.navigateTo({
									url: "../index/video/vid?conf=" + encodeURIComponent(JSON.stringify({
										'date': value[0],
										'vu': "https://player.bilibili.com/player.html?aid=14031615&bvid=BV1zx411t7Pb&cid=22914934&page=1"
									}))
								})
								break
							default:
								if (videourl[value[1]]) {
									var videoList = videourl[value[1]]
									uni.navigateTo({
										url: "../index/video/vid?conf=" + encodeURIComponent(JSON.stringify({
											'date': value[0],
											'vu': "https:" + videoList[Math.floor(Math.random() *
												videoList.length)]
										}))
									})
								}
						}
					}
				}
			},
			about() {
				var text =
					"KizunaAI-Web\n此WebApp基于哔哩哔哩用户灰暗江原的开源项目修改。\n上游开源链接:\nhttps://gitee.com/muyi456/KizunaAI\n此项目开源链接:\nhttps://github.com/lwd-temp/KizunaAI-Web\n"
				uni.showModal({
					title: '关于',
					content: text,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style>
	.imgs {
		height: 550rpx;
		opacity: 0.4;
		z-index: -1;
		position: fixed;
		bottom: 0;
	}

	.backimg {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

	}

	.quitView {
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000000;
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
