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
3. 封装一个fetch请求器，并封装一个基于swr的请求hook
4. 根据用户信息查询logo接口， 并在前端渲染
5. mui全局主题调整，解决与tailwindcss的兼容性问题
6. 样式优化
7. 部署上线






