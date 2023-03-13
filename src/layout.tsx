import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  HashRouter as Router,
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Spin } from '@arco-design/web-react';
import cs from 'classnames';
import {
  IconDashboard,
  IconList,
  IconSettings,
  IconFile,
  IconApps,
  IconCheckCircle,
  IconExclamationCircle,
  IconUser,
  IconMenuFold,
  IconMenuUnfold,
  IconBug,
} from '@arco-design/web-react/icon';
import { useSelector } from 'react-redux';
import qs from 'query-string';
import NProgress from 'nprogress';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import useRoute, { IRoute } from '@/routes';
import { isArray } from './utils/is';
import useLocale from './utils/useLocale';
import getUrlParams from './utils/getUrlParams';
import lazyload from './utils/lazyload';
import { GlobalState } from './store';
import styles from './style/layout.module.less';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Sider = Layout.Sider;
const Content = Layout.Content;

function getIconFromKey(key) {
  switch (key) {
    case 'dashboard':
      return <IconDashboard className={styles.icon} />;
    case 'list':
      return <IconList className={styles.icon} />;
    case 'form':
      return <IconSettings className={styles.icon} />;
    case 'profile':
      return <IconFile className={styles.icon} />;
    case 'visualization':
      return <IconApps className={styles.icon} />;
    case 'result':
      return <IconCheckCircle className={styles.icon} />;
    case 'exception':
      return <IconExclamationCircle className={styles.icon} />;
    case 'user':
      return <IconUser className={styles.icon} />;
    default:
      return <div className={styles['icon-empty']} />;
  }
}

function getFlattenRoutes(routes) {
  const mod = import.meta.glob('./pages/**/[a-z[]*.tsx');
  const res = [];
  function travel(_routes) {
    _routes.forEach((route) => {
      const visibleChildren = (route.children || []).filter(
        (child) => !child.ignore
      );
      if (route.key && (!route.children || !visibleChildren.length)) {
        try {
          route.component = lazyload(mod[`./pages/${route.key}/index.tsx`]);
          res.push(route);
        } catch (e) {
          console.log(route.key);
          console.error(e);
        }
      }

      if (isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    });
  }
  travel(routes);
  return res;
}

function PageLayout() {
  const urlParams = getUrlParams();
  const history = useHistory();
  const pathname = history.location.pathname;
  const currentComponent = qs.parseUrl(pathname).url.slice(1);
  const locale = useLocale();
  const { settings, userLoading, userInfo } = useSelector(
    (state: GlobalState) => state
  );

  const [routes, defaultRoute] = useRoute(userInfo?.permissions);
  const defaultSelectedKeys = [currentComponent || defaultRoute];
  const paths = (currentComponent || defaultRoute).split('/');
  const defaultOpenKeys = paths.slice(0, paths.length - 1);
  console.log(112313123, routes);
  const [breadcrumb, setBreadCrumb] = useState([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] =
    useState<string[]>(defaultSelectedKeys);
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  const routeMap = useRef<Map<string, React.ReactNode[]>>(new Map());
  const menuMap = useRef<
    Map<string, { menuItem?: boolean; subMenu?: boolean }>
  >(new Map());

  const navbarHeight = 60;
  const menuWidth = collapsed ? 48 : settings.menuWidth;

  const showNavbar = settings.navbar && urlParams.navbar !== false;
  const showMenu = settings.menu && urlParams.menu !== false;
  const showFooter = settings.footer && urlParams.footer !== false;

  const flattenRoutes = useMemo(() => getFlattenRoutes(routes) || [], [routes]);
  function onClickMenuItem(key) {
    const currentRoute = flattenRoutes.find((r) => r.key === key);
    const component = currentRoute.component;
    const preload = component.preload();
    NProgress.start();
    preload.then(() => {
      history.push(currentRoute.path ? currentRoute.path : `/${key}`);
      NProgress.done();
    });
  }

  function toggleCollapse() {
    setCollapsed((collapsed) => !collapsed);
  }

  const paddingLeft = showMenu ? { paddingLeft: menuWidth } : {};
  const paddingTop = showNavbar ? { paddingTop: navbarHeight } : {};
  const paddingStyle = { ...paddingLeft, ...paddingTop };

  function renderRoutes(locale) {
    routeMap.current.clear();
    return function travel(_routes: IRoute[]) {
      return _routes.map((route) => {
        const iconDom = getIconFromKey(route.key);
        const titleDom = (
          <>
            {iconDom} {locale[route.name] || route.name}
          </>
        );
        return <MenuItem key={route.key}>{titleDom}</MenuItem>;
      });
    };
  }

  return (
    <Layout className={styles.layout}>
      <div
        className={cs(styles['layout-navbar'], {
          [styles['layout-navbar-hidden']]: !showNavbar,
        })}
      >
        <Navbar show={showNavbar} />
      </div>
      {userLoading ? (
        <Spin className={styles['spin']} />
      ) : (
        <Layout>
          {showMenu && (
            <Sider
              className={styles['layout-sider']}
              width={menuWidth}
              collapsed={collapsed}
              onCollapse={setCollapsed}
              trigger={null}
              collapsible
              breakpoint="xl"
              style={paddingTop}
            >
              <div className={styles['menu-wrapper']}>
                <Menu
                  collapse={collapsed}
                  onClickMenuItem={onClickMenuItem}
                  selectedKeys={selectedKeys}
                  openKeys={openKeys}
                  onClickSubMenu={(_, openKeys) => {
                    setOpenKeys(openKeys);
                  }}
                >
                  <MenuItem key="1">
                    <IconBug /> Navigation 2
                  </MenuItem>
                  <MenuItem key="2">
                    <IconBug /> Navigation 2
                  </MenuItem>
                  <MenuItem key="3">
                    <IconBug /> Navigation 2
                  </MenuItem>
                  <MenuItem key="4">
                    <IconBug /> Navigation 2
                  </MenuItem>
                  <MenuItem key="5">
                    <IconBug /> Navigation 2
                  </MenuItem>
                </Menu>
              </div>
              <div className={styles['collapse-btn']} onClick={toggleCollapse}>
                {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
              </div>
            </Sider>
          )}
          <Layout className={styles['layout-content']} style={paddingStyle}>
            <div className={styles['layout-content-wrapper']}>
              {!!breadcrumb.length && (
                <div className={styles['layout-breadcrumb']}>
                  <Breadcrumb>
                    {breadcrumb.map((node, index) => (
                      <Breadcrumb.Item key={index}>
                        {typeof node === 'string' ? locale[node] || node : node}
                      </Breadcrumb.Item>
                    ))}
                  </Breadcrumb>
                </div>
              )}
              <Content>
                <Router>
                  <Switch>
                    {flattenRoutes.map((route, index) => {
                      return (
                        <Route
                          key={index}
                          path={`/${route.key}`}
                          component={route.component}
                        />
                      );
                    })}
                    <Route exact path="/">
                      <Redirect to={`/${defaultRoute}`} />
                    </Route>
                    <Route
                      path="*"
                      component={lazyload(
                        () => import('./pages/exception/403')
                      )}
                    />
                  </Switch>
                </Router>
              </Content>
            </div>
            {showFooter && <Footer />}
          </Layout>
        </Layout>
      )}
    </Layout>
  );
}

export default PageLayout;
