# Zustand 学习示例

这个项目展示了如何在 React 应用中使用 Zustand 进行状态管理，从基础用法到高级特性的完整示例。

## 📚 学习内容

### 1. 基础计数器 (`counterStore.ts`)
- ✅ 基本的状态定义和操作
- ✅ 简单的状态更新方法
- ✅ TypeScript 类型支持

```typescript
const useCounterStore = create<CounterState>((set, get) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

### 2. 用户管理 (`userStore.ts`)
- ✅ 异步操作处理
- ✅ 加载状态管理
- ✅ 错误处理机制
- ✅ 使用 get() 访问当前状态

```typescript
fetchUser: async (id: number) => {
  const { setLoading, setError, setUser } = get();
  setLoading(true);
  try {
    const user = await mockApi.fetchUser(id);
    setUser(user);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}
```

### 3. 购物车 (`cartStore.ts`)
- ✅ 复杂状态管理
- ✅ 自动计算派生状态
- ✅ 批量操作
- ✅ 状态同步更新

```typescript
addItem: (product: Product, quantity = 1) => {
  set((state) => {
    // 复杂的状态更新逻辑
    const newItems = /* ... */;
    const newTotal = newItems.reduce(/* ... */);
    return { items: newItems, total: newTotal };
  });
}
```

### 4. 设置管理 (`settingsStore.ts`)
- ✅ 持久化存储 (localStorage)
- ✅ 中间件使用 (persist)
- ✅ 版本控制和数据迁移
- ✅ 部分状态持久化

```typescript
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      // 状态和方法定义
    }),
    {
      name: 'app-settings',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ /* 只持久化部分状态 */ }),
    }
  )
);
```

## 🚀 快速开始

### 安装依赖

```bash
# 安装 Zustand
pnpm add zustand

# 如果需要图标支持
pnpm add @ant-design/icons
```

### 运行项目

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:8000/zustand-examples 查看示例
```

## 🎯 核心概念

### Store 创建

```typescript
import { create } from 'zustand';

interface MyState {
  count: number;
  increment: () => void;
}

const useMyStore = create<MyState>((set, get) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### 在组件中使用

```tsx
function MyComponent() {
  const { count, increment } = useMyStore();
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### 异步操作

```typescript
const useAsyncStore = create((set, get) => ({
  data: null,
  loading: false,
  
  fetchData: async () => {
    set({ loading: true });
    try {
      const data = await api.getData();
      set({ data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  }
}));
```

### 持久化存储

```typescript
import { persist, createJSONStorage } from 'zustand/middleware';

const usePersistStore = create(
  persist(
    (set) => ({
      // 你的状态
    }),
    {
      name: 'my-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

## 🔧 最佳实践

### 1. 状态结构设计
- 按功能模块拆分 store
- 避免过度嵌套的状态结构
- 合理使用计算属性

### 2. 操作方法
- 使用 `set()` 更新状态
- 使用 `get()` 访问当前状态
- 避免直接修改状态对象

### 3. TypeScript 支持
- 为每个 store 定义清晰的类型接口
- 使用泛型确保类型安全
- 利用 TypeScript 的类型推导

### 4. 性能优化
- 使用 `useShallow` 比较浅层状态
- 避免不必要的状态订阅
- 合理拆分 store 减少重渲染

## 📖 进阶特性

### 中间件系统

```typescript
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    (set) => ({
      // 状态定义
    }),
    { name: 'MyStore' }
  )
);
```

### 状态订阅

```typescript
// 订阅状态变化
const unsubscribe = useMyStore.subscribe(
  (state) => state.count,
  (count) => console.log('Count changed:', count)
);

// 取消订阅
unsubscribe();
```

### 状态重置

```typescript
const initialState = { count: 0, name: '' };

const useResetStore = create((set) => ({
  ...initialState,
  reset: () => set(initialState),
}));
```

## 🆚 与其他状态管理库对比

| 特性 | Zustand | Redux | Context API |
|------|---------|--------|-------------|
| 包大小 | 很小 (~13kb) | 大 (~45kb) | 内置 |
| 学习曲线 | 简单 | 陡峭 | 中等 |
| TypeScript | 原生支持 | 需要额外配置 | 原生支持 |
| 性能 | 优秀 | 优秀 | 一般 |
| 生态系统 | growing | 成熟 | 内置 |

## 🔗 相关资源

- [Zustand 官方文档](https://zustand-demo.pmnd.rs/)
- [GitHub 仓库](https://github.com/pmndrs/zustand)
- [TypeScript 指南](https://github.com/pmndrs/zustand#typescript)
- [中间件文档](https://github.com/pmndrs/zustand#middleware)

## 📝 项目结构

```
src/
├── stores/           # Zustand stores
│   ├── counterStore.ts
│   ├── userStore.ts
│   ├── cartStore.ts
│   └── settingsStore.ts
├── components/       # 示例组件
│   ├── CounterExample.tsx
│   ├── UserExample.tsx
│   ├── CartExample.tsx
│   └── SettingsExample.tsx
└── pages/
    └── zustand-examples.tsx  # 主页面
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来完善这个学习示例！

## 📄 许可证

MIT License
