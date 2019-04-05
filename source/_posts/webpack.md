---
title: webpack
date: 2019-04-04 19:04:19
tags: [webpack]
---

### 安装
```
npm install webpack webpack-cli webpack-dev-server -D
```

### 基本配置 webpack.config.js
当在项目中直接运行webpack时，默认读取webpack.config.js中的配置，等同于运行 webpack webpack.config.js
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')  //自动生成html

module.exports = {
  mode: 'development', // 可选development|production
  entry: path.join(__dirname, 'src', 'main.js'),
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '', // js 路径为public + path + filename
    filename: "main.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // css-loader 导入css
        // style-loader 将css插入到style标签中
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/, 
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.html$/,  // 导入 html
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    })
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join('/dist/'),
    inline: true,
    host: '0.0.0.0',
    port: 3000,
  }
};
```

<!-- more -->

### 将css文件单独抽取出来作为一个css文件
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 将css抽取为单独的文件
const MiniCss = require('mini-css-extract-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCss.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCss.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    //指定抽取出来的css文件名
    new MiniCss({
      filename: 'main.css'
    })
  ]
};
```

### css自动补前缀

postcss.config.js
```
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

webpack.config.js
```
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCss.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCss.loader,
          'css-loader',

          // 
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
```


### 解析js
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCss = require('mini-css-extract-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // 指定es6的版本
              presets: ['@babel/preset-env'],
              plugins: [
              ]
            }
          }
        ]
      }
    ]
  }
};
```

### 生产环境压缩css,js

```
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyWebpackplugin = require('uglifyjs-webpack-plugin')

module.exports = {
  optimization: {
    minimizer: [
      new UglifyWebpackplugin({
        test: /\.js(\?.*)?$/i,
        cache: true,
        // 是否并行处理
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCss()
    ]
  },
  mode: 'production'
}
```

### 将引入的第三方插件暴露到global环境中
1.在require中引入变量
```
 require("expose-loader?$!jquery");
```

2. 在配置文件中将变量暴露到global中
```
module.exports = {
  module:{
    loader: [
      {
        test: require.resolve("jquery"),
        loader: "expose-loader?$"
      },

      {
        test: require.resolve("jquery"),
        laoder: "expose-loader?$!expose-loader?jQuery"
      },

      {
        test: require.resolve("jquery"),
        options: "$"
      },
      {
        test: require.resolve("jquery"),
        options: "jQuery"
      }
    ]
  }
}
```
3.直接在template(index.html)引入
```
module.export = {
  externals: {
    jquery: "jQuery"
    //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
  }
}
```
