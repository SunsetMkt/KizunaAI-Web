# KizunaAI-Web
基于uni-app的绊爱主题日历，兼容H5

[上游项目仓库](https://gitee.com/muyi456/KizunaAI)

# 版权声明
绊爱（Kizuna AI）是版权所属Kizuna AI Inc.（Kizuna AI株式会社）的虚拟形象，本项目及开发者与Kizuna AI Inc.无关。

# 特性
* 基于哔哩哔哩嵌入的早安视频
* 日历和日期标签
* 生日彩蛋

# 构建
~~目前仅支持HBuilderX~~，详见[uni-app文档](https://uniapp.dcloud.io/quickstart-hx.html)。

## node命令行构建h5(Beta)

安装node版本14（开发环境v14.19.1）

`npm install`

（**建议不要使用cnpm指令，它在开发环境中造成了问题**，如果需要使用镜像则 `npm install --registry=https://registry.npmmirror.com`）

`npm run dev:h5`

`npm run build:h5`

## CI/自动化构建设置

以Vercel为例

* 框架预设(framework preset)为`Vue.js`
* 构建指令(build command)为`npm run build:h5`
* 输出目录(output directory)为`dist/build/h5`
* 安装指令(install command)为`npm install`

# 开源许可
GPLv3

# TODO
* [x] Android权限优化
* [x] Web兼容性
* [x] 支持使用node命令行构建(Beta)
