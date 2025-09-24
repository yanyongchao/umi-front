# 请求库封装使用指南

本项目基于 `umi-request` 封装了一个完整的请求库，提供了错误处理、拦截器、类型安全等功能。

## 目录结构

```
src/
├── utils/
│   ├── request.ts      # 请求库核心封装
│   ├── config.ts       # API配置文件
│   └── index.ts        # 工具导出文件
├── services/
│   ├── user.ts         # 用户服务示例
│   └── index.ts        # 服务导出文件
└── pages/
    └── index.tsx       # 使用示例
```

## 主要功能

### 1. 统一错误处理
- 自动处理HTTP状态码错误
- 统一业务错误处理
- 友好的错误提示

### 2. 请求/响应拦截器
- 自动添加认证token
- 统一处理响应数据格式
- 业务状态码验证

### 3. TypeScript支持
- 完整的类型定义
- 泛型支持
- 接口类型安全

## 使用方法

### 基础使用

```typescript
import { api } from '@/utils/request';

// GET 请求
const response = await api.get<User[]>('/users');

// POST 请求
const result = await api.post<User>('/users', {
  username: 'test',
  email: 'test@example.com'
});
```

### 使用服务层

```typescript
import { UserService } from '@/services';

// 用户登录
const loginResponse = await UserService.login({
  username: 'admin',
  password: '123456'
});

// 获取用户信息
const userInfo = await UserService.getUserInfo();
```

### 创建新的服务

```typescript
// src/services/product.ts
import { api, ApiResponse } from '@/utils/request';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export class ProductService {
  static async getProducts(): Promise<ApiResponse<Product[]>> {
    return api.get<Product[]>('/products');
  }

  static async createProduct(product: Omit<Product, 'id'>): Promise<ApiResponse<Product>> {
    return api.post<Product>('/products', product);
  }
}
```

## 配置说明

### API配置 (src/utils/config.ts)

```typescript
export const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:3000/api', // 开发环境API地址
    timeout: 30000,
  },
  production: {
    baseURL: 'https://api.example.com',   // 生产环境API地址
    timeout: 30000,
  },
};
```

### 端点配置

```typescript
export const API_ENDPOINTS = {
  USER: {
    LOGIN: '/user/login',
    INFO: '/user/info',
  },
  // 添加新的端点
  PRODUCT: {
    LIST: '/products',
    CREATE: '/products',
  },
};
```

## 错误处理

请求库会自动处理以下错误：

- **网络错误**: 显示"网络连接异常"
- **HTTP状态码错误**: 
  - 401: 用户未登录或登录已过期
  - 403: 没有权限访问
  - 404: 请求的资源不存在
  - 500: 服务器内部错误
- **业务错误**: 根据响应中的 `code` 和 `message` 显示错误信息

## 认证处理

请求库会自动从 `localStorage` 中读取 `token` 并添加到请求头：

```typescript
Authorization: Bearer ${token}
```

登录成功后，需要手动保存token：

```typescript
localStorage.setItem('token', response.data.token);
```

## 文件上传

```typescript
const formData = new FormData();
formData.append('file', file);

const response = await api.upload<UploadResponse>('/upload', formData);
```

## 自定义配置

如果需要为特定请求自定义配置：

```typescript
const response = await api.post('/api/data', data, {
  timeout: 60000,
  headers: {
    'Custom-Header': 'value'
  }
});
```

## 环境变量

可以通过环境变量来配置不同环境的API地址：

```bash
# .env.development
REACT_APP_API_BASE_URL=http://localhost:3000/api

# .env.production  
REACT_APP_API_BASE_URL=https://api.example.com
```

然后在配置文件中使用：

```typescript
baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api'
```
