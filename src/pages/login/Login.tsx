import React from 'react';
import './login.css';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  return (
    <div className="container">
      <div className="login-modal">
        <div className="login-form">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
