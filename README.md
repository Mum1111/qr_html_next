# 二维码生成网站

## 启动项目

First, run the development server:
```bash
npm install
# or
yarn install
# or
pnpm install
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

创建数据库表
```bash
npx  prisma migrate dev  
```

## TODO

1. logo表设计  完成
2. logo上传oss后，oss地址落盘到数据库 完成
3. 封装一个fetch请求器，并封装一个基于swr的请求hook 完成
4. 根据用户信息查询logo接口， 并在前端渲染 完成
5. mui全局主题调整，解决与tailwindcss的兼容性问题 完成
6. 抽离主页面中冗余代码为组件 完成
7. 修复下载时跨域问题 完成
8. 校验没有url时不让下载 完成
9. 缓存转换的base64
10. 上传文件时显示loading动画
11. 样式优化 完成
12. 部署上线






