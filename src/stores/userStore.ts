import { create } from 'zustand';

// 定义用户类型
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

// 定义状态类型
interface UserState {
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
  
  // 用户操作
  setUser: (user: User) => void;
  clearUser: () => void;
  updateUser: (updates: Partial<User>) => void;
  
  // 用户列表操作
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  removeUser: (id: number) => void;
  
  // 加载状态管理
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // 异步操作
  fetchUser: (id: number) => Promise<void>;
  fetchUsers: () => Promise<void>;
}

// 模拟 API 调用
const mockApi = {
  fetchUser: async (id: number): Promise<User> => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id,
      name: `用户${id}`,
      email: `user${id}@example.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
    };
  },
  
  fetchUsers: async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `用户${i + 1}`,
      email: `user${i + 1}@example.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 1}`,
    }));
  },
};

export const useUserStore = create<UserState>((set, get) => ({
  // 初始状态
  user: null,
  users: [],
  loading: false,
  error: null,

  // 用户操作
  setUser: (user: User) => set({ user, error: null }),
  
  clearUser: () => set({ user: null }),
  
  updateUser: (updates: Partial<User>) => 
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  // 用户列表操作
  setUsers: (users: User[]) => set({ users, error: null }),
  
  addUser: (user: User) => 
    set((state) => ({ 
      users: [...state.users, user] 
    })),
  
  removeUser: (id: number) => 
    set((state) => ({ 
      users: state.users.filter(user => user.id !== id) 
    })),

  // 加载状态管理
  setLoading: (loading: boolean) => set({ loading }),
  
  setError: (error: string | null) => set({ error, loading: false }),

  // 异步操作
  fetchUser: async (id: number) => {
    const { setLoading, setError, setUser } = get();
    
    setLoading(true);
    setError(null);
    
    try {
      const user = await mockApi.fetchUser(id);
      setUser(user);
    } catch (error) {
      setError(error instanceof Error ? error.message : '获取用户失败');
    } finally {
      setLoading(false);
    }
  },

  fetchUsers: async () => {
    const { setLoading, setError, setUsers } = get();
    
    setLoading(true);
    setError(null);
    
    try {
      const users = await mockApi.fetchUsers();
      setUsers(users);
    } catch (error) {
      setError(error instanceof Error ? error.message : '获取用户列表失败');
    } finally {
      setLoading(false);
    }
  },
}));
