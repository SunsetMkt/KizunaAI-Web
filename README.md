# KizunaAI-Web
基于uni-app的绊爱主题日历，兼容H5

[上游项目仓库](https://gitee.com/muyi456/KizunaAI)

Demo地址：https://kizunaai.lwd-temp.top/

# 版权声明
绊爱（Kizuna AI）是版权所属Kizuna AI Inc.（Kizuna AI株式会社）的虚拟形象，本项目及开发者与Kizuna AI Inc.无关。

KizunaAI-Web是基于哔哩哔哩用户[灰暗江原](https://space.bilibili.com/63045280)开发的[KizunaAI](https://gitee.com/muyi456/KizunaAI)的Web兼容版并提供一定的修改。

# 特性
* 基于跨平台框架uni-app
* 基于哔哩哔哩嵌入的早安视频
* 日历和日期标签
* 生日彩蛋
* 支持Node.js命令行构建

# 开发和构建
~~目前仅支持HBuilder X~~，详见[uni-app文档](https://uniapp.dcloud.io/quickstart-hx.html)。

## HBuilder X打开

HBuilder X-文件-导入-从本地目录导入-选择项目文件夹中的src文件夹

### 关于src/index.html和public/index.html

src/index.html也就是最初的index.html是由HBuilder X创建的，采用上面的方法打开项目就会默认使用它。

public/index.html是在去除HBuilder X并向Node.js命令行构建模式迁移时创建的，在项目根目录下构建时会默认使用它。

HBuilder X似乎隐藏了太多关于Vue.js框架和Node.js本身的细节，导致正在写这个文档的作者也有点不太明白。

## Node.js命令行构建H5(Beta)

安装Node.js版本14（开发环境v14.19.1）

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

# FIXME
* [x] Web版第一次打开可能发生样式错误
* * 无解
* [ ] 部分Android用户报告视频播放无声音
* * 正在调查，怀疑系统Webview问题
* [x] Node.js命令行构建导致宽屏设备上的样式问题
* * 已修复

# TODO
* [x] Android权限优化
* [x] Web兼容性
* [x] 支持使用Node.js命令行构建(Beta)

# IDEA
（这些设想可能永远都不会实现）

* [ ] 基于three.js的绊爱3D模型动画
* [ ] 基于three.js的可交互的绊爱3D模型
* [ ] 基于three.js的可交互的有声绊爱3D模型
* [ ] 基于音频自动拼接的绊爱早安
* [ ] 基于three.js和音频自动拼接的绊爱早安动画
