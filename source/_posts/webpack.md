---
title: webpack
date: 2019-04-04 19:04:19
tags: [webpack]
---

### 安装
```
npm install webpack webpack-cli webpack-dev-server -D
```

### 1.基本配置 webpack.config.js
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
    host: '127.0.0.1',
    port: 3000,
  }
};
```

<!-- more -->

### 2.html处理

html-webpack-plugin: 可以指定模版生成html,并可以进行去除双引号、折叠空白符号之类的操作
```
const HtmlWebpackPlugin = require('html-webpack-plugin')

plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseInlineTagWhitespace: true
      },
      hash: true
    })
]
```
### 3.样式处理

#### 3.1基本设置
```
module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          // 插入到style中
          loader: 'style-loader',
          options: {
            insertAt: 'bottom'
          }
        }, 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
}
```
#### 3.2 将所有的样式抽离到一个css文件
```
const MiniCssExtractPlugin= require('mini-css-extract-plugin')

module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      }
    ]
}
```
#### 3.3 将样式自动添加前缀
```
cnpm install postcss-loader autoprefixer

// webpack.config.js
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
}

// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```
or

```
var postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: (loader) => [
            require('autoprefixer')({
                browsers: [
                    // 加这个后可以出现额外的兼容性前缀
                    "> 0.01%"
                ]
            })
        ],
        sourceMap: true
    }
}
```

#### 3.4 production 压缩css
```
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin()
    ]
  },
  mode: 'production', // production | development
}
```
#### 3.5 production 压缩js
```
cnpm install uglifyjs-webpack-plugin -D 
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //压缩js
module.exports = {
  optimization: { //优化项
    minimizer: [
      new UglifyWebpackplugin({
        test: /\.js(\?.*)?$/i,
        cache: true,
        // 是否并行处理
        parallel: true,
        sourceMap: true
      })
    ]
  }
}
```
### 4. 转换es6语法以及校验
```
cnpm install babel-loader @babel/core @babel/preset-env -D

module.exports = {
    entry: ["@babel/polyfill", "./src/main.js"],
    module:[
    {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-runtime"
              //根据自己的需求自行添加
            ]
          }
        }
    },
    {
        test: /\.js$/,
        use: {
            loader: 'eslint-loader',
            options: {
                enfore: 'pre'
            }
        }
    }
]
}

```
### 5. 全局变量引入的问题(以jquery为例)
- 全局loader  expose-loader
- 前置loder   
- 普通loader 
- 内联loader  
- 后置loader  postcss-loader

#### 5.1 import $ from 'jquery' 时
```
module = [
    test: require.resove('jquery'),
    use:'expose-loader?$'
]
```
#### 5.2 将$注入到每一个模块中去，在模块中可以直接使用$
```
const webpack = require('webpack')
plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
],
```
### 6.处理图片
#### 6.1 处理css，js中的图片引用
```
module: [
     {
        test: /.(jpg|jpeg|png|gif|svg)$/,
        use:'file-loader'
    }
]
```
#### 6.2 处理html中引入的图片
```
module: [
     {
        test: /.html$/,
        use:'html-withimg-loader'
    }
]
```
#### 6.3 将小的图片转成base64，减少http请求

```
module: [
     {
        loader: 'url-loader',
        options: {
          // 小于50k的图片转成base64
          limit: 50 * 1024, // 50k
          name: '[hash:8].[ext]',
          outputPath: './images'
        }
    }
]
```

### 7.打包文件分类
```
//img
module: [
     {
        loader: 'url-loader',
        options: {
          // 小于50k的图片转成base64
          limit: 50 * 1024, // 50k
          name: '[hash:8].[ext]',
          outputPath: '/images/',   //图片打包到images下
          //打包后为图片的引入路径前添加url前缀，可以在需要将图片使用cdn的时候用（和其他文件的publicPath不同）
          //publicPath: 'http://www.xxxcdn.com/'  
        }
    }
]
//css
plugins: [
  new MiniCss({
      filename: 'css/main.css' // 会将css文件打包为  dist/css/main.css
    }),
]

// js
output: {
  filename: 'js/main.js'
}
```