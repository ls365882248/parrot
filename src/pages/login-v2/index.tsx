import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.less';

const LoginPage = () => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate('/abstract');
  };

  return (
    <div className="root-container">
      <div className="login">
        <h1>Login</h1>
        <form method="post">
          <input type="text" name="u" placeholder="Username" />
          <input type="password" name="p" placeholder="Password" />
          <button
            type="submit"
            className="btn btn-primary btn-block btn-large"
            onClick={onLogin}
          >
            Let me in.
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
