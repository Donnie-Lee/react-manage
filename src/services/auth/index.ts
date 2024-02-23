import { request } from '@umijs/max';

/** 登录接口 POST /api/auth/doLogin */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>('/api/auth/doLogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前用户信息 GET /api/auth/userinfo */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/auth/userinfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录 GET /api/auth/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/auth/outLogin', {
    method: 'GET',
    ...(options || {}),
  });
}
