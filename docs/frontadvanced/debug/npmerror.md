# 一次部署报错竟然关联到了俄罗斯和乌克兰的战争？



> **大家好，我是前端小贺，希望能够通过自己的学习输出给你带来帮助。**

## 背景

我今天在公司利用Jenkins发布项目到生产环境过程中下载依赖包的时候报错了，如下：

```shell
+ npm install

npm ERR! code E404
npm ERR! 404 Not Found - GET http://verdaccio:4873/peacenotwar - no such package available
npm ERR! 404 
npm ERR! 404  'peacenotwar@^9.1.6' is not in the npm registry.
npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
npm ERR! 404 It was specified as a dependency of 'node-ipc'

script returned exit code 1
```

### 项目架构

本项目是基于`Vue CLI`搭建而成。

`package.json`文件如下：

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
  },
  "dependencies": {
    "axios": "^0.18.0",
    "cube-ui": "~1.12.15",
    "js-md5": "^0.7.3",
    "moment": "^2.24.0",
    "pdfjs": "^2.3.0",
    "postcss": "^7.0.14",
    "vue": "^2.6.6",
    "vue-amap": "^0.5.10",
    "vue-navigation": "^1.1.4",
    "vue-router": "^3.0.2",
    "vuex": "^3.1.0"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.5.0",
    "@vue/cli-plugin-eslint": "^3.5.0",
    "@vue/cli-service": "^3.5.0",
    "@vue/eslint-config-prettier": "^6.0.0",
    "babel-eslint": "^10.0.1",
    "commitizen": "^4.0.3",
    "cz-conventional-changelog": "^3.0.2",
    "eslint": "^5.8.0",
    "eslint-plugin-prettier": "^3.1.2",
    "eslint-plugin-vue": "^5.0.0",
    "node-sass": "^4.11.0",
    "pdfjs-dist": "2.1.266",
    "postcss-px2rem": "^0.3.0",
    "postcss-px2rem-exclude": "^0.0.6",
    "sass-loader": "^7.1.0",
  }
}

```

## 找寻答案

我定睛一看这不是依赖包没找到吗，于是乎到[node-ipc](https://github.com/RIAEvangelist/node-ipc)的[issues](https://github.com/RIAEvangelist/node-ipc/issues?q=peacenotwar)中寻找答案，几番找寻后最终搞清楚了！

### 答案

`Vue.js`的脚手架工具`Vue CLI`依赖`node-ipc`包，而`node-ipc`包的一名维护人员 作为*抗议行为*（详见下方说明）向这个包中引入了一个叫做`peacenotwar`的依赖包，这个包会在用户的桌面目录中写入`WITH-LOVE-FROM-AMERICA.txt`文件。被破坏的`node-ipc`包的版本[9.2.2](https://www.npmjs.com/package/node-ipc/v/9.2.2)、[10.1.1](https://www.npmjs.com/package/node-ipc/v/10.1.1)、[10.1.2](https://www.npmjs.com/package/node-ipc/v/10.1.2)不再存在于 npmjs 注册表中，已被维护者或 npmjs 团队标记为*deprecated*。新版本的`node-pic`包已经修正了这个问题。

由于我们项目用[Verdaccio](https://verdaccio.org/)来缓存下载过的依赖，而缓存的`node-ipc`包版本正好是`9.2.2`，而此版本被一名叫做*RIAEvangelist (Brandon Nozaki Miller)*的维护人员注入了`peacenotwar`的依赖包，此包并没有被Verdaccio缓存，故出现了刚开始项目发布时的404。

关于`node-ipc`包被破坏的详情，请看下方介绍。

### 故事：

2022 年 3 月 8 日，npm 维护者 RIAEvangelist (Brandon Nozaki Miller)[编写了源代码并发布了一个名为](https://github.com/RIAEvangelist/peacenotwar)[peacenotwar](https://www.npmjs.com/package/peacenotwar)的 npm 包，根据他们对该模块的描述，原文是这样的：

> This code serves as a non-destructive example of why controlling your node modules is important. It also serves as a non-violent protest against Russia's aggression that threatens the world right now. This module will add a message of peace on your users' desktops, and it will only do it if it does not already exist just to be polite.

翻译过来是：这段代码是一个非破坏性的例子，说明为什么控制节点模块很重要。它也是一种非暴力的抗议，反对俄罗斯的侵略行为，目前威胁着世界。这个模块将在用户的桌面添加一条和平消息，并且只有在它还不存在的情况下才会这样做。

---

直到 3 月 15 日 ，这个模块几乎没有下载。然而，当它的 npm 维护者将此模块作为依赖项添加 `node-ipc`的`9.2.2`版本，并在`node-ipc`包被调用时运行它。`peacenotwar`这个包会在用户的桌面目录中写入`WITH-LOVE-FROM-AMERICA.txt`文件。

下面的图片是`peacenotwar`的下载数量。大家可以看出是最最后的下载量是4万多条，还是很多的。

![image-20220318222556044](/Users/hsm/Documents/image-20220318.png)

下面是`Vue CLI`对`node-ipc`包的依赖

```shell
- @vue/cli
   |
   - @vue/cli-ui
      |
      - node-ipc@^9.2.1
   - @vue/cli-shared-utils
      |
      - node-ipc@^9.1.1
```



### 解决办法

**方法一：** 如果你使用 npm 作为包管理器，你可以将以下内容添加到您的`package.json`文件中以明确允许仅`node-ipc`的良性版本：

```shell
  "overrides": {
    "node-ipc@>9.2.1 <10": "9.2.1",
    "node-ipc@>10.1.0": "10.1.0"
  }
```

**方法二：** 升级你的`@vue.cli`版本为 4.5.16+ 或 5.0.3+

1. 升级你的全局`@vue.cli`版本

   `npm i -g @vue/cli`

2. 找到你的项目根目录，执行`vue upgrade

**方法三：** 找到`package-lock.json`文件，查看你的`node-ipc`版本，只要不是`9.2.2`就可以按照这个下载依赖包使用，例如我的文件如下：

```json
"node-ipc": {
  "version": "9.2.1",
  "resolved": "https://registry.npmmirror.com/node-ipc/-/node-ipc-9.2.1.tgz",
  "integrity": "sha512-mJzaM6O3xHf9VT8BULvJSbdVbmHUKRNOH7zDDkCrA1/T+CVjq2WVIDfLt0azZRXpgArJtl3rtmEozrbXPZ9GaQ==",
  "dev": true,
  "requires": {
    "event-pubsub": "4.3.0",
    "js-message": "1.0.7",
    "js-queue": "2.0.2"
  }
}
```



### 担心npm漏洞？那么推荐给你一些最佳实践

- 避免向 npm 注册表发布秘密（API 密钥、密码还是其他机密）

- 强制锁定文件，即使用`package-lock.json`或`yarn.lock`

- 推迟盲目升级到新版本；在试用之前，让新的软件包版本有时间流通。

- 调用`npm doctor`来诊断你的环境（你可能在路径中安装的不同版本的 Node.js），以确保npm交互运行良好。它会帮你做以下几件事

  - 检查官方 `npm regisry`是否可达，并显示当前配置的注册表。

  - 检查 Git 是否可用。

  - 查看已安装的 npm 和 Node.js 版本。

  - 对各种文件夹（例如 local 和 global `node_modules`）以及用于包缓存的文件夹运行权限检查。

  - 检查本地 npm 模块缓存的校验和正确性。

    以下是我运行的结果：

  ```shell
  + npm doctor
  npm notice PING https://registry.npm.taobao.org/
  npm WARN verifyCachedFiles Content garbage-collected: 3343 (415775333 bytes)
  npm WARN verifyCachedFiles Missing content: 1926
  npm WARN verifyCachedFiles Cache issues have been fixed
  Check                               Value                             Recommendation
  npm ping                            ok
  npm -v                              v6.14.15                          Use npm v8.5.5
  node -v                             v12.22.7                          Use node v16.14.2
  npm config get registry             https://registry.npm.taobao.org/  Try `npm config set registry https://registry.npmjs.org/`
  which git                           /usr/local/bin/git
  Perms check on cached files         ok
  Perms check on global node_modules  ok
  Perms check on local node_modules   ok
  Verify cache contents               verified 12871 tarballs
  ```

  

## 感想

我也希望不要有战争，我也爱好和平，但应该采取正确的方式表达。请不要把战争问题带到开源世界！！！

## 最后

> **您的每一个点赞及评论都是对我坚持写作最大的支持！** <br />另外希望各位朋友和我交流讨论，如有不对的地方，更希望批评指正！



## 参考

https://snyk.io/blog/peacenotwar-malicious-npm-node-ipc-package-vulnerability/
https://github.com/RIAEvangelist/node-ipc/pull/264
https://github.com/RIAEvangelist/peacenotwar
https://snyk.io/blog/ten-npm-security-best-practices/