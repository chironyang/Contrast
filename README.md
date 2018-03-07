# Contrast.js
## 简介
Contrast.js插件主要用于检验移动端Web重构还原度，由于大部分设计稿是基于iPhone6以上（1334 x 750）设计的，所以该插件比较适合用iPhone6、iPhone7、iPhone8检查设计还原情况。

## Demo
地址: [https://coderjunb.github.io/HTML-contrast/demo/index.html](https://coderjunb.github.io/HTML-contrast/demo/index.html)

## 引入插件
1. 准备好需要验证的设计稿，如bg.png
2. 在重构稿中引入工具脚本contrast.js 并设置图片路径 
        <script>
            Contrast.setBg("bg.png");
        </script>
3. 访问重构稿页面

## 操作使用
开启工具：点击“工具按钮”，插件展示操作引导（第一次加载才显示引导）；

关闭工具：点击“工具按钮”，插件隐藏；

查看设计稿：在屏幕上半区向右滑动，左侧展示设计稿，右侧展示重构稿；

设计稿透明度：在屏幕下半区向左滑动，设计稿逐渐透明；在屏幕下半区向右滑动，设计稿逐渐不透明；

调整工具位置：拖拽“工具按钮”到要调整到位置；

## 其他问题

1) _有没有设计稿背景规格？_

答：不限制规格，推荐宽750px的设计标准。

2) _会不会影响正常开发和上线？_

答：插件适用于检查还原度，上线时注释引用即可，不影响正常开发和上线。