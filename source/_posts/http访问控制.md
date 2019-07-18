---
title: http访问控制
author:
  - 徐勇超
date: 2019-07-18 14:33:20
tags: ['cors', 'http']
categories: ['nginx']
---

### http访问控制(cors)概念
    跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器  让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。
出于安全原因，浏览器限制从脚本内**发起**的跨源HTTP请求。
>⚠️不一定是浏览器限制了发起跨站请求，也可能是跨站请求可以正常发起，但是返回结果被浏览器拦截了

### 简单请求: (满足下面所有条件)
  方法：GET、HEAD、POST
  Content-Typ为下面三个值之一：text/plain 、mutipart/form-data 、application/x-www-data-urlencoded

<!-- more -->

### 复杂请求【预检请求】（满足下面任一条件）
  与前述简单请求不同，“需预检的请求”要求必须首先使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。"预检请求“的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。	
当请求满足下述任一条件时，即应首先发送预检请求：
- 使用了下面任一 HTTP 方法：
1. PUT
2. DELETE
3. CONNECT
4. OPTIONS
5. TRACE
6. PATCH

- 人为设置了对 CORS 安全的首部字段集合之外的其他首部字段。该集合为：
1. Accept
2. Accept-Language
3. Content-Language
4. Content-Type (需要注意额外的限制)

- Content-Type 的值不属于下列之一:
1. application/x-www-form-urlencoded
2. multipart/form-data
3. text/plain
- 请求中的XMLHttpRequestUpload 对象注册了任意多个事件监听器。
- 请求中使用了ReadableStream对象。


### HTTP响应首部字段：
#### Access-Control-Allow-Origin

#### Access-Control-Expose-Headers  
  让服务器把允许浏览器访问的头放入白名单。在跨域访问时，XMLHttpRequest对象的getResponseHeader()方法只能拿到一些最基本的响应头，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，则需要服务器设置本响应头。

#### Access-Control-Max-Age
  指定了preflight请求的结果能够被缓存多久

#### Access-Control-Allow-Credentials 
  指定了当浏览器的credentials设置为true时是否允许浏览器读取response的内容。当用在对preflight预检测请求的响应中时，它指定了实际的请求是否可以使用credentials。请注意：简单 GET 请求不会被预检；如果对此类请求的响应中不包含该字段，这个响应将被忽略掉，并且浏览器也不会将相应内容返回给网页

#### Access-Control-Allow-Methods 
  首部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法

#### Access-Control-Allow-Headers 
  首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。

### HTTP请求首部字段：
#### Origin 首部字段表明预检请求或实际请求的源站。
  它不包含任何路径信息，只是服务器名称。Note: 有时候将该字段的值设置为空字符串是有用的，例如，当源站是一个 data URL 时。

#### Access-Control-Request-Method 
  首部字段用于预检请求。其作用是，将实际请求所使用的 HTTP 方法告诉服务器。

#### Access-Control-Request-Headers 
  首部字段用于预检请求。其作用是，将实际请求所携带的首部字段告诉服务器。




