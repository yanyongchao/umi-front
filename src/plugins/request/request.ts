import { extend, RequestOptionsInit } from 'umi-request';
import { message } from 'antd';

// 请求响应的通用接口
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

// 错误处理
const errorHandler = (error: any) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = response.statusText || '请求错误';
    const { status, url } = response;

    // 根据状态码显示不同的错误信息
    switch (status) {
      case 400:
        message.error('请求参数错误');
        break;
      case 401:
        message.error('用户未登录或登录已过期');
        // 可以在这里处理登录过期的逻辑
        // history.push('/login');
        break;
      case 403:
        message.error('您没有权限访问该资源');
        break;
      case 404:
        message.error('请求的资源不存在');
        break;
      case 500:
        message.error('服务器内部错误');
        break;
      case 502:
        message.error('网关错误');
        break;
      case 503:
        message.error('服务不可用');
        break;
      case 504:
        message.error('网关超时');
        break;
      default:
        message.error(`请求错误 ${status}: ${url}`);
    }
  } else if (!response) {
    message.error('网络连接异常，请检查您的网络');
  }

  throw error;
};

// 创建请求实例
const request = extend({
  // 默认错误处理
  errorHandler,
  // 默认请求是否带上cookie
  credentials: 'include',
  // 默认超时时间
  timeout: 30000,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use((url, options) => {
  // 可以在这里添加通用的请求头，比如 token
  const token = localStorage.getItem('token');
  if (token) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  return {
    url,
    options,
  };
});

// 响应拦截器
request.interceptors.response.use(async (response) => {
  const data = await response.clone().json();
  
  // 统一处理业务错误
  if (data && data.code !== undefined) {
    if (data.code === 0 || data.success === true) {
      return response;
    } else {
      // 业务错误
      message.error(data.message || '请求失败');
      const error = new Error(data.message || '请求失败');
      error.name = 'BizError';
      (error as any).data = data;
      throw error;
    }
  }

  return response;
});

export default request;

// 封装常用的请求方法
export const api = {
  // GET 请求
  get: <T = any>(url: string, params?: any, options?: RequestOptionsInit): Promise<ApiResponse<T>> => {
    return request.get(url, {
      params,
      ...options,
    });
  },

  // POST 请求
  post: <T = any>(url: string, data?: any, options?: RequestOptionsInit): Promise<ApiResponse<T>> => {
    return request.post(url, {
      data,
      ...options,
    });
  },

  // PUT 请求
  put: <T = any>(url: string, data?: any, options?: RequestOptionsInit): Promise<ApiResponse<T>> => {
    return request.put(url, {
      data,
      ...options,
    });
  },

  // DELETE 请求
  delete: <T = any>(url: string, params?: any, options?: RequestOptionsInit): Promise<ApiResponse<T>> => {
    return request.delete(url, {
      params,
      ...options,
    });
  },

  // PATCH 请求
  patch: <T = any>(url: string, data?: any, options?: RequestOptionsInit): Promise<ApiResponse<T>> => {
    return request.patch(url, {
      data,
      ...options,
    });
  },

  // 上传文件
  upload: <T = any>(url: string, formData: FormData, options?: RequestOptionsInit): Promise<ApiResponse<T>> => {
    return request.post(url, {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...options,
    });
  },
};
