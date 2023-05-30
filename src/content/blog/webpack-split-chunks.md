---
title: Webpack优化 - SplitChunks
author: JasonYoge
pubDatetime: 2022-10-24T22:45:00+08:00
postSlug: webpack-optimization-with-split-chunks
featured: false
draft: false
tags:
  - Webpack
  - Blog
  - 前端
ogImage: ""
description: "splitChunks.chunks 用来指定哪类 chunks 需要做拆包优化，包括三个值：async ，表示异步的 chunks，即通过 import() 异步载入的模块生成的 chunks initial ，与 async 相对..."
---

*splitChunks.chunks*  用来指定哪类 chunks 需要做拆包优化，包括三个值：

- async ，表示异步的 chunks，即通过 import() 异步载入的模块生成的 chunks
- initial ，与 async 相对，表示初始载入的 chunks，即非异步方式载入的 chunks
- all ，表示全部的 chunks

webpack 5 默认打三个包：

- *2.a66a92a2.chunk.js*  内都是 node_modules 下的模块
- *runtime-main.da092598.js*  则是 webpack 的 runtime
- *main.0a5b75fe.chunk*  则是处理 `src/index.js` 得到的主入口文件

这是由于 webpack 默认配置设置的：

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

webpack 5 默认自动打包规则：

- 新 chunk node_modules 自动打包
- 新 chunk 超过 20kb（压缩之前）
- 最大并行按需加载数量小于 30
- 最大并行初始页面加载数量小于 30

关于 cacheGroups：cacheGroups 可以增加新的 chunk 模块
