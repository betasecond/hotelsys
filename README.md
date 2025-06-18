# 酒店预订系统 (Hotel Booking System)

这是一个基于 Nuxt 3 的酒店预订系统，使用 SQLite 数据库和 Drizzle ORM。

## 功能特点

- 用户注册和登录
- 管理员登录
- 房间浏览和预订
- 预订记录管理
- 客户管理
- 房间类型管理

## 技术栈

- **前端**: Nuxt 3, Vue 3, TailwindCSS
- **后端**: Nitro (Nuxt Server Engine)
- **数据库**: SQLite
- **ORM**: Drizzle ORM
- **身份验证**: bcryptjs

## 安装和运行

1. 安装依赖:
```bash
npm install
```

2. 复制环境变量文件:
```bash
copy .env.example .env
```

3. 运行数据库迁移:
```bash
npm run db:migrate
```

4. 初始化数据库数据:
```bash
npm run db:seed
```

5. 启动开发服务器:
```bash
npm run dev
```

项目将在 `http://localhost:3000` 运行。

## 登录信息

- **管理员密码**: admin123 (可在 .env 文件中修改)
- **用户账户**: 需要注册创建，或通过管理员后台添加

## 项目结构

```
hotelsys/
├── pages/                 # 页面组件
│   ├── index.vue         # 登录/注册页面
│   ├── user.vue          # 用户中心
│   └── admin.vue         # 管理员后台
├── server/               # 服务端代码
│   ├── api/              # API 路由
│   └── db/               # 数据库相关
├── assets/               # 样式文件
└── public/               # 静态资源
```

## API 端点

### 用户相关
- `POST /api/register` - 用户注册
- `POST /api/login/user` - 用户登录
- `POST /api/login/admin` - 管理员登录

### 房间相关
- `GET /api/rooms/all` - 获取所有房间
- `GET /api/hoteltypes` - 获取房间类型

### 预订相关
- `POST /api/book` - 预订房间
- `GET /api/reservations` - 获取所有预订（管理员）
- `GET /api/reservations/[customerId]` - 获取用户预订

### 客户管理
- `GET /api/customers` - 获取所有客户
- `POST /api/customers` - 添加客户

## 开发

- 运行开发模式: `npm run dev`
- 构建生产版本: `npm run build`
- 运行测试: `npm run test`

## 数据库

项目使用 SQLite 数据库，数据库文件位于 `server/db/local.db`。

### 数据表结构

- `customers` - 客户信息
- `room_types` - 房间类型
- `rooms` - 房间信息
- `reservations` - 预订记录
