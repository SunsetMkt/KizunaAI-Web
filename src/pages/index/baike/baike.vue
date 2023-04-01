<template>
	<view class="backimg">
		<view>
			<!--导航栏-->
			<uni-nav-bar backgroundColor="#EE4F87" shadow fixed leftText="返回" rightText="回到顶部" color="#FFFFFF"
				title="绊爱百科" @clickRight="back_top" @clickLeft="back_page" />
		</view>
		<!--背景图片-->
		<image class="imgs" mode="aspectFill" src="../../../static/image/2.jpg"></image>
		<view class="text_padding">
			<text style="font-size: 25rpx;">仅记录部分内容,详细可查询</text>
			<span><uni-link href="https://mzh.moegirl.org.cn/绊爱" text="萌娘百科"></uni-link></span>
		</view>
		<view class="text_padding">
			<uni-title type="h3" title="基本资料"></uni-title>
			<view v-for="(item,index) in content" :key="index">
				<uni-row :gutter="24">
					<uni-col :span="5">
						<text class="title">{{item.name}}</text>
					</uni-col>
					<uni-col :span="19">
						<text>{{item.text}}</text>
					</uni-col>
				</uni-row>
			</view>
		</view>

		<view class="text_padding">
			<uni-title type="h3" title="大事记"></uni-title>
			<uni-title type="h4" title="2016"></uni-title>
			<uni-steps :options="major_events_2016" :active="active" direction="column" />
			<uni-title type="h4" title="2017"></uni-title>
			<uni-steps :options="major_events_2017" :active="active" direction="column" />
			<uni-title type="h4" title="2018"></uni-title>
			<uni-steps :options="major_events_2018" :active="active" direction="column" />
			<uni-title type="h4" title="2019"></uni-title>
			<uni-steps :options="major_events_2019" :active="active" direction="column" />
			<uni-title type="h4" title="2020"></uni-title>
			<uni-steps :options="major_events_2020" :active="active" direction="column" />
			<uni-title type="h4" title="2021"></uni-title>
			<uni-steps :options="major_events_2021" :active="active" direction="column" />
			<uni-title type="h4" title="2022"></uni-title>
			<uni-steps :options="major_events_2022" :active="active" direction="column" />
		</view>
		<view class="text_padding">
			<uni-title type="h3" title="音乐作品"></uni-title>
			<uni-title type="h4" title="专辑"></uni-title>
			<uni-table border stripe>
				<uni-tr>
					<uni-th align="center">专辑名</uni-th>
					<uni-th align="center">发售日期</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in album" :key="index">
					<uni-td align="center">{{item.name}}</uni-td>
					<uni-td align="center">{{item.time}}</uni-td>
				</uni-tr>
			</uni-table>
			<uni-title type="h4" title="单曲"></uni-title>
			<uni-table border stripe emptyText="暂无更多数据">
				<uni-tr>
					<uni-th align="center">专辑名</uni-th>
					<uni-th align="center">发售日期</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in music" :key="index">
					<uni-td align="center">{{item.name}}</uni-td>
					<uni-td align="center">{{item.time}}</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: [{
						name: '本名',
						text: 'Kizuna AI'
					},
					{
						name: '自称',
						text: '天才智能的超级人工AI'
					},
					{
						name: '发色',
						text: '棕发（本体）、黑发（黑爱）'
					},
					{
						name: '瞳色',
						text: '蓝绿瞳（本体）、红瞳（黑爱） '
					},
					{
						name: '身高',
						text: '156cm'
					},
					{
						name: '体重',
						text: '46kg'
					},
					{
						name: '三围',
						text: 'B:85 W:59 H:83'
					},
					{
						name: '年龄',
						text: '6岁'
					},
					{
						name: '生日',
						text: '6月30日'
					},
					{
						name: '星座',
						text: '巨蟹座'
					}
				],
				active: -1,
				major_events_2016: [{
						title: '2016年6月30日',
						desc: '唤醒自我'
					},
					{
						title: '2016年12月1日',
						desc: 'YouTube『A.I.Channel』开设'
					},
				],
				major_events_2017: [{
						title: '2017年1月16日',
						desc: '在第21回与第30回中提到她的衣服是投影出来的=实质全裸，之后就被YouTube判定为不良内容而被封锁频道'
					},
					{
						title: '2017年2月4日',
						desc: 'YouTube A.I.Channel恢复'
					},
					{
						title: '2017年2月25日',
						desc: 'YouTube订阅数突破10万人'
					},
					{
						title: '2017年3月4日',
						desc: '有爱好者在bilibili开设搬运账号「AIchannel」'
					},
					{
						title: '2017年3月17日',
						desc: '首次有赞助商（《幻兽契约Cryptract》）'
					},
					{
						title: '2017年3月23日',
						desc: 'YouTube频道订阅超过20万'
					},
					{
						title: '2017年3月30日',
						desc: '开设YouTube游戏频道「A.I.Games」'
					},
					{
						title: '2017年4月17日',
						desc: 'A.I.Games被ban'
					},
					{
						title: '2017年5月12日',
						desc: '宣布在360Channel开设了「A.I.Channel 360」VR视频频道'
					},
					{
						title: '2017年6月16日',
						desc: '抓江江机中毒，黑爱诞生'
					},
					{
						title: '2017年9月25日',
						desc: 'YouTube订阅数突破80万人 '
					},
					{
						title: '2017年11月8日',
						desc: '首次发售Line贴图'
					},
					{
						title: '2017年12月1日',
						desc: '频道1周年生放送'
					},
					{
						title: '2017年12月17日',
						desc: 'YouTube订阅数突破100万人'
					},
				],
				major_events_2018: [{
						title: '2018年1月12日',
						desc: '一人红白歌合战'
					},
					{
						title: '2018年2月10日',
						desc: 'YouTube订阅数突破150万人'
					},
					{
						title: '2018年3月13日',
						desc: '被日本政府观光局指名为访日促进大使'
					},
					{
						title: '2018年3月16日',
						desc: '1st写真集发卖'
					},
					{
						title: '2018年4月1日',
						desc: '首次与其他虚拟YouTuber合作，与辉夜月进行愚人节企划'
					},
					{
						title: '2018年7月10日',
						desc: '在全国VTuber调查中以主频道198万副频道90万的订阅人数稳稳占据了第一'
					},
					{
						title: '2018年7月15日',
						desc: '主频道订阅数突破200万人，同日发布首张单曲《Hello，Morning》'
					},
					{
						title: '2018年8月14日',
						desc: 'A.I.Games订阅数突破100万人'
					},
					{
						title: '2018年9月10日',
						desc: '与另一人格吵架，黑爱形象出现'
					},
					{
						title: '2018年10月19日',
						desc: '黑爱与绊爱和好'
					},
					{
						title: '2018年12月29日',
						desc: '单独2days演唱会『Kizuna AI 1st Live “hello, world”』开幕'
					}
				],
				major_events_2019: [{
						title: '2019年2月5日',
						desc: '荣获第17届日本创新大奖'
					},
					{
						title: '2019年3月10日',
						desc: '第24届AMD杰出奖'
					},
					{
						title: '2019年3月29日',
						desc: 'AIAIAI（feat. 中田ヤスタカ）』发行'
					},
					{
						title: '2019年4月3日',
						desc: '荣获2019年度日本文字奖评选委员会特别奖'
					},
					{
						title: '2019年5月15日',
						desc: '1st完整专辑『hello, world』发行'
					},
					{
						title: '2019年6月9日',
						desc: '首次出现两个不同版本的绊爱同时出现在《キズナアイな日々》系列之外的影片中'
					},
					{
						title: '2019年6月16日',
						desc: 'G1 Media Award 2019特别奖得主'
					},
					{
						title: '2019年6月25日',
						desc: 'bilibili搬运组宣布官方化并改名「AIChannel官方」'
					},
					{
						title: '2019年6月30日',
						desc: '三岁生日，并举办「A.I. Party! 2019~hello, how r u?~」庆生活动，宣布实装了中文语音和配套的新衣服'
					},
					{
						title: '2019年8月19日',
						desc: 'SUMMER SONIC 2019出演'
					},
					{
						title: '2019年10月17日',
						desc: '在2019年东京车展上被任命为虚拟导航员'
					}
				],
				major_events_2020: [{
						title: '2020年1月1日',
						desc: '『NHK虚拟红白歌合战』出演'
					},
					{
						title: '2020年1月17日',
						desc: 'A.I.Channel、A.I.Games两个频道的观看总数超过4亿次'
					},
					{
						title: '2020年4月24日',
						desc: '以独立以绊爱经营、运营中心的体制、团队一新为背景，宣布于5月11日预定登记设立Kizuna AI株式会社。由松本惠利子担任代表取取缔役，春日望担当顾问，并公开确认了春日望从2016年秋季开始为绊爱提供声音'
					},
					{
						title: '2020年5月8日',
						desc: '二号绊爱love酱、三号绊爱Aipii将获得新名字与新外形，并从AI channel独立，另外创建新频道名“love-pii channel (暂定) ”,而中国绊爱将保持现状继续活动'
					},
					{
						title: '2020年5月20日',
						desc: '首次B限说了花Q'
					},
					{
						title: '2020年11月22日',
						desc: 'B站个性装扮开始贩售'
					}
				],
				major_events_2021: [{
						title: '2021年1月23日',
						desc: '出演「Kizuna AI 2nd Live "hello, world 2020"」线上演唱会活动'
					},
					{
						title: '2021年3月~5月',
						desc: '将举行「Kizuna AI Virtual US Tour」美国巡回演唱会活动，计划在洛杉矶和纽约举行两次现场表演'
					},
					{
						title: '2021年6月30日',
						desc: '在日本Zepp Haneda举行5周年生日会，首次尝试配合现场乐队表演'
					},
					{
						title: '2021年12月4日',
						desc: '宣布将在举办告别演唱会「Kizuna AI The Last Live "hello, world 2022"」后无限期停止活动'
					},
					{
						title: '2021年12月7日',
						desc: 'YouTube订阅数突破300万人'
					}
				],
				major_events_2022: [{
						title: '2022年2月25日',
						desc: '活动休止前一天的直播中公开了CeVIO AI开发中的消息'
					},
					{
						title: '2022年2月26日',
						desc: '举办告别演唱会「Kizuna AI The Last Live "hello, world 2022"」并正式进入休眠。同日公布“歌唱特化型AI KZN”及动画化企划['
					},
					{
						title: '2022年8月1日',
						desc: 'Kizuna AI株式会社发布了各平台账号重启的消息，为实现绊爱与全世界连接的愿望，在休眠期间也会继续完成规划好的项目,并以CeVIO的形式来到大家面前'
					}
				],
				album: [{
						name: 'hello, world',
						time: '2019年5月15日'
					},
					{
						name: 'Replies',
						time: '2020年4月24日'
					}
				],
				music: [{
						name: 'Hello, Morning',
						time: '2018年7月15日'
					},
					{
						name: 'future base',
						time: '2018年10月26日'
					},
					{
						name: 'new world',
						time: '2018年11月2日'
					},
					{
						name: 'over the reality',
						time: '2018年11月9日'
					},
					{
						name: 'miracle step',
						time: '2018年11月16日'
					},
					{
						name: 'mirai',
						time: '2018年11月16日'
					},
					{
						name: 'melty world',
						time: '2018年11月30日'
					},
					{
						name: 'hello, alone',
						time: '2018年12月7日'
					},
					{
						name: 'meet you',
						time: '2018年12月14日'
					},
					{
						name: 'AIAIAI',
						time: '2019年3月22日'
					},
					{
						name: 'Sky High',
						time: '2019年6月30日'
					},
					{
						name: 'the MIRACLE',
						time: '2020年3月26日'
					},
					{
						name: 'FL-AI-YER',
						time: '2020年4月10日'
					},
					{
						name: 'Awakening',
						time: '2020年4月24日'
					},
					{
						name: 'Again',
						time: '2020年4月24日'
					},
					{
						name: 'Touch Me',
						time: '2020年12月16日'
					},
					{
						name: 'Hello World',
						time: '2020年12月30日'
					},
					{
						name: 'First Light',
						time: '2021年6月25日'
					},
					{
						name: 'never stop my beat',
						time: '2022年2月18日'
					},
					{
						name: 'Linx',
						time: '2022年2月26日'
					}
				]
			}
		},
		methods: {
			back_top() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100,
				});
			},
			back_page() {
				uni.redirectTo({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style>
	.imgs {
		opacity: 0.4;
		z-index: -1;
		position: fixed;
		height: 100%;
		width: 100%;
	}

	.backimg {
		height: 100vh;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
	}

	.text_padding {
		padding: 10rpx;
	}
</style>