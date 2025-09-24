import { api, ApiResponse } from '@/plugins/request/request';
import { API_ENDPOINTS } from '@/plugins/request/config';

// 用户信息接口
export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  createTime: string;
}

// 登录参数接口
export interface LoginParams {
  username: string;
  password: string;
}

// 登录响应接口
export interface LoginResponse {
  token: string;
  user: User;
}

// 用户服务
export class UserService {
  // 用户登录
  static async login(params: LoginParams): Promise<ApiResponse<LoginResponse>> {
    return api.post<LoginResponse>(API_ENDPOINTS.USER.LOGIN, params);
  }

  // 用户注册
  static async register(params: LoginParams & { email: string }): Promise<ApiResponse<User>> {
    return api.post<User>(API_ENDPOINTS.USER.REGISTER, params);
  }

  // 获取用户信息
  static async getUserInfo(): Promise<ApiResponse<User>> {
    return api.get<User>(API_ENDPOINTS.USER.INFO);
  }

  // 用户登出
  static async logout(): Promise<ApiResponse<null>> {
    return api.post<null>(API_ENDPOINTS.USER.LOGOUT);
  }
}

// 导出默认服务实例
export default UserService;
