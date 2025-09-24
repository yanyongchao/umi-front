import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// 主题类型
export type Theme = 'light' | 'dark' | 'auto';

// 语言类型
export type Language = 'zh' | 'en';

// 字体大小类型
export type FontSize = 'small' | 'medium' | 'large';

// 设置状态类型
interface SettingsState {
  // 主题设置
  theme: Theme;
  fontSize: FontSize;
  language: Language;
  
  // 布局设置
  sidebarCollapsed: boolean;
  showHeader: boolean;
  showFooter: boolean;
  
  // 用户偏好
  animations: boolean;
  notifications: boolean;
  autoSave: boolean;
  
  // 操作方法
  setTheme: (theme: Theme) => void;
  setFontSize: (fontSize: FontSize) => void;
  setLanguage: (language: Language) => void;
  
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setShowHeader: (show: boolean) => void;
  setShowFooter: (show: boolean) => void;
  
  setAnimations: (enabled: boolean) => void;
  setNotifications: (enabled: boolean) => void;
  setAutoSave: (enabled: boolean) => void;
  
  // 批量更新
  updateSettings: (settings: Partial<Omit<SettingsState, 'setTheme' | 'setFontSize' | 'setLanguage' | 'setSidebarCollapsed' | 'toggleSidebar' | 'setShowHeader' | 'setShowFooter' | 'setAnimations' | 'setNotifications' | 'setAutoSave' | 'updateSettings' | 'resetSettings'>>) => void;
  
  // 重置设置
  resetSettings: () => void;
}

// 默认设置
const defaultSettings = {
  theme: 'light' as Theme,
  fontSize: 'medium' as FontSize,
  language: 'zh' as Language,
  sidebarCollapsed: false,
  showHeader: true,
  showFooter: true,
  animations: true,
  notifications: true,
  autoSave: true,
};

// 创建持久化的设置 store
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      // 初始状态（使用默认设置）
      ...defaultSettings,

      // 主题设置
      setTheme: (theme: Theme) => {
        set({ theme });
        
        // 应用主题到 document
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme);
          
          if (theme === 'auto') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
          }
        }
      },

      setFontSize: (fontSize: FontSize) => {
        set({ fontSize });
        
        // 应用字体大小到 document
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-font-size', fontSize);
        }
      },

      setLanguage: (language: Language) => set({ language }),

      // 布局设置
      setSidebarCollapsed: (sidebarCollapsed: boolean) => set({ sidebarCollapsed }),
      
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      setShowHeader: (showHeader: boolean) => set({ showHeader }),
      
      setShowFooter: (showFooter: boolean) => set({ showFooter }),

      // 用户偏好
      setAnimations: (animations: boolean) => {
        set({ animations });
        
        // 应用动画设置到 document
        if (typeof document !== 'undefined') {
          if (animations) {
            document.documentElement.classList.remove('no-animations');
          } else {
            document.documentElement.classList.add('no-animations');
          }
        }
      },

      setNotifications: (notifications: boolean) => set({ notifications }),
      
      setAutoSave: (autoSave: boolean) => set({ autoSave }),

      // 批量更新设置
      updateSettings: (settings) => {
        set((state) => ({ ...state, ...settings }));
        
        // 应用相关的 DOM 更新
        const currentState = { ...get(), ...settings };
        
        if (typeof document !== 'undefined') {
          if ('theme' in settings) {
            document.documentElement.setAttribute('data-theme', currentState.theme);
          }
          if ('fontSize' in settings) {
            document.documentElement.setAttribute('data-font-size', currentState.fontSize);
          }
          if ('animations' in settings) {
            if (currentState.animations) {
              document.documentElement.classList.remove('no-animations');
            } else {
              document.documentElement.classList.add('no-animations');
            }
          }
        }
      },

      // 重置为默认设置
      resetSettings: () => {
        set(defaultSettings);
        
        // 重置 DOM 属性
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', defaultSettings.theme);
          document.documentElement.setAttribute('data-font-size', defaultSettings.fontSize);
          document.documentElement.classList.remove('no-animations');
        }
      },
    }),
    {
      name: 'app-settings', // localStorage 中的 key
      storage: createJSONStorage(() => localStorage), // 使用 localStorage
      
      // 只持久化部分状态，排除方法
      partialize: (state) => ({
        theme: state.theme,
        fontSize: state.fontSize,
        language: state.language,
        sidebarCollapsed: state.sidebarCollapsed,
        showHeader: state.showHeader,
        showFooter: state.showFooter,
        animations: state.animations,
        notifications: state.notifications,
        autoSave: state.autoSave,
      }),
      
      // 版本控制，用于处理数据结构变化
      version: 1,
      
      // 数据迁移函数（当版本号变化时）
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // 从版本0迁移到版本1的逻辑
          return {
            ...defaultSettings,
            ...persistedState,
          };
        }
        return persistedState;
      },
    }
  )
);

// 初始化函数，在应用启动时调用
export const initializeSettings = () => {
  const { theme, fontSize, animations } = useSettingsStore.getState();
  
  if (typeof document !== 'undefined') {
    // 应用主题
    if (theme === 'auto') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      
      // 监听系统主题变化
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (useSettingsStore.getState().theme === 'auto') {
          document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
      });
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    
    // 应用字体大小
    document.documentElement.setAttribute('data-font-size', fontSize);
    
    // 应用动画设置
    if (!animations) {
      document.documentElement.classList.add('no-animations');
    }
  }
};
