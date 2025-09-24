import { create } from 'zustand';

// 定义状态类型
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
}

// 创建 store
export const useCounterStore = create<CounterState>((set, get) => ({
  // 初始状态
  count: 0,

  // 增加计数
  increment: () => set((state) => ({ count: state.count + 1 })),

  // 减少计数
  decrement: () => set((state) => ({ count: state.count - 1 })),

  // 重置计数
  reset: () => set({ count: 0 }),

  // 设置指定值
  setCount: (count: number) => set({ count }),
}));
