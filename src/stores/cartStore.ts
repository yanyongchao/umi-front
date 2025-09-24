import { create } from 'zustand';

// 商品类型
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

// 购物车商品类型
interface CartItem {
  product: Product;
  quantity: number;
}

// 购物车状态类型
interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  
  // 基础操作
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  
  // 计算方法
  calculateTotal: () => void;
  getItem: (productId: number) => CartItem | undefined;
  
  // 批量操作
  addMultipleItems: (items: { product: Product; quantity: number }[]) => void;
  removeMultipleItems: (productIds: number[]) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  // 初始状态
  items: [],
  total: 0,
  itemCount: 0,

  // 添加商品到购物车
  addItem: (product: Product, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      let newItems: CartItem[];
      
      if (existingItem) {
        // 如果商品已存在，增加数量
        newItems = state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // 如果商品不存在，添加新商品
        newItems = [...state.items, { product, quantity }];
      }
      
      const newTotal = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    });
  },

  // 从购物车移除商品
  removeItem: (productId: number) => {
    set((state) => {
      const newItems = state.items.filter(item => item.product.id !== productId);
      const newTotal = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    });
  },

  // 更新商品数量
  updateQuantity: (productId: number, quantity: number) => {
    if (quantity <= 0) {
      // 如果数量小于等于0，移除商品
      get().removeItem(productId);
      return;
    }
    
    set((state) => {
      const newItems = state.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
      
      const newTotal = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      };
    });
  },

  // 清空购物车
  clearCart: () => set({ items: [], total: 0, itemCount: 0 }),

  // 重新计算总价（通常在价格变化时调用）
  calculateTotal: () => {
    set((state) => {
      const newTotal = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const newItemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        total: newTotal,
        itemCount: newItemCount,
      };
    });
  },

  // 获取特定商品
  getItem: (productId: number) => {
    return get().items.find(item => item.product.id === productId);
  },

  // 批量添加商品
  addMultipleItems: (items: { product: Product; quantity: number }[]) => {
    items.forEach(({ product, quantity }) => {
      get().addItem(product, quantity);
    });
  },

  // 批量移除商品
  removeMultipleItems: (productIds: number[]) => {
    productIds.forEach(id => {
      get().removeItem(id);
    });
  },
}));
