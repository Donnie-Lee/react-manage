import { login } from '@/services/auth/index';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { history, useIntl, useModel } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { flushSync } from 'react-dom';
import './login.css';
type LayoutType = Parameters<typeof Form>[0]['layout'];

const Login: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { initialState, setInitialState } = useModel('@@initialState');
  const onFinish = async (values: API.LoginParams) => {
    const res = await login(values);
    if (res.code === 200) {
      localStorage.setItem('sa-Token', JSON.stringify(res.data));
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.login.success',
        defaultMessage: '登录成功！',
      });
      message.success(defaultLoginSuccessMessage);
      await fetchUserInfo();
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
    } else {
      message.error(res.message);
    }
  };

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-body">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14, offset: 4 }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
      >
        <Form.Item<API.LoginParams>
          rules={[{ required: true, message: '请输入用户名' }]}
          name="username"
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入用户名"
          />
        </Form.Item>
        <Form.Item<API.LoginParams>
          rules={[{ required: true, message: '请输入密码' }]}
          name="password"
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
