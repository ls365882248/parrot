import './style/global.less';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  Outlet,
  Navigate,
  createHashRouter,
  RouterProvider,
  useNavigation,
} from 'react-router-dom';
import axios from 'axios';
import rootReducer from './store';
import { GlobalContext } from './context';
import checkLogin from './utils/checkLogin';
import changeTheme from './utils/changeTheme';
import useStorage from './utils/useStorage';
import './mock';
import LoginPage from './pages/login';
import DefaultLayout from './layout';

const PageLayout = () => {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
};

const store = createStore(rootReducer);
function Index() {
  const [lang, setLang] = useStorage('arco-lang', 'en-US');
  const [theme, setTheme] = useStorage('arco-theme', 'light');

  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }

  function fetchUserInfo() {
    store.dispatch({
      type: 'update-userInfo',
      payload: { userLoading: true },
    });
    axios.get('/api/user/userInfo').then((res) => {
      store.dispatch({
        type: 'update-userInfo',
        payload: { userInfo: res.data, userLoading: false },
      });
    });
  }

  useEffect(() => {
    if (checkLogin()) {
      fetchUserInfo();
    } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      // window.location.pathname = '/login';
    }
  }, []);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };

  const router = createHashRouter([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: <PageLayout />,
      children: [
        {
          path: 'abstract',
          lazy: () => import('./pages/abstract'),
        },
        {
          path: 'weekly',
          lazy: () => import('./pages/weekly'),
        },
        {
          path: 'email',
          lazy: () => import('./pages/email'),
        },
        {
          path: 'english-write',
          lazy: () => import('./pages/english-write'),
        },
        {
          path: 'marketing-write',
          lazy: () => import('./pages/marketing-write'),
        },
        {
          path: 'rewrite',
          lazy: () => import('./pages/rewrite'),
        },
      ],
    },
  ]);

  return (
    <ConfigProvider
      locale={getArcoLocale()}
      componentConfig={{
        Card: {
          bordered: false,
        },
        List: {
          bordered: false,
        },
        Table: {
          border: false,
        },
      }}
    >
      <Provider store={store}>
        <GlobalContext.Provider value={contextValue}>
          <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
        </GlobalContext.Provider>
      </Provider>
    </ConfigProvider>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
