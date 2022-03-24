<template>
	<view class="lunc-calendar">
		<!-- 头部按钮及月份 -->
		<view class="header">
			<view class="head-icon head-pre-month" @click="goPreMonth" v-if="shouChangeBtn"><text></text></view>
			<view class="head-month">{{ selDate.year }}年{{ selDate.month<10?'0'+selDate.month:selDate.month }}月</view>
			<view class="head-icon head-next-month" @click="goNextMonth" v-if="shouChangeBtn"><text></text></view>
			<view class="go-to-today" v-show="showToday" @click="goToday">回到今天</view>
		</view>
		<!-- 星期 -->
		<view class="week-area">
			<view class="week-font" v-for="(item, index) in weekArr" :key="index ">周{{ item }}</view>
		</view>
		<view ref="calendar" class="data-container">
			<!-- 日期 -->
			<swiper class="calendar-swiper" :current="tranIndex" circular :duration="tranDuration" @change="changeMonth" @animationfinish="tranChangeEnd">
				<swiper-item class="swiper-item" v-for="(item, index) in allDataArr" :key="index">
					<view class="bg-month" v-show="showMonthBg">{{ item[15].sMonth<10?'0'+item[15].sMonth:item[15].sMonth }}</view>
					<view class="month-days">
						<view class="day" v-for="(d, j) in item" :key="j" @click="clickDay(d)">
							<view class="day-info" :class="[d.dayClass, (selDate.year == d.sYear && selDate.month == d.sMonth && selDate.day == d.day)?'is-sel':'']">
								<text class="day-solar">{{d.day}}</text>
								<text class="day-tag" v-if="d.daySign && JSON.stringify(d.daySign) != '{}'"></text>
								<text class="day-sign" v-if="d.daySign && JSON.stringify(d.daySign) != '{}'">{{d.daySign.title}}</text>
								<text class="day-lunar" v-else v-show="showLunar">{{d.dayLunar}}</text>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- 收缩按钮 -->
			<view></view>
		</view>
	</view>
</template>
<script>
	let { calendar } = require("./calendar.js");
	/**
	 * @property {Boolean} showLunar = [true|false] 是否显示农历，默认false
	 * @property {String} firstDayOfWeek = [monday|sunday] 周几为每周的第一天，默认monday
	 *  @value monday 每周从周一开始(默认)
	 *  @value sunday 每周从周日开始
	 * @property {Boolean} showMonthBg = [true|false] 是否显示月份背景，默认true
	 * @property {Boolean} weekend = [true|false] 周末标红(周六周日日期用红色字体)，默认false
	 * @property {Boolean} shouChangeBtn = [true|false] 是否显示上月下月箭头按钮，默认false
	 * @property {Array} signList 标记数组，若当前有多个标记，则显示最后一个，期待格式[{date: '2021-09-10', title: '生日', info: '八月初四张三生日'}]
	 * @property {Boolean} isShrink = [true|false] （暂不可用，待完善）是否可收缩，收起来后以周显示，默认false
	 *  @value true 收缩，只显示当前一周的日期
	 *  @value false 不收缩，显示当前一个月的日期(默认)
	 * @event {Function()} dayChange 点击日期触发事件
	 * @event {Function()} monthChange 切换月份触发事件
	 */
	export default {
		name: 'LuncCalendar',
		props: {
			//是否显示农历
			showLunar: {
				type: Boolean,
				default: false
			},
			//每周的周几为第一天
			firstDayOfWeek: {
				type: String,
				default: 'monday'
			},
			//是否显示月份背景
			showMonthBg: {
				type: Boolean,
				default: true
			},
			//周末标红
			weekend: {
				type: Boolean,
				default: false
			},
			//是否显示上月下月按钮
			shouChangeBtn: {
				type: Boolean,
				default: false
			},
			//标记
			signList: {
				type: Array,
				default () {
					return []
				}
			},
			//是否可收缩，收起来后以周显示（待完善）
			isShrink: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				weekArr: ['一', '二', '三', '四', '五', '六', '日'], //星期数组
				allDataArr: [], //轮播数组
				tranIndex: 1, //轮播所在位置
				selDate: {}, //当前轮播日期信息 -> year, month, day, week
				today: {}, //今天日期 -> year, month, day, week
				tranDuration: 500, //轮播时间(单位毫秒)
				showToday: false, //显示回到今天(非当月才显示)
			}
		},
		created() {
			let nd = new Date();
			this.today = {
				year: nd.getFullYear(),
				month: nd.getMonth() + 1,
				day: nd.getDate()
			}
			if (this.firstDayOfWeek == "sunday") this.weekArr = ['日', '一', '二', '三', '四', '五', '六'];
			else this.weekArr = ['一', '二', '三', '四', '五', '六', '日'];
			this.initDateTime();
		},
		methods: {
			initDateTime() { //初始化日期时间
				this.selDate = JSON.parse(JSON.stringify(this.today));
				//获取月数据
				let thisMonth = this.getMonthData(this.selDate, true);
				let preMonth = this.getMonthData(this.getPreMonth(this.selDate), false);
				let nextMonth = this.getMonthData(this.getNextMonth(this.selDate), false);
				this.allDataArr = [preMonth, thisMonth, nextMonth];
				this.tranIndex = 1;
			},
			//获取指定月份的数据，selMonth:是否为显示月
			getMonthData(date, selMonth) {
				const { year, month, day } = date; //指定的月份
				let maxDay = new Date(year, month, 0).getDate(); //当前月最大日期
				let firstWeek = new Date(year + "-" + month + "-1").getDay(); //月份1号的星期数
				if (this.firstDayOfWeek == "sunday") firstWeek = firstWeek;
				else firstWeek = firstWeek - 1 < 0 ? 6 : firstWeek - 1;
				let list = [];
				//每月显示42天，6周，每周7天
				for (var i = 0; i < 42; i++) {
					let dayInfo = {};
					if (i < firstWeek) { //指定月份上月的最后几天
						let preYear = this.getPreMonth(date).year; //指定月份的上月
						let preMonth = this.getPreMonth(date).month;
						let preMaxDay = new Date(preYear, preMonth, 0).getDate(); //上月最大日期
						let day = preMaxDay - firstWeek + i + 1;
						dayInfo = this.getDayInfo({ year: preYear, month: preMonth, day: day }, 'pre');
					} else if (i > maxDay + firstWeek - 1) { //指定月份下月的前几天
						let nextYear = this.getNextMonth(date).year; //指定月份的下个月
						let nextMonth = this.getNextMonth(date).month;
						let day = i - maxDay - firstWeek + 1;
						dayInfo = this.getDayInfo({ year: nextYear, month: nextMonth, day: day }, 'next');
					} else {
						let day = i - firstWeek + 1;
						dayInfo = this.getDayInfo({ year: year, month: month, day: day }, 'normal');
					}
					list.push(dayInfo)
				}
				return list;
			},
			//获取当前日期的详细信息
			getDayInfo(date, showDay) {
				const { year, month, day } = date;
				let dayType = showDay; //日期是否在指定月份
				let isToday = false; //是否今天
				if (year == this.today.year && month == this.today.month && day == this.today.day) isToday = true;
				let lunar = calendar.solar2lunar(year, month, day); //农历
				let dayLunar = lunar.IDayCn == '初一' ? lunar.IMonthCn + lunar.IDayCn : lunar.IDayCn;
				let isFestival = false; //是否为节假日
				if (lunar.lunarFestival || lunar.festival) {
					if (lunar.lunarFestival) dayLunar = lunar.lunarFestival;
					if (lunar.festival) dayLunar = lunar.festival;
					isFestival = true;
				}
				let week = new Date(year + "-" + month + "-" + day).getDay(); //星期数
				let daySign = {}; //日历中显示标记
				this.signList.map(item => {
					let sY = new Date(item.date).getFullYear();
					let sM = new Date(item.date).getMonth() + 1;
					let sD = new Date(item.date).getDate();
					if (sY == year && sM == month && sD == day) daySign = item;
				});
				let dayInfo = { day, sYear: year, sMonth: month, week, lunar, dayLunar, isFestival, isToday, dayType, daySign }
				let dayClass = this.getDayClass(dayInfo);
				if (dayClass) dayInfo["dayClass"] = dayClass;
				return dayInfo;
			},
			//根据日期详细信息添加对应的class
			getDayClass(dayInfo) {
				const { year, month, day } = this.selDate;
				let dClass = "";
				if (dayInfo.isToday) dClass += ' is-today';
				if (this.showLunar && dayInfo.isFestival) dClass += ' is-festival';
				if (dayInfo.dayType != 'normal') dClass += ' un-month';
				if (this.weekend && (dayInfo.week == 0 || dayInfo.week == 6)) dClass += ' week-end';
				return dClass
			},
			//滑动切换轮播图
			changeMonth(e) {
				let current = e.detail.current;
				let oldIndex = this.tranIndex;
				this.tranIndex = current;
				if (current != oldIndex) {
					if (oldIndex - current == -1 || oldIndex - current == 2) this.getNextData();
					else this.getPreData();
				}
				//判断是否为本月
				if (this.selDate.year == this.today.year && this.selDate.month == this.today.month) this.showToday = false;
				else this.showToday = true;
			},
			tranChangeEnd() {
				this.tranDuration = 500; // 动画结束重新设置动画时间
			},
			//回到今天按钮
			goToday() {
				if (this.tranDuration != 0) this.tranDuration = 0;
				this.initDateTime();

				let today = this.today;
				let dayInfo = this.allDataArr[this.tranIndex].filter(item => (item.sYear == today.year && item.sMonth ==
					today.month && item.day == today.day))[0];
				if (dayInfo) this.clickDay(dayInfo);
				this.$emit('monthChange', {
					year: new Date().getFullYear(),
					month: new Date().getMonth() + 1,
					type: "today"
				});
			},
			//点击上月按钮
			goPreMonth() {
				if (this.tranDuration != 0) this.tranDuration = 0;
				let current = this.tranIndex - 1 < 0 ? 2 : this.tranIndex - 1;
				this.tranIndex = current;
				this.getPreData();
			},
			//点击下月按钮
			goNextMonth() {
				if (this.tranDuration != 0) this.tranDuration = 0;
				let current = this.tranIndex + 1 > 2 ? 0 : this.tranIndex + 1;
				this.tranIndex = current;
				this.getNextData();
			},
			//获取上上月数据
			getPreData() {
				let num = this.tranIndex - 1 < 0 ? 2 : this.tranIndex - 1; // 上上月数据在 所有数据数组中的下标
				let preMonth = this.getPreMonth(this.selDate); //获取上月月份
				let preMonthData = this.getMonthData(this.getPreMonth(preMonth), false); //获取上上月的月份数据
				this.allDataArr.splice(num, 1, preMonthData); //上上月的数据
				this.selDate = preMonth;

				let dayInfo = this.allDataArr[this.tranIndex].filter(item => (item.sYear == preMonth.year && item.sMonth ==
					preMonth.month && item.day == preMonth.day))[0];
				if (dayInfo) this.clickDay(dayInfo);
				this.$emit('monthChange', {
					year: preMonth.year,
					month: preMonth.month,
					type: "pre"
				});
			},
			//获取下下月数据
			getNextData() {
				let num = this.tranIndex + 1 > 2 ? 0 : this.tranIndex + 1;
				let nextMonth = this.getNextMonth(this.selDate);
				let nextMonthData = this.getMonthData(this.getNextMonth(nextMonth), false);
				this.allDataArr.splice(num, 1, nextMonthData);
				this.selDate = nextMonth;
				
				let dayInfo = this.allDataArr[this.tranIndex].filter(item => (item.sYear == nextMonth.year && item
					.sMonth == nextMonth.month && item.day == nextMonth.day))[0];
				if (dayInfo) this.clickDay(dayInfo);
				this.$emit('monthChange', {
					year: nextMonth.year,
					month: nextMonth.month,
					type: "next"
				});
			},
			//获取上月的月份
			getPreMonth(date) {
				let year = date.month - 1 < 1 ? date.year - 1 : date.year;
				let month = date.month - 1 < 1 ? 12 : date.month - 1;
				let day = this.getOtherMonthDay(year, month, date.day);
				return {
					year,
					month,
					day
				}
			},
			//获取下月的月份
			getNextMonth(date) {
				let year = date.month + 1 > 12 ? date.year + 1 : date.year;
				let month = date.month + 1 > 12 ? 1 : date.month + 1;
				let day = this.getOtherMonthDay(year, month, date.day);
				return {
					year,
					month,
					day
				}
			},
			getOtherMonthDay(year, month, day){
				let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				let februaryDay = new Date(year, month, 0).getDate();
				monthDays.splice(1, 1, februaryDay);
				let maxDay = day;
				if (maxDay > monthDays[month - 1]) maxDay = monthDays[month - 1];
				return maxDay;
			},
			//点击日期
			clickDay(dayInfo) {
				if (this.selDate.day == dayInfo.day && this.selDate.month == dayInfo.month && this.selDate.year == dayInfo.year) return;
				this.selDate.day = dayInfo.day;
				if (dayInfo.dayType == 'normal') {
					this.selDate = {
						year: dayInfo.sYear,
						month: dayInfo.sMonth,
						day: dayInfo.day
					}
				} else if (dayInfo.dayType == 'pre') {
					this.goPreMonth();
					return;
				} else if (dayInfo.dayType == 'next') {
					this.goNextMonth();
					return;
				}
				let WeekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
				let lunar = {
					Animal: dayInfo.lunar.Animal,
					gzYear: dayInfo.lunar.gzYear,
					gzMonth: dayInfo.lunar.gzMonth,
					gzDay: dayInfo.lunar.gzDay,
					IMonthCn: dayInfo.lunar.IMonthCn,
					IDayCn: dayInfo.lunar.IDayCn,
					festival: dayInfo.lunar.festival,
					lunarFestival: dayInfo.lunar.lunarFestival
				}
				let returnData = {
					date: dayInfo.sYear + "-" + (dayInfo.sMonth < 10 ? '0' + dayInfo.sMonth : dayInfo.sMonth) + "-" + (
						dayInfo.day < 10 ? '0' + dayInfo.day : dayInfo.day),
					day: dayInfo.day,
					month: dayInfo.sMonth,
					year: dayInfo.sYear,
					week: WeekArr[dayInfo.week],
					daySign: dayInfo.daySign
				}
				if (this.showLunar) returnData["lunar"] = lunar;
				this.$emit('dayChange', returnData);
			}
		}
	}
</script>
<style lang="scss">
	.lunc-calendar {
		background-color: #FFF;
		margin-bottom: 40rpx;

		.header {
			display: flex;
			flex-direction: row;
			justify-content: center;
			position: relative;
			height: 90rpx;
			line-height: 90rpx;
			border-bottom: 1px solid #DDD;

			.head-month {
				font-size: 36rpx;
				text-align: center;
				padding: 0 40rpx;
			}

			.head-icon {
				width: 60rpx;
				text-align: center;
				align-items: center;
				justify-content: center;

				text {
					display: inline-block;
					width: 20rpx;
					height: 20rpx;
					border-top: 4rpx solid #AAA;
					border-left: 4rpx solid #AAA;
				}
			}

			.head-pre-month {
				transform: rotate(-45deg);
			}

			.head-next-month {
				transform: rotate(135deg);
			}

			.go-to-today {
				position: absolute;
				right: 0;
				top: 20rpx;
				padding: 8rpx 12rpx 8rpx 22rpx;
				background-color: rgba(255, 184, 0, 1);
				border-radius: 22rpx 0 0 22rpx;
				font-size: 24rpx;
				line-height: 24rpx;
				color: #FFF;
			}
		}

		.week-area {
			display: flex;
			flex-direction: row;
			align-items: center;
			border-bottom: 1px solid #EEE;
			padding: 16rpx 0;
			margin: 0 20rpx;

			.week-font {
				flex: 1;
				text-align: center;
				color: #666;
				font-size: 14px;
			}
		}

		.data-container {
			margin: 0 20rpx;
			
			.calendar-swiper{
				height: 550rpx;
			}

			.swiper-item {
				position: relative;
				display: -webkit-box;

				.bg-month {
					position: absolute;
					font-size: 200px;
					font-weight: bold;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -55%);
					opacity: 0.05;
					z-index: -1;
				}

				.month-days {
					margin-top: 15rpx;
					display: block;

					.day {
						width: 14.28%;
						display: inline-block;
						text-align: center;
						height: 84rpx;
						color: #000;
						padding: 0 6rpx;
						box-sizing: border-box;

						.day-info {
							height: 100%;
							overflow: hidden;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							position: relative;

							.day-solar {
								display: block;
								font-size: 34rpx;
								line-height: 34rpx;
							}

							.day-lunar {
								color: #666;
								font-size: 24rpx;
								line-height: 24rpx;
								transform: scale(0.8);
								white-space: nowrap;
							}

							.day-sign {
								color: rgba(247, 88, 88, 1);
								font-size: 24rpx;
								line-height: 24rpx;
								transform: scale(0.8);
								white-space: nowrap;
							}

							.day-tag {
								position: absolute;
								top: 6rpx;
								right: 14rpx;
								width: 10rpx;
								height: 10rpx;
								border-radius: 50%;
								display: inline-block;
								background-color: rgba(247, 88, 88, 1);
							}
						}

						//非当前月日期
						.un-month text {
							opacity: 0.25;
						}

						//周末
						.week-end .day-solar {
							color: rgba(255, 137, 137, 1);
						}

						//节假日
						.is-festival .day-lunar,
						.is-festival .day-solar {
							color: rgba(247, 88, 88, 1);
						}

						//今天日期
						.is-today .day-solar,
						.is-today .day-lunar {
							color: #409eff;
						}

						//选择日期
						.is-sel {
							background-color: rgba(198, 226, 255, 1);
						}
					}

				}
			}
		}
	}
</style>
