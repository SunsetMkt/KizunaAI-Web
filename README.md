# KizunaAI-Web
基于uni-app的绊爱主题日历，兼容H5

[上游项目仓库](https://gitee.com/muyi456/KizunaAI)

Demo地址：https://kizuna-ai-web.vercel.app/

**此修改版仅支持H5，且着重于使用npm指令构建Web App。如有构建其他平台应用的需要，请使用上游项目。**

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

它们是`index.html`模板，应该保持内容一致。

src/index.html也就是最初的index.html是由HBuilder X创建的，采用上面的方法打开项目就会默认使用它。

public/index.html是在去除HBuilder X并向Node.js命令行构建模式迁移时创建的，在项目根目录下构建时会默认使用它。

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

# 参考资料
http://www.jmblog.com.cn/article/6210be047ca2731bb9b639c8