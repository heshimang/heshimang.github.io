---
theme: smartblue
---

> **大家好，我是前端小贺，希望能够通过自己的学习输出给你带来帮助。**

## 背景

为了尝试用`yarn`安装`@vue/cli`，准备卸载掉之前用`npm`安装的`@vue/cli`。结果用`vue -V`验证是否卸载成功时，竟然还提示我了对应的版本号`@vue/cli 4.5.3`，没卸载成功！以下是我的操作步骤：

```shell
➜  ~ npm list -g --depth 0
/Users/hsm/.nvm/versions/node/v16.13.1/lib
├── @vue/cli@4.5.3
├── corepack@0.10.0
├── npm@8.1.2
├── pnpm@6.32.3
└── yarn@1.22.18

➜  ~ vue -V
@vue/cli 4.5.3
➜  ~ npm uninstall -g @vue/cli

removed 881 packages, and audited 1 package in 2s

found 0 vulnerabilities
➜  ~ vue -V
@vue/cli 4.5.3
```

## 尝试

1. 考虑到我安装了`nvm`来管理`NodeJs`， 所以我查找了我所有下载过的版本并逐一排查了每个版本的npm全局安装包中是否有`@vue/cli`，有的话就`uninstall`。最终删除完了所有Node版本的`@vue/cli`后，我在命令行工具使用最常用的`V16.13.1`版本中输入`vue -V`竟然还显示`@vue/cli 4.5.3`! What the fuck?

```shell
➜  ~ nvm ls
        v8.17.0
       v12.18.3
       v12.22.7
       v14.18.2
       v15.14.0
->     v16.13.1
default -> 16 (-> v16.13.1)
iojs -> N/A (default)
unstable -> N/A (default)
node -> stable (-> v16.13.1) (default)
stable -> 16.13 (-> v16.13.1) (default)
lts/* -> lts/gallium (-> N/A)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.17.0
lts/dubnium -> v10.24.1 (-> N/A)
lts/erbium -> v12.22.11 (-> N/A)
lts/fermium -> v14.19.1 (-> N/A)
lts/gallium -> v16.14.2 (-> N/A)
➜  ~ vue -V
@vue/cli 4.5.3
```



2. `stackoverflow`上找资料，然后尝试：

   1. 使用`which vue`命名来查看vue可执行文件的路径

      ```she
      ➜  ~ which vue
      /usr/local/bin/vue
      ```

   2. 删除文件，然后查看是否删除了

      ```shell
      ➜  ~ rm /usr/local/bin/vue
      ➜  ~ vue -V
      zsh: command not found: vue
      ```

   

   Ok，大功告成！



## 参考
https://stackoverflow.com/questions/52322570/how-to-uninstall-vue-cli-2-x-x

## 最后

**您的每一个点赞及评论都是对我坚持写作最大的支持！**
另外希望各位朋友和我交流讨论，如有不对的地方，更希望批评指正！

> **我是前端小贺，希望能够通过自己的学习输出给你带来帮助。**



