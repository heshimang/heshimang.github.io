# 团队成员内使用不同的文本编辑器或IDE，如何统一项目代码格式呢？

> **大家好，我是前端小贺，希望能够通过自己的学习输出给你带来帮助。**

## 背景

在一个多人开发的项目中，项目成员使用不同的文本编辑器或IDE。不同IDE或文本编辑器的格式设置可能会有一些不同的地方，比如说缩进方式、编码格式等。那么如何统一项目代码格式呢？开源届给出了答案:`EditorConfig`!

你可能会问，我咋知道的呢？

答：我是在看`Vue`源码的时候，在项目目录中发现了一个叫做`.editorconfig`的文件，于是点进去看了下，如下：

```
# https://editorconfig.org

root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
insert_final_newline = false
trim_trailing_whitespace = false

```

然后看到了最底部的注释，是`EditorConfig`的官网，于是我就知道了，哈哈哈。下面详细解析下这个是什么东西以及它如何进行配置的。



## EditorConfig

### 1.什么是`EditorConfig`？

官网是这样介绍的：

> EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs. The EditorConfig project consists of **a file format** for defining coding styles and a collection of **text editor plugins** that enable editors to read the file format and adhere to defined styles. EditorConfig files are easily readable and they work nicely with version control systems.

我借助`Google Translate`翻译一下：

> EditorConfig 有助于为跨各种编辑器和 IDE 处理同一项目的多个开发人员保持一致的编码风格。EditorConfig 项目由用于定义编码样式**的文件格式和一组****文本编辑器插件组成，这些插件**使编辑器能够读取文件格式并遵守定义的样式。EditorConfig 文件易于阅读，并且可以很好地与版本控制系统配合使用。



### 2.如何配置呢？

我们这里引用`vue`的配置给大家解释下，[wiki上有完整的配置](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties)供大家可以参考.

```

# 应在文件顶部指定的特殊属性。设置为true以停止.editorconfig对当前文件的文件搜索。就是说你要在顶部设置这个值为true，否则.editorconfig会继续像当前文件夹的父文件夹中找，如果最终找不到，则会应用文本编辑器或者IDE的默认配置
root = true

# 设置为latin1 , utf-8 , utf-8-bom , utf-16be或utf-16le来控制字符集。
charset = utf-8

# 设置为制表符或空格分别使用硬制表符或软制表符。
indent_style = space
indent_size = 2

# 设置为lf、cr或crlf以控制换行符的表示方式。
end_of_line = lf

# 设置为true以确保文件在保存时以换行符结尾，设置为false以确保它不会。
insert_final_newline = true

设置为true以删除换行符之前的任何空白字符，设置为false以确保不删除。
trim_trailing_whitespace = true

[*.md] # 表示以下仅对md后缀的文件生效
insert_final_newline = false
trim_trailing_whitespace = false
```



## 编辑器或IDE支持情况

### 以下编辑器对 EditorConfig 原生支持，即无需安装任何插件

![support](/images/support.png)



### 以下编辑器对 EditorConfig 不原生支持，需安装插件



![notsupport](/images/notsupport.png)



## 参考

https://editorconfig.org/

## 最后

**您的每一个点赞及评论都是对我坚持写作最大的支持！**
另外希望各位朋友和我交流讨论，如有不对的地方，更希望批评指正！

> **我是前端小贺，希望能够通过自己的学习输出给你带来帮助。**

